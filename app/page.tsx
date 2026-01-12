import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import QuoteMaskSection from './components/QuoteMasksection'

import PortfolioPage from './components/Professinalexpersine'
import ProfessionalExperience from './components/Professinalexpersine'
import TechStack from './components/TechStack'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import CTASection from './components/Cta'


const App = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <QuoteMaskSection />
      <AboutSection/>
      <ProfessionalExperience/>
      <TechStack/>
      <CTASection/>
      <ContactSection/>
    </div>
  )
}

export default App