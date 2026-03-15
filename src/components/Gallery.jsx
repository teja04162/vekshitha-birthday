import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

const galleryImages = [
    { id: 1, src: '/gallery/1.jpeg', title: 'That Beautiful Smile', desc: 'The moment my heart melted.', span: 'col-span-1 md:col-span-2 row-span-2', delay: 0.1 },
    { id: 2, src: '/gallery/2.jpeg', title: 'Cherished Memories', desc: 'Days I wish I could live twice.', span: 'col-span-1 row-span-1', delay: 0.2 },
    { id: 3, src: '/gallery/3.jpeg', title: 'Forever Special', desc: 'You light up every room.', span: 'col-span-1 row-span-1', delay: 0.3 },
    { id: 4, src: '/gallery/4.jpeg', title: 'Radiant & Perfect', desc: 'Just being yourself.', span: 'col-span-1 row-span-2 md:col-span-2 md:row-span-1', delay: 0.4 },
    { id: 5, src: '/gallery/5.jpeg', title: 'Lovely Moments', desc: 'Through thick and thin.', span: 'col-span-1 md:col-span-1 row-span-1', delay: 0.5 }
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="gallery" className="w-full py-24 px-6 sm:px-12 bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
            {/* Emotional floating background elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-rose-300 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4 text-rose-500"
                    >
                        <Heart size={40} className="fill-rose-500 animate-pulse" />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 tracking-tight mb-6 font-serif">
                        Captured Moments
                    </h2>
                    <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed italic">
                        "We don't remember days, we remember moments."
                        <br />
                        Here are a few of the ones I cherish the most.
                    </p>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 mx-auto mt-8 rounded-full opacity-70"></div>
                </motion.div>

                {/* Masonry/Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[280px]">
                    {galleryImages.map((image) => (
                        <motion.div
                            key={image.id}
                            layoutId={`gallery-card-${image.id}`}
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: image.delay, type: "spring", bounce: 0.3 }}
                            onClick={() => setSelectedImage(image)}
                            className={`relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-md p-2 cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(225,29,72,0.15)] transition-all duration-500 border border-white/50 ${image.span}`}
                        >
                            <div className="w-full h-full relative overflow-hidden rounded-2xl bg-gray-900 flex items-center justify-center">
                                {/* Beautiful blurred background to fill empty space */}
                                <img src={image.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-xl scale-110" />

                                {/* Decorative inner border */}
                                <div className="absolute inset-2 border border-white/40 rounded-xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* The actual full image */}
                                <motion.img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-contain z-10 relative drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />

                                {/* Elegant overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                {/* Content Reveal on Hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end h-full z-20 overflow-hidden">
                                    <motion.div
                                        initial={{ y: 40, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100"
                                    >
                                        <h3 className="text-white font-bold text-xl sm:text-2xl mb-1 drop-shadow-lg">
                                            {image.title}
                                        </h3>
                                        <p className="text-rose-100/90 font-medium text-sm sm:text-base line-clamp-2 italic shadow-black drop-shadow-md">
                                            {image.desc}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Expanded Lightbox View */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-rose-500 hover:text-white rounded-full p-3 backdrop-blur-md transition-all duration-300 z-50 shadow-xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={28} />
                        </motion.button>

                        <motion.div
                            layoutId={`gallery-card-${selectedImage.id}`}
                            className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-gray-950 border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Blurred backdrop for the lightbox */}
                            <img src={selectedImage.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-2xl scale-110" />

                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="relative z-10 w-full object-contain max-h-[85vh] drop-shadow-2xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
                            >
                                <div className="max-w-3xl">
                                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-100 text-3xl sm:text-4xl font-bold mb-3 font-serif">
                                        {selectedImage.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg sm:text-xl font-medium italic">
                                        {selectedImage.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
