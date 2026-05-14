import os, re

files = ['catalog.html', 'booking.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Replace the duplicated images
    content = content.replace(
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info"><h2>Mercedes AMG GT',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg/800px-Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info"><h2>Mercedes AMG GT'
    )
    content = content.replace(
        'data-img="https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop" data-price="300" style="background: var(--bg-color);">Mercedes AMG GT',
        'data-img="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg/800px-Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg" data-price="300" style="background: var(--bg-color);">Mercedes AMG GT'
    )

    content = content.replace(
        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info"><h2>Lamborghini Huracan',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2014-03-04_Geneva_Motor_Show_1379.JPG/800px-2014-03-04_Geneva_Motor_Show_1379.JPG" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info"><h2>Lamborghini Huracan'
    )
    content = content.replace(
        'data-img="https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop" data-price="500" style="background: var(--bg-color);">Lamborghini Huracan',
        'data-img="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2014-03-04_Geneva_Motor_Show_1379.JPG/800px-2014-03-04_Geneva_Motor_Show_1379.JPG" data-price="500" style="background: var(--bg-color);">Lamborghini Huracan'
    )

    content = content.replace(
        'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info"><h2>McLaren 720S',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/2018_McLaren_720S_V8_S-A_4.0.jpg/800px-2018_McLaren_720S_V8_S-A_4.0.jpg" alt="Car" class="vehicle-img"></div>\n                <div class="vehicle-info"><h2>McLaren 720S'
    )
    content = content.replace(
        'data-img="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop" data-price="480" style="background: var(--bg-color);">McLaren 720S',
        'data-img="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/2018_McLaren_720S_V8_S-A_4.0.jpg/800px-2018_McLaren_720S_V8_S-A_4.0.jpg" data-price="480" style="background: var(--bg-color);">McLaren 720S'
    )

    # 2. Remove Vans and Small Trucks from catalog.html
    if f == 'catalog.html':
        # Remove buttons
        content = re.sub(r'<button class="filter-btn" onclick="filterSelection\(\'vans\'\)">Vans</button>\s*', '', content)
        content = re.sub(r'<button class="filter-btn" onclick="filterSelection\(\'trucks\'\)">Small Trucks</button>\s*', '', content)
        
        # Remove grid items
        content = re.sub(r'<!-- VANS -->[\s\S]*?(?=<!-- SMALL TRUCKS -->)', '', content)
        content = re.sub(r'<!-- SMALL TRUCKS -->[\s\S]*?(?=<!-- BUSES -->)', '', content)
        
    if f == 'booking.html':
        # Remove options
        content = re.sub(r'<!-- VANS -->[\s\S]*?(?=<!-- SMALL TRUCKS -->)', '', content)
        content = re.sub(r'<!-- SMALL TRUCKS -->[\s\S]*?(?=<!-- BUSES -->)', '', content)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Updated images and removed vans/trucks')
