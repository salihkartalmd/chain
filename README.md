# Zincir (Chain) - Alışkanlık Takip Uygulaması

Bu proje React, TypeScript ve Vite ile oluşturulmuş, PWA (Progressive Web App) özelliklerine sahip bir alışkanlık takip uygulamasıdır.

## Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## PWA Testi

PWA özelliklerini (yüklenebilirlik, çevrimdışı mod) test etmek için uygulamayı "build" etmeniz ve önizleme modunda çalıştırmanız gerekir. **Sadece dosyayı tarayıcıda açmak PWA'yı çalıştırmaz.**

1. Uygulamayı derleyin:
   ```bash
   npm run build
   ```

2. Önizleme sunucusunu başlatın:
   ```bash
   npm run preview
   ```

3. Tarayıcıda verilen localhost adresine gidin (örn: http://localhost:4173). Adres çubuğunda "Yükle" simgesini göreceksiniz.

## Klasör Yapısı

- `public/`: Statik dosyalar (manifest.json, sw.js, ikonlar) burada durmalıdır.
- `src/`: Kaynak kodlar (components, App.tsx vb.)

## Notlar

- İkonların (`icon-192.png` ve `icon-512.png`) `public` klasörü içinde olduğundan emin olun.
