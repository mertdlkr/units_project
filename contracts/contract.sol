// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MahkumTakip {

    // Mahkum Struct'ı
    struct Mahkum {
        string isim;
        uint256 toplananPara;
        uint256 hedefPara;
        uint8 uyumSkoru;
        uint8 performansSkoru;
        bool serbestMi;
    }

    // Mahkum Mapping (Mahkum ID -> Mahkum Bilgisi)
    mapping(uint256 => Mahkum) public mahkumlar;
    
    // Psikolog Mapping (Psikolog Cüzdan Adresi -> Yetki Durumu)
    mapping(address => bool) public psikologlar;

    // Terapi Yoklama Mapping (Mahkum ID -> Tarih -> Yoklama Durumu)
    mapping(uint256 => mapping(uint256 => bool)) public terapiYoklama; 

    // Admin adresi
    address public admin;

    constructor() {
        admin = msg.sender; // Admin kontratı deploy eden kişidir.
    }

    // Sadece admin tarafından psikolog ekleme fonksiyonu
    function psikologEkle(address _psikolog) external {
        require(msg.sender == admin, "Sadece admin psikolog ekleyebilir");
        psikologlar[_psikolog] = true;
    }

    // Sadece admin tarafından mahkum ekleme fonksiyonu
    function mahkumEkle(
        uint256 _id,
        string memory _isim,
        uint256 _hedefPara
    ) external {
        require(msg.sender == admin, "Sadece admin mahkum ekleyebilir");
        mahkumlar[_id] = Mahkum(_isim, 0, _hedefPara, 0, 0, false);
    }

    // Mahkuma bağış yapma fonksiyonu
    function bagisYap(uint256 _id) external payable {
        require(msg.value > 0, "Bagis miktari sifirdan buyuk olmali");
        require(bytes(mahkumlar[_id].isim).length > 0, "Mahkum bulunamadi");

        mahkumlar[_id].toplananPara += msg.value;
    }

    // Psikolog tarafından terapi yoklama güncelleme fonksiyonu
    function terapiYoklamaGuncelle(uint256 _mahkumId, uint256 _tarih, bool _geldiMi) external {
        require(psikologlar[msg.sender], "Sadece yetkili psikologlar yoklama guncelleyebilir");
        terapiYoklama[_mahkumId][_tarih] = _geldiMi;
    }

    // Mahkumun uyum ve performans skorlarını güncelleme (Admin yetkisi)
    function skorlariGuncelle(uint256 _id, uint8 _uyumSkoru, uint8 _performansSkoru) external {
        require(msg.sender == admin, "Sadece admin skor guncelleyebilir");
        require(bytes(mahkumlar[_id].isim).length > 0, "Mahkum bulunamadi");

        mahkumlar[_id].uyumSkoru = _uyumSkoru;
        mahkumlar[_id].performansSkoru = _performansSkoru;
    }

    // Mahkumun serbestlik durumunu güncelleme (Admin yetkisi)
    function serbestBirak(uint256 _id) external {
        require(msg.sender == admin, "Sadece admin serbestlik durumunu guncelleyebilir");
        require(bytes(mahkumlar[_id].isim).length > 0, "Mahkum bulunamadi");

        mahkumlar[_id].serbestMi = true;
    }

    // Mahkumun terapiye katılım durumunu görüntüleme
    function terapiKatilimDurumu(uint256 _id, uint256 _tarih) external view returns (bool) {
        return terapiYoklama[_id][_tarih];
    }

    // Mahkumun bilgilerini alma fonksiyonu
    function mahkumBilgisi(uint256 _id) external view returns (
        string memory, uint256, uint256, uint8, uint8, bool
    ) {
        Mahkum memory m = mahkumlar[_id];
        return (m.isim, m.toplananPara, m.hedefPara, m.uyumSkoru, m.performansSkoru, m.serbestMi);
    }
}
