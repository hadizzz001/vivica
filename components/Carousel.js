'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const images = [
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760359985/schermata_2022-08-26_alle_17_4x_vu7st8.webp',
  'https://res.cloudinary.com/duln5xyix/image/upload/v1760360107/04_07_21_editotorial_092_4x_xipany.webp',
];

export default function CustomCarousel() {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay]}

        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[900px] md:h-[800px] lg:h-[800px]">
              {/* Image */}
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              {/* Button centered vertically & horizontally */}
<button className="text-xl absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent text-white px-7 py-3 border border-white z-10 uppercase transition-colors duration-200 hover:bg-white hover:text-black whitespace-nowrap" onClick={() => { window.location.href = `/contact`; }}>
  <span className="inline-flex items-center gap-2">
    Contact Us
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M8 5l7 7-7 7" stroke="none" />
    </svg>
  </span>
</button>


            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
