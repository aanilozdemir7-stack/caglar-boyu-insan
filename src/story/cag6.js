// ÇAĞ 6 — Antik çağ: Bergama (MÖ 180) → Efes (MS 117) → Bergama (MS 157)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - Bergama kralı II. Eumenes (MÖ 197-159) Athena tapınağının yanına İskenderiye'den sonra en ünlü kütüphaneyi kurdu;
//   200.000 kitap tuttuğu söylenir. Pliny'nin Varro'dan aktardığına göre, kütüphane rekabeti yüzünden
//   Mısır kralı papirüs ihracını yasaklayınca Bergama'da parşömen "icat edildi". Bugün bilinen: Deri üstüne yazı
//   daha eskidir; Bergama onu çok geliştirip büyük ölçekte üretti, Latince "pergamena" adı buradan gelir.
//   Kütüphanenin başındaki Mallos'lu Krates bilinen ilk yer küresini yapmıştır. Mısır, Bergama'ya gitmek isteyen
//   bir kütüphaneciyi hapse attırmıştı.
// - Bergama Asklepionu: Uyku ile tedavi (tapınakta uyunur, görülen rüya hekimlerce yorumlanır), kutsal su, yılan.
// - III. Attalos krallığını MÖ 133'te vasiyetle Roma'ya bıraktı.
// - Efes'te Celsus Kütüphanesi: Oğlu Aquila babası Celsus için yaptırdı (MS 110'lar), yaklaşık 12.000 tomar;
//   Celsus kütüphanenin altındaki mezar odasında, mermer lahitte yatar. Kitaplar için 25.000 dinar bıraktı.
//   Kent içine gömülmek ayrıcalıktır. Efes'in limanı alüvyonla dolup durur.
// - Galenos MS 129'da Bergama'da doğdu; gençken Bergama'da gladyatörlerin hekimliğini yaptı. Kitapları
//   bin yılı aşkın tıp eğitiminin temeli oldu.
// Karakter adları kurgu, dönemin ad kalıplarına uygundur.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const bergama = (st) => st.yer === 'Bergama';
const efes = (st) => st.yer === 'Efes';
const yazar = (st) => st.flags.includes('yazi');

export const ERA6 = {
  id: 6,
  name: 'Antik çağ',
  place: 'Bergama',
  region: 'İzmir',
  year: 'MÖ 180',
  currency: 'drahmi',
  start: 'b1',
  next: { name: 'Bizans', place: 'Konstantinopolis', year: 'MS 532' },

  carry(st) {
    st.para = Math.min(25, Math.max(3, st.para));
    st.enerji = Math.max(st.enerji, 70);
    return `${st.para} sikken artık Bergama drahmisi olarak sayılıyor.`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Bergama ve kitap savaşı ----------
    b1: {
      bg: 'bergama_akropol', hands: 'uzan', day: 1, place: 'Bergama', year: 'MÖ 180',
      lines: [
        'Gözlerini sarp bir tepenin yamacında açıyorsun. Aşağıda geniş bir *ova*.',
        'Tepenin yüzüne dik bir *tiyatro* oyulmuş. Basamaklar uçuruma iner gibi.',
        'Tepede mermer tapınaklar. Burası *Bergama*, krallığın başkenti.',
        'Herkes Yunanca konuşuyor. Ve herkesin elinde bir şey var: *Kitap*.',
      ],
      choices: [
        { text: 'Athena tapınağının yanındaki kütüphaneye çık', effect: { akil: 1 }, to: 'b2a' },
        { text: 'Tiyatronun basamaklarını say, en üste tırman', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'b2b' },
        { text: 'Çarşıda iş ara', effect: { para: 1 }, to: 'b2c' },
      ],
    },
    b2a: {
      bg: 'kutuphane', hands: 'uzan', day: 1,
      lines: [
        'Duvar boyunca *raflar*. Raflarda yüz binlerce tomar.',
        'Ortada tanrıça *Athena*\'nın heykeli. Bilginin koruyucusu.',
        'Kütüphaneci *Krates* seni süzüyor: "Okuma biliyor musun?"',
      ],
      choices: [
        { text: '"Birçok yazı bilirim"', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 1, flags: ['kopyaci'] }, to: 'b3' },
        { text: '"Öğrenmeye geldim"', effect: { akil: 1 }, to: 'b3' },
      ],
    },
    b2b: {
      bg: 'bergama_akropol', hands: 'uzan', day: 1,
      lines: [
        'Basamaklar o kadar *dik* ki aşağı bakınca başın dönüyor.',
        'En üstten bütün ova ayaklarının *altında*.',
        'Yanına bir adam geliyor: "Güçlü bacakların var. *Deri* taşıyabilir misin?"',
      ],
      choices: [{ text: '"Taşırım"', effect: { flags: ['tasiyici'] }, to: 'b3' }],
    },
    b2c: {
      bg: 'bergama_cadde', hands: 'kese', day: 1,
      lines: [
        'Çarşıda Lidya\'nın icadı her yerde: *Sikke*. Ama üstünde başka krallar.',
        { when: has('darpci'), text: 'İlk aslanı senin vurduğun o fikir, *yüzlerce* yıl sonra hâlâ yaşıyor.' },
        'Bir kitapçı bağırıyor: "*Homeros*! Yeni kopya! Sadece birkaç drahmi!"',
      ],
      choices: [{ text: 'Kitapçıya yardımcı ol', effect: { para: 1, flags: ['kitapci'] }, to: 'b3' }],
    },
    b3: {
      bg: 'kutuphane', hands: 'uzan', day: 1,
      lines: [
        'Akşam kentte bir *haber* yayılıyor.',
        'Mısır kralı, Bergama\'ya *papirüs* satılmasını yasakladı.',
        'İskenderiye kütüphanesi en büyüğü kalmak istiyor. Bergama ise onu *geçmek*.',
        'Papirüs olmadan kitap *yazılmaz*. Krates\'in yüzü bembeyaz.',
      ],
      choices: [
        { text: '"Başka bir şeye yazalım"', effect: { akil: 1, flags: ['fikir_deri'] }, to: '@aksam', then: 'b4' },
        { text: '"Mısır\'dan kaçak papirüs getirelim"', effect: { flags: ['kacak'] }, to: '@aksam', then: 'b4' },
      ],
    },
    b4: {
      bg: 'parsomen', hands: 'uzan', day: 2,
      lines: [
        'Kral Eumenes\'in emri: Bergama, papirüse *muhtaç* kalmayacak.',
        'Kentin dışındaki debbağhanelerde *deri* işleniyor. Keskin bir kireç kokusu.',
        'Doğuda insanlar çoktan deriye yazıyordu. Ama kaba, kalın, *pahalı*.',
        '"Öyle ince yapın ki iki *yüzüne* de yazılsın!" diye bağırıyor ustabaşı.',
      ],
      choices: [
        { text: 'Derileri kireçli suda yumuşat, kazı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['debbag'] }, to: 'b5a' },
        { text: 'Derileri çerçevelere ger, kurut', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, flags: ['gerdi'] }, to: 'b5a' },
        { text: 'Hangi deri daha ince oluyor, dene ve kaydet', effect: { akil: 2, flags: ['deneyci'] }, to: 'b5b' },
      ],
    },
    b5a: {
      bg: 'parsomen', hands: 'cekic', day: 2,
      lines: [
        'Kolların *yanıyor*. Ama altındaki deri giderek inceliyor, beyazlıyor.',
        'Gerili çerçevede kuruyunca bir *davul* gibi gergin oluyor.',
        'Ponza taşıyla yüzü *parlatılıyor*.',
      ],
      choices: devam('b6', 'İlk yaprağı Krates\'e götür'),
    },
    b5b: {
      bg: 'parsomen', hands: 'kalem', day: 2,
      lines: [
        'Buzağı derisi en *ince*. Keçi daha sağlam. Koyun yağlı, mürekkebi itiyor.',
        'Notlarını bir tahtaya *çiziktiriyorsun*. Ustabaşı başını sallıyor.',
        '"Böyle *düzenle* çalışırsak her hafta yüzlerce yaprak çıkar."',
      ],
      choices: [{ text: 'İlk yaprağı Krates\'e götür', effect: { flags: ['usta_not'] }, to: '@olay', then: 'b6' }],
    },
    b6: {
      bg: 'kutuphane', hands: 'kitap', day: 3,
      lines: [
        'Krates yaprağı ışığa *tutuyor*. Çevirip arkasına bakıyor.',
        '"Papirüs *nemden* çürür, katlanınca kırılır. Bu ise..."',
        '"Bu, *bin yıl* dayanır."',
        { when: has('kacak'), text: '"Yine de papirüs getirmek istiyorsan, liman *gözlerini* açık tut."' },
      ],
      choices: [
        { text: 'Tomar yerine yaprakları katlayıp dikmeyi öner', effect: { akil: 2, flags: ['kodeks'] }, to: 'b7' },
        { text: 'Kopyacılarla birlikte yaz', req: yazar, reqText: 'Yazı bilmiyorsun', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, para: 1 }, to: 'b7' },
        { text: 'Debbağhaneye geri dön, üretimi büyüt', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 2 }, to: 'b7' },
      ],
    },
    b7: {
      bg: 'kutuphane', hands: 'kitap', day: 3,
      lines: [
        { when: has('kodeks'), text: 'Krates katlanmış, dikilmiş yapraklara uzun uzun *bakıyor*. "Sayfa... çevrilen bir tomar."' },
        'Bergama\'nın derisi bütün denize *yayılacak*. Adı da: Pergamena, *parşömen*.',
        'Krates bir köşede tuhaf bir şey gösteriyor: Üstüne kıtalar çizilmiş büyük bir *top*.',
        '"Dünya *yuvarlak*. Ben onun bir maketini yaptım."',
      ],
      choices: [
        { text: '"Bunu biliyordum" diye gülümse', effect: { akil: 1 }, to: 'b8' },
        { text: 'Küreyi çevir, denizlerin yerini sor', effect: { akil: 1, flags: ['kure'] }, to: 'b8' },
      ],
    },
    b8: {
      bg: 'bergama_akropol', hands: 'uzan', day: 3,
      lines: [
        'Akşam tepede yeni bir yapının *iskeleleri*: Zeus\'a dev bir sunak.',
        'Duvarlarında tanrılarla devlerin *savaşı* oyuluyor. Yüzlerce figür.',
        { when: has('kacak'), text: 'Limandan bir haber: Mısır gemisinde *kaçak* papirüs varmış.' },
      ],
      choices: [
        { text: 'Limana in, papirüsü al', show: has('kacak'), cost: { para: 2 }, effect: { para: -2, flags: ['papirus'] }, to: '@aksam', then: 'k1' },
        { text: 'Heykeltıraşlara taş taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@aksam', then: 'k1' },
        { text: 'Kabartmaları izle', effect: { akil: 1 }, to: '@aksam', then: 'k1' },
      ],
    },

    k1: {
      bg: 'kutuphane', hands: 'uzan', day: 4,
      lines: [
        'Sabah kütüphanede bir *telaş*. Kral Eumenes geliyor!',
        'Krates sana dönüyor: "Parşömeni krala *sen* göster."',
        'Kâtipler yerlere kadar eğiliyor. Kral, yanında muhafızlarla *içeri* giriyor.',
      ],
      choices: [
        { text: '"Bu deri, papirüsten sağlamdır, Kralım"', effect: { akil: 1 }, to: 'k2' },
        { text: 'Konuşma, yaprağı ışığa tut, göster', effect: { flags: ['sessiz'] }, to: 'k2' },
        { text: '"Mısır bize iyilik etti, Kralım"', effect: { akil: 2, flags: ['nukte'] }, to: 'k2' },
      ],
    },
    k2: {
      bg: 'kutuphane', hands: 'kitap', day: 4,
      lines: [
        { when: has('nukte'), text: 'Kral bir an duruyor, sonra *kahkaha* atıyor: "Doğru! Bizi papirüsten kurtardılar!"' },
        { when: not('nukte'), text: 'Kral yaprağı parmaklarının arasında *ovuyor*. Kokluyor bile.' },
        '"Kaç tane *yapabilirsiniz*?"',
        { when: (st) => st.flags.includes('usta_not') || st.flags.includes('deneyci'), text: 'Notlarını gösteriyorsun: Her deri türü, her *kazıma* yöntemi.' },
      ],
      choices: [
        { text: '"Ayda bin yaprak, debbağ sayısı ikiye katlanırsa"', effect: { akil: 1, flags: ['plan'] }, to: 'k3' },
        { text: '"Ne kadar isterseniz, gece gündüz çalışırız"', effect: { beden: 1 }, to: 'k3' },
      ],
    },
    k3: {
      bg: 'bergama_akropol', hands: 'kese', day: 4,
      lines: [
        'Kral bir *kese* uzatıyor. "Bergama\'nın kitapları senin derinle yazılacak."',
        { when: has('plan'), text: 'Debbağhanelere yeni işçiler *alınıyor*. Planın uygulanıyor.' },
        'O gece kentte bir *kutlama*. Ama kütüphanecilerden biri eksik.',
        'Krates öksürüyor. Yüzü *kızarmış*.',
      ],
      choices: [{ text: 'Keseyi al', effect: { para: 3 }, to: '@aksam', then: 'a1' }],
    },

    // ---------- BÖLÜM 2: Asklepion ----------
    a1: {
      bg: 'kutuphane', hands: 'uzan', day: 4,
      lines: [
        'Krates *hasta*. Ateşler içinde, öksürüyor.',
        'Kâtipler korkuyor: "Onu *Asklepion*\'a götürelim."',
        'Ovadaki şifa tapınağı. Sağlık tanrısı Asklepios\'un *evi*.',
      ],
      choices: [
        { text: 'Krates\'i sırtında taşı', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: 'a2' },
        { text: 'Bir sedye ve iki taşıyıcı bul', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: 'a2' },
      ],
    },
    a2: {
      bg: 'asklepion', hands: 'uzan', day: 4,
      lines: [
        'Uzun, sütunlu bir yol. Sonunda bir avlu, bir *kutsal kaynak*.',
        'Hastalar kaynağın suyuyla *yıkanıyor*. Bir yerde müzik çalıyor.',
        'Sütunlardan birine *yılan* sarılı bir asa kazınmış.',
        'Rahip-hekim: "Önce arınacak. Sonra *uyuyacak*."',
      ],
      choices: [
        { text: '"Uyumak mı? İlaç yok mu?"', effect: { akil: 1 }, to: 'a3a' },
        { text: 'Krates\'i yıka, hazırla', effect: { beden: 1 }, to: 'a3b' },
      ],
    },
    a3a: {
      bg: 'asklepion', hands: 'uzan', day: 4,
      lines: [
        'Hekim gülümsüyor: "İlaç da *var*. Bitkiler, merhemler, diyet."',
        '"Ama önce hasta dinlenir. Tanrı ona rüyasında *yolu* gösterir. Biz rüyayı yorumlarız."',
        'Sessizlik, temiz su, müzik, *uyku*. Burada iyileşen çok.',
      ],
      choices: devam('a4', 'Krates\'i uyku salonuna götür'),
    },
    a3b: {
      bg: 'asklepion', hands: 'uzan', day: 4,
      lines: [
        'Soğuk su Krates\'in ateşini biraz *düşürüyor*.',
        'Gözlerini açıyor: "Kitaplar... *parşömenler* kuru mu?"',
        'Hasta bile kütüphanesini *düşünüyor*.',
      ],
      choices: devam('a4', 'Krates\'i uyku salonuna götür'),
    },
    a4: {
      bg: 'asklepion', hands: 'dinlen', day: 5,
      lines: [
        'Gece. Uyku salonunda onlarca hasta yerde *uyuyor*.',
        'Zararsız yılanlar aralarında *süzülüyor*. Kimse korkmuyor.',
        'Sabah Krates rüyasını *anlatıyor*: "Bir ırmakta yıkanıyordum. Sonra bir keçi sütü içtim."',
      ],
      choices: [
        { text: 'Hekimin yorumunu dinle', effect: { akil: 1 }, to: 'a5' },
        { text: '"Rüya değil, dinlenme iyileştirdi" de', effect: { akil: 1, flags: ['supheci'] }, to: 'a5' },
        { text: 'Keçi sütü bulmaya git', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'a5' },
      ],
    },
    a5: {
      bg: 'asklepion', hands: 'uzan', day: 5,
      lines: [
        'Günler sonra Krates *ayağa* kalkıyor.',
        { when: has('supheci'), text: 'Hekim sana göz kırpıyor: "Belki ikisi *birden*."' },
        'Kütüphaneye döndüğünde ilk işi bir parşömene *yazmak*: "Asklepion\'da gördüklerim."',
        'Bilgi yine *kaydediliyor*.',
      ],
      choices: aksam('r1'),
    },

    // ---------- BÖLÜM 3: Efes, Roma çağı ----------
    r1: {
      bg: 'kutuphane', hands: 'uzan', day: 6,
      lines: [
        'Yıllar geçiyor. Krates, Eumenes, *herkes* gidiyor. Sen kalıyorsun.',
        'Son kral *Attalos*, ölürken krallığını vasiyetle *Roma*\'ya bırakıyor.',
        'Kentlere Roma valileri, Roma askerleri, Roma *yolları* geliyor.',
        'Bergama\'nın eski görkemi *soluyor*. Gözler artık Efes\'te.',
      ],
      choices: [
        { text: 'Kuzeye, Karadeniz\'e doğru yürü', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'am1' },
        { text: 'Bir gemiye bin, Karadeniz kıyısına git', cost: { para: 1 }, effect: { para: -1 }, to: 'am1' },
      ],
    },
    am1: {
      bg: 'amasya', hands: 'uzan', day: 6, place: 'Amasya', year: 'MÖ 50',
      lines: [
        'Karadeniz\'in iç yamaçlarında, yeşil bir ırmağın kıyısında bir kent: *Amasya*.',
        'Irmağın üstündeki sarp kayaya *mezarlar* oyulmuş. Kapıları göğe bakıyor.',
        'Bunlar Pontus *krallarının* mezarları. Krallık az önce Roma\'ya yenildi.',
      ],
      choices: [
        { text: 'Kaya mezarlarına tırman', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'am2' },
        { text: 'Irmak kıyısındaki evlerde bir han bul', effect: { enerji: 10 }, to: 'am2' },
      ],
    },
    am2: {
      bg: 'amasya', hands: 'uzan', day: 6,
      lines: [
        'Bir delikanlı peşine *takılıyor*. On dört, on beş yaşında.',
        '"Sen *yabancısın*. Nerelerden geldin? Doğuyu gördün mü? Denizi?"',
        'Adı *Strabon*. Zengin bir ailenin oğlu, sorulardan ibaret bir çocuk.',
        '"Ben bir gün bütün *dünyayı* yazacağım."',
      ],
      choices: [
        { text: 'Van Gölü\'nü ve kayadaki kaleyi anlat', effect: { akil: 1, flags: ['anlatti_van'] }, to: 'am3' },
        { text: 'Kızılırmak\'ı ve güneşin karardığı günü anlat', effect: { akil: 1, flags: ['anlatti_tutulma'] }, to: 'am3' },
        { text: 'Kaş açıklarındaki batığı anlat', effect: { akil: 1, flags: ['anlatti_batik'] }, to: 'am3' },
      ],
    },
    am3: {
      bg: 'amasya', hands: 'uzan', day: 6,
      lines: [
        'Strabon gözlerini kırpmadan *dinliyor*. Sonra bir sürü soru.',
        '"Ama bunlar *yüzyıllar* önce olmuş. Sen nasıl gördün?"',
        'Ölümsüzlüğünün sırrı yine kıl payı *ağzından* kaçıyor.',
      ],
      choices: [
        { text: '"Dedemin dedesi anlatırdı"', effect: { akil: 1 }, to: 'am4' },
        { text: '"Kitaplarda okudum"', effect: { akil: 1 }, to: 'am4' },
        { text: 'Ona gerçeği söyle', effect: { flags: ['strabon_sir'] }, to: 'am4' },
      ],
    },
    am4: {
      bg: 'amasya', hands: 'kitap', day: 7,
      lines: [
        { when: has('strabon_sir'), text: 'Strabon *gülüyor*. Sana inanmıyor. Ama hikâyelerini yazıyor.' },
        { when: not('strabon_sir'), text: 'Strabon başını *sallıyor*. Ama hikâyelerini yazıyor.' },
        'Yıllar sonra İskenderiye\'de, Roma\'da okuyacak. Dünyayı *gezecek*.',
        'Yazdığı on yedi kitaplık *Coğrafya* bu toprakların en ayrıntılı tarifi olacak.',
        'Kendi kentini, Amasya\'yı da *uzun uzun* anlatacak.',
      ],
      choices: [
        { text: 'Ona bir parşömen hediye et', cost: { para: 1 }, effect: { para: -1, flags: ['strabon_hediye'] }, to: '@aksam', then: 'r2' },
        { text: 'Vedalaş, yola çık', to: '@aksam', then: 'r2' },
      ],
    },
    r2: {
      bg: 'efes_cadde', hands: 'uzan', day: 7, place: 'Efes', year: 'MS 117', currency: 'dinar',
      lines: [
        'Efes. Roma\'nın Asya eyaletinin *başkenti*. Mermer caddeler, fıskiyeler.',
        'Kalabalık: Yunanca, Latince, Aramice, *İbranice*. Liman gemilerle dolu.',
        'Bir sarraf eski drahmilerini Roma *dinarına* çeviriyor.',
        { when: has('temel'), text: 'Lidya sikkesini gömdüğün o tapınağın yerinde şimdi çok daha *büyüğü* var.' },
        { when: (st) => st.flags.includes('strabon_hediye'), text: 'Bir kitapçıda Strabon\'un *Coğrafya*\'sını görüyorsun. O çocuk sözünü tutmuş.' },
      ],
      choices: [
        { text: 'Yeni yapılan kütüphanenin şantiyesine git', effect: { akil: 1 }, to: 'r3' },
        { text: 'Limanda hamallık yap', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, to: 'r3b' },
      ],
    },
    r3b: {
      bg: 'efes_cadde', hands: 'sepet', day: 7,
      lines: [
        'Gemilerden *zeytinyağı*, şarap, Mısır buğdayı iniyor.',
        'Liman başı söyleniyor: "Nehir her yıl *çamur* getiriyor. Liman doluyor."',
        '"Bir gün deniz buradan *çekilecek*." Kimse ona inanmıyor.',
      ],
      choices: devam('r3', 'Akşam şantiyeye uğra'),
    },
    r3: {
      bg: 'celsus', hands: 'uzan', day: 7,
      lines: [
        'Caddenin sonunda iki katlı, sütunlu bir *cephe* yükseliyor.',
        'Nişlerde dört kadın heykeli: *Bilgelik*, Erdem, Akıl, Bilgi.',
        'Yaptıran *Aquila*. Babası Celsus için.',
        'Usta fısıldıyor: "Celsus bu binanın *altına* gömülecek. Kitaplarının arasına."',
      ],
      choices: [
        { text: '"Kent içine gömülmek yasak değil mi?"', effect: { akil: 1 }, to: 'r4a' },
        { text: 'İskelede çalışmak iste', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: 'r4b' },
      ],
    },
    r4a: {
      bg: 'celsus', hands: 'uzan', day: 7,
      lines: [
        '"Yasak," diyor usta. "Ama Celsus *vali* idi. Bu bir onur."',
        '"Kitaplar için de *yirmi beş bin* dinar bıraktı. Her yıl yeni tomar alınacak."',
        'Bir adam ölünce bile *okutmaya* devam ediyor.',
      ],
      choices: aksam('r5'),
    },
    r4b: {
      bg: 'celsus', hands: 'cekic', day: 7,
      lines: [
        'Mermer blokları makaralarla *kaldırıyorsunuz*.',
        'Cephe gerçekte olduğundan büyük *görünsün* diye ustalar hile yapıyor:',
        'Ortadaki sütunlar daha *kalın*, kenardakiler daha ince.',
      ],
      choices: aksam('r5'),
    },
    r5: {
      bg: 'kutuphane', hands: 'kitap', day: 8,
      lines: [
        'İçeride üç kat *niş*. Arkalarında ikinci bir duvar: Nem tomarlara ulaşmasın.',
        'On iki bin *tomar* yerleştirilecek.',
        'Kütüphane müdürü sandıkları açıyor. İçinde Bergama\'dan gelen *parşömenler*.',
        { when: has('debbag'), text: 'Bir yaprağı ışığa tutuyorsun. Belki senin kazıdığın derilerden *biri*.' },
      ],
      choices: [
        { text: 'Tomarları konuya göre sırala', effect: { akil: 2, flags: ['katalog'] }, to: 'r6' },
        { text: 'Sandıkları üst kata taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2 }, to: 'r6' },
        { text: 'Katlanıp dikilmiş bir parşömen kitap göster', show: has('kodeks'), effect: { akil: 1 }, to: 'r6' },
      ],
    },
    r6: {
      bg: 'celsus', hands: 'uzan', day: 8,
      lines: [
        'Açılış günü. Kalabalık basamaklara *doluşuyor*.',
        'Aşağıdaki mezar odasında Celsus\'un mermer *lahdi*. Üstünde kitapları.',
        { when: has('katalog'), text: 'Müdür herkesin önünde senin sıralamanı *övüyor*.' },
        'Kapılar *açılıyor*. Her yurttaş okuyabilir.',
      ],
      choices: devam('r7'),
    },
    r7: {
      bg: 'efes_tiyatro', hands: 'uzan', day: 9,
      lines: [
        'Efes tiyatrosu dağın yamacına oyulmuş. *Yirmi binden* fazla kişi.',
        'Sahnede bir oyun. Ama kalabalık asıl akşamki *gladyatör* gösterisini bekliyor.',
        'Bir tüccar sana yaslanıyor: "Gladyatörlere *iyi* para veriyorlar. Güçlüsün."',
      ],
      choices: [
        { text: '"Ben dövüşmem. Ama yaralılarına bakarım"', effect: { akil: 1, flags: ['hekim_yardim'] }, to: 'r8a' },
        { text: '"Ne kadar?"', effect: { flags: ['gladyator_merak'] }, to: 'r8b' },
        { text: 'Oyunu izle, gülüp eğlen', effect: { enerji: 10 }, to: 'r8c' },
      ],
    },
    r8a: {
      bg: 'efes_tiyatro', hands: 'uzan', day: 9,
      lines: [
        'Gladyatör okulunun hekimi seni *yanına* alıyor.',
        'Kırık kemikleri sarmayı, yaraları sirkeyle *yıkamayı* öğreniyorsun.',
        '"Gladyatör pahalı bir yatırımdır," diyor hekim. "Ölmesine *izin* verilmez."',
      ],
      choices: aksam('g1'),
    },
    r8b: {
      bg: 'arena', hands: 'kilic', day: 9,
      lines: [
        'Okulun sahibi seni *ölçüyor*. Kollarını, omuzlarını.',
        '"Bir yıl antrenman. Ekmek, arpa, *bakla*. Sonra arena."',
        'Gladyatörlere "*arpa yiyenler*" diyorlar. Et yok; arpa ve baklagil.',
      ],
      choices: [
        { text: 'Antrenmanı dene', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['gladyator'] }, to: '@aksam', then: 'g1' },
        { text: 'Vazgeç', effect: { akil: 1 }, to: '@aksam', then: 'g1' },
      ],
    },
    r8c: {
      bg: 'efes_tiyatro', hands: 'uzan', day: 9,
      lines: [
        'Komedi bir *hırsız* köleyi anlatıyor. Bütün tiyatro kahkahalarla sarsılıyor.',
        'Ses o kadar *iyi* yayılıyor ki en üst sıradan fısıltı bile duyuluyor.',
      ],
      choices: aksam('g1'),
    },

    // ---------- BÖLÜM 4: Galenos ----------
    g1: {
      bg: 'arena', hands: 'uzan', day: 10, place: 'Bergama', year: 'MS 157',
      lines: [
        'Yine yıllar geçti. Yine *Bergama*\'dasın.',
        'Gladyatör okulunun yeni hekimi yirmili yaşlarında genç biri: *Galenos*.',
        'Bergamalı. İskenderiye\'de *okumuş*. Gözleri merakla dolu.',
        '"Yara, insan bedenine açılan bir *penceredir*," diyor.',
      ],
      choices: [
        { text: 'Ona yardımcı ol', effect: { akil: 1, flags: ['galenos'] }, to: 'g2a' },
        { text: 'Gladyatör olarak arenaya çık', show: has('gladyator'), cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: 'g2b' },
        { text: 'Okulda aşçılık yap', effect: { para: 1 }, to: 'g2a' },
      ],
    },
    g2a: {
      bg: 'arena', hands: 'uzan', day: 10,
      lines: [
        'Galenos yaralara şarapla *pansuman* yapıyor. Diyeti, egzersizi kendi belirliyor.',
        { when: has('hekim_yardim'), text: 'Efes\'te öğrendiklerini anlatıyorsun. Galenos *not* alıyor.' },
        'Onun döneminde ölen gladyatör sayısı *azalıyor*.',
      ],
      choices: aksam('g3'),
    },
    g2b: {
      bg: 'arena', hands: 'kilic', day: 10,
      lines: [
        'Kum, kalabalık, *güneş*. Karşında bir başka gladyatör.',
        'Kılıçlar *çarpışıyor*. Kolunda bir yara açılıyor.',
        'Kalabalık bağırıyor. Ama ikiniz de *ayakta* kalıyorsunuz. Bu kez.',
      ],
      choices: [{ text: 'Galenos\'a git', effect: { flags: ['yarali'] }, to: '@aksam', then: 'g3' }],
    },
    g3: {
      bg: 'arena', hands: 'uzan', day: 11,
      lines: [
        'Bir gladyatörün karnı *açılmış*. Herkes ölecek diyor.',
        'Galenos başını kaldırıyor: "Bana *ışık* ve temiz su getirin."',
        { when: has('yarali'), text: 'Kendi yaran sızlıyor ama *koşuyorsun*.' },
      ],
      choices: [
        { text: 'Lambaları getir, ışığı tut', effect: { beden: 1 }, to: 'g4' },
        { text: 'Suyu kaynat, bezleri hazırla', effect: { akil: 1, flags: ['temiz'] }, to: 'g4' },
        { text: 'Yaralıyı tut, sakinleştir', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'g4' },
      ],
    },
    g4: {
      bg: 'arena', hands: 'uzan', day: 11,
      lines: [
        'Galenos bağırsakları yerine *yerleştiriyor*, dikiyor.',
        'Gladyatör günler sonra yürüyor. Okul sahibi *şaşkın*.',
        'Galenos gece lamba ışığında yazıyor. Durmadan, *yüzlerce* sayfa.',
        '"Gördüğünü yazmazsan *ölür*," diyor sana. Krates\'in sesini duyar gibisin.',
      ],
      choices: [
        { text: 'Ona parşömen getir', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: 'g5' },
        { text: 'Notlarını temize çek', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 2, flags: ['galen_kopya'] }, to: 'g5' },
        { text: 'Onu dinle', effect: { akil: 1 }, to: 'g5' },
      ],
    },
    g5: {
      bg: 'bergama_akropol', hands: 'uzan', day: 12,
      lines: [
        { when: has('kodeks'), text: 'Kitapçılarda artık katlanmış, dikilmiş parşömen kitaplar *satılıyor*. Senin önerdiğin şey.' },
        { when: has('katalog'), text: 'Efes\'teki kütüphane hâlâ senin sıranla *duruyor*.' },
        { when: has('galenos'), text: 'Galenos Roma\'ya gidecek. İmparatorların *hekimi* olacak.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'g6' }],
    },
    g6: {
      bg: 'bergama_akropol', hands: 'dinlen', day: 12,
      lines: [
        'Galenos\'un kitapları bin yıldan uzun süre *okutulacak*. Hekimler onunla yetişecek.',
        'Zeus sunağı bir gün sökülüp uzak bir ülkenin *müzesine* götürülecek.',
        'Celsus Kütüphanesi yıkılacak, sonra taş taş *yeniden* dikilecek.',
        'Ve kuzeyde, iki denizin arasında, *Roma* yeni bir başkent kuracak.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_iskenderiye: {
      bg: 'kutuphane', hands: 'uzan',
      lines: [
        'İskenderiye\'den bir *bilgin* geldi. Bergama\'da çalışmak istiyor.',
        'Ama Mısır\'a dönerse hapse atılacağını *söylüyor*. Orada biri böyle cezalandırılmış.',
      ],
      choices: [
        { text: 'Onu gizlice kütüphaneye yerleştir', effect: { akil: 1, flags: ['bilgin'] }, to: '@don' },
        { text: 'Krallık meselesi, karışma', to: '@don' },
      ],
    },
    e_yilan: {
      bg: 'asklepion', hands: 'uzan',
      lines: [
        'Bir çocuk Asklepion\'un yılanlarından birini *yakalamış*, sallıyor.',
        'Rahipler *dehşet* içinde. Yılan kutsal.',
      ],
      choices: [
        { text: 'Yılanı sakince al, yerine bırak', effect: { beden: 1 }, to: '@don' },
        { text: 'Çocuğa yılanların neden zararsız olduğunu anlat', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_sunak: {
      bg: 'bergama_akropol', hands: 'uzan',
      lines: [
        'Sunağın frizinde bir heykeltıraş bir devin *yüzünü* oyuyor.',
        'Acı çeken bir yüz. Sanki taştan *çığlık* atıyor.',
        '"Model *lazım*," diyor sana. "Biraz acı çeker misin?"',
      ],
      choices: [
        { text: 'Poz ver', effect: { para: 1, flags: ['model'] }, to: '@don' },
        { text: 'Gülerek reddet', to: '@don' },
      ],
    },
    e_kitap_hirsiz: {
      bg: 'bergama_cadde', hands: 'kitap',
      lines: [
        'Bir zengin, kütüphaneye vermemek için kitaplarını *toprağa* gömüyor.',
        '"Kral her kitabı alıyor! Benimkileri *alamayacak*."',
      ],
      choices: [
        { text: 'Kopyasını çıkarıp aslını iade etmeyi öner', effect: { akil: 1 }, to: '@don' },
        { text: 'Kazmasını taşı, karışma', effect: { para: 1 }, to: '@don' },
      ],
    },
    e_tuvalet: {
      bg: 'efes_cadde', hands: 'uzan',
      lines: [
        'Halk tuvaletinde yan yana mermer *oturaklar*. Altından su akıyor.',
        'Kimse utanmıyor. Herkes *sohbet* ediyor: Fiyatlar, vergiler, dedikodu.',
        'Yanındaki adam soruyor: "Sen de mi yeni geldin?"',
      ],
      choices: [
        { text: 'Sohbete katıl, kenti öğren', effect: { akil: 1 }, to: '@don' },
        { text: 'Hızla bitir, kaç', to: '@don' },
      ],
    },
    e_gumus: {
      bg: 'efes_cadde', hands: 'kese',
      lines: [
        'Gümüşçüler küçük *Artemis* heykelcikleri satıyor.',
        'Hacılar tapınaktan dönerken hepsi bir tane *alıyor*.',
      ],
      choices: [
        { text: 'Bir tane al', cost: { para: 1 }, effect: { para: -1, flags: ['artemis'] }, to: '@don' },
        { text: 'Gümüşçüye çırak ol bir günlüğüne', cost: { enerji: 10 }, effect: { enerji: -10, para: 2 }, to: '@don' },
      ],
    },
    e_liman: {
      bg: 'efes_cadde', hands: 'sepet',
      lines: [
        'Liman yine *çamurla* doldu. Gemiler yanaşamıyor.',
        'Vali yüzlerce işçiyle limanı *temizletiyor*.',
      ],
      choices: [
        { text: 'Kürek al, çamur çek', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, para: 2 }, to: '@don' },
        { text: '"Nehrin ağzını çevirmek gerek" de', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_yazit: {
      bg: 'efes_cadde', hands: 'uzan',
      lines: [
        'Mermer kaldırımda birinin kazıdığı bir *oyun tahtası*.',
        'İki yaşlı adam *taşlarla* oynuyor. Biri seni çağırıyor.',
      ],
      choices: [
        { text: 'Oyna', effect: { enerji: 10 }, to: '@don' },
        { text: 'Bahse gir', cost: { para: 1 }, effect: { para: 1, akil: 1 }, to: '@don' },
      ],
    },
    e_hamam: {
      bg: 'efes_cadde', hands: 'dinlen',
      lines: [
        'Hamamda sıcak, ılık, soğuk *odalar*. Yerin altında ateş yanıyor, sıcak hava döşemenin altından dolaşıyor.',
        'Romalılar için hamam bir *meydan* gibi: İş, dostluk, siyaset.',
      ],
      choices: [
        { text: 'Gir, yıkan', cost: { para: 1 }, effect: { para: -1, enerji: 25 }, to: '@don' },
        { text: 'Ocakçılara yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'iskenderiye', start: 'e_iskenderiye', when: bergama },
    { id: 'yilan', start: 'e_yilan', when: bergama },
    { id: 'sunak', start: 'e_sunak', when: bergama },
    { id: 'kitap_hirsiz', start: 'e_kitap_hirsiz', when: bergama },
    { id: 'tuvalet', start: 'e_tuvalet', when: efes },
    { id: 'gumus', start: 'e_gumus', when: efes },
    { id: 'liman', start: 'e_liman', when: efes },
    { id: 'yazit', start: 'e_yazit', when: efes },
    { id: 'hamam', start: 'e_hamam', when: efes },
  ],
};

ERA6.hub = {
  intro: (st) => st.yer === 'Amasya'
    ? ['Irmağın üstünde kaya mezarları akşam ışığında *kızarıyor*.', 'Yeşilırmak karanlıkta *uğulduyor*.']
    : efes(st)
    ? ['Efes\'te akşam. Mermer cadde kandillerle *aydınlanıyor*.', 'Limandan gemicilerin *şarkıları* geliyor.', 'Hamamların bacaları *tütüyor*.']
    : ['Bergama\'nın tepesinde gün *batıyor*.', 'Kütüphanenin kapıları *kapanıyor*.', 'Ovadan serin bir *rüzgâr* yükseliyor.'],
  acts: [
    { id: 'kopya', show: bergama, text: 'Kütüphanede kitap kopyala', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 1, para: 1 }, hands: 'kalem',
      res: [['Homeros\'un dizelerini parşömene *geçiriyorsun*.', 'Satır satır, *sabırla*.'], ['Bir hekimin bitkiler kitabını *kopyalıyorsun*.', 'Her kopya bilgiyi *çoğaltıyor*.']] },
    { id: 'okuma', show: bergama, text: 'Bir kopyacıdan Yunan harflerini öğren', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1, flags: ['yazi'] }, hands: 'kitap',
      res: [['Yirmi dört *harf*. Çivi yazısının yüzlerce işaretinden ne kadar az!', 'Hızla *öğreniyorsun*.'], ['Her ses için bir *harf*.', 'Okumak artık herkesin olabilir.']] },
    { id: 'deri', show: bergama, text: 'Debbağhanede deri kazı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'cekic',
      res: [['Kireç gözlerini *yakıyor*. Ama yaprak inceliyor.', 'Ustabaşı iki drahmi veriyor.'], ['Bir deri *yırtıldı*. Baştan.', 'Sonunda kusursuz bir yaprak.']] },
    { id: 'tiyatro', show: bergama, text: 'Tiyatroda bir tragedya izle', effect: { akil: 1, enerji: 5 },
      res: [['Bir kral, kendi kaderinden *kaçamıyor*.', 'Sen de kaçamıyorsun: Ölümsüzlükten.'], ['Koro dik basamaklarda *yankılanıyor*.', 'Bütün kent aynı anda *ağlıyor*.']] },
    { id: 'liman', show: efes, text: 'Limanda gemi boşalt', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'sepet',
      res: [['Amforalar, *amforalar*.', 'Liman başı sana iki dinar sayıyor.'], ['Bir gemi Mısır buğdayı *getirmiş*.', 'Ambarlar doluyor.']] },
    { id: 'okuma_efes', show: efes, text: 'Kütüphanede oku', effect: { akil: 1 }, hands: 'kitap',
      res: [['Bir coğrafyacı, *Amasya*\'lı Strabon, bütün dünyayı anlatmış.', 'Kendi topraklarını *okuyorsun*.'], ['Bir filozof, *Sinop*\'lu Diogenes\'i anlatıyor: Fıçıda yaşayan adam.', 'Az şeyle *mutlu*.']] },
    { id: 'antrenman', show: (st) => efes(st) || st.flags.includes('gladyator'), text: 'Gladyatör okulunda tahta kılıçla çalış', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2 }, hands: 'kilic',
      res: [['Tahta kılıç, *ağır* kalkan.', 'Kolun titriyor ama *güçleniyor*.'], ['Hoca bağırıyor: "Kalkanı *indirme*!"', 'Bir darbe yiyorsun. Ders alındı.']] },
    { id: 'bahce', show: (st) => st.yer === 'Amasya', text: 'Irmak kıyısındaki bahçelerde meyve topla', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'sepet',
      res: [['Sepetin elmayla, armutla *doluyor*.', 'Bahçe sahibi sana bir drahmi veriyor.'], ['Ağaçların altında serin bir *gölge*.', 'Karadeniz havası *yumuşak*.']] },
    { id: 'strabon_ders', show: (st) => st.yer === 'Amasya', text: 'Strabon\'a harita çizmeyi göster', effect: { akil: 1 },
      res: [['Kumun üstüne bir *kıyı* çiziyorsun. Strabon hemen kopyalıyor.', '"Burası *Sinop* mu?"'], ['Dağları, ırmakları *sıralıyorsun*.', 'Çocuk her birinin adını *ezberliyor*.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda bir *yılan* görüyorsun. Asklepios\'un yılanı.', 'Dinlendin.']] },
  ],
};
