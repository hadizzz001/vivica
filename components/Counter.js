'use client';

import { useEffect, useState, useRef } from 'react';

export default function EventCounter() {
  const [data, setData] = useState([]);       // <-- will store API data
  const [counts, setCounts] = useState([]);   // <-- counter integers
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  // ✅ Fetch data from the API
  const fetchCounterData = async () => {
    try {
      const res = await fetch("https://vivica-dash.netlify.app/api/counter");
      const json = await res.json();

      // format counts to start from zero
      setData(json);
      setCounts(json.map(() => 0));
    } catch (error) {
      console.error("Error fetching counter data:", error);
    }
  };

  useEffect(() => {
    fetchCounterData();
  }, []);

  // ✅ Starts animation when section appears on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasStarted) {
          startCounting();
          setHasStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted, data]);

  const startCounting = () => {
    const duration = 1000;
    const frameRate = 30;
    const totalFrames = Math.round((duration / 1000) * frameRate);

    data.forEach((item, index) => {
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const value = Math.floor(parseInt(item.num) * progress);

        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = value;
          return newCounts;
        });

        if (frame >= totalFrames) clearInterval(interval);
      }, duration / totalFrames);
    });
  };

  return (
    <div
      ref={sectionRef}
      className="flex flex-wrap md:flex-nowrap justify-center my-20 gap-7 md:gap-7"
    >
      {data.map((item, index) => (
        <div
          key={item.id}
          className="w-1/2 md:w-[200px] flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center bg-[#f6e8ff] rounded-full w-48 h-48 md:w-48 md:h-48 mb-6">
            <img
              src={item.img[0]}
              alt={item.title}
              className="w-20 h-20 md:w-32 md:h-32 object-contain"
            />
          </div>

          <h3 className="text-4xl md:text-6xl font-bold leading-none">
            {counts[index]}+
          </h3>

          <p className="text-lg md:text-2xl font-medium flex items-center justify-center">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}
