import { Keyword } from "@fischers-fritz/types";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { EOL } from "os";

let process: ChildProcessWithoutNullStreams | undefined = undefined;
let timeout: NodeJS.Timeout;

function createPythonProcess() {
  process = spawn("python", ["src/python/keyword_interface.py"]);
  process.stdout.setEncoding("latin1");
  timeout = setTimeout(() => {
    process?.kill();
    process = undefined;
  }, 30 * 1000);
}

export async function getKeywords(text: string): Promise<Keyword[]> {
  const id = Math.floor(Math.random() * Date.now());
  return new Promise<Keyword[]>((resolve) => {
    if (process === undefined || process.exitCode !== null) createPythonProcess();
    if (process === undefined) return;
    timeout.refresh();

    process.stdin.write(Buffer.from(id.toString() + EOL));
    process.stdin.write(Buffer.from(text + EOL, "latin1"));

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

      process?.stdout.removeListener("data", dataListener);
    }

    process.stdout.on("data", dataListener);
  });
}
