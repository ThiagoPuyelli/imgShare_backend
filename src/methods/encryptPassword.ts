import bcrypt from "bcrypt";

export default async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
}