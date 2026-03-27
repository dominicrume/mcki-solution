import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Chatbot } from './components/Chatbot';

// Pages
import { Home } from './pages/Home';
import { UKStudent } from './pages/UKStudent';
import { International } from './pages/International';
import { IntakeForm } from './pages/IntakeForm';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';
import { Eligibility } from './pages/Eligibility';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-mcki-text">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uk" element={<UKStudent />} />
            <Route path="/international" element={<International />} />
            <Route path="/apply" element={<IntakeForm />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/eligibility" element={<Eligibility />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
        <StickyMobileCTA />
      </div>
    </Router>
  );
};

export default App;