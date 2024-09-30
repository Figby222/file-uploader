import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.$transaction(async (tx) => {
        const files = await tx.file.findMany();
        
        for (const file of files) {
            await tx.file.update({
                where: { id: file.id },
                data: {
                    path: file.path ? file.path : "Unknown",
                },
            });
        }
    });
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());