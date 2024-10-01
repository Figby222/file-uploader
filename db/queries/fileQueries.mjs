import pool from "../pool.mjs";

async function createFile(fileDetails) {
    await pool.file.create({
        data: {
            path: fileDetails.path,
            name: fileDetails.name,
            size: fileDetails.size,
            folderId: fileDetails.folderId || null
        }
    })
} 
async function getRootFolderContents() {
    const folders = await pool.folder.findMany({
        where: { parentFolderId: null }
    });

    const files = await pool.file.findMany({
        where: { folderId: null }
    })

    return { folders, files};
}
export default { createFile, getRootFolderContents }