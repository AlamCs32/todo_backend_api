import bcrypt from "bcrypt"

export class bcryptService {

    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    static async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, encryptedPassword)
    }

}
