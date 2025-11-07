'use client';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const toCamelCase = (str) =>
  str
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export default function BookYourEvent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('select');

  const [cats, setCats] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: '',
    cat: '',
  });

  // ✅ FETCH CATEGORIES (title + img1[0])
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch('https://vivica-dash.netlify.app/api/project');
        const data = await res.json();

        if (Array.isArray(data)) {
          // Extract title and category image img1[0]
          const formatted = data.map((item) => ({
            title: item.title,
            img: item.img1?.[0] || '', // fallback if undefined
          }));

          setCats(formatted);

          // Auto-select from URL query
          if (search && formatted.some((i) => i.title === search)) {
            setFormData((prev) => ({ ...prev, cat: search }));
          }
        }
      } catch (err) {
        console.error('Error fetching cats:', err);
      }
    };

    fetchCats();
  }, [search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, location, cat } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone || !location || !cat) return false;
    if (!emailRegex.test(email)) return false;
    return true;
  };

  const createWhatsAppURL = (data) => {
    const { name, email, phone, location, subject, message, cat } = data;
    const msg = `
*New Event Booking Request:*
Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location}
Category: ${cat}
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

    // Open WhatsApp instantly
    const whatsappUrl = createWhatsAppURL(formData);
    window.open(whatsappUrl, '_blank');

    try {
      // Send order to backend
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
        cat: '',
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
        {/* LEFT SIDE FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} className="w-full p-3 mybbborder" />
          <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} className="w-full p-3 mybbborder" />
          <input type="tel" name="phone" placeholder="Phone*" value={formData.phone} onChange={handleChange} className="w-full p-3 mybbborder" />
          <input type="text" name="location" placeholder="Location*" value={formData.location} onChange={handleChange} className="w-full p-3 mybbborder" />
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full p-3 mybbborder" />
          <textarea name="message" placeholder="Message" rows={5} value={formData.message} onChange={handleChange} className="w-full p-3 mybbborder"></textarea>

          {error && <div className="text-red-600">{error}</div>}
        </form>

        {/* RIGHT SIDE CATEGORY SELECTOR */}
        <div className="grid grid-cols-2 gap-4">
          {cats.length === 0 ? (
            <p>Loading categories...</p>
          ) : (
            cats.map(({ title, img }) => {
              const displayLabel = toCamelCase(title);
              return (
                <label key={title} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="cat"
                    value={title}
                    checked={formData.cat === title}
                    onChange={handleChange}
                    className="hidden"
                  />

<div className="w-28 h-28 rounded-full mb-2 bg-[#f6e8ff] flex items-center justify-center overflow-hidden">
  <img
    src={img}
    alt={title}
    className="w-14 h-14 object-contain"
  />
</div>


                  <span className="text-center mb-1">{displayLabel}</span>

                  {formData.cat === title && <Check color="#BD93D8" strokeWidth={3} size={28} />}
                </label>
              );
            })
          )}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
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
