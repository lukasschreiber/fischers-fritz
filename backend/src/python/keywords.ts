import { Keyword } from "@fischers-fritz/types";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { EOL } from "os";
import dotenv from "dotenv";

dotenv.config();

let python: ChildProcessWithoutNullStreams | undefined = undefined;
let timeout: NodeJS.Timeout;

function createPythonProcess() {
  python = spawn(process.env.PYTHON_NAME ?? "python", ["src/python/keyword_interface.py"]);
  python?.stdout.setEncoding(process.env.PYTHON_ENCODING as BufferEncoding ?? "utf-8");
  timeout = setTimeout(() => {
    python?.kill();
    python = undefined;
  }, 30 * 1000);
}

export async function getKeywords(text: string): Promise<Keyword[]> {
  const id = Math.floor(Math.random() * Date.now());
  return new Promise<Keyword[]>((resolve) => {
    if (python === undefined || python.exitCode !== null) createPythonProcess();
    if (python === undefined) return;
    timeout.refresh();

    python.stdin.write(Buffer.from(id.toString() + EOL));
    python.stdin.write(Buffer.from(text + EOL, process.env.PYTHON_ENCODING as BufferEncoding ?? "utf-8"));

    const dataListener = (data: Buffer) => {
      try {
        const result = JSON.parse(data.toString());
        if(parseInt(result[0]) === id){
          python?.stdout.removeListener("data", dataListener);
          resolve(
            result[1].map((keyword: [string, number, [number, number]]) => ({
              text: keyword[0],
              n: keyword[1],
              bounds: keyword[2],
            }))
          );
        }
      } catch (e) {
        resolve([]);
      }
    }

    python.stdout.on("data", dataListener);
  });
}
