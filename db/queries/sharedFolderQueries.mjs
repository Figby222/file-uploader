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
export default { sharedFolderContentsGet }