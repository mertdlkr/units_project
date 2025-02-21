import React from 'react';
import { Link } from 'react-router-dom';

const HakkimizdaPage = () => {
  return (
    <div style={{
      height: 'calc(100vh - 80px)',
      backgroundColor: '#0a192f',
      color: '#ccd6f6',
      padding: '60px 200px',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        paddingBottom: '120px',
        lineHeight: '1.8',
        fontSize: '16px'
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

        <div style={{ marginBottom: '40px' }}>
          <p>SecondChance, hapishaneden tahliye olan bireylerin hayata yeniden başlamalarına destek olmak için kurulmuş bir topluluk fonlama platformudur. Amacımız, eski mahkumların sosyal hayata, iş dünyasına ve kişisel gelişimlerine uyum sağlamalarına yardımcı olacak projeleri finanse etmek ve onları toplumla yeniden buluşturmak.</p>
          <p>Önyargıları kırarak, fırsatları artırarak ve umut inşa ederek, yeni bir başlangıcın mümkün olduğunu gösteriyoruz. SecondChance, bireylerin <strong style={{ color: '#64ffda' }}>eğitim, barınma, iş kurma ve meslek edinme</strong> gibi alanlarda ihtiyaç duydukları maddi ve manevi desteği alabilecekleri bir köprü görevi görür.</p>
        </div>

        <h3 style={{
          color: '#64ffda',
          fontSize: '22px',
          marginBottom: '20px'
        }}>
          Kimlere Destek Oluyoruz?
        </h3>

        <div style={{ marginBottom: '40px' }}>
          <p>SecondChance, farklı nedenlerle hüküm giymiş ancak hayata yeniden başlamak isteyen bireyleri destekler. İşte destek sunduğumuz bazı gruplar:</p>
          <ul style={{ 
            listStyleType: 'none',
            padding: 0,
            marginTop: '20px'
          }}>
            {[
              'Basit Yaralama',
              'Hırsızlık',
              'Adam Öldürme',
              'Nitelikli Adam Öldürme',
              'Uyuşturucu Kullanıcısı',
              'Dolandırıcılık',
              'Kaçakçılık',
              'Kasten Yaralama',
              'Resmi Belgede Sahtecilik',
              'Suçluyu Kayırma',
              'Kamu Malını Yağmalama'
            ].map((item, index) => (
              <li key={index} style={{
                marginBottom: '15px',
                paddingLeft: '25px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#64ffda'
                }}>•</span>
                <strong style={{ color: '#64ffda' }}>{item}</strong> – {getDescription(item)}
              </li>
            ))}
          </ul>
        </div>

        <h3 style={{
          color: '#64ffda',
          fontSize: '22px',
          marginBottom: '20px'
        }}>
          Neden SecondChance?
        </h3>

        <ul style={{
          listStyleType: 'none',
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
              paddingLeft: '25px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#64ffda'
              }}>•</span>
              <strong style={{ color: '#64ffda' }}>{item.split(':')[0]}:</strong>{item.split(':')[1]}
            </li>
          ))}
        </ul>

        <p style={{ marginBottom: '30px' }}>
          Toplum olarak birlikte daha güçlü olabiliriz. <strong style={{ color: '#64ffda' }}>Sen de birilerinin yeniden başlamasına yardım etmek ister misin?</strong> SecondChance ile umut olmaya başla!
        </p>

        <div style={{
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <Link to="/mahkumlar">
            <button className="cyber-button">
              Bağış Yap
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Suç açıklamalarını döndüren yardımcı fonksiyon
const getDescription = (crime) => {
  const descriptions = {
    'Basit Yaralama': 'Bir anlık öfke veya savunma amaçlı işlenen fiiller sonucunda ceza alan bireyler.',
    'Hırsızlık': 'Ekonomik zorluklar veya yanlış seçimler nedeniyle hırsızlık suçuna karışmış ve yeni bir sayfa açmak isteyen kişiler.',
    'Adam Öldürme': 'Kasten veya taksirle öldürme suçu işlemiş, ancak pişmanlık duyan ve toplumda pozitif bir rol üstlenmek isteyen bireyler.',
    'Nitelikli Adam Öldürme': 'Daha ağır cezalar almış ancak rehabilitasyon sürecini tamamlayarak topluma geri dönmeye hazır bireyler.',
    'Uyuşturucu Kullanıcısı': 'Bağımlılıkla mücadele eden ve temiz bir hayata başlamak isteyen kişiler.',
    'Dolandırıcılık': 'Geçmişte yanlış kararlar almış ancak dürüst bir şekilde hayatını yeniden inşa etmek isteyen bireyler.',
    'Kaçakçılık': 'Suç geçmişini geride bırakıp topluma katkı sağlamak isteyen kişiler.',
    'Kasten Yaralama': 'Şiddetten uzak bir yaşam sürmek ve barışçıl bir şekilde yeniden topluma katılmak isteyenler.',
    'Resmi Belgede Sahtecilik': 'Hayatında yeni bir sayfa açarak dürüst bir şekilde çalışmak isteyen bireyler.',
    'Suçluyu Kayırma': 'Geçmişte yanlış seçimler yapmış ama artık toplum içinde sorumluluk almak isteyen kişiler.',
    'Kamu Malını Yağmalama': 'Hata yapmış ancak telafi etmek ve topluma fayda sağlamak isteyen bireyler.'
  };
  return descriptions[crime];
};

export default HakkimizdaPage;