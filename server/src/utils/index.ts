import * as crypto from "crypto"
export function hash(string) {
  return crypto
    .createHash("sha256")
    .update(string)
    .digest("hex")
}