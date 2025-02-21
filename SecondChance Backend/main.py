from fastapi import FastAPI
import sqlite3

app = FastAPI()

# Veritabanını başlatan fonksiyon
def init_db():
    conn = sqlite3.connect("prison.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS mahkumlar (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            isim TEXT NOT NULL,
            uyum_skor INTEGER NOT NULL,
            performans_skor INTEGER NOT NULL,
            durum TEXT NOT NULL,
            cuzdan_adresi TEXT NOT NULL,
            toplanan_para REAL NOT NULL,
            hedef_para REAL NOT NULL
        )
    """)
    mahkumlar = [
        ("Fatma Yılmaz", 85, 95, "aktif", "0x6516165165156896", 3000.0, 7000.0),
        ("Hasan Korkmaz", 70, 80, "pasif", "0x6516165165156899", 1200.0, 4000.0),
        ("Zeynep Çelik", 90, 85, "aktif", "0x6516165165156891", 5000.0, 10000.0),
    ]

    cursor.executemany("""INSERT INTO mahkumlar (isim, uyum_skor, performans_skor, durum, cuzdan_adresi, toplanan_para, hedef_para)VALUES (?, ?, ?, ?, ?, ?, ?)""", mahkumlar)

    conn.commit()
    conn.close()

# Veritabanını başlat
init_db()

# Mahkumları getiren endpoint
@app.get("/mahkumlar")
def get_mahkumlar():
    conn = sqlite3.connect("prison.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM mahkumlar")
    mahkumlar = cursor.fetchall()
    conn.close()

    # Sonuçları JSON formatına dönüştür
    return [
        {
            "id": row[0],
            "isim": row[1],
            "uyum_skor": row[2],
            "performans_skor": row[3],
            "durum": row[4],
            "toplanan_para": row[5],
            "hedef_para": row[6],
        }
        for row in mahkumlar
    ]

# Uygulamayı çalıştırmak için:
# uvicorn main:app --reload
