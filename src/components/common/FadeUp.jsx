import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function FadeUp({ children, delay = 0, distance = 40, id }) {
  const isMobile = useMobileCheck();

  if (isMobile) {
    return <div id={id}>{children}</div>;
  }

  return (
    <motion.div
      id={id}
      initial={{ 
        opacity: 0, 
        y: distance, 
        scale: 0.98
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1
      }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -50px 0px" }}
      transition={{ 
        duration: 0.9, 
        delay: delay / 1000,
        ease: [0.32, 0.72, 0, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
