# Çağlar Boyu İnsan

Taş Devri'nden yakın geleceğe, bugünkü Türkiye topraklarında geçen interaktif hikâye oyunu.

## Telefona kurmak (Android)

Son sürümün APK dosyası her güncellemede otomatik hazırlanır:

**https://github.com/aanilozdemir7-stack/caglar-boyu-insan/releases/download/son-surum/caglar-boyu-insan.apk**

Linki telefonda aç, dosyayı indir ve kur. İlk kurulumda telefon "bilinmeyen kaynaklardan yükleme" izni ister.

## Proje yapısı

- `src/story/` — senaryolar (her çağ bir dosya; şu an 1-10. çağlar hazır)
- `src/art/` — kodla çizilen sahneler (`scenes.js`: çağ 1-3, `scenes2.js`: çağ 4-10) ve avatar
- `src/main.js` — oyun akışı (sahne, seçim, checkpoint)
- `src/state.js` — cihaza kayıt
- `android/` — Android uygulama kabı (Capacitor)
- `.github/workflows/android.yml` — APK'yı otomatik üreten iş akışı
