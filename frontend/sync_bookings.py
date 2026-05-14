import os, re, urllib.parse

# 1. Update catalog.html to pass the vehicle name
with open('catalog.html', 'r', encoding='utf-8') as f:
    catalog_content = f.read()

def replace_book_now(match):
    # match.group(1) is the vehicle name inside <h2>...</h2>
    # match.group(2) is everything between the <h2> block and the <a> tag
    # match.group(3) is the rest of the <a> tag
    vehicle_name = match.group(1)
    encoded_name = urllib.parse.quote(vehicle_name)
    return f'<h2>{vehicle_name}</h2>{match.group(2)}<a href="booking.html?vehicle={encoded_name}"{match.group(3)}'

# regex to find <h2>Vehicle Name</h2> and the very next <a href="booking.html"...>
pattern = r'<h2>(.*?)</h2>([\s\S]*?)<a href="booking\.html"(.*?)'
new_catalog = re.sub(pattern, replace_book_now, catalog_content)

with open('catalog.html', 'w', encoding='utf-8') as f:
    f.write(new_catalog)


# 2. Update booking.html to handle the parameter and initialize the summary
with open('booking.html', 'r', encoding='utf-8') as f:
    booking_content = f.read()

init_script = """
        // Initialize based on URL or defaults
        window.onload = function() {
            const params = new URLSearchParams(window.location.search);
            const vehicle = params.get('vehicle');
            const select = document.getElementById('vehicleSelect');
            
            if (vehicle) {
                for(let i=0; i<select.options.length; i++) {
                    if(select.options[i].text === vehicle) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
            
            updateSummary();
        };
"""

# Insert the onload script into booking.html before the updateSummary function
if 'window.onload = function()' not in booking_content:
    booking_content = booking_content.replace('function updateSummary() {', init_script + '\n        function updateSummary() {')

with open('booking.html', 'w', encoding='utf-8') as f:
    f.write(booking_content)

print("Booking synchronization applied successfully.")
