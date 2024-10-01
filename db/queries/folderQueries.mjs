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

async function getFolderDetails(folderId) {
    const folderDetails = await pool.folder.findUnique({
        where: {
            id: folderId
        }
    })

    return folderDetails;
}

async function updateFolder(folderId, folderDetails) {
    await pool.folder.update({
        where: {
            id: folderId,
        },
        data: {
            name: folderDetails.folder_name
        }
    })
}

export default { getFiles, createFolder, getFolderDetails, updateFolder }