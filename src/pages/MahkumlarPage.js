import React, { useState, useEffect } from 'react';
import '../styles/buttons.css';
import mahkum1Foto from '../assets/mahkum1Foto.png';
import mahkum2Foto from '../assets/mahkum2Foto.png';
import mahkum3Foto from '../assets/mahkum3Foto.png';
import mahkum4Foto from '../assets/mahkum4Foto.png';
import mahkum5Foto from '../assets/mahkum5Foto.png';
import { useDonation } from '../context/DonationContext';
import { ethers } from 'ethers';

const MahkumlarPage = () => {
  const { mahkumlarDonations, updateDonation } = useDonation();
  const [selectedMahkum, setSelectedMahkum] = useState(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [wavesAmount, setWavesAmount] = useState('');
  const [wavesBalance, setWavesBalance] = useState('0');
  const [isProcessing, setIsProcessing] = useState(false);
  const WAVES_PRICE = 0.50; // 1 UNIT0 = 0.50 USDT
  const DONATION_ADDRESS = "0x5B121c3E0ED268c6aFe0f8E7b3bdDE5375086DB2"; // Bağış adresini buraya girin

  const mahkumlar = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      image: mahkum1Foto,
      description: "Kader Mahkumu - Dolandırıcılık suçundan 3 yıl hapis cezası",
      detailedDescription: "Kader mahkumu Ahmet Yılmaz, 2021 yılında işlediği dolandırıcılık suçundan dolayı 3 yıl hapis cezasına çarptırıldı. Ailesini geçindirmek için yanlış bir karar verdiğini ve pişman olduğunu belirtiyor. Eski Meslek: Boyacı",
      amount: 5500,
      targetAmount: 10000,
      uyumSkoru: 85,
      performansSkoru: 90,
      yorumlar: [
        { isim: "Mehmet K.", yorum: "Ahmet her zaman düzenli ve saygılı bir koğuş arkadaşı oldu. Kendini geliştirmek için sürekli kitap okur." },
        { isim: "Ali R.", yorum: "Cezaevi kütüphanesinde birlikte çalışıyoruz. Çok yardımsever ve çalışkan biri." }
      ],
      metamaskAddress: '0x5B121c3E0ED268c6aFe0f8E7b3bdDE5375086DB2',
    },
    {
      id: 2,
      name: "Mehmet Demir",
      image: mahkum2Foto,
      description: "Maddi hasarlı trafik kazası tazminatı",
      detailedDescription: "Geçirdiği trafik kazası sonucu oluşan maddi hasarı karşılayamadığı için hapis cezası aldı. Sigorta ve tazminat ödemelerini yapabilmek için yardıma ihtiyacı var. Eski Meslek: Tesisatçı",
      amount: 250,
      targetAmount: 10000,
      uyumSkoru: 92,
      performansSkoru: 88,
      yorumlar: [
        { isim: "Hasan Y.", yorum: "Mehmet Bey çok düzgün bir insan. Koğuşta herkese yardımcı olur." },
        { isim: "İbrahim D.", yorum: "Cezaevi spor aktivitelerinde her zaman pozitif enerji yayar." }
      ],
      metamaskAddress: '0x5B121c3E0ED268c6aFe0f8E7b3bdDE5375086DB2',
    },
    {
      id: 3,
      name: "Ali Kaya",
      image: mahkum3Foto,
      description: "Çek ödemesi için destek talebi",
      detailedDescription: "İşletmesinin zor zamanlarında karşılıksız çek vermek zorunda kaldı. Borcunu ödemek ve özgürlüğüne kavuşmak için desteğinizi bekliyor. Eski Meslek: İşletme sahibi",
      amount: 125,
      targetAmount: 10000,
      uyumSkoru: 88,
      performansSkoru: 95,
      yorumlar: [
        { isim: "Osman T.", yorum: "Ali Bey cezaevi meslek kurslarında eğitmenlik yapıyor. Herkes kendisinden çok memnun." },
        { isim: "Mustafa Ş.", yorum: "Koğuşumuzun en düzenli ve saygılı insanlarından biri." }
      ],
      metamaskAddress: '0x5B121c3E0ED268c6aFe0f8E7b3bdDE5375086DB2',
    },
    {
      id: 4,
      name: "Ayşe Yıldız",
      image: mahkum4Foto,
      description: "Sağlık masrafları için yardım talebi",
      detailedDescription: "Kronik hastalığı nedeniyle ihtiyaç duyduğu ilaçları karşılayamadığı için borçlandı ve hapis cezası aldı. Sağlık masraflarını karşılayabilmek için yardıma ihtiyacı var. Eski Meslek: Hemşire",
      amount: 175,
      targetAmount: 10000,
      uyumSkoru: 95,
      performansSkoru: 87,
      yorumlar: [
        { isim: "Fatma H.", yorum: "Ayşe Hanım cezaevi el işi atölyesinde çok başarılı işler çıkarıyor." },
        { isim: "Zeynep K.", yorum: "Hastalığına rağmen her zaman pozitif ve yardımsever biri." }
      ],
      metamaskAddress: '0x5B121c3E0ED268c6aFe0f8E7b3bdDE5375086DB2',
    },
    {
      id: 5,
      name: "Eyüp Uzun",
      image: mahkum5Foto,
      description: "İcra borcu için destek bekliyor",
      detailedDescription: "Ekonomik kriz döneminde işini kaybetti ve birikmiş borçlarını ödeyemedi. İcra takibi sonucu hapis cezası aldı. Ailesine kavuşabilmek için desteğinizi bekliyor. Eski Meslek: Muhasebeci",
      amount: 200,
      targetAmount: 10000,
      uyumSkoru: 91,
      performansSkoru: 93,
      yorumlar: [
        { isim: "Fatih A.", yorum: "Eyüp Bey cezaevi mutfağında çalışıyor ve herkesin takdirini kazanıyor." },
        { isim: "Ahmet F.", yorum: "Çok çalışkan ve azimli biri. Sürekli yeni şeyler öğrenmeye çalışıyor." }
      ],
      metamaskAddress: '0x5B121c3E0ED268c6aFe0f8E7b3bdDE5375086DB2',
    }
  ];

  // Waves bakiyesini al ve doğru formatta göster
  const getWavesBalance = async () => {
    if (window.WavesKeeper) {
      try {
        const state = await window.WavesKeeper.publicState();
        if (state.account) {
          // Waves'in kendi biriminden normal birime çevir (10^8'e böl)
          const rawBalance = state.account.balance.available;
          const actualBalance = (rawBalance / 100000000).toFixed(2);
          setWavesBalance(actualBalance);
        }
      } catch (error) {
        console.error('Waves bakiye hatası:', error);
      }
    }
  };

  // Modal açıldığında bakiyeyi güncelle
  useEffect(() => {
    if (isDonateModalOpen) {
      getWavesBalance();
    }
  }, [isDonateModalOpen]);

  // USDT'den WAVES'e dönüşüm
  const calculateWaves = (usdtAmount) => {
    return (parseFloat(usdtAmount) / WAVES_PRICE).toFixed(2);
  };

  // Input değiştiğinde WAVES miktarını hesapla
  const handleDonationChange = (e) => {
    const usdtAmount = e.target.value;
    setDonationAmount(usdtAmount);
    setWavesAmount(usdtAmount ? calculateWaves(usdtAmount) : '');
  };

  // Waves testnet için bağış yapma fonksiyonu
  const handleDonate = async (mahkumId, mahkumName) => {
    if (!donationAmount) {
      alert('Lütfen bağış miktarı girin');
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsProcessing(true);

        // Provider ve signer oluştur
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Önce hesap bağlantısını iste
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        const signer = provider.getSigner();

        // Bağış miktarını wei'ye çevir
        const amountInWei = ethers.utils.parseEther(donationAmount);

        // Transaction gönder
        const tx = await signer.sendTransaction({
          to: DONATION_ADDRESS,
          value: amountInWei,
          gasLimit: 21000
        });

        console.log('Transaction gönderildi:', tx.hash);
        
        // Transaction onayını bekle
        const receipt = await tx.wait();
        console.log('Transaction onaylandı:', receipt);

        // Bağış miktarını güncelle
        updateDonation(mahkumId, parseFloat(donationAmount));
        
        alert(`${mahkumName} için ${donationAmount} UNIT0 bağışınız başarıyla gönderildi!`);
        setDonationAmount('');

      } catch (error) {
        console.error('Bağış hatası:', error);
        if (error.code === 4001) {
          alert('İşlem reddedildi.');
        } else if (error.code === -32603) {
          alert('Yetersiz bakiye.');
        } else {
          alert('Bağış gönderilirken bir hata oluştu.');
        }
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert('Lütfen MetaMask yükleyin!');
    }
  };

  // Sayıyı formatla (virgül ile)
  const formatNumber = (number) => {
    return number.toString().replace('.', ',');
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 80px)',
      padding: '20px',
      backgroundColor: '#0a192f',
      color: '#64ffda',
      overflow: 'hidden'
    }}>
      {/* Sol Panel */}
      <div style={{
        width: '50%',
        borderRight: '1px solid rgba(100, 255, 218, 0.2)',
        padding: '20px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gap: '30px'
        }}>
          {mahkumlar.map((mahkum) => (
            <div
              key={mahkum.id}
              onClick={() => setSelectedMahkum(mahkum)}
              style={{
                display: 'flex',
                padding: '20px',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedMahkum?.id === mahkum.id ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                transition: 'all 0.3s',
                boxShadow: '0 0 10px rgba(100, 255, 218, 0.1)'
              }}
            >
              <img
                src={mahkum.image}
                alt={mahkum.name}
                style={{
                  width: '150px',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginRight: '20px',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              />
              <div>
                <h3 style={{ 
                  margin: '0 0 15px 0',
                  color: '#64ffda',
                  textShadow: '0 0 5px rgba(100, 255, 218, 0.3)'
                }}>{mahkum.name}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#8892b0' }}>{mahkum.description}</p>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <p style={{ 
                    margin: 0,
                    color: '#64ffda',
                    fontSize: '14px'
                  }}>
                    Toplanan: ${(mahkumlarDonations[mahkum.id] || 0).toLocaleString()}
                  </p>
                  <p style={{ 
                    margin: 0,
                    color: '#8892b0',
                    fontSize: '14px'
                  }}>
                    Hedef: ${mahkum.targetAmount.toLocaleString()}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <p style={{ 
                    margin: 0,
                    color: '#64ffda',
                    fontSize: '14px'
                  }}>
                    Uyum: {mahkum.uyumSkoru}/100
                  </p>
                  <p style={{ 
                    margin: 0,
                    color: '#64ffda',
                    fontSize: '14px'
                  }}>
                    Performans: {mahkum.performansSkoru}/100
                  </p>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: mahkum.id <= 3 ? '#64ffda' : '#ff6b6b',
                  textShadow: mahkum.id <= 3 ? 
                    '0 0 5px rgba(100, 255, 218, 0.3)' : 
                    '0 0 5px rgba(255, 107, 107, 0.3)'
                }}>
                  Durum: {mahkum.id <= 3 ? 'Denetimli Serbest' : 'Hapiste'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Panel */}
      <div style={{
        width: '50%',
        padding: '20px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {selectedMahkum ? (
          <div style={{
            height: 'auto',
            paddingBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '25px'
            }}>
              <img
                src={selectedMahkum.image}
                alt={selectedMahkum.name}
                style={{
                  width: '300px',
                  height: '360px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  boxShadow: '0 0 20px rgba(100, 255, 218, 0.1)'
                }}
              />
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '30px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <div style={{
                      padding: '15px',
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(100, 255, 218, 0.2)',
                      textAlign: 'center',
                      width: '150px'
                    }}>
                      <p style={{ 
                        margin: '0 0 5px 0',
                        color: '#64ffda',
                        fontSize: '16px'
                      }}>
                        Toplanan
                      </p>
                      <p style={{ 
                        margin: 0,
                        color: '#64ffda',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
                      }}>
                        ${(mahkumlarDonations[selectedMahkum.id] || 0).toLocaleString()}
                      </p>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: 'rgba(100, 255, 218, 0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(100, 255, 218, 0.1)',
                      textAlign: 'center',
                      width: '150px'
                    }}>
                      <p style={{ 
                        margin: '0 0 5px 0',
                        color: '#8892b0',
                        fontSize: '16px'
                      }}>
                        Hedef
                      </p>
                      <p style={{ 
                        margin: 0,
                        color: '#8892b0',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}>
                        ${selectedMahkum.targetAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <div style={{
                      padding: '15px',
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(100, 255, 218, 0.2)',
                      textAlign: 'center',
                      width: '150px'
                    }}>
                      <p style={{ 
                        margin: '0 0 5px 0',
                        color: '#64ffda',
                        fontSize: '16px'
                      }}>
                        Uyum Skoru
                      </p>
                      <p style={{ 
                        margin: 0,
                        color: '#64ffda',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
                      }}>
                        {selectedMahkum.uyumSkoru}/100
                      </p>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(100, 255, 218, 0.2)',
                      textAlign: 'center',
                      width: '150px'
                    }}>
                      <p style={{ 
                        margin: '0 0 5px 0',
                        color: '#64ffda',
                        fontSize: '16px'
                      }}>
                        Performans Skoru
                      </p>
                      <p style={{ 
                        margin: 0,
                        color: '#64ffda',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
                      }}>
                        {selectedMahkum.performansSkoru}/100
                      </p>
                    </div>
                  </div>
                </div>

                {/* İsim ve Durum - Title'sız kutular */}
                <div style={{
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {/* İsim Kutusu */}
                  <div style={{
                    padding: '20px',
                    backgroundColor: 'rgba(100, 255, 218, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(100, 255, 218, 0.1)',
                    textAlign: 'center'
                  }}>
                    <h2 style={{
                      color: '#64ffda',
                      textShadow: '0 0 10px rgba(100, 255, 218, 0.3)',
                      margin: 0,
                      fontSize: '24px'
                    }}>
                      {selectedMahkum.name}
                    </h2>
                  </div>

                  {/* Durum Kutusu */}
                  <div style={{
                    padding: '20px',
                    backgroundColor: selectedMahkum.id <= 3 ? 'rgba(100, 255, 218, 0.05)' : 'rgba(255, 107, 107, 0.05)',
                    borderRadius: '8px',
                    border: `1px solid ${selectedMahkum.id <= 3 ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 107, 107, 0.1)'}`,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: selectedMahkum.id <= 3 ? '#64ffda' : '#ff6b6b',
                      textShadow: selectedMahkum.id <= 3 ? 
                        '0 0 5px rgba(100, 255, 218, 0.3)' : 
                        '0 0 5px rgba(255, 107, 107, 0.3)'
                    }}>
                      {selectedMahkum.id <= 3 ? 'Denetimli Serbest' : 'Hapiste'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p style={{ 
              lineHeight: '1.6',
              color: '#ccd6f6',
              marginBottom: '30px',
              fontSize: '16px'
            }}>
              {selectedMahkum.detailedDescription}
            </p>
            
            <div style={{
              marginTop: '40px',
              padding: '20px',
              backgroundColor: 'rgba(100, 255, 218, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(100, 255, 218, 0.1)'
            }}>
              <h3 style={{
                color: '#64ffda',
                fontSize: '20px',
                marginBottom: '20px',
                textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
              }}>
                Koğuş Arkadaşlarından Yorumlar
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {selectedMahkum.yorumlar.map((yorum, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(100, 255, 218, 0.2)'
                  }}>
                    <p style={{
                      margin: '0 0 8px 0',
                      color: '#64ffda',
                      fontWeight: 'bold'
                    }}>
                      {yorum.isim}
                    </p>
                    <p style={{
                      margin: 0,
                      color: '#8892b0',
                      fontStyle: 'italic'
                    }}>
                      "{yorum.yorum}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setIsDonateModalOpen(true)}
              className="cyber-button"
              style={{ marginTop: '30px' }}
            >
              Bağış Yap
            </button>
          </div>
        ) : (
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8892b0'
          }}>
            Lütfen detaylarını görmek için bir mahkum seçin
          </div>
        )}
      </div>

      {/* Bağış Yapma Modal */}
      {isDonateModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(10, 25, 47, 0.95)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }} onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsDonateModalOpen(false);
          }
        }}>
          <div style={{
            backgroundColor: '#112240',
            borderRadius: '12px',
            padding: '30px',
            width: '400px',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            {/* Kapatma Butonu */}
            <button
              onClick={() => setIsDonateModalOpen(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                color: '#8892b0',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '5px'
              }}
            >
              ✕
            </button>

            {/* Modal Başlık */}
            <h2 style={{
              color: '#64ffda',
              margin: '0 0 25px 0',
              textAlign: 'center',
              fontSize: '24px',
              textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
            }}>
              Bağış Yap
            </h2>

            {/* Mahkum Bilgisi */}
            <div style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#ccd6f6'
            }}>
              <p style={{ margin: '0 0 5px 0' }}>Bağış Yapılacak Kişi:</p>
              <p style={{ 
                margin: 0,
                color: '#64ffda',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {selectedMahkum.name}
              </p>
            </div>

            {/* Mevcut WAVES Bakiyesi */}
            <div style={{
              backgroundColor: 'rgba(100, 255, 218, 0.05)',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid rgba(100, 255, 218, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#8892b0'
              }}>
                <span>Mevcut UNIT0:</span>
                <span style={{ color: '#64ffda', fontWeight: 'bold' }}>
                  {formatNumber(wavesBalance)} UNIT0
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#8892b0',
                fontSize: '12px',
                marginTop: '4px'
              }}>
                <span>USDT Değeri:</span>
                <span>
                  ≈ ${formatNumber((parseFloat(wavesBalance) * WAVES_PRICE).toFixed(2))}
                </span>
              </div>
            </div>

            {/* Bağış Miktarı Input */}
            <div style={{ marginBottom: '25px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#8892b0'
                }}
              >
                Bağış Miktarı (USDT)
              </label>
              <input
                type="number"
                value={donationAmount}
                onChange={handleDonationChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(100, 255, 218, 0.05)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  borderRadius: '4px',
                  color: '#ccd6f6',
                  fontSize: '16px',
                  outline: 'none'
                }}
                placeholder="0.00"
              />
              {donationAmount && (
                <div style={{
                  marginTop: '10px',
                  color: '#8892b0',
                  fontSize: '14px',
                  padding: '8px',
                  backgroundColor: 'rgba(100, 255, 218, 0.05)',
                  borderRadius: '4px'
                }}>
                  ≈ {formatNumber(wavesAmount)} UNIT0 (1 UNIT0 = {formatNumber(WAVES_PRICE.toFixed(2))} USDT)
                </div>
              )}
            </div>

            {/* Güncellenmiş Bağış Yap Butonu */}
            <button
              onClick={() => handleDonate(selectedMahkum.id, selectedMahkum.name)}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: isProcessing ? 'rgba(100, 255, 218, 0.05)' : 'rgba(100, 255, 218, 0.1)',
                border: '1px solid #64ffda',
                borderRadius: '4px',
                color: '#64ffda',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                opacity: isProcessing ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isProcessing) {
                  e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                }
              }}
            >
              {isProcessing ? 'İşlem Gerçekleşiyor...' : 'Bağış Yap'}
            </button>

            {/* Waves Testnet Bilgisi */}
            <div style={{
              marginTop: '20px',
              textAlign: 'center',
              color: '#8892b0',
              fontSize: '12px'
            }}>
              <p>Bu işlem UNIT0 Testnet üzerinde gerçekleşecektir.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MahkumlarPage; 