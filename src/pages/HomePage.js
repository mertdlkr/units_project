import React from 'react';
import { useDonation } from '../context/DonationContext';

function HomePage() {
  // Sabit toplam değer
  const totalAmount = 6525;
  const targetAmount = 50000;
  const percentageComplete = ((totalAmount / targetAmount) * 100).toFixed(1);

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* ... diğer içerikler ... */}

      {/* Toplam Bağış Gösterimi - Güncellenmiş */}
      <div style={{
        backgroundColor: '#112240',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        margin: '40px 0',
        border: '1px solid rgba(100, 255, 218, 0.2)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{
          color: '#64ffda',
          fontSize: '24px',
          marginBottom: '15px'
        }}>
          Toplam Toplanan Bağış
        </h3>
        <p style={{
          fontSize: '36px',
          color: '#ccd6f6',
          margin: '0',
          fontWeight: 'bold'
        }}>
          ${totalAmount.toLocaleString()}
        </p>
        <div style={{
          width: '100%',
          backgroundColor: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '10px',
          marginTop: '20px',
          height: '10px',
          position: 'relative'
        }}>
          <div style={{
            width: `${Math.min(percentageComplete, 100)}%`,
            backgroundColor: '#64ffda',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <p style={{
          color: '#8892b0',
          fontSize: '14px',
          marginTop: '10px'
        }}>
          Hedef: ${targetAmount.toLocaleString()} (%{percentageComplete})
        </p>
        <p style={{
          color: '#8892b0',
          fontSize: '14px',
          marginTop: '5px'
        }}>
          Mahkumlar için toplanan toplam bağış miktarı
        </p>
      </div>

      {/* ... diğer içerikler ... */}
    </div>
  );
}

export default HomePage; 