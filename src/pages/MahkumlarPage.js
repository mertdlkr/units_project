import React, { useState } from 'react';
import '../styles/buttons.css';
import mahkum1Foto from '../assets/mahkum1Foto.png';
import mahkum2Foto from '../assets/mahkum2Foto.png';
import mahkum3Foto from '../assets/mahkum3Foto.png';
import mahkum4Foto from '../assets/mahkum4Foto.png';
import mahkum5Foto from '../assets/mahkum5Foto.png';

const MahkumlarPage = () => {
  const [selectedMahkum, setSelectedMahkum] = useState(null);

  const mahkumlar = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      image: mahkum1Foto,
      description: "Kader Mahkumu - Dolandırıcılık suçundan 3 yıl hapis cezası",
      detailedDescription: "Kader mahkumu Ahmet Yılmaz, 2021 yılında işlediği dolandırıcılık suçundan dolayı 3 yıl hapis cezasına çarptırıldı. Ailesini geçindirmek için yanlış bir karar verdiğini ve pişman olduğunu belirtiyor.",
      amount: 5500,
      targetAmount: 10000,
      uyumSkoru: 85,
      performansSkoru: 90,
      yorumlar: [
        { isim: "Mehmet K.", yorum: "Ahmet her zaman düzenli ve saygılı bir koğuş arkadaşı oldu. Kendini geliştirmek için sürekli kitap okur." },
        { isim: "Ali R.", yorum: "Cezaevi kütüphanesinde birlikte çalışıyoruz. Çok yardımsever ve çalışkan biri." }
      ]
    },
    {
      id: 2,
      name: "Mehmet Demir",
      image: mahkum2Foto,
      description: "Maddi hasarlı trafik kazası tazminatı",
      detailedDescription: "Geçirdiği trafik kazası sonucu oluşan maddi hasarı karşılayamadığı için hapis cezası aldı. Sigorta ve tazminat ödemelerini yapabilmek için yardıma ihtiyacı var.",
      amount: 250,
      targetAmount: 10000,
      uyumSkoru: 92,
      performansSkoru: 88,
      yorumlar: [
        { isim: "Hasan Y.", yorum: "Mehmet Bey çok düzgün bir insan. Koğuşta herkese yardımcı olur." },
        { isim: "İbrahim D.", yorum: "Cezaevi spor aktivitelerinde her zaman pozitif enerji yayar." }
      ]
    },
    {
      id: 3,
      name: "Ali Kaya",
      image: mahkum3Foto,
      description: "Çek ödemesi için destek talebi",
      detailedDescription: "İşletmesinin zor zamanlarında karşılıksız çek vermek zorunda kaldı. Borcunu ödemek ve özgürlüğüne kavuşmak için desteğinizi bekliyor.",
      amount: 125,
      targetAmount: 10000,
      uyumSkoru: 88,
      performansSkoru: 95,
      yorumlar: [
        { isim: "Osman T.", yorum: "Ali Bey cezaevi meslek kurslarında eğitmenlik yapıyor. Herkes kendisinden çok memnun." },
        { isim: "Mustafa Ş.", yorum: "Koğuşumuzun en düzenli ve saygılı insanlarından biri." }
      ]
    },
    {
      id: 4,
      name: "Ayşe Yıldız",
      image: mahkum4Foto,
      description: "Sağlık masrafları için yardım talebi",
      detailedDescription: "Kronik hastalığı nedeniyle ihtiyaç duyduğu ilaçları karşılayamadığı için borçlandı ve hapis cezası aldı. Sağlık masraflarını karşılayabilmek için yardıma ihtiyacı var.",
      amount: 175,
      targetAmount: 10000,
      uyumSkoru: 95,
      performansSkoru: 87,
      yorumlar: [
        { isim: "Fatma H.", yorum: "Ayşe Hanım cezaevi el işi atölyesinde çok başarılı işler çıkarıyor." },
        { isim: "Zeynep K.", yorum: "Hastalığına rağmen her zaman pozitif ve yardımsever biri." }
      ]
    },
    {
      id: 5,
      name: "Eyüp Uzun",
      image: mahkum5Foto,
      description: "İcra borcu için destek bekliyor",
      detailedDescription: "Ekonomik kriz döneminde işini kaybetti ve birikmiş borçlarını ödeyemedi. İcra takibi sonucu hapis cezası aldı. Ailesine kavuşabilmek için desteğinizi bekliyor.",
      amount: 200,
      targetAmount: 10000,
      uyumSkoru: 91,
      performansSkoru: 93,
      yorumlar: [
        { isim: "Fatih A.", yorum: "Eyüp Bey cezaevi mutfağında çalışıyor ve herkesin takdirini kazanıyor." },
        { isim: "Ahmet F.", yorum: "Çok çalışkan ve azimli biri. Sürekli yeni şeyler öğrenmeye çalışıyor." }
      ]
    }
  ];

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
                    Toplanan: ${mahkum.amount}
                  </p>
                  <p style={{ 
                    margin: 0,
                    color: '#8892b0',
                    fontSize: '14px'
                  }}>
                    Hedef: ${mahkum.targetAmount}
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
                        ${selectedMahkum.amount}
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
                        ${selectedMahkum.targetAmount}
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
            
            <button className="cyber-button" style={{ 
              marginTop: '30px',
              marginBottom: '20px'
            }}>
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
    </div>
  );
};

export default MahkumlarPage; 