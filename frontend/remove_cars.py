import os, re

files = ['catalog.html', 'booking.html']
cars_to_remove = ['Mercedes AMG GT', 'Lamborghini Huracan', 'McLaren 720S']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if f == 'catalog.html':
        for car in cars_to_remove:
            # Match the div block containing the specific car name
            # It starts with <div class="glass-panel tilt-card vehicle-card" data-category="cars">
            # Ends with </div> after the Book Now button
            pattern = r'<div class="glass-panel tilt-card vehicle-card"[^>]*>[\s\S]*?<h2>' + car + r'</h2>[\s\S]*?</a>\s*</div>\s*'
            content = re.sub(pattern, '', content)
            
    if f == 'booking.html':
        for car in cars_to_remove:
            # Match the <option> tag containing the car name
            pattern = r'<option[^>]*>' + car + r'</option>\s*'
            content = re.sub(pattern, '', content)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('Cars removed successfully.')
