<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Kuliner Nusantara</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            background: #fff8f0;
        }
        header {
            background: #ff7043;
            color: #fff;
            padding: 30px 0 20px 0;
            text-align: center;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        .banner-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            padding: 40px;
            max-width: 1200px;
            margin: auto;
        }
        .banner {
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.07);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .banner:hover {
            transform: translateY(-6px) scale(1.03);
        }
        .banner img {
            width: 100%;
            height: 170px;
            object-fit: cover;
            display: block;
        }
        .banner-title {
            padding: 16px;
            font-size: 1.1em;
            font-weight: bold;
            color: #ff7043;
            text-align: center;
        }
        /* Popup styles */
        .popup-bg {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0; top: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            align-items: center;
            justify-content: center;
        }
        .popup {
            background: #fff;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            padding: 24px;
            text-align: center;
            position: relative;
            box-shadow: 0 4px 32px rgba(0,0,0,0.18);
            animation: popupIn 0.3s;
        }
        @keyframes popupIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .popup img {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 16px;
            object-fit: cover;
            max-height: 200px;
        }
        .popup-title {
            font-size: 1.2em;
            color: #ff7043;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .popup-desc {
            color: #444;
            margin-bottom: 18px;
        }
        .close-btn {
            background: #ff7043;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 8px 18px;
            font-size: 1em;
            cursor: pointer;
            margin-top: 10px;
        }
        @media (max-width: 600px) {
            .banner-grid { padding: 10px; gap: 12px; }
            .banner img { height: 120px; }
        }
    </style>
</head>
<body>
    <header>
        <h1>Kuliner Nusantara</h1>
        <p>20 Pilihan Kuliner Terbaik Indonesia</p>
    </header>
    <main>
        <div class="banner-grid" id="bannerGrid">
            <!-- Banners will be injected here -->
        </div>
    </main>
    <!-- Popup -->
    <div class="popup-bg" id="popupBg">
        <div class="popup" id="popup">
            <img id="popupImg" src="" alt="">
            <div class="popup-title" id="popupTitle"></div>
            <div class="popup-desc" id="popupDesc"></div>
            <button class="close-btn" onclick="closePopup()">Tutup</button>
        </div>
    </div>
    <script>
        // 20 kuliner data
        const kulinerList = [
            {
                title: "Nasi Goreng",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                desc: "Nasi goreng khas Indonesia dengan bumbu rempah dan topping telur mata sapi."
            },
            {
                title: "Rendang",
                img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
                desc: "Daging sapi dimasak dengan santan dan rempah khas Minang, gurih dan pedas."
            },
            {
                title: "Sate Ayam",
                img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
                desc: "Daging ayam tusuk dibakar, disajikan dengan bumbu kacang dan lontong."
            },
            {
                title: "Bakso",
                img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
                desc: "Bola daging sapi kenyal dalam kuah kaldu gurih, lengkap dengan mie dan sayur."
            },
            {
                title: "Gado-Gado",
                img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
                desc: "Salad sayur rebus dengan siraman bumbu kacang khas Betawi."
            },
            {
                title: "Soto Ayam",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                desc: "Sup ayam kuning dengan bihun, telur, dan taburan bawang goreng."
            },
            {
                title: "Pempek",
                img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
                desc: "Ikan dan tepung sagu khas Palembang, disajikan dengan cuko pedas."
            },
            {
                title: "Gudeg",
                img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
                desc: "Nangka muda dimasak manis khas Yogyakarta, lengkap dengan ayam dan telur."
            },
            {
                title: "Ayam Betutu",
                img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
                desc: "Ayam utuh berbumbu khas Bali, dimasak perlahan hingga empuk dan gurih."
            },
            {
                title: "Rawon",
                img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
                desc: "Sup daging sapi berkuah hitam khas Jawa Timur dengan kluwek."
            },
            {
                title: "Soto Betawi",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                desc: "Soto daging sapi dengan kuah santan gurih dan emping."
            },
            {
                title: "Mie Aceh",
                img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
                desc: "Mie kuning pedas khas Aceh dengan daging sapi atau seafood."
            },
            {
                title: "Ayam Taliwang",
                img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
                desc: "Ayam bakar pedas khas Lombok dengan sambal plecing."
            },
            {
                title: "Kerak Telor",
                img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
                desc: "Telur bebek, beras ketan, dan serundeng khas Betawi."
            },
            {
                title: "Bubur Manado",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                desc: "Bubur nasi dengan sayuran dan ikan asin khas Sulawesi Utara."
            },
            {
                title: "Nasi Uduk",
                img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
                desc: "Nasi gurih dengan santan, disajikan dengan lauk dan sambal."
            },
            {
                title: "Sop Buntut",
                img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
                desc: "Sup buntut sapi dengan wortel, kentang, dan tomat."
            },
            {
                title: "Es Teler",
                img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
                desc: "Minuman segar campuran alpukat, kelapa, nangka, dan susu kental manis."
            },
            {
                title: "Martabak Manis",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                desc: "Kue tebal dengan topping coklat, keju, dan kacang."
            },
            {
                title: "Klepon",
                img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
                desc: "Kue bola ketan isi gula merah, dilapisi kelapa parut."
            }
        ];

        // Render banners
        const bannerGrid = document.getElementById('bannerGrid');
        kulinerList.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'banner';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="banner-title">${item.title}</div>
            `;
            div.onclick = () => showPopup(idx);
            bannerGrid.appendChild(div);
        });

        // Popup logic
        function showPopup(idx) {
            const item = kulinerList[idx];
            document.getElementById('popupImg').src = item.img;
            document.getElementById('popupImg').alt = item.title;
            document.getElementById('popupTitle').textContent = item.title;
            document.getElementById('popupDesc').textContent = item.desc;
            document.getElementById('popupBg').style.display = 'flex';
        }
        function closePopup() {
            document.getElementById('popupBg').style.display = 'none';
        }
        // Close popup on background click
        document.getElementById('popupBg').onclick = function(e) {
            if (e.target === this) closePopup();
        };
        // ESC key closes popup
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closePopup();
        });
    </script>
</body>
</html>