import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { teamMembers } from "../../common/data";
import HeadingBracket from "../../common/HeadingBracket";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const DribbbleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
);

const socialIcons = [
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <LinkedInIcon />, label: "LinkedIn" },
  { icon: <TwitterIcon />, label: "Twitter" },
  { icon: <DribbbleIcon />, label: "Dribbble" },
];

const TRANSITION = { duration: 0.35, ease: "easeInOut" };

function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUpVariants}
      className="w-full relative cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)} // Toggle for mobile touch
    >
      <div className="flex flex-col h-full bg-transparent">

        {/* Image */}
        <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#f3f4f6]">
          <motion.img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover object-center"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Dark Info Box */}
        <div
          className="bg-[#353a40] w-full relative overflow-hidden"
          style={{ minHeight: "100px" }}
        >
          {/* Inner Border */}
          <div className="absolute inset-[6px] border border-gray-400/30 pointer-events-none z-20" />

          {/* TEXT — fades out on hover */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={TRANSITION}
          >
            <h3 style={{
              color: "#C4A478",
              fontFamily: "Lora, Georgia, serif",
              fontSize: "1rem",
              fontWeight: 400,
              marginBottom: "4px",
              letterSpacing: "0.5px"
            }}>
              {member.name}
            </h3>
            <p style={{
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.5px"
            }}>
              {member.role}
            </p>
          </motion.div>

          {/* SOCIAL ICONS — fades in on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-3 px-4"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={TRANSITION}
          >
            {socialIcons.map((social, i) => (
              <motion.button
                key={social.label}
                aria-label={social.label}
                className="flex items-center justify-center text-[#C4A478] hover:text-white hover:bg-[#C4A478] transition-colors duration-200"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid rgba(196,164,120,0.45)",
                  background: "transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
                animate={{
                  opacity: hovered ? 1 : 0,
                  y: hovered ? 0 : 6,
                }}
                transition={{
                  duration: 0.3,
                  delay: hovered ? i * 0.07 : 0,
                  ease: "easeOut",
                }}
              >
                {social.icon}
              </motion.button>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}

export default function MeetOurPeople() {
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <section className="py-8 md:py-10 px-6 lg:px-12 overflow-hidden flex flex-col justify-center bg-white">
      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-10 md:mb-12"
        >
          <motion.div
            variants={fadeUpVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "12px" : "18px",
              width: "100%",
              marginBottom: "16px"
            }}
          >
            <HeadingBracket size={isMobile ? 36 : 48} style={{ transform: isMobile ? "translate(24px, -12px)" : "translate(40px, -20px)" }} />
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-inter font-medium text-[#111] tracking-tight"
              style={{ margin: 0 }}
            >
              Meet Our People
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUpVariants}
            className="text-gray-500 text-sm md:text-base max-w-2xl"
          >
            Our dedicated team of professionals committed to delivering excellence and innovation in every project we undertake.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {teamMembers.map((member, idx) => (
            <TeamCard key={idx} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}