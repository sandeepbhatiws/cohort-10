import React from 'react'
import Header from './Header'
import AboutUs from './AboutUs'
import Services from './Services'
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions'
import Footer from './Footer'

export default function HomePage() {
  return (
    <>
      <Header/>
      <AboutUs/>
      <Services/>
      <FrequentlyAskedQuestions/>
      <Footer/>
    </>
  )
}
