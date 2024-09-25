const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
    try {
        const categories = [
            {
                name: "Software",
                subCategories: {
                    create: [
                        { name: "Cybersecurity" },
                        { name: "FullStack Development" },
                        { name: "Data Science" },
                        { name: "Others" },
                    ],
                },
            },
            {
                name: "Business",
                subCategories: {
                    create: [
                        { name: "Marketing" },
                        { name: "Finance" },
                        { name: "E-Commerce" },
                        { name: "Others" },
                    ],
                },
            },
            {
                name: "Design",
                subCategories: {
                    create: [
                        { name: "3D Animation" },
                        { name: "Graphic Design" },
                        { name: "Interior/Exterior Design" },
                        { name: "Others" },
                    ],
                },
            },
            {
                name: "Health",
                subCategories: {
                    create: [
                        { name: "Yoga" },
                        { name: "Nutrition" },
                        { name: "Fitness" },
                        { name: "Others" },
                    ],
                },
            },
        ];

        // Sequentially create each category with its subcategories
        for (const category of categories) {
            await database.category.create({
                data: {
                    name: category.name,
                    subCategories: category.subCategories,
                },
                include: {
                    subCategories: true,
                },
            });
        }

        await database.level.createMany({
            data: [
                { name: "Beginner" },
                { name: "Intermediate" },
                { name: "Expert" },
                { name: "All levels" },
            ],
        });

        console.log(" successfully");
    } catch (error) {
        console.log(" failed", error);
    } finally {
        await database.$disconnect();
    }
}

main();