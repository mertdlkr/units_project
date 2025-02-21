import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './styles/buttons.css';  // Import the CSS file
import MahkumlarPage from './pages/MahkumlarPage';
import HakkimizdaPage from './pages/HakkimizdaPage';  // Import ekleyelim
import logo from './assets/logo.png'; // Logo import
import { DonationProvider } from './context/DonationContext';
import Home from './pages/HomePage';
import { ethers } from 'ethers';

const UNIT0_TESTNET = {
  chainId: '88817',
  chainName: 'UNIT0 Testnet',
  nativeCurrency: {
    name: 'UNIT0',
    symbol: 'UNIT0',
    decimals: 18
  },
  rpcUrls: ['https://rpc-testnet.unit0.dev'],
  blockExplorerUrls: ['https://testnet.unit0.dev']
};

function App() {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const totalAmount = 6525;
  const [account, setAccount] = useState(null);
  const [wavesAccount, setWavesAccount] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [userAddress, setUserAddress] = useState("");
  const [signer, setSigner] = useState("");

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

  // MetaMask hesap değişikliğini dinle
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });
    }
  }, []);

  // Basit MetaMask bağlantı fonksiyonu
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // MetaMask hesap bağlantısı
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        // İmza için provider ve signer oluştur
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // İmza mesajı
        const message = "Mahkum Bağış Platformu'na hoş geldiniz! Bu imza ile platformumuza bağlanmayı onaylıyorsunuz.";
        
        try {
          // İmza iste
          const signature = await signer.signMessage(message);
          console.log("İmza başarılı:", signature);
          
          // İmza başarılıysa hesabı kaydet
          setAccount(accounts[0]);
        } catch (signError) {
          console.error("İmza hatası:", signError);
          alert("Bağlantı için lütfen mesajı imzalayın.");
          setAccount(null);
        }

      } catch (error) {
        console.error('Bağlantı hatası:', error);
        alert('MetaMask bağlantısında bir hata oluştu.');
      }
    } else {
      alert('Lütfen MetaMask yükleyin!');
    }
  };

  // Çıkış yapma fonksiyonu - düzeltildi
  const disconnectWallet = () => {
    // MetaMask çıkış
    setAccount(null);

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
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #64ffda',
                    color: '#64ffda',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {account || wavesAccount ? 'Bağlı' : 'Giriş Yap'}
                </button>

                {isMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '10px',
                    backgroundColor: '#112240',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                    borderRadius: '4px',
                    padding: '10px',
                    minWidth: '200px',
                    zIndex: 1000,
                    boxShadow: '0 10px 30px -10px rgba(2,12,27,0.7)'
                  }}>
                    {account || wavesAccount ? (
                      <button
                        onClick={disconnectWallet}
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#64ffda',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        Çıkış Yap
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={connectMetaMask}
                          style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#64ffda',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                            alt="MetaMask"
                            style={{ width: '20px', height: '20px' }}
                          />
                          MetaMask ile Bağlan
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
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
