import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Admissions from './pages/Admissions'
import Academics from './pages/Academics'
import Infrastructure from './pages/Infrastructure'
import Gallery from './pages/Gallery'
import Announcement from './pages/Announcement'
import Transport from './pages/Transport'
import Achievements from './pages/Achievements'
import MandatoryDisclosure from './pages/MandatoryDisclosure'
import Contact from './pages/Contact'
import Enquiry from './pages/Enquiry'
import PrivacyPolicy from './pages/PrivacyPolicy'

function AppContent() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div
      className={`
        min-h-screen
        flex
        flex-col
        ${isHome ? 'home-page' : 'inner-page'}
      `}
    >
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/infrastructure" element={<Infrastructure />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/announcements" element={<Announcement />} />

          <Route path="/transport" element={<Transport />} />
          <Route path="/achievements" element={<Achievements />} />

          <Route
            path="/mandatory-disclosure"
            element={<MandatoryDisclosure />}
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}