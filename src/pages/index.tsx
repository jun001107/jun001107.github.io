import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
    const subtitles = ['AI & ML Enthusiast', 'Software Developer', 'Web Developer'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % subtitles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (

        <section className="max-w-3xl mx-auto px-4 py-16">
            {/* Badge */}
            <p className="inline-block bg-green-950 text-green-300 text-sm font-medium px-3 py-1 rounded-full">
                Welcome to my portfolio
            </p>

            {/* Main Heading */}
            <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-white">
                Hi, I&apos;m{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Junghoon (Alex) Cho
                </span>
            </h1>

            {/* Subtitle */}
            <div className="mt-2 h-8 overflow-hidden relative">
                <div
                    className="absolute top-0 left-0 transition-transform duration-400"
                    style={{ transform: `translateY(-${(currentIndex * 100) / subtitles.length}%)` }}
                >
                    {subtitles.map((sub, idx) => (
                        <h2 key={idx} className="text-2xl text-gray-300 h-8 flex items-center">
                            {sub}
                        </h2>
                    ))}
                </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-400 leading-relaxed">
                Passionate about building robust software in Python, Java, and C++, I specialize in machine learning with a focus on deep learning architectures.
                From convolutional networks for image tasks to sequence models for natural language, I love translating complex data into intelligent applications.
            </p>
        </section>

  )
}

export default Home