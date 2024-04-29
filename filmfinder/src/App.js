import './App.css';
import Footer from './components/Footer/Footer.js'
import Header from './components/Header/Header.js';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage.js';
import FormPage from './components/Form_Page/Formpage.js';
import PopularResultsPage from './components/Popular Results/Results.js';
import AboutPage from './components/About_Page/About.js';
import Randompage from './components/Random Movie/Random.js';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/form" element={<FormPage/>} />
        <Route path="/popular" element={<PopularResultsPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/random" element={<Randompage/>} />
      </Routes>
    <Footer/>
    </BrowserRouter>

  );
}

export default App;
