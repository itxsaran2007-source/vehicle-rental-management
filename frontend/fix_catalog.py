import re

with open('e:/vechicle-rental-management/frontend/catalog.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'src="https://th\.bing\.com/th/id/OIP\.JgvkkImjl2RWzj72Xn4G0AHaE7[^"]*"\s*alt="Car"\s*class="vehicle-img"></div>\s*<div class="vehicle-info">\s*<h2>Nissan GT-R</h2>',
    'src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800&auto=format&fit=crop" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info">\n                    <h2>Nissan GT-R</h2>',
    content
)

content = re.sub(
    r'src="data:image/webp;base64,[^"]*"\s*alt="Car"\s*class="vehicle-img"></div>\s*<div class="vehicle-info">\s*<h2>Chevrolet Corvette</h2>',
    'src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info">\n                    <h2>Chevrolet Corvette</h2>',
    content
)

content = re.sub(
    r'src="data:image/webp;base64,[^"]*"\s*alt="Car"\s*class="vehicle-img"></div>\s*<div class="vehicle-info">\s*<h2>Jaguar F-Type</h2>',
    'src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info">\n                    <h2>Jaguar F-Type</h2>',
    content
)

with open('e:/vechicle-rental-management/frontend/catalog.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated catalog.html")
