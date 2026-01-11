import React, { useState } from 'react';
import './App.css';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList'; // Make sure this is imported

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="content">
            <h1>Paradise Nursery</h1>
            <p>Bring the Beauty of Nature Indoors</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="about-section">
            <AboutUs />
          </div>
        </div>
      ) : (
        /* This replaces the <div> you are currently seeing */
        <ProductList /> 
      )}
    </div>
  );
}

export default App;