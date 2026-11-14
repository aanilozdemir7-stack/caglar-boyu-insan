# Çağlar Boyu İnsan

Taş Devri'nden yakın geleceğe, bugünkü Türkiye topraklarında geçen interaktif hikâye oyunu.

## Telefona kurmak (Android)

Son sürümün APK dosyası her güncellemede otomatik hazırlanır:

**https://github.com/aanilozdemir7-stack/caglar-boyu-insan/releases/download/son-surum/caglar-boyu-insan.apk**

Linki telefonda aç, dosyayı indir ve kur. İlk kurulumda telefon "bilinmeyen kaynaklardan yükleme" izni ister.

## Proje yapısı

- `src/story/` — senaryolar (her çağ bir dosya; 14 çağın hepsi hazır; 14. çağ kurmaca bir yakın gelecek)
- `src/art/` — kodla çizilen sahneler (`scenes.js`: çağ 1-3, `scenes2.js`: çağ 4-14) ve avatar
- `src/main.js` — oyun akışı (sahne, seçim, checkpoint)
- `src/state.js` — cihaza kayıt
- `android/` — Android uygulama kabı (Capacitor)
- `.github/workflows/android.yml` — APK'yı otomatik üreten iş akışı

## Oyunun sonu
14. çağ bitince "Yolculuk tamamlandı" ekranı açılır: her çağdaki akıl/beden izi gösterilir.
"Ya diğerini seçseydin?" ile herhangi bir çağın başına dönülüp farklı kararlar denenebilir;
bu denemeler kaydedilmez, asıl yolculuk değişmez. Sonunda iki yol yan yana karşılaştırılır.

## Ekran uyumu
Uygulama tam ekran çalışır (çentik/kamera deliği alanı dahil). `MainActivity.java`, Android'in
bildirdiği çentik ve sistem çubuğu boşluklarını `--safe-area-inset-*` CSS değişkenleri olarak
sayfaya verir; iOS'ta aynı değerler `env(safe-area-inset-*)` ile gelir. Bütün yazı ve düğmeler
bu güvenli alanın içinde kalır.

## Müzik
Ses dosyası yok: `src/audio/music.js` her çağın müziğini Web Audio ile anında üretir, her açılışta
ezgi biraz farklı olur. Çağların dizi, tempo, çalgı ve ritim ayarları `src/audio/profiles.js` içinde
(ör. Bizans'ta ison üstünde ilahi, Selçuklu'da Uşşak'ta ney ve bendir, Lale Devri'nde Rast'ta ud ve
kanun, 1930'larda tango, 1970'lerde Anadolu pop). Yangın, deprem, salgın gibi sahnelerde ritim susar,
ezgi seyrekleşir. Sağ üstteki ♪ düğmesi müziği açıp kapatır; tercih kaydedilir. Uygulama arka plana
geçince müzik durur.
