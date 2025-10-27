'use client';
import { myFont } from '../app/fonts'

const features = [
  {
    title: 'Professional & Reliable Service',
    img: 'https://res.cloudinary.com/duln5xyix/image/upload/v1760991473/Wedding-Cakes_ex35v6.webp',
  },
  {
    title: 'Attention to Every Detail',
    img: 'https://res.cloudinary.com/duln5xyix/image/upload/v1760991472/Bridal-Events_mkslmw.webp',
  },
  {
    title: 'Creative & Personalized Designs',
    img: 'https://res.cloudinary.com/duln5xyix/image/upload/v1760991473/Themed-Cakes_qlm3x7.webp',
  },
];

export default function WhyChooseUs() {
  return (
    <div className="flex flex-col items-center my-20 gap-7 md:gap-7">
      <h1 className={`${myFont.className} myparhal2 mb-10 text-center`}>Why choose us?</h1>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-7 md:gap-7">
        {features.map((item, index) => (
          <div
            key={index}
            className="w-1/2 md:w-[200px] flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center bg-[#f6e8ff] rounded-full w-48 h-48 md:w-48 md:h-48 mb-6">
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-20 md:w-32 md:h-32 object-contain"
              />
            </div>

            <p className="text-lg md:text-2xl font-medium flex items-center justify-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
