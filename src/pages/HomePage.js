import React from 'react';
import { useDonation } from '../context/DonationContext';
import { Link } from 'react-router-dom';

function Home() {
  const totalAmount = 6525;
  const targetAmount = 50000;
  const percentageComplete = ((totalAmount / targetAmount) * 100).toFixed(1);

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        color: '#64ffda',
        fontSize: '32px',
        marginBottom: '60px',
        textAlign: 'center',
        lineHeight: '1.4',
        maxWidth: '800px'
      }}>
        Bağışınız ile bir insanı hayata döndürebilirsiniz!
      </h1>

      <div style={{
        backgroundColor: '#112240',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '600px',
        border: '1px solid rgba(100, 255, 218, 0.2)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{
          color: '#64ffda',
          fontSize: '36px',
          marginBottom: '10px'
        }}>
          ${totalAmount.toLocaleString()}
        </h3>
        <div style={{
          backgroundColor: 'rgba(100, 255, 218, 0.1)',
          height: '20px',
          borderRadius: '10px',
          margin: '20px 0',
          position: 'relative'
        }}>
          <div style={{
            width: `${percentageComplete}%`,
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
          marginTop: '5px',
          marginBottom: '25px'
        }}>
          Mahkumlar için toplanan toplam bağış miktarı
        </p>

        <Link 
          to="/mahkumlar"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #64ffda',
            color: '#64ffda',
            padding: '12px 28px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.3s ease',
            marginTop: '10px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Bağış Yap
        </Link>
      </div>
    </div>
  );
}

export default Home;