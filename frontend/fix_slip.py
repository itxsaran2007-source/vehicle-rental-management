import re

# 1. Update booking.html form
with open('booking.html', 'r', encoding='utf-8') as f:
    booking_content = f.read()

booking_content = booking_content.replace('<form action="slip.html">', '<form id="bookingForm" onsubmit="submitBooking(event)">')

submit_script = """
        function submitBooking(event) {
            event.preventDefault();
            var select = document.getElementById('vehicleSelect');
            var option = select.options[select.selectedIndex];
            var vehicle = option.text;
            var price = option.getAttribute('data-price');
            
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
if 'function submitBooking(event)' not in booking_content:
    booking_content = booking_content.replace('</script>', submit_script + '\n    </script>')

with open('booking.html', 'w', encoding='utf-8') as f:
    f.write(booking_content)


# 2. Update slip.html IDs and add onload script
with open('slip.html', 'r', encoding='utf-8') as f:
    slip_content = f.read()

slip_content = slip_content.replace('<strong>BMW M4 Competition</strong>', '<strong id="slipVehicle">BMW M4 Competition</strong>')
slip_content = slip_content.replace('<strong>UPI</strong>', '<strong id="slipPayment">UPI</strong>')
slip_content = slip_content.replace('<div class="amount">$450.00</div>', '<div class="amount" id="slipTotal">$450.00</div>')

slip_script = """
    <script>
        window.onload = function() {
            const params = new URLSearchParams(window.location.search);
            if(params.has('vehicle')) {
                document.getElementById('slipVehicle').innerText = params.get('vehicle');
            }
            if(params.has('price')) {
                document.getElementById('slipTotal').innerText = '$' + params.get('price') + '.00';
            }
            if(params.has('payment')) {
                document.getElementById('slipPayment').innerText = params.get('payment');
            }
            
            // Randomize Booking ID for realism
            document.getElementById('slipId').innerText = '#DX-' + Math.floor(1000000 + Math.random() * 9000000);
        }
    </script>
</body>
"""

slip_content = slip_content.replace('<strong>#DX-9847201</strong>', '<strong id="slipId">#DX-9847201</strong>')

if 'URLSearchParams(window.location.search)' not in slip_content:
    slip_content = slip_content.replace('</body>', slip_script)

with open('slip.html', 'w', encoding='utf-8') as f:
    f.write(slip_content)

print("Slip dynamic linking updated successfully.")
