import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
    const pageVariants = {
        initial: {
            x: "100%",
        },
        animate: {
            x: 0,
        },
        exit: {
            x: "-100%",
        },
    };

    const pageTransition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="bg-white dark:bg-[#1d1d1f]"
            style={{ minHeight: "100vh", width: "100%" }}
            >
            {children}
        </motion.div>
  );
};

export default PageTransition;
