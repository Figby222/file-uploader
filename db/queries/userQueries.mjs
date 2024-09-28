import pool from "../pool.mjs";

async function findUserByUsername(username) {
    const user = await pool.user.findUnique({
        where: {
            username: username
        }
    })
    
    return user;
}

async function createUser(userDetails) {
    const user = await pool.user.create({
        data: {
            username: userDetails.username,
            password: userDetails.hashedPassword
        }
    })

    return user;
}

export default { findUserByUsername, createUser };