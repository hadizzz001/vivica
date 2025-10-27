'use client';

import { useEffect, useState } from 'react';
import { myFont } from '../app/fonts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function OurStory() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('https://vivica-dash.netlify.app/api/blog');
      const data = await res.json();
      setProjects(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mt-20">
      <div className="text-center mb-12">
        <h1 className={`${myFont.className} myparhal2 mb-10`}>Our Blogs</h1>
      </div>

      {projects.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id || index}>
              <a href={`/blog?id=${project.id}`}>
                <div className="flex flex-col cursor-pointer">
                  <img
                    src={project.img?.[0] || '/fallback.jpg'}
                    alt={project.title}
                    className="w-full h-[250px] md:h-[300px] object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="mt-3 text-center">
                    {project.author && (
                      <p className="text-sm text-gray-500">{project.author}</p>
                    )}
                    <h2 className="text-lg md:text-xl font-semibold mt-1">
                      {project.title
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h2>
                    {project.date && (
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(project.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    )}

                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">Loading services...</p>
      )}

      <div className="flex justify-center mt-10">
        <a href={`/blogs`}>
          <button
            className="text-xl md:text-2xl bg-transparent text-black mybbborder border-black px-7 py-3
                 uppercase transition-colors duration-200"
          >
            <span className="inline-flex items-center gap-2">View more</span>
          </button>
        </a>
      </div>
    </section>
  );
}
