import * as crypto from "crypto"
function hash(string) {
  return crypto
    .createHash("sha256")
    .update(string)
    .digest("hex")
}

export { hash }