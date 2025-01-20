import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config()

export default class AwsS3 {
  public bucketName: string
  public bucketRegion: string
  private s3: any

  constructor(bucketName: string, bucketRegion: string) {
    this.bucketName = bucketName
    this.bucketRegion = bucketRegion
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_USER_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY as string
      },
      region: this.bucketRegion
    })
  }

  async getFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key
    })

    return await getSignedUrl(this.s3, command, { expiresIn: 3600 })
  }

  async createFile(file: Express.Multer.File, fileBuffer: Buffer, key: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: file.mimetype
    })

    await this.s3.send(command)
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key
    })

    await this.s3.send(command)
  }
}