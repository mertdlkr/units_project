import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './styles/buttons.css';  // Import the CSS file
import MahkumlarPage from './pages/MahkumlarPage';
import HakkimizdaPage from './pages/HakkimizdaPage';  // Import ekleyelim
import logo from './assets/logo.png'; // Logo import

function App() {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const collectedAmount = 125 + 250 + 125 + 175 + 200; // Tüm mahkumların toplanan paraları

  useEffect(() => {
    const duration = 2000; // 2 saniye sürecek
    const steps = 60; // Kaç adımda artacak
    const stepValue = collectedAmount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayedAmount(Math.min(stepValue * currentStep, collectedAmount));
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [collectedAmount]);

  return (
    <Router>
      <div style={{ 
        height: '99.5vh',  // 98vh'den 99.5vh'ye çıkardım
        backgroundColor: '#0a192f',
        color: '#64ffda',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'fixed',
        width: '100%',
        top: '0',
        left: '0'
      }}>
        <header style={{
          width: '100%',
          height: '80px',
          backgroundColor: 'rgba(10, 25, 47, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 30px',
          boxShadow: '0 2px 20px rgba(100, 255, 218, 0.1)'
        }}>
          <Link to="/" style={{
            color: '#64ffda',
            textDecoration: 'none',
            position: 'absolute',
            left: '30px',  // Sol boşluğu azalttım (50px'ten 30px'e)
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FontAwesomeIcon icon={faMoneyBill} style={{ 
              fontSize: '20px',
              filter: 'drop-shadow(0 0 5px rgba(100, 255, 218, 0.5))'
            }} />
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
            }}>
              SecondChance
            </h1>
          </Link>
          <nav style={{
            display: 'flex',
            gap: '20px'
          }}>
            <Link to="/mahkumlar" className="nav-button">
              Mahkum Listesi
            </Link>
            <Link to="/hakkimizda" className="nav-button">
              Hakkımızda
            </Link>
          </nav>
        </header>
        
        <div style={{ 
          flex: 1,
          backgroundColor: '#0a192f',
          overflow: 'hidden'
        }}>
          <Routes>
            <Route path="/" element={
              <div className="landing-container" style={{
                height: 'calc(100vh - 80px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 200px'
              }}>
                <Link to="/mahkumlar">
                  <button className="cyber-button" style={{
                    padding: '25px 50px',
                    fontSize: '24px',
                    letterSpacing: '1px'
                  }}>
                    Bağış Yap
                  </button>
                </Link>
                <div style={{
                  textAlign: 'center',
                  position: 'relative',
                  padding: '30px'
                }}>
                  {/* Arka plan şekli */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-5deg)',
                    width: '120%',
                    height: '140%',
                    backgroundColor: 'rgba(100, 255, 218, 0.07)',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    zIndex: 0,
                    boxShadow: '0 0 40px rgba(100, 255, 218, 0.15), inset 0 0 30px rgba(100, 255, 218, 0.1)',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                    backdropFilter: 'blur(5px)',
                    animation: 'pulseGlow 3s infinite alternate'
                  }} />
                  
                  {/* İçerik */}
                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                  }}>
                    <img 
                      src={logo} 
                      alt="Logo" 
                      style={{
                        height: '60px',
                        width: 'auto',
                        filter: 'drop-shadow(0 0 8px rgba(100, 255, 218, 0.5))',
                        marginBottom: '10px'
                      }}
                    />
                    <h2 style={{
                      color: '#64ffda',
                      fontSize: '24px',
                      marginBottom: '5px',
                      textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
                    }}>
                      Toplam Toplanan Para
                    </h2>
                    <div style={{
                      fontSize: '42px',
                      fontWeight: 'bold',
                      color: '#64ffda',
                      textShadow: '0 0 20px rgba(100, 255, 218, 0.5)'
                    }}>
                      ${Math.floor(displayedAmount)}
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/mahkumlar" element={<MahkumlarPage />} />
            <Route path="/hakkimizda" element={<HakkimizdaPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
