import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HEADING_TEXT = "Driving Modern Enterprises with Intelligent Transformation . . .";

function TypewriterText({ text, speed = 40, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [started, text, speed, delay]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <span ref={ref}>
      {displayed}
      <span style={{
        borderRight: `2px solid ${showCursor ? 'rgba(0,0,0,0.7)' : 'transparent'}`,
        marginLeft: '2px'
      }} />
    </span>
  );
}

export default function SapServicesIntro() {
  return (
    <section className="bg-white py-10 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-[1.5px] bg-[#C9184A]" />
          <span className="text-[11px] font-bold tracking-[0.3em] text-[#C9184A] uppercase">
            Our Approach
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
              <TypewriterText text={HEADING_TEXT} speed={40} delay={400} />
            </h2>
          </div>

          {/* Right: Body Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 -mt-8"
          >
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
              In today's fast-paced business landscape, organizations are under constant pressure to deliver higher value in less time. Embracing a cloud-first approach, combined with a strong commitment to innovation, enables businesses to scale efficiently and stay competitive with the support of a dependable technology partner.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-light">
              At Wysele, we empower organizations with a complete range of SAP services, including consulting, implementation, and application management, tailored to support seamless digital transformation. With a strategic focus on{' '}
              <span className="text-gray-900 font-semibold">RISE with SAP</span>, Wysele helps mid-to-large enterprises modernize their operations, enhance agility, and build a future-ready digital foundation for sustainable growth.
            </p>

            {/* Decorative Divider */}
            <div className="w-12 h-[2px] bg-[#C9184A] mt-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

