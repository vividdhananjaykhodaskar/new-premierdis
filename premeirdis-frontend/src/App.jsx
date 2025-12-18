import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../src/Components/NavBar/Header';
import Hero from '../src/Components/Home/Hero';
import WhatWeDoPage from '../src/Components/WhatWeDo/WhatWeDoPage';
import Features from '../src/Components/Features/Features';
import ContactUs from '../src/Components/ContactUs/ContactUsForm';
import Footer from '../src/Components/Footer/Footer';


function App() {
  return (
    <Router>
      <Header />
      <div className="smooth-scroll">
        <Routes>
          <Route
            path='/'
            element={(
              <>
                <Hero />
                <WhatWeDoPage />
                <Features />
                <ContactUs />
                <Footer />
              </>
            )}
          />
          <Route path='/what-we-do' element={<WhatWeDoPage />} />
          <Route path='/features' element={<Features />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/footer' element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
