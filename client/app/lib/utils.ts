import { spawn } from "child_process";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function executeContextScript(scriptPath: string, query: string): Promise<string> {
  return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python3", [scriptPath, query]);

      let output = "";
      let errorOutput = "";

      pythonProcess.stdout.on("data", (data) => {
          output += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
          errorOutput += data.toString();
      });

      pythonProcess.on("close", (code) => {
          if (code === 0) {
              output = output.substring(output.indexOf("["), output.lastIndexOf("]") + 1);
              console.log('Output:', output);
              resolve(output.trim());
          } else {
              reject(new Error(errorOutput.trim()));
          }
      });
  });
}

export function executePythonScript(scriptPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python3", [scriptPath]);

      let output = "";
      let errorOutput = "";

      pythonProcess.stdout.on("data", (data) => {
          output += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
          errorOutput += data.toString();
      });

      pythonProcess.on("close", (code) => {
          if (code === 0) {
              resolve(output.trim());
          } else {
              reject(new Error(errorOutput.trim()));
          }
      });
  });
}
