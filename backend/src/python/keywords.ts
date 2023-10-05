import { Keyword } from "@fischers-fritz/types";
import { spawn } from "child_process";
import { EOL } from "os";

export function getKeywords(text: string): Promise<Keyword[]> {
  return new Promise<Keyword[]>((resolve, reject) => {
    const python = spawn("python", ["src/python/keyword_interface.py"]);
    const outData: string[] = [];

    python.stdout.setEncoding("latin1");

    python.stdin.write(Buffer.from(text+EOL, "latin1"))

    python.stdout.on("data", data => {
      outData.push(data.toString());
    })

    python.on('exit', (code, signal) => {
      try{
        const result = JSON.parse(outData.join(""));
        resolve(result.map((keyword: [string, number, [number, number]]) => ({
          text: keyword[0],
          n: keyword[1],
          bounds: keyword[2]
        })))
      }catch(e){
        resolve([])
      }
      console.log(`child process exited with code ${code} and signal ${signal}`);
    });
  });
}
