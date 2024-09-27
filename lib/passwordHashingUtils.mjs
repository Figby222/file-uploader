import bcrypt from "bcryptjs";

async function genPasswordHash(key) {
    try {
        const hash = await bcrypt.hash(key, 10);
        return hash;
    } catch (err) {
        console.error(err);
    }
}

export default { genPasswordHash }