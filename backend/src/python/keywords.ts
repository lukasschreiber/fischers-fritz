import { Keyword } from "@fischers-fritz/types";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { EOL } from "os";
import dotenv from "dotenv";

dotenv.config();

let python: ChildProcessWithoutNullStreams | undefined = undefined;
let timeout: NodeJS.Timeout;

function createPythonProcess() {
  python = spawn(process.env.PYTHON_NAME ?? "python", ["src/python/keyword_interface.py"]);
  python?.stdout.setEncoding("latin1");
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
    python.stdin.write(Buffer.from(text + EOL, "latin1"));

    const dataListener = (data: Buffer) => {
      try {
        const result = JSON.parse(data.toString());
        if(parseInt(result[0]) === id){
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

      python?.stdout.removeListener("data", dataListener);
    }

    python.stdout.on("data", dataListener);
  });
}
