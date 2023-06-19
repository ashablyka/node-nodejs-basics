import path from "path";
import fs from "fs";
import { access, copyFile, mkdir, readdir } from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const sourceFolderPath = path.join(__dirname, "files");
  const destinationFolderPath = path.join(__dirname, "files_copy");
  fs.access(sourceFolderPath, (err) => {
    if (err) throw new Error("FS operation failed");
    fs.access(destinationFolderPath, async (err) => {
      if (!err) throw new Error("FS operation failed");
      await mkdir(destinationFolderPath);
      const files = await readdir(sourceFolderPath);
      for (const file of files) {
        const sourceFilePath = path.join(sourceFolderPath, file);
        const destinationFilePath = path.join(destinationFolderPath, file);
        await copyFile(sourceFilePath, destinationFilePath);
      }
    });
  });
};

await copy();
