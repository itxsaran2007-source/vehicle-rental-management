import re

with open('booking.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the 'required' attribute from the hidden payment radio buttons
content = content.replace('required style="display: none;" onchange="selectPayment(this)"', 'style="display: none;" onchange="selectPayment(this)"')

# 2. Add IDs to the datetime inputs to fetch them easily
# Original: <input type="datetime-local" class="form-control" required>
# We will just use querySelector in JS

# 3. Update the submitBooking function to add date validation
new_submit_script = """
        function submitBooking(event) {
            event.preventDefault();
            
            var select = document.getElementById('vehicleSelect');
            var option = select.options[select.selectedIndex];
            var vehicle = option.text;
            var price = option.getAttribute('data-price');
            
            // Validate Dates
            var dateInputs = document.querySelectorAll('input[type="datetime-local"]');
            var pickupDate = new Date(dateInputs[0].value);
            var returnDate = new Date(dateInputs[1].value);
            
            if(!dateInputs[0].value || !dateInputs[1].value) {
                alert("Please select both Pickup and Return dates.");
                return;
            }
            
            if(returnDate <= pickupDate) {
                alert("Return date and time must be strictly after the Pickup date and time.");
                return;
            }

            var paymentInput = document.querySelector('input[name="payment"]:checked');
            if(!paymentInput) {
                alert("Please select a payment method.");
                return;
            }
            var payment = paymentInput.value.toUpperCase();
            if(payment === 'PAYTM') payment = 'Paytm';
            if(payment === 'GPAY') payment = 'GPay';
            
            window.location.href = `slip.html?vehicle=${encodeURIComponent(vehicle)}&price=${price}&payment=${payment}`;
        }
"""

# Replace the existing submitBooking function block
pattern = r'function submitBooking\(event\) \{[\s\S]*?window\.location\.href \= `slip\.html[^`]*`;\n        \}'
content = re.sub(pattern, new_submit_script.strip(), content)

with open('booking.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Validation fixed.")
