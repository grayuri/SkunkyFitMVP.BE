import bcrypt from "bcrypt";
import validator from "validator";
import { IPassordServices } from "../interfaces/services/IPasswordServices";

export default class PasswordServices implements IPassordServices {
  public password: string
  public isStrong: boolean

  constructor(password: string) {
    this.password = password
    this.isStrong = false
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
  }

  verifyStrength() {
    const hasNumberPattern = new RegExp(/^\d+$/)
    const hasLetterPattern = new RegExp(`[a-zA-Z]`)

    if (this.password.length < 8) this.isStrong = false
    else if (!hasNumberPattern.test(this.password)) this.isStrong = false
    else if (!hasLetterPattern.test(this.password)) this.isStrong = false
    else if (!validator.isStrongPassword(this.password)) this.isStrong = false
    else this.isStrong = true
  }

  async passwordsAreEqual(normalPassword: string): Promise<boolean> {
    return await bcrypt.compare(normalPassword, this.password)
  }
}