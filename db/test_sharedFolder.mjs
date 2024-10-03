import pool from "./pool.mjs";

async function main() {
    await pool.sharedFolder.create({
        data: {
            expiresAt: new Date(Date.now()).toISOString(),
            folderId: 4
        }
    }).then(console.log)
}

main();