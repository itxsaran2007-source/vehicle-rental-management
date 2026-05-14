import os, re

cars_data = [
    {"name": "Aston Martin DB11", "img": "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=800&auto=format&fit=crop", "price": 420, "seats": 4, "fuel": "Petrol"},
    {"name": "Porsche 911", "img": "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop", "price": 250, "seats": 2, "fuel": "Petrol"},
    {"name": "Tesla Model S", "img": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop", "price": 180, "seats": 5, "fuel": "Electric"},
    {"name": "Audi RS e-tron", "img": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop", "price": 220, "seats": 4, "fuel": "Electric"},
    {"name": "Range Rover Sport", "img": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop", "price": 160, "seats": 5, "fuel": "Diesel"},
    {"name": "Ferrari F8", "img": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop", "price": 550, "seats": 2, "fuel": "Petrol"},
    {"name": "BMW M4 Competition", "img": "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop", "price": 150, "seats": 4, "fuel": "Petrol"},
    {"name": "Nissan GT-R", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nissan_GT-R_01.JPG/800px-Nissan_GT-R_01.JPG", "price": 280, "seats": 4, "fuel": "Petrol"},
    {"name": "Chevrolet Corvette", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/2020_Chevrolet_Corvette_C8_Stingray.jpg/800px-2020_Chevrolet_Corvette_C8_Stingray.jpg", "price": 200, "seats": 2, "fuel": "Petrol"},
    {"name": "Jaguar F-Type", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2015_Jaguar_F-Type_V6_Supercharged_Automatic_3.0_Front.jpg/800px-2015_Jaguar_F-Type_V6_Supercharged_Automatic_3.0_Front.jpg", "price": 210, "seats": 2, "fuel": "Petrol"}
]

catalog_html = "            <!-- CARS -->\n"
for c in cars_data:
    catalog_html += f"""            <div class="glass-panel tilt-card vehicle-card" data-category="cars">
                <div class="vehicle-img-container"><img src="{c['img']}" alt="Car" class="vehicle-img"></div>
                <div class="vehicle-info"><h2>{c['name']}</h2><span class="vehicle-price">${c['price']}<span>/day</span></span></div>
                <div class="features"><span><i class="fas fa-users"></i> {c['seats']} Seats</span><span><i class="fas fa-gas-pump"></i> {c['fuel']}</span><span><i class="fas fa-car"></i> Car</span></div>
                <a href="booking.html" class="btn-primary" style="width: 100%; margin-top: 10px;">Book Now</a>
            </div>\n"""

booking_html = "                            <!-- CARS -->\n"
for i, c in enumerate(cars_data):
    booking_html += f"""                            <option value="{i+1}" data-img="{c['img']}" data-price="{c['price']}" style="background: var(--bg-color);">{c['name']}</option>\n"""

# Update catalog.html
with open('catalog.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<!-- CARS -->[\s\S]*?(?=<!-- BIKES -->)', catalog_html, content)
with open('catalog.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update booking.html
with open('booking.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<!-- CARS -->[\s\S]*?(?=<!-- BIKES -->)', booking_html, content)
with open('booking.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated perfectly.")
