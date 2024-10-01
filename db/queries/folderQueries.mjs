import pool from "../pool.mjs";

async function getFiles(folderId) {
    const folderContents = await pool.folder.findUnique({
        where: {
            id: folderId
        },
        include: {
            files: true,
            childFolders: true
        }
    })

    return folderContents;
}

async function createFolder(options) {
    await pool.folder.create({
        data: {
            name: options.folder_name,
            parentFolderId: options.parentFolderId || null
        }
    })
};



export default { getFiles, createFolder }