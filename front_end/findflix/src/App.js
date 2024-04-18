import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Homepage/Header.js';
import MainContent from './components/Homepage/MainContent.js';
import Footer from './components/Homepage/Footer.js';

function App() {
  return (
    <div>
        <Header />
        <MainContent />
        <Footer />
    </div>
  );
}

export default App;
