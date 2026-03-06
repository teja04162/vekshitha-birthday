import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star, Moon, Sun, Feather, Quote } from 'lucide-react';
import { siteData } from '../data';

const icons = { Heart, Sparkles, Star, Moon, Sun, Feather };

export default function PreciousMoments() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const cards = siteData.preciousMoments || [];

    if (cards.length === 0) return null;

    const nextStep = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1 === cards.length ? 0 : prev + 1));
    };

    const prevStep = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 < 0 ? cards.length - 1 : prev - 1));
    };

    const variants = {
        initial: (direction) => ({
            x: direction > 0 ? 400 : -400,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45,
            filter: "blur(10px)",
        }),
        animate: {
            zIndex: 10,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                rotateY: { type: "spring", stiffness: 200, damping: 20 },
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 400 : -400,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45,
            filter: "blur(10px)",
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        })
    };

    return (
        <section id="moments" className="relative min-h-screen py-24 px-6 z-10 overflow-hidden flex flex-col items-center justify-center pointer-events-auto">

            {/* Dynamic Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-purple-300/20 rounded-full blur-[120px] -z-10 mix-blend-overlay animate-pulse-slow" />
            <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-rose-300/20 rounded-full blur-[100px] -z-10 mix-blend-overlay" />

            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16 z-30"
            >
                <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-rose-500 animate-gradient-x drop-shadow-sm mb-4">
                    Precious Moments
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full shadow-lg shadow-rose-400/50" />
            </motion.div>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-5xl h-[500px] md:h-[600px] flex items-center justify-center perspective-[1200px]">

                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute w-full max-w-sm md:max-w-2xl h-full flex items-center justify-center transform-style-3d cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -10000) {
                                nextStep();
                            } else if (swipe > 10000) {
                                prevStep();
                            }
                        }}
                    >
                        {/* The Premium Glass Card */}
                        <div className={`relative w-full h-[400px] md:h-[500px] p-8 md:p-14 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] shadow-2xl flex flex-col justify-center items-center text-center overflow-hidden transition-all duration-500 hover:shadow-3xl group mx-4`}>

                            {/* Inner Gradient Lighting */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cards[index].color} opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />

                            {/* Floating Quote Icon */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-8 left-8 text-rose-300 opacity-50"
                            >
                                <Quote size={48} />
                            </motion.div>

                            {/* Icon Renderer */}
                            {(() => {
                                const IconComp = icons[cards[index].icon] || Heart;
                                return (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${cards[index].color} flex items-center justify-center text-white mb-8 shadow-xl`}
                                    >
                                        <IconComp size={40} />
                                    </motion.div>
                                );
                            })()}

                            <h3 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">
                                {cards[index].title}
                            </h3>

                            <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full mb-6 opacity-50" />

                            <p className="font-body text-xl md:text-3xl lg:text-4xl text-gray-700 italic leading-snug drop-shadow-sm font-medium z-10 px-4">
                                {cards[index].message}
                            </p>

                            {/* Shimmer overlay class we created previously */}
                            <div className="shimmer-effect" />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full flex justify-between z-40 px-2 md:px-10 pointer-events-none">
                    <button
                        onClick={prevStep}
                        className="pointer-events-auto p-4 md:p-5 rounded-full glass bg-white/60 hover:bg-white/90 text-rose-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={nextStep}
                        className="pointer-events-auto p-4 md:p-5 rounded-full glass bg-white/60 hover:bg-white/90 text-rose-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-3 mt-12 z-30">
                {cards.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > index ? 1 : -1);
                            setIndex(i);
                        }}
                        className={`transition-all duration-500 rounded-full ${i === index ? 'w-10 h-3 bg-gradient-to-r from-rose-400 to-purple-400 shadow-md' : 'w-3 h-3 bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>

        </section>
    );
}
