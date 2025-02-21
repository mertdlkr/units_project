import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './styles/buttons.css';  // Import the CSS file
import MahkumlarPage from './pages/MahkumlarPage';
import HakkimizdaPage from './pages/HakkimizdaPage';  // Import ekleyelim
import logo from './assets/logo.png'; // Logo import
import { ethers } from 'ethers';
import { DonationProvider } from './context/DonationContext';

function App() {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const totalAmount = 6525;
  const [account, setAccount] = useState('');
  const [wavesAccount, setWavesAccount] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Link stili tanımı
  const linkStyle = {
    color: '#ccd6f6',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '16px',
    transition: 'color 0.3s',
    ':hover': {
      color: '#64ffda'
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(amount));
  };

  useEffect(() => {
    let startTime;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / 2000;

      if (progress < 1) {
        const speedFactor = Math.max(1, Math.log10(totalAmount) / 2);
        const easedProgress = 1 - Math.pow(1 - progress, speedFactor);
        setDisplayedAmount(totalAmount * easedProgress);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayedAmount(totalAmount);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [totalAmount]);

  // MetaMask bağlantı fonksiyonu
  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Hesap izni iste
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{
            eth_accounts: {}
          }]
        });
        
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsMenuOpen(false);
        }
      } else {
        alert('Lütfen MetaMask yükleyin!');
      }
    } catch (error) {
      console.error('MetaMask bağlantı hatası:', error);
      if (error.code === 4001) {
        alert('Bağlantı reddedildi. Lütfen MetaMask bağlantısını onaylayın.');
      } else {
        alert('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  // WavesKeeper bağlantı fonksiyonu
  const connectWavesKeeper = async () => {
    try {
      if (window.WavesKeeper) {
        const state = await window.WavesKeeper.initialPromise;
        const wavesState = await window.WavesKeeper.publicState();
        setWavesAccount(wavesState.account.address);
        setIsMenuOpen(false);
      } else {
        alert('Lütfen WavesKeeper uzantısını yükleyin!');
      }
    } catch (error) {
      console.error('WavesKeeper bağlantı hatası:', error);
      alert('WavesKeeper bağlantı hatası oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Çıkış yapma fonksiyonu - düzeltildi
  const disconnectWallet = () => {
    // MetaMask çıkış
    setAccount('');

    // WavesKeeper çıkış
    if (window.WavesKeeper) {
      try {
        // WavesKeeper.initialPromise'i await ile kullanmak yerine kaldırdık
        setWavesAccount('');
      } catch (error) {
        console.error('WavesKeeper çıkış hatası:', error);
      }
    }

    // Menüyü kapat
    setIsMenuOpen(false);

    // Local storage'ı temizle
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('wavesConnected');
  };

  return (
    <DonationProvider>
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
            padding: '0 30px',
            boxShadow: '0 2px 20px rgba(100, 255, 218, 0.1)',
            position: 'relative'  // Relative position ekledim
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FontAwesomeIcon 
                icon={faMoneyBill} 
                style={{ 
                  fontSize: '24px',
                  filter: 'drop-shadow(0 0 5px rgba(100, 255, 218, 0.5))',
                  color: '#64ffda'
                }} 
              />
              <h1 style={{
                margin: 0,
                fontSize: '24px',
                color: '#64ffda',
                textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
              }}>
                SecondChance
              </h1>
            </div>

            <nav style={{
              marginLeft: '50px'
            }}>
              <Link to="/" style={linkStyle}>Ana Sayfa</Link>
              <Link to="/mahkumlar" style={linkStyle}>Mahkumlar</Link>
              <Link to="/hakkimizda" style={linkStyle}>Hakkımızda</Link>
            </nav>

            {/* Cüzdan Bağlantı Bölümü */}
            <div style={{
              position: 'absolute',
              right: '80px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}>
              {account || wavesAccount ? (
                <div style={{ position: 'relative' }}>
                  <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                      color: '#64ffda',
                      padding: '8px 15px',
                      border: '1px solid #64ffda',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    {account ? `ETH: ${account.slice(0, 6)}...${account.slice(-4)}` : ''}
                    {account && wavesAccount ? ' | ' : ''}
                    {wavesAccount ? `WAVES: ${wavesAccount.slice(0, 6)}...${wavesAccount.slice(-4)}` : ''}
                  </div>

                  {/* Bağlı Durumdaki Dropdown */}
                  {isMenuOpen && (
                    <>
                      <div
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 998
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        right: 0,
                        backgroundColor: '#112240',
                        border: '1px solid rgba(100, 255, 218, 0.2)',
                        borderRadius: '8px',
                        padding: '10px',
                        minWidth: '200px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        zIndex: 999
                      }}>
                        <button
                          onClick={disconnectWallet}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '12px 15px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#ff6b6b',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Çıkış Yap
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="cyber-button"
                    style={{
                      padding: '8px 15px',
                      fontSize: '14px'
                    }}
                  >
                    Giriş Yap
                  </button>

                  {/* Giriş Dropdown Menüsü */}
                  {isMenuOpen && (
                    <>
                      <div
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 998
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        right: 0,
                        backgroundColor: '#112240',
                        border: '1px solid rgba(100, 255, 218, 0.2)',
                        borderRadius: '8px',
                        padding: '10px',
                        minWidth: '200px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        zIndex: 999
                      }}>
                        {/* MetaMask Bağlantı Butonu */}
                        <button
                          onClick={connectMetaMask}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '12px 15px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#64ffda',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <img 
                            src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
                            alt="MetaMask"
                            style={{ width: '24px', height: '24px' }}
                          />
                          MetaMask ile Bağlan
                        </button>

                        {/* WavesKeeper Bağlantı Butonu */}
                        <button
                          onClick={connectWavesKeeper}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '12px 15px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#64ffda',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <img 
                            src="https://docs.waves.tech/img/logo.svg"
                            alt="WavesKeeper"
                            style={{ width: '24px', height: '24px' }}
                          />
                          WavesKeeper ile Bağlan
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
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
                    padding: '40px'
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
                      gap: '25px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '15px'
                      }}>
                        <FontAwesomeIcon 
                          icon={faMoneyBill} 
                          style={{ 
                            fontSize: '32px',
                            filter: 'drop-shadow(0 0 5px rgba(100, 255, 218, 0.5))',
                            color: '#64ffda'
                          }} 
                        />
                        <h1 style={{
                          margin: 0,
                          fontSize: '36px',
                          color: '#64ffda',
                          textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
                        }}>
                          SecondChance
                        </h1>
                      </div>
                      <h2 style={{
                        color: '#64ffda',
                        fontSize: '28px',
                        marginBottom: '10px',
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
                        ${formatAmount(displayedAmount)}
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
    </DonationProvider>
  );
}

export default App;
