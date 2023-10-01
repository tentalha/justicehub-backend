import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
// ------------------------------------------------------------------>>
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ------------------------------------------------------------------>>
//Private-Keys
const pathToAccessPrivKey = path.join(
  __dirname,
  "../",
  "keys",
  "private_key.pem"
);
export const ACCESS_PRIVATE_KEY = fs.readFileSync(pathToAccessPrivKey);

// ------------------------------------------------------------------>>
//Public-Keys
const pathToAccessPubKey = path.join(
  __dirname,
  "../",
  "keys",
  "public_key.pem"
);
export const ACCESS_PUB_KEY = fs.readFileSync(pathToAccessPubKey);
