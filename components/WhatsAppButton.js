"use client"; 
import { useState } from 'react';

const WhatsAppButton = ({ inputs, items, total, delivery, code }) => { 
  const [error, setError] = useState(null);



  const createOrder = async () => {
    try {
  

       
      const orderResponse = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, inputs, total, delivery, code }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

       
      const emailResponse = await fetch("/api/sendEmail3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          inputs,
          subtotal,
          delivery,
          total,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      alert("Order placed successfully!");

    } catch (error) {
      console.error("Error processing order:", error);
      alert(error.message || "Something went wrong");
    }
  };




  const handleClick = async () => {
    if (!validateInputs(inputs)) {
      setError('Please fill the required fields and on the right format.');
      return;
    }

    const url = createWhatsAppURL(inputs, items, total, delivery, code, subtotal);
    window.open(url, '_blank');
    createOrder();
    clearCart();
    setError(null);
  };

  const validateInputs = (inputs) => {
    const { country, city, address, fname, lname, phone, email } = inputs;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      country &&
      city &&
      address &&
      fname &&
      lname &&
      phone &&
      email &&
      emailRegex.test(email)
    );
  };


  return (
    <div className='container'>
      {error && <div className='myBB3'>{error}</div>}
      <span className="ProvidersSingleProduct--selected">
        <button onClick={handleClick} type="button" className="AddToCart HtmlProductAddToCart" style={{ borderRadius: "0" }}  >
          <span>Order Now!</span>
        </button>
      </span>
    </div>
  );
};

export default WhatsAppButton;

const createWhatsAppURL = (inputs, items, total, delivery, code, subtotal) => {
  const { country, city, apt, address, fname, lname, phone, email } = inputs;
 


  // Formatting the message
  const message = `
    *Customer Information:*
    Email: ${email}
    Name: ${fname} ${lname} 
    Phone: ${phone}
    Country: ${country}
    City: ${city}
    Address: ${address}
    Apt-floor: ${apt}


    *Order Details:*
    ${items.map((item, index) => `
      Item ${index + 1}:
      - Name: ${item.title} 
      - Quantity: ${item.quantity}
      - Price: $${(() => {
      const colorObj = item.color?.find(c => c.color === item.selectedColor);
      const sizeObj = colorObj?.sizes?.find(s => s.size === item.selectedSize);
      return sizeObj?.price ?? item.discount;
    })()}

      - Color: ${item.selectedColor}
      - Size: ${item.selectedSize}
      - Image: ${item.img[0]} 
    `).join('\n')}

    Subtotal: $${subtotal.toFixed(2)}
    Delivery fee: $${delivery}
    *Total Amount:* $${total}
  `;

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '96176419884';
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
