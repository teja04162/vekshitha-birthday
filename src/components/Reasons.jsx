import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Sparkles, Star } from 'lucide-react';
import { siteData } from '../data';

// Map icon strings to actual components
const iconMap = {
    Heart: Heart,
    Smile: Smile,
    Sparkles: Sparkles,
    Star: Star
};

export default function Reasons() {
    return (
        <section className="relative min-h-screen py-24 px-6 md:px-12 z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-4">
                    Why You Are Special
                </h2>
                <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {siteData.reasons.map((reason, index) => {
                    const IconComponent = iconMap[reason.icon] || Heart;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.4 }}
                            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
                            className="glass p-8 rounded-2xl group hover:bg-white/60 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Animated background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-200/40 to-purple-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />

                            <div className="flex items-start gap-6 relative z-10">
                                <motion.div
                                    whileHover={{ rotate: 15, scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center text-white shadow-xl"
                                >
                                    <IconComponent size={32} />
                                </motion.div>
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                                        {reason.title}
                                    </h3>
                                    <p className="font-body text-gray-700 leading-relaxed">
                                        {reason.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
