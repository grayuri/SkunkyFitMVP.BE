export interface IPassordServices {
  password: string
  isStrong: boolean
  hashPassword(): void
  verifyStrength(): void
  passwordsAreEqual(normalPassword: string): Promise<boolean>
}