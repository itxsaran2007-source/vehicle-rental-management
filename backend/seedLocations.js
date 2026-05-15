const pool = require("./config/db");

const locations = [
    { id: 1, name: "Downtown Hub" },
    { id: 2, name: "International Airport" },
    { id: 3, name: "Westside Branch" }
];

async function seed() {
    try {
        console.log("Seeding locations...");
        for (const l of locations) {
            await pool.query(
                "INSERT IGNORE INTO locations (id, name) VALUES (?, ?)",
                [l.id, l.name]
            );
            console.log(`Ensured location: ${l.name}`);
        }
        console.log("Seeding complete.");
        process.exit(0);
    } catch (err) {
        console.error("Seed error:", err);
        process.exit(1);
    }
}

seed();
