import { Heart, Star, Sparkles, Smile, Sun, Music } from 'lucide-react';

export const siteData = {
    // Global settings
    name: "Vekshitha", // Her actual name
    birthdayDate: "2026-03-17T00:00:00", // March 17th
    backgroundMusicSrc: "/bg-music.mp3", // Place your audio file in the public folder and update this path

    // Hero Section
    hero: {
        title: "Happy Birthday,",
        subtitle: "To the most magical, wonderful sister in the world.",
        buttonText: "Open Your Surprise ✨",
    },

    // Interactive 3D Messages Carousel (Replaces Magical Words)
    preciousMoments: [
        { title: "A Forever Friend", message: "“A sister is God's way of proving he doesn't want us to walk alone.”", color: "from-rose-400 to-pink-500", icon: "Heart" },
        { title: "Pure Magic", message: "“There is no better friend than a sister. And there is no better sister than you.”", color: "from-purple-400 to-indigo-500", icon: "Sparkles" },
        { title: "My Confidante", message: "“A sister is a gift to the heart, a friend to the spirit, a golden thread to the meaning of life.”", color: "from-amber-300 to-orange-400", icon: "Star" },
        { title: "Unbreakable", message: "“We didn’t realize we were making memories, we just knew we were having fun.”", color: "from-teal-300 to-emerald-400", icon: "Feather" },
        { title: "My Inspiration", message: "“You are my sounding board, my confidante, my keeper of secrets, and my best friend.”", color: "from-fuchsia-400 to-pink-500", icon: "Sun" },
    ],

    // Heartfelt Letter
    letter: {
        greeting: "Dear Vekshitha,",
        paragraphs: [
            "On this special day, I wanted to do something unique just for you. Growing up with you has been the greatest adventure of my life.",
            "You bring so much light, joy, and warmth into the lives of everyone you meet. Your smile is contagious, and your heart is pure.",
            "Thank you for being my rock, my confidante, and my best friend. I love you more than words can say."
        ],
        closing: "With all my love, forever & always. ❤️"
    },

    // Reasons Why She Is Special
    reasons: [
        { title: "Your Heart of Gold", description: "You care for everyone with boundless empathy.", icon: 'Heart' },
        { title: "Your Radiant Smile", description: "It lights up even the darkest days.", icon: 'Smile' },
        { title: "Your Shiny Soul", description: "You bring magic wherever you go.", icon: 'Sparkles' },
        { title: "Your Bright Mind", description: "Smart, creative, and endlessly brilliant.", icon: 'Star' },
    ],

    // Timeline
    timeline: [
        { year: "The Beginning", event: "The day my world changed for the better when you arrived." },
        { year: "Childhood Days", event: "Countless games, innocent secrets, and infinite laughter we shared." },
        { year: "Teenage Years", event: "Navigating life's ups and downs together, knowing we always had each other's back." },
        { year: "Growing Up", event: "Facing challenges side by side, building a beautiful and unbreakable bond." },
        { year: "Precious Memories", event: "Every late-night talk, shared dream, and quiet moment of understanding we hold dear." },
        { year: "Today", event: "Celebrating the incredible, strong, and beautiful woman you have become." }
    ],

    // Wishes
    wishes: [
        "May your day be as beautiful, kind, and radiant as your soul.",
        "Wishing you endless happiness, peace, and unimagined success.",
        "May every single one of your wildest dreams come true this year.",
        "Keep shining your wonderful light; the world needs it.",
        "I hope this year brings you as much joy as you give to others.",
        "May you always find reasons to smile and courage to fly high."
    ],

    // Final Surprise
    final: {
        title: "One Last Thing...",
        buttonText: "Click for Magic 🪄",
        message: "I love you. Happy Birthday!"
    }
};
