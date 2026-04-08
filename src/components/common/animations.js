// Comprehensive animation variants matching reference site

// 1. Fade + Slide Up (Most common)
export const fadeSlideUp = {
  hidden: { 
    opacity: 0, 
    y: 80,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 2. Fade + Scale (For images)
export const fadeScale = {
  hidden: { 
    opacity: 0, 
    scale: 1.15,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.4, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 3. Blur to Focus (Premium effect)
export const blurFocus = {
  hidden: { 
    opacity: 0, 
    y: 60,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 4. Slide from Left
export const slideLeft = {
  hidden: { 
    opacity: 0, 
    x: -100,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 5. Slide from Right
export const slideRight = {
  hidden: { 
    opacity: 0, 
    x: 100,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 6. Reveal with Mask (Curtain effect)
export const maskReveal = {
  hidden: { 
    clipPath: "inset(0 0 100% 0)"
  },
  visible: { 
    clipPath: "inset(0 0 0% 0)",
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 7. Container with Stagger
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

// 8. Fast Stagger (for lists)
export const fastStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    }
  }
};

// 9. Rotate + Fade (for cards)
export const rotateFade = {
  hidden: { 
    opacity: 0, 
    rotateX: -15,
    y: 50
  },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    y: 0,
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 10. Image Reveal (Scale + Clip)
export const imageReveal = {
  hidden: { 
    scale: 1.2,
    clipPath: "inset(10% 10% 10% 10%)"
  },
  visible: { 
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { 
      duration: 1.4, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 11. Line Draw (for underlines)
export const lineDraw = {
  hidden: { 
    width: 0,
    opacity: 0
  },
  visible: { 
    width: "100%",
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3
    }
  }
};

// 12. Parallax variants (use with scroll)
export const parallaxSlow = {
  hidden: { y: 0 },
  visible: { 
    y: -50,
    transition: { 
      duration: 0.5, 
      ease: "linear"
    }
  }
};

export const parallaxFast = {
  hidden: { y: 0 },
  visible: { 
    y: -100,
    transition: { 
      duration: 0.5, 
      ease: "linear"
    }
  }
};

// Viewport settings for different trigger points
export const viewportSettings = {
  once: true,
  amount: 0.2, // Trigger when 20% visible
  margin: "0px 0px -100px 0px" // Trigger slightly before entering viewport
};

export const viewportEarly = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -200px 0px"
};

export const viewportLate = {
  once: true,
  amount: 0.4,
  margin: "0px 0px 0px 0px"
};
