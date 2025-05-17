import { useState, useEffect } from 'react';

export default function HomeSection() {
    const texts = ["Welcome to my website!", "I'm Alex (Junghoon)!"]
    const [displayText, setDisplayText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [textIndex, setTextIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[textIndex]
            if (isDeleting) {
                setDisplayText(fullText.substring(0, charIndex - 1))
                setCharIndex(charIndex - 1)
            } else {
                setDisplayText(fullText.substring(0, charIndex + 1))
                setCharIndex(charIndex + 1)
            }

            if (!isDeleting && charIndex + 1 === fullText.length) {
                setTimeout(() => setIsDeleting(true), 1000)
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false)
                setTextIndex((textIndex + 1) % texts.length)
            }
        }, isDeleting ? 50 : 100)

        return () => clearTimeout(timeout)
    }, [charIndex, isDeleting, textIndex])

    return (
        <section
            id="home"
            className="h-screen flex justify-center items-center gradient-bg"
        >
            <div className="p-0.5 border-2 border-white">
            <div className="p-2 border-2 border-white">
                <div className="p-14 bg-white/80 border-2 border-white text-center">
                    <h1 className="text-5xl mb-4">Hi there!</h1>
                    <p className="text-gray-700 h-8 tracking-wide">
                        {displayText}
                        <span className="blinking-cursor">|</span>
                    </p>
                </div>
            </div>
            </div>
        </section>
    )
}