import pool from "../pool.mjs";

async function createFile(fileDetails) {
    await pool.file.create({
        data: {
            destination: fileDetails.destination,
            name: fileDetails.name,
            size: fileDetails.size
        }
    })
} 


export default { createFile }