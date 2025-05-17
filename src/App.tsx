import Header from './components/Header'
import HomeSection from './sections/HomeSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import EducationSection from "./sections/EducationSection.tsx";
import ExperienceSection from "./sections/ExperienceSection.tsx";
import SkillsSection from "./sections/SkillsSection.tsx";

export default function App() {
    return (
        <>
            <Header />
            <main className="scroll-smooth">
                <HomeSection />
                <AboutSection />
                <EducationSection />
                <ExperienceSection />
                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    )
}