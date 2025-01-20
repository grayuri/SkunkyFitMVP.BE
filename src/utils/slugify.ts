import crypto from "crypto";

export default function slugify(string: string): string {
  const randomBytes = crypto.randomBytes(32).toString("hex")

  return string.replaceAll(" ", "_").toLowerCase() + "_" + randomBytes.slice(0, 4)
}