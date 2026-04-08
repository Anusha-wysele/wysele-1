import { motion } from "framer-motion";

export default function FadeUp({ children, delay = 0, distance = 40, id }) {
  return (
    <motion.div
      id={id}
      initial={{ 
        opacity: 0, 
        y: distance, 
        scale: 0.98,
        filter: "blur(8px)" 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)" 
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
