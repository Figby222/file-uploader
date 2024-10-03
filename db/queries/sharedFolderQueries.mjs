import pool from "../pool.mjs";

async function sharedFolderContentsGet(sharedFolderId) {
    const folderContents = await pool.sharedFolder.findUnique({
        where: {
            id: sharedFolderId
        },
        include: {
            folder: {
                include: {
                    files: true
                }
            }
        }
    });

    return folderContents;
}

async function createSharedFolder(folderId, options) {
    const sharedFolder = await pool.sharedFolder.create({
        data: {
            folderId: folderId,
            expiresAt: options.expiresAt
        }
    })

    return sharedFolder;
}

async function getSharedFolderFileDetails(sharedFolderId, fileId) {
    const sharedFolder = await pool.sharedFolder.findUnique({
        where: {
            id: sharedFolderId
        },
        include: {
            folder: {
                include: {
                    files: {
                        where: {
                            id: fileId
                        }
                    }
                }
            }
        }
    });

    return sharedFolder.folder.files[0];
}


export default { sharedFolderContentsGet, createSharedFolder, getSharedFolderFileDetails }