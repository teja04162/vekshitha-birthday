import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800); // Give it a moment at 100%
                    return 100;
                }
                return prev + 2;
            });
        }, 40);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFD1DC]"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="mb-8 flex justify-center text-rose-500 drop-shadow-lg"
                >
                    <Heart size={64} fill="currentColor" />
                </motion.div>

                <h2 className="font-heading text-3xl md:text-5xl text-gray-800 mb-6 font-bold tracking-wide">
                    Preparing Magic...
                </h2>

                <div className="w-64 h-2 bg-white/50 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        className="h-full bg-rose-400 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>
                <p className="mt-4 font-accent text-2xl text-rose-600">{progress}%</p>
            </motion.div>
        </motion.div>
    );
}
