import pool from "../pool.mjs";

async function createFile(fileDetails) {
    await pool.file.create({
        data: {
            path: fileDetails.path,
            name: fileDetails.name,
            size: fileDetails.size
        }
    })
} 

async function getFiles() {
    const files = await pool.file.findMany();

    return files;
}


export default { createFile, getFiles }