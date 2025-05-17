export default function ContactSection() {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
            <p className="text-center text-gray-600 mb-6">
                Feel free to <a href="mailto:jun.cho00117@gmail.com" className="text-blue-600">email me</a>.
            </p>
            <div className="flex justify-center gap-4">
                <a href="https://github.com/jun001107" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="https://linkedin.com/in/junghooncho117/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
            </div>
        </section>
    )
}