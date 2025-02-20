import React from 'react';
import { Link } from 'react-router-dom';

const HakkimizdaPage = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: '#0a192f',
      color: '#8892b0',
      padding: '60px 200px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: '#64ffda',
          fontSize: '32px',
          marginBottom: '30px',
          textShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
        }}>
          Hakkımızda – SecondChance
        </h1>

        <h2 style={{
          color: '#64ffda',
          fontSize: '24px',
          marginBottom: '40px',
          fontStyle: 'italic'
        }}>
          Herkes ikinci bir şansı hak eder!
        </h2>

        <div style={{
          fontSize: '16px',
          lineHeight: '1.8',
          marginBottom: '40px'
        }}>
          <p>SecondChance, hapishaneden tahliye olan bireylerin hayata yeniden başlamalarına destek olmak için kurulmuş bir topluluk fonlama platformudur. Amacımız, eski mahkumların sosyal hayata, iş dünyasına ve kişisel gelişimlerine uyum sağlamalarına yardımcı olacak projeleri finanse etmek ve onları toplumla yeniden buluşturmak.</p>
          
          <p style={{ marginTop: '20px' }}>Önyargıları kırarak, fırsatları artırarak ve umut inşa ederek, yeni bir başlangıcın mümkün olduğunu gösteriyoruz. SecondChance, bireylerin eğitim, barınma, iş kurma ve meslek edinme gibi alanlarda ihtiyaç duydukları maddi ve manevi desteği alabilecekleri bir köprü görevi görür.</p>
        </div>

        <h3 style={{
          color: '#64ffda',
          fontSize: '20px',
          marginBottom: '20px'
        }}>
          Neden SecondChance?
        </h3>

        <ul style={{
          listStyle: 'none',
          padding: 0,
          marginBottom: '40px'
        }}>
          {[
            'Topluma Yeniden Entegrasyon: Eski mahkumların topluma kazandırılmasını destekliyoruz.',
            'Finansal Destek: Kullanıcılar bağış yaparak bireylerin hayatında fark yaratabilir.',
            'Şeffaf ve Güvenilir: Fonların adil şekilde kullanıldığını takip edebilir, gerçek hikayelere katkı sağlayabilirsiniz.',
            'İlham Veren Hikayeler: Başarı hikayeleri ile ikinci şansın mümkün olduğunu herkese göstermek istiyoruz.'
          ].map((item, index) => (
            <li key={index} style={{
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                color: '#64ffda',
                fontSize: '20px'
              }}>•</span>
              {item}
            </li>
          ))}
        </ul>

        <p style={{
          fontSize: '18px',
          marginBottom: '30px',
          color: '#64ffda'
        }}>
          Toplum olarak birlikte daha güçlü olabiliriz. Sen de birilerinin yeniden başlamasına yardım etmek ister misin? <strong>SecondChance ile umut olmaya başla!</strong>
        </p>

        <div style={{
          backgroundColor: 'rgba(100, 255, 218, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '18px',
            color: '#64ffda'
          }}>
            📍 Hemen keşfet, destek ver, ikinci şansın bir parçası ol!
          </p>
          <Link to="/mahkumlar">
            <button className="cyber-button" style={{
              marginTop: '20px'
            }}>
              Bağış Yap
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HakkimizdaPage;