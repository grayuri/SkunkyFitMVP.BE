export default function getFileType(file: Express.Multer.File): string {
  return file.mimetype.split("/").pop()!
}