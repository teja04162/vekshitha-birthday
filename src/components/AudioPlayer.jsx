import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { siteData } from '../data';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(() => {
        const a = new Audio(siteData.backgroundMusicSrc);
        a.loop = true;
        return a;
    });

    useEffect(() => {
        return () => {
            audio.pause();
        };
    }, [audio]);

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={togglePlay}
            className="fixed bottom-6 right-6 z-40 p-4 bg-white/50 backdrop-blur-md rounded-full shadow-lg border border-white/40 text-rose-500 hover:bg-white/80 hover:scale-110 transition-all duration-300"
            aria-label="Toggle Music"
        >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
    );
}
