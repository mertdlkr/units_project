import React, { createContext, useState, useContext } from 'react';

const DonationContext = createContext();

export function DonationProvider({ children }) {
  const [totalDonations] = useState(6525);
  
  const [mahkumlarDonations, setMahkumlarDonations] = useState({
    1: 5500,
    2: 250,
    3: 575,
    4: 125,
    5: 75
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