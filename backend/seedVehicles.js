const pool = require("./config/db");

const vehicles = [
    { name: "Tesla Model S", category: "car", price_per_day: 180, transmission: "Automatic", fuel_type: "Electric", image_url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop", description: "5 Seats" },
    { name: "Audi RS e-tron", category: "car", price_per_day: 220, transmission: "Automatic", fuel_type: "Electric", image_url: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop", description: "4 Seats" },
    { name: "Range Rover Sport", category: "car", price_per_day: 160, transmission: "Automatic", fuel_type: "Diesel", image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop", description: "5 Seats" },
    { name: "Ferrari F8", category: "car", price_per_day: 550, transmission: "Automatic", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "BMW M4 Competition", category: "car", price_per_day: 150, transmission: "Manual", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop", description: "4 Seats" },
    { name: "Nissan GT-R", category: "car", price_per_day: 280, transmission: "Automatic", fuel_type: "Petrol", image_url: "https://th.bing.com/th/id/OIP.JgvkkImjl2RWzj72Xn4G0AHaE7?w=241&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "4 Seats" },
    { name: "Chevrolet Corvette", category: "car", price_per_day: 200, transmission: "Automatic", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "Jaguar F-Type", category: "car", price_per_day: 210, transmission: "Automatic", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1566473065146-bf2210fd7405?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "Yamaha YZF R1", category: "bike", price_per_day: 80, transmission: "Manual", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "Kawasaki Ninja H2", category: "bike", price_per_day: 120, transmission: "Manual", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "Ducati Panigale V4", category: "bike", price_per_day: 110, transmission: "Manual", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "BMW S1000RR", category: "bike", price_per_day: 100, transmission: "Manual", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "Harley Iron 883", category: "bike", price_per_day: 90, transmission: "Manual", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1558981033-0f0309284409?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "Suzuki Hayabusa", category: "bike", price_per_day: 130, transmission: "Manual", fuel_type: "Petrol", image_url: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?q=80&w=800&auto=format&fit=crop", description: "2 Seats" },
    { name: "Volvo Luxury Bus", category: "bus", price_per_day: 400, transmission: "Automatic", fuel_type: "Diesel", image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", description: "40 Seats" },
    { name: "Mercedes Tourismo", category: "bus", price_per_day: 450, transmission: "Automatic", fuel_type: "Diesel", image_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop", description: "45 Seats" },
    { name: "Scania Touring", category: "bus", price_per_day: 420, transmission: "Automatic", fuel_type: "Diesel", image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", description: "42 Seats" }
];

async function seed() {
    try {
        console.log("Seeding original fleet...");
        for (const v of vehicles) {
            // Check if exists
            const [existing] = await pool.query("SELECT id FROM vehicles WHERE name = ?", [v.name]);
            if (existing.length === 0) {
                await pool.query(
                    "INSERT INTO vehicles (name, category, price_per_day, transmission, fuel_type, image_url, description, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [v.name, v.category, v.price_per_day, v.transmission, v.fuel_type, v.image_url, v.description, 1]
                );
                console.log(`Added: ${v.name}`);
            } else {
                console.log(`Skipped (exists): ${v.name}`);
            }
        }
        console.log("Seeding complete.");
        process.exit(0);
    } catch (err) {
        console.error("Seed error:", err);
        process.exit(1);
    }
}

seed();
