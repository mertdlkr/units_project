import React, { createContext, useState, useContext } from 'react';

const DonationContext = createContext();

export function DonationProvider({ children }) {
  // Toplam bağış miktarını sabit olarak ayarla
  const [totalDonations] = useState(6525);
  
  const [mahkumlarDonations, setMahkumlarDonations] = useState({
    1: 5500, // Birinci mahkum
    2: 250,  // İkinci mahkum
    3: 575,  // Üçüncü mahkum
    4: 125,  // Dördüncü mahkum
    5: 75    // Beşinci mahkum
  });

  const updateDonation = (mahkumId, amount) => {
    const donationAmount = parseFloat(amount);
    setMahkumlarDonations(prev => ({
      ...prev,
      [mahkumId]: prev[mahkumId] + donationAmount
    }));
  };

  return (
    <DonationContext.Provider value={{ totalDonations, mahkumlarDonations, updateDonation }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  return useContext(DonationContext);
} 