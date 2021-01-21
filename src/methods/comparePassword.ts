import bcrypt from "bcrypt";

export default async (password, realPassword): Promise<boolean> => {
    return await bcrypt.compareSync(password, realPassword);
}