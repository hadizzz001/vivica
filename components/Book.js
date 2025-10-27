'use client';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const imageUrls = [
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760991473/Wedding-Cakes_ex35v6.webp',
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760991473/Themed-Cakes_qlm3x7.webp',
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760991472/Bridal-Events_mkslmw.webp',
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760552480/confetti_mpjrgy.webp',
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760552480/red-carpet_fif6od.webp',
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760552480/cake_vnkjzk.webp',
];

const toCamelCase = (str) =>
  str
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export default function BookYourEvent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('select');
  const [occasions, setOccasions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: '',
    occasion: '',
  });

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const res = await fetch('https://vivica-dash.netlify.app/api/project');
        const data = await res.json();
        if (Array.isArray(data)) {
          const titles = data.map((i) => i.title);
          setOccasions(titles);
          if (search && titles.includes(search)) {
            setFormData((prev) => ({ ...prev, occasion: search }));
          }
        }
      } catch (err) {
        console.error('Error fetching occasions:', err);
      }
    };
    fetchOccasions();
  }, [search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, location, occasion } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone || !location || !occasion) return false;
    if (!emailRegex.test(email)) return false;
    return true;
  };

  const createWhatsAppURL = (data) => {
    const { name, email, phone, location, subject, message, occasion } = data;
    const msg = `
*New Event Booking Request:*
Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location}
Occasion: ${occasion}
Subject: ${subject || '-'}
Message: ${message || '-'}
    `;
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/96176419884?text=${encoded}`;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    setError('Please fill all required fields correctly.');
    return;
  }
  setError('');
  setLoading(true);

  // Open WhatsApp immediately
  const whatsappUrl = createWhatsAppURL(formData);
  const win = window.open(whatsappUrl, '_blank');

  try {
    // Send order
    const orderRes = await fetch('/api/sendOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!orderRes.ok) throw new Error('Failed to create order.');

    // Send email
    const emailRes = await fetch('/api/sendEmail3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!emailRes.ok) throw new Error('Failed to send email.');

    alert('Your request has been sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      subject: '',
      message: '',
      occasion: '',
    });
  } catch (err) {
    console.error(err);
    alert(err.message || 'Something went wrong.');
  } finally {
    setLoading(false);
  }
};


  return (
<div className="p-8 max-w-6xl mx-auto">
  <h1 className="text-3xl font-bold mb-8">Let’s Create Magic Together</h1>

  <div className="grid md:grid-cols-2 gap-8">
    {/* Left: Form Fields only */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name*"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 mybbborder"
      />
      <input
        type="email"
        name="email"
        placeholder="Email*"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 mybbborder"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone*"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 mybbborder"
      />
      <input
        type="text"
        name="location"
        placeholder="Location*"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-3 mybbborder"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full p-3 mybbborder"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-3 mybbborder"
        rows={5}
      ></textarea>

      {error && <div className="text-red-600">{error}</div>}
    </form>

    {/* Right: Radio Buttons */}
    <div className="grid grid-cols-2 gap-4">
      {occasions.length === 0 ? (
        <p>Loading occasions...</p>
      ) : (
        occasions.map((label, index) => {
          const image = imageUrls[index % imageUrls.length];
          const displayLabel = toCamelCase(label);
          return (
            <label
              key={label}
              className="flex flex-col items-center cursor-pointer"
            >
              <input
                type="radio"
                name="occasion"
                value={label}
                checked={formData.occasion === label}
                onChange={handleChange}
                className="hidden"
              />
              <div className="w-28 h-28 rounded-full mb-2 bg-[#f6e8ff] flex items-center justify-center">
                <img
                  src={image}
                  alt={label}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <span className="text-center mb-1">{displayLabel}</span>
              {formData.occasion === label && (
                <Check color="#BD93D8" strokeWidth={3} size={28} />
              )}
            </label>
          );
        })
      )}
    </div>
  </div>

  {/* Submit Button: always under radio buttons on mobile, but can be inline on md+ */}
  <div className="mt-6 md:mt-0 md:flex md:justify-start">
    <button
      type="submit"
      onClick={handleSubmit}
      disabled={loading}
      className="text-xl md:text-2xl bg-transparent text-black border border-black px-7 py-3 uppercase transition-colors duration-200 w-full md:w-auto"
    >
      {loading ? 'Sending...' : 'Submit'}
    </button>
  </div>
</div>

  );
}
