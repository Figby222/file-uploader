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



export default { getFiles }