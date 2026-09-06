import Header from '@/app/components/Header'
import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Projects from '@/app/components/Projects'
import Services from '@/app/components/Services'
import Credentials from '@/app/components/Credentials'
import CTA from '@/app/components/CTA'
import Footer from '@/app/components/Footer'
import PortfolioContentLoader from '@/app/components/PortfolioContentLoader'

export default function Home() {
  return (
    <>
      <PortfolioContentLoader />
      <main data-portfolio-content className=''>
      <Header />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Credentials />
        <CTA />
        <Footer />
      </div>
      </main>
    </>
  )
}