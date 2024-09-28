import pool from "../pool.mjs";

async function findUserByUsername(username) {
    const user = await pool.user.findUnique({
        where: {
            username: username
        }
    })
    return user;
}



export default { findUserByUsername };