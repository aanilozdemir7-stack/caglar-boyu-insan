// ÇAĞ 13 — Bilgi çağı: Ankara (1993) → İstanbul (1994-1997) → Gölcük (1999) → İstanbul (2005-2008)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - 12 Nisan 1993: ODTÜ'de, TÜBİTAK işbirliğiyle 64 Kbps kiralık hat üzerinden ABD'deki NSFNet'e ilk sürekli
//   internet bağlantısı kuruldu. Bu hat uzun süre ülkenin tek çıkışı oldu.
// - 23 Şubat 1994: Başbakan, Cumhurbaşkanı'nı cep telefonuyla arayarak ülkedeki ilk GSM görüşmesini yaptı.
// - 17 Ağustos 1999 saat 03.02: Merkez üssü Gölcük olan 7,4 büyüklüğünde deprem, yaklaşık 45 saniye sürdü;
//   Kocaeli, Yalova, Sakarya, İstanbul ve Düzce'de yıkım; resmî rakamlara göre 17 binden fazla can kaybı.
//   Kızılay ve Sivil Savunma'nın yanında AKUT gibi gönüllü arama kurtarma grupları da çalıştı.
// - 1 Ocak 2005: Yeni Türk Lirası; paradan altı sıfır atıldı.
// - 2000'lerin sonunda akıllı telefonlar yaygınlaşmaya başladı.
// Karakter adları (Selim, Aylin, Nermin Hanım, Efe) kurgu. Nermin, 12. çağdaki gecekondulu kızdır.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const deprem = (st) => st.yer === 'Gölcük';
const doksanlar = (st) => ['1993', '1994', '1997'].includes(st.yil);

export const ERA13 = {
  id: 13,
  name: 'Bilgi çağı',
  place: 'Ankara',
  region: 'Ankara, İstanbul ve Kocaeli',
  year: '1993',
  currency: 'milyon lira',
  start: 'n1',
  next: { name: 'Yakın gelecek', place: 'İstanbul', year: '2041' },

  carry(st) {
    st.para = Math.min(30, Math.max(5, st.para));
    st.enerji = Math.max(st.enerji, 70);
    return `Enflasyon her şeyi değiştirdi: Kesende ${st.para} milyon lira var. Bir simit bile bin liralarla satılıyor.`;
  },

  scenes: {
    // ---------- BÖLÜM 1: İlk bağlantı ----------
    n1: {
      bg: 'kampus', hands: 'uzan', day: 1, place: 'Ankara', year: '1993',
      lines: [
        'Yirmi yıl. Ankara\'da bir üniversite *kampüsü*. Ağaçlı yollar, beton binalar, bisikletli öğrenciler.',
        'Bilgi işlem binasının önünde bir kablo *kanalı* kazılıyor.',
        'Bir öğrenci heyecanla anlatıyor: "Dünyaya *bağlanacağız*! Amerika\'daki bilgisayarlara!"',
        { when: has('nermin'), text: 'Kantinde orta yaşlı bir kadın sana bakıp *donuyor*: Nermin. "Sen... hiç değişmemişsin."' },
      ],
      choices: [
        { text: 'Bilgi işlem merkezinde iş iste', req: (st) => st.akil >= st.beden || st.flags.includes('yazi'), reqText: 'Bilgisayar için önce akıl yolunu seçmiş olmalıydın', effect: { akil: 1, flags: ['bilgiislem'] }, to: 'n2a' },
        { text: 'Kablo kanalının kazısına katıl', effect: { beden: 1, flags: ['kablocu'] }, to: 'n2b' },
        { text: 'Nermin\'le konuş', show: has('nermin'), effect: { flags: ['nermin13'] }, to: 'n2c' },
      ],
    },
    n2a: {
      bg: 'bilgisayar_odasi', hands: 'uzan', day: 1,
      lines: [
        'Soğuk bir oda. Uğuldayan dolaplar, yeşil yazılı *ekranlar*, kablo yığınları.',
        'Sistem yöneticisi *Selim*: "Postaneden 64 kilobitlik bir hat aldık. Ülkenin *tek* çıkışı olacak."',
        '"Bu hattan bütün üniversiteler, bütün araştırmacılar *dünyaya* açılacak."',
        { when: has('mors_izle'), text: 'Galata\'daki telgrafın tıkırtısı aklına geliyor. Nokta, çizgi. Şimdi *sıfır*, bir.' },
      ],
      choices: [{ text: 'Yönlendiricinin kablolarını hazırla', effect: { akil: 1 }, to: '@olay', then: 'n3' }],
    },
    n2b: {
      bg: 'kampus', hands: 'cekic', day: 1,
      lines: [
        'Kazma, kürek, *boru*. Kablo binalar arasından geçecek.',
        'Yanındaki işçi: "Bu kablonun içinden ne *geçecek* abi?"',
        'Bir anlığına düşünüyorsun: Bir zamanlar teller *söz* taşıyordu. Şimdi?',
      ],
      choices: [
        { text: '"Bütün kütüphaneler"', effect: { akil: 1 }, to: '@olay', then: 'n3' },
        { text: '"Bilmem, ama sağlam döşeyelim"', effect: { beden: 1 }, to: '@olay', then: 'n3' },
      ],
    },
    n2c: {
      bg: 'kampus', hands: 'uzan', day: 1,
      lines: [
        'Nermin artık bir *profesör*. İnşaat mühendisliği. Depreme dayanıklı yapılar üzerine çalışıyor.',
        '"Babam gecekonduyu bir gecede yapmıştı. Ben öğrencilerime *sağlam* yapmayı öğretiyorum."',
        '"Ama sen... Nasıl hiç *yaşlanmadın*?"',
      ],
      choices: [
        { text: 'Ona gerçeği anlat', effect: { flags: ['nermin_sir'] }, to: '@olay', then: 'n3' },
        { text: '"İyi genlerim var" deyip gülümse', effect: { akil: 1 }, to: '@olay', then: 'n3' },
      ],
    },
    n3: {
      bg: 'bilgisayar_odasi', hands: 'uzan', day: 2,
      lines: [
        'Nisan. Bütün ekip ekranın *başında*. Selim bir komut yazıyor.',
        'Ekranda satırlar *akıyor*. Sonra bir cevap: Okyanusun öbür yanındaki bir bilgisayardan.',
        '"*Bağlandık*!" Oda alkışla sarsılıyor.',
        { when: has('kablocu'), text: 'Döşediğin kablonun içinden şimdi bir *ülke* geçiyor.' },
        { when: has('nermin_sir'), text: 'Nermin sana bakıyor. Sırrını *taşıyan* ikinci kişi oldu.' },
      ],
      choices: [
        { text: 'İlk e-postanı yaz', effect: { akil: 1, flags: ['eposta'] }, to: 'n4' },
        { text: 'Kampüste herkese haber ver', effect: { beden: 1 }, to: 'n4' },
      ],
    },
    n4: {
      bg: 'bilgisayar_odasi', hands: 'kalem', day: 2,
      lines: [
        { when: has('eposta'), text: 'Kime yazacaksın? Binlerce yıldır *tanıdığın* kimse hayatta değil.' },
        { when: has('eposta'), text: 'Sonunda kendine yazıyorsun: "Gelecekteki bana. Hâlâ buradaysan, *unutma*."' },
        'Bir sayfa açılması *dakikalar* sürüyor. Ama açılıyor.',
        'Selim: "Bir gün herkesin cebinde *olacak* bu." Kimse inanmıyor.',
      ],
      choices: aksam('c1'),
    },

    // ---------- BÖLÜM 2: Cep ----------
    c1: {
      bg: 'cep_dukkan', hands: 'uzan', day: 3, place: 'İstanbul', year: '1994',
      lines: [
        'İstanbul. Bir haber bütün televizyonlarda: Ülkenin *ilk* cep telefonu görüşmesi yapıldı.',
        'Bir vitrinde tuğla büyüklüğünde *telefonlar*. Antenleri uzun, fiyatları uçuk.',
        'Dükkân sahibi *Efe*: "Abi, bunlar gelecek. Bir gün *herkeste* olacak."',
      ],
      choices: [
        { text: 'Dükkânda tezgâhtar ol', effect: { para: 2, flags: ['cepci'] }, to: 'c2a' },
        { text: 'Baz istasyonu kuran ekiplere katıl', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['baz'] }, to: 'c2b' },
        { text: 'Şebekenin nasıl çalıştığını araştır', effect: { akil: 2, flags: ['sebeke'] }, to: 'c2b' },
      ],
    },
    c2a: {
      bg: 'cep_dukkan', hands: 'para', day: 3,
      lines: [
        'İlk müşteri bir *iş adamı*. Telefonu kulağına götürüyor, kaldırımda yüksek sesle konuşuyor.',
        'Herkes ona *bakıyor*. Bir yaşlı kadın: "Kiminle konuşuyor bu deli?"',
        'Efe gülüyor: "Bir gün o kadın da *torunuyla* böyle konuşacak."',
      ],
      choices: devam('c3'),
    },
    c2b: {
      bg: 'cep_dukkan', hands: 'uzan', day: 3,
      lines: [
        'Bir apartmanın çatısına direk ve *anten* kuruluyor. Bina sakinleri tedirgin.',
        'Her direk bir *hücre*. Telefon bir hücreden ötekine geçiyor, görüşme kopmuyor.',
        { when: has('direkci'), text: 'Edirne yolunda telgraf direği diktiğin günler aklına geliyor. Yine *direk*, yine tel... ama artık telsiz.' },
      ],
      choices: devam('c3'),
    },
    c3: {
      bg: 'internet_kafe', hands: 'uzan', day: 4, year: '1997',
      lines: [
        'Üç yıl sonra mahallede bir *internet kafe*. Pencereleri karartılmış, içi gençlerle dolu.',
        'Modem *cızırdıyor*: Bip, bıııızzz, kşşşş... Sonra bağlantı.',
        'Gençler bir *sohbet* odasında, binlerce kilometre öteden insanlarla yazışıyor.',
      ],
      choices: [
        { text: 'Bir saatlik internet al, ilk sayfaya gir', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: '@olay', then: 'c4' },
        { text: 'Kafede tezgâhı çalıştır', effect: { para: 2 }, to: '@olay', then: 'c4' },
        { text: 'Bozulan bilgisayarları onar', show: (st) => st.flags.includes('bilgiislem') || st.flags.includes('sebeke'), effect: { akil: 1, para: 2, flags: ['tamirci'] }, to: '@olay', then: 'c4' },
      ],
    },
    c4: {
      bg: 'internet_kafe', hands: 'uzan', day: 4,
      lines: [
        'Bir arama motoruna *Göbeklitepe* yazıyorsun. Neredeyse hiçbir şey çıkmıyor.',
        'Bir arkeolog yeni kazılara *başlamış* diyor tek bir sayfa.',
        'Taş sütunların fotoğrafı yükleniyor. Satır satır, *yavaş* yavaş.',
        'O sütunlardan birini *sen* taşıdın. On bir bin yıl önce.',
      ],
      choices: [
        { text: 'Sayfayı uzun uzun izle', effect: { enerji: 10, flags: ['gobekli_gordu'] }, to: '@olay', then: 'c5' },
        { text: 'Arkeoloğa e-posta yaz: "Kuzeydeki tepeye bakın"', show: has('eposta'), effect: { akil: 1, flags: ['ipucu'] }, to: '@olay', then: 'c5' },
        { text: 'Kapat, kimse bilmesin', effect: { akil: 1 }, to: '@olay', then: 'c5' },
      ],
    },
    c5: {
      bg: 'cep_dukkan', hands: 'uzan', day: 5,
      lines: [
        'Efe\'nin dükkânı *büyüdü*. Telefonlar küçüldü, renkli ekranlar geldi.',
        'Bir genç kız telefonuna *mesaj* yazıyor. Parmakları tuşlarda uçuyor.',
        { when: has('cepci'), text: 'Efe sana ortaklık *teklif* ediyor.' },
        'Para birimi delirdi: Bir ekmek yüz binlerce *lira*.',
      ],
      choices: [
        { text: 'Ortaklığı kabul et', show: has('cepci'), cost: { para: 3 }, effect: { para: -3, flags: ['ortak13'] }, to: '@aksam', then: 'z1' },
        { text: 'Kocaeli\'ye, Nermin\'in şantiyesine gitmeye karar ver', show: has('nermin13'), effect: { flags: ['nermin_santiye'] }, to: '@aksam', then: 'z1' },
        { text: 'Yazı Marmara kıyısında geçir', effect: { enerji: 10 }, to: '@aksam', then: 'z1' },
      ],
    },

    // ---------- BÖLÜM 3: 17 Ağustos ----------
    z1: {
      bg: 'korfez_gece', hands: 'uzan', day: 6, place: 'Gölcük', year: '1999',
      lines: [
        'Ağustos. İzmit Körfezi\'nde sıcak bir *yaz* gecesi. Balkonlarda çay, sahilde çocuklar.',
        { when: has('nermin_santiye'), text: 'Nermin bir binanın kolonlarına bakıp başını *sallıyor*: "Bu demirler yetmez. Bu beton kum dolu."' },
        'Gece yarısını geçiyor. Kent *uyuyor*.',
      ],
      choices: [
        { text: 'Uyu', effect: { enerji: 15 }, to: 'z2' },
        { text: 'Sahilde yürü, uyuyamıyorsun', effect: { flags: ['disarida'] }, to: 'z2' },
      ],
    },
    z2: {
      bg: 'korfez_gece', hands: 'yok', day: 6,
      lines: [
        'Saat *üçü* iki geçe. Bir uğultu. Önce derinden, sonra her yerden.',
        'Yer *sallanıyor*. Kırk beş saniye. Hayatının en uzun kırk beş saniyesi.',
        { when: has('disarida'), text: 'Sahilde yere çöküyorsun. Deniz *çekiliyor*, sonra geri geliyor.' },
        'Sonra karanlık. Elektrikler gitti. Ve *sesler*.',
      ],
      choices: [{ text: 'Ayağa kalk', to: 'z3' }],
    },
    z3: {
      bg: 'deprem_gece', hands: 'fener', day: 6,
      lines: [
        'El fenerinin ışığında sokak *tanınmaz* hâlde. Binalar yan yatmış, toz bulutu.',
        'Her yerden *sesler*: "Burada biri var! Yardım edin!"',
        'Binlerce yıldır *savaşlar*, yangınlar, salgınlar gördün. Bu da onlardan biri. Ama alışılmıyor.',
      ],
      choices: [
        { text: 'Seslere doğru koş, enkazı elle kaz', cost: { enerji: 25 }, effect: { enerji: -25, beden: 2, flags: ['kurtarma'] }, to: 'z4a' },
        { text: 'İnsanları açık alana topla, yaralıları ayır', effect: { akil: 2, flags: ['organize'] }, to: 'z4b' },
        { text: 'Sesleri dinle, nerede canlı var, işaretle', effect: { akil: 1, flags: ['dinleme'] }, to: 'z4a' },
      ],
    },
    z4a: {
      bg: 'deprem_gece', hands: 'uzan', day: 6,
      lines: [
        'Bir duvarın arkasından ince bir *ses*. Taşları birer birer kaldırıyorsun.',
        'Yanında hiç tanımadığın insanlar. Hepsi *eliyle* kazıyor.',
        { when: has('dinleme'), text: '"*Sessizlik*!" diye bağırıyorsun. Herkes duruyor. Ses tekrar geliyor: Sol tarafta.' },
        'Sabaha karşı bir el *görünüyor*. Sonra bir yüz. Bir çocuk. Yaşıyor.',
      ],
      choices: [{ text: 'Çocuğu kucakla, sedyeye taşı', to: '@olay', then: 'z5' }],
    },
    z4b: {
      bg: 'cadir_kent', hands: 'uzan', day: 6,
      lines: [
        'Bir okul bahçesi. İnsanları buraya *topluyorsun*. Yaralılar bir köşede, çocuklar bir köşede.',
        'Bir doktor *buluyorsun*. Eczaneden ilaç taşıyan gençler.',
        { when: (st) => st.flags.includes('sifa') || st.flags.includes('galenos') || st.flags.includes('usta_hekim'), text: 'Gevher Nesibe\'nin şifahanesinden, Galenos\'un arenasından *bildiğin* şeyler: Temiz su, sargı, sakinlik.' },
        'Gün ağarırken bahçe bir *sahra* hastanesi gibi.',
      ],
      choices: [{ text: 'Su bulmaya git', to: '@olay', then: 'z5' }],
    },
    z5: {
      bg: 'deprem_gece', hands: 'uzan', day: 7,
      lines: [
        'Gün doğuyor. Yıkım ancak şimdi *görünüyor*.',
        'Telefonlar çekmiyor. Haberler parça parça *geliyor*: İzmit, Yalova, Sakarya, Düzce, İstanbul.',
        'Turuncu tulumlu *gönüllüler* geliyor. Arama kurtarma ekipleri. Ellerinde dinleme cihazları.',
        { when: has('nermin_santiye'), text: 'Nermin\'i buluyorsun. Sağ. Yüzü toz içinde. "*Söylemiştim*," diyor ve ağlıyor.' },
      ],
      choices: [
        { text: 'Gönüllü ekibe katıl', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['akut'] }, to: 'z6' },
        { text: 'Kayıp ilanlarını bir listeye topla', effect: { akil: 2, flags: ['kayip_liste'] }, to: 'z6' },
        { text: 'Kendi yiyeceğini, suyunu dağıt', effect: { enerji: -10, flags: ['comert'] }, to: 'z6' },
      ],
    },
    z6: {
      bg: 'cadir_kent', hands: 'uzan', day: 8,
      lines: [
        'Günler geçiyor. Bir *çadır kent*. Ülkenin dört bir yanından yardım tırları.',
        'Kamyonlarda battaniye, ekmek, su. Kapılarda "*Geçmiş olsun*" yazılı kartlar.',
        'Hiç tanımadığın bir köyden gelen bir kadın sana bir tencere *çorba* uzatıyor.',
        'Bu topraklar binlerce yıldır *depremle* yaşadı. Ve hep birbirine tutundu.',
      ],
      choices: [
        { text: 'Çadırlarda çocuklara oyun kur', effect: { beden: 1, flags: ['oyun'] }, to: 'z7' },
        { text: 'Nermin\'le hasar tespitine çık', show: has('nermin_santiye'), effect: { akil: 2, flags: ['hasar_tespit'] }, to: 'z7' },
        { text: 'Gönüllü listesi düzenle', effect: { akil: 1 }, to: 'z7' },
      ],
    },
    z7: {
      bg: 'cadir_kent', hands: 'uzan', day: 8,
      lines: [
        { when: has('hasar_tespit'), text: 'Nermin bir rapor yazıyor: "Doğru yapılan bina *ayakta*. Sorun deprem değil, nasıl yaptığımız."' },
        'Bu depremden sonra yapı kuralları *sıkılaşacak*. Arama kurtarma ekipleri çoğalacak.',
        'Ama hepsi *yeterli* olmayacak. Deprem bu topraklarda her zaman bir sınav.',
        { when: has('kurtarma'), text: 'Kurtardığın çocuğun annesi seni *bulmuş*. Hiçbir şey söylemeden sarılıyor.' },
      ],
      choices: aksam('t1'),
    },

    // ---------- BÖLÜM 4: Herkesin cebinde ----------
    t1: {
      bg: 'ofis2000', hands: 'uzan', day: 9, place: 'İstanbul', year: '2005', currency: 'YTL',
      lines: [
        'Ocak. Paradan *altı* sıfır atıldı. Milyonlar bir anda liraya döndü.',
        'Bakkalda yaşlı bir adam yeni banknotlara *bakıyor*: "Bir milyon, bir lira mı oldu?"',
        { when: has('darpci'), text: 'Lidya\'da ilk aslanı basarken para bir *söz* gibiydi. Hâlâ öyle: Herkes inandıkça değerli.' },
        'Artık paran *Yeni Türk Lirası* ile sayılıyor.',
      ],
      choices: [
        { text: 'Yaşlı adama hesabı anlat', effect: { akil: 1 }, to: '@aksam', then: 't2' },
        { text: 'Bakkala eski paraları değiştirmede yardım et', effect: { beden: 1 }, to: '@aksam', then: 't2' },
      ],
    },
    t2: {
      bg: 'ofis2000', hands: 'uzan', day: 9,
      lines: [
        { when: has('ortak13'), text: 'Efe ile kurduğunuz dükkân bir *zincire* dönüştü. Yirmi şube.' },
        { when: has('tamirci'), text: 'Bilgisayar tamirciliğin bir yazılım *şirketine* dönüştü.' },
        'Herkesin masasında bir *ekran*. Herkesin cebinde bir telefon.',
        'Şirkette genç bir yazılımcı, *Aylin*, eski fotoğrafları dijitale aktarıyor.',
      ],
      choices: [
        { text: 'Aylin\'in projesini incele', effect: { akil: 1, flags: ['aylin'] }, to: '@olay', then: 't3' },
        { text: 'Kendi işine dön', effect: { para: 1 }, to: '@olay', then: 't3' },
      ],
    },
    t3: {
      bg: 'ofis2000', hands: 'uzan', day: 10, year: '2008',
      lines: [
        'Aylin bir gün yanına *geliyor*. Elinde bir ekran görüntüsü.',
        { when: has('fotograf'), text: '1850\'lerden bir *fotoğraf*: Beyoğlu\'nda bir dükkânda çekilmiş bir portre. Yüz... senin yüzün.' },
        { when: not('fotograf'), text: '1930\'lardan bir *gazete* fotoğrafı: Karabük\'te ilk dökümün başında bir kalabalık. Bir yüz... senin yüzün.' },
        '"Bu sen *misin*?" diye soruyor. Gülmüyor.',
      ],
      choices: [
        { text: '"Dedemin dedesi"', effect: { akil: 1 }, to: 't4a' },
        { text: 'Aylin\'e gerçeği söyle', effect: { flags: ['aylin_sir'] }, to: 't4b' },
        { text: 'Fotoğrafı sistemden sil', effect: { akil: 1, flags: ['sildi'] }, to: 't4a' },
      ],
    },
    t4a: {
      bg: 'ofis2000', hands: 'uzan', day: 10,
      lines: [
        'Aylin *ikna* olmuyor, ama üstelemiyor da.',
        { when: has('sildi'), text: 'Fotoğrafı siliyorsun. Ama bilirsin: İnternette hiçbir şey tam *silinmez*. Bir kopyası bir yerlerde.' },
        'Bin yıllardır *iz* bırakmadan yaşamak kolaydı. Artık her şey kaydediliyor.',
      ],
      choices: devam('t5'),
    },
    t4b: {
      bg: 'ofis2000', hands: 'uzan', day: 10,
      lines: [
        'Aylin uzun süre *susuyor*. Sonra: "Kanıtla."',
        'Ona Hattuşa\'nın aslanlarını, Efes\'in kütüphanesini, Ayasofya\'nın kubbesini *anlatıyorsun*. Hiçbir kitapta olmayan ayrıntılarla.',
        'Aylin not *alıyor*. Elleri titriyor.',
        '"Bunları bir yere *yazmalısın*. Sen bir arşivsin."',
      ],
      choices: devam('t5'),
    },
    t5: {
      bg: 'ev2008', hands: 'telefon', day: 11,
      lines: [
        'Bir akşam elinde yeni bir telefon: *Dokunmatik* ekran. Haritalar, kamera, internet.',
        'Ekranı kaydırıyorsun: Göbeklitepe\'nin yeni fotoğrafları. Kazılar *büyümüş*.',
        { when: has('ipucu'), text: 'Arkeolog yıllar önce bir e-posta almış: "Kuzeydeki tepeye bakın." Kimden geldiğini *bilmiyor*.' },
        'Cebindeki bu küçük cam, bütün çağların *kütüphanesi*.',
      ],
      choices: [
        { text: 'Bütün çağları yazmaya karar ver', effect: { akil: 2, flags: ['arsiv'] }, to: 't6' },
        { text: 'Telefonu kapat, yürüyüşe çık', effect: { beden: 1, enerji: 10 }, to: 't6' },
      ],
    },
    t6: {
      bg: 'ev2008', hands: 'uzan', day: 11,
      lines: [
        { when: has('arsiv'), text: 'Bir dosya açıyorsun. Başlık: "*Çağlar*." İlk satır: "Bir ateşin başında uyandım..."' },
        { when: has('akut'), text: 'Deprem sonrası katıldığın gönüllü ekip hâlâ *çağırıyor*. Her tatbikata gidiyorsun.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 't7' }],
    },
    t7: {
      bg: 'ev2008', hands: 'dinlen', day: 11,
      lines: [
        'Telefonlar daha da *akıllanacak*. Bir gün insanlarla konuşan makineler olacak.',
        'Kentler değişecek. Belki *depreme* hazır hale gelecekler. Belki de gelmeyecekler.',
        'Ve sen, yaşlanmayan insan, ilk kez *geleceği* göremiyorsun.',
        'Çünkü bundan sonrası henüz *yaşanmadı*.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_disket: {
      bg: 'bilgisayar_odasi', hands: 'uzan',
      lines: [
        'Bir öğrenci tezini bir *diskete* kaydetmiş. Disket okunmuyor.',
        'Gözleri dolu: "Altı aylık *emeğim*."',
      ],
      choices: [
        { text: 'Disketi başka sürücüde dene, veriyi kurtar', effect: { akil: 1 }, to: '@don' },
        { text: '"Bir dahaki sefere üç kopya" de, teselli et', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_tarama: {
      bg: 'bilgisayar_odasi', hands: 'kitap',
      lines: [
        'Kütüphanede eski kitapların sayfaları tek tek *taranıyor*. Ekranda bir el yazması beliriyor.',
        { when: has('dizgici'), text: 'Müteferrika\'nın matbaasından çıkmış bir sözlük! Harfleri sen *dizmiştin*.' },
        'Görevli: "Bir gün bütün kitaplar böyle *dijital* olacak."',
      ],
      choices: [
        { text: 'Tarama işine yardım et', effect: { akil: 1 }, to: '@don' },
        { text: 'Sayfaları dikkatle çevir', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_kopek13: {
      bg: 'deprem_gece', hands: 'uzan',
      lines: [
        'Bir arama *köpeği* enkazın üstünde duruyor ve havlıyor.',
        'Herkes *susuyor*. Köpeğin eğitmeni işaret ediyor: "Burada."',
      ],
      choices: [
        { text: 'Kazmaya başla', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: '@don' },
        { text: 'Köpeğe su ver, ekip için alet taşı', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_telesekreter: {
      bg: 'cep_dukkan', hands: 'uzan',
      lines: [
        'Bir müşteri telefonundaki *sesli mesajı* dinleyemiyor. Şifresini unutmuş.',
        '"Annemin sesi o mesajda," diyor. "Bir daha *duyamayacağım*."',
      ],
      choices: [
        { text: 'Operatörü arayıp şifre sıfırlamasını sağla', effect: { akil: 1 }, to: '@don' },
        { text: 'Onu sakinleştir, birlikte uğraşın', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_modem: {
      bg: 'internet_kafe', hands: 'uzan',
      lines: [
        'Evde biri telefonu *kaldırınca* internet kopuyor.',
        'Gencin bütün yazdıkları *gitti*.',
      ],
      choices: [
        { text: 'Gülerek yeniden bağlan', effect: { enerji: 5 }, to: '@don' },
        { text: '"Ayrı hat al" diye öğüt ver', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kontor: {
      bg: 'cep_dukkan', hands: 'para',
      lines: [
        'Bir genç telefonuna *kontör* yükletmek istiyor. Parası yetmiyor.',
        '"Annemi aramam lazım, *hastanede*."',
      ],
      choices: [
        { text: 'Kontörü sen yükle', cost: { para: 1 }, effect: { para: -1, flags: ['comert'] }, to: '@don' },
        { text: 'Dükkânın telefonunu ver', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_kaset: {
      bg: 'cep_dukkan', hands: 'uzan',
      lines: [
        'Kaset tezgâhında bir *karışık kaset* kaydediliyor. Sevgiliye hediye.',
        'Bant *kopuyor*. Satıcı kalemle geri sarmaya çalışıyor.',
      ],
      choices: [
        { text: 'Bandı yapıştır', effect: { akil: 1 }, to: '@don' },
        { text: 'Kalemle sarmaya yardım et', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_mac13: {
      bg: 'internet_kafe', hands: 'uzan',
      lines: [
        'Bütün kafe *maç* izliyor. Milli takım bir turnuvada yarı finalde.',
        'Gol! Sokaklar *kornalarla* doluyor.',
      ],
      choices: [
        { text: 'Sokağa çık, bayrak salla', effect: { enerji: 15 }, to: '@don' },
        { text: 'Kafede kalıp temizliğe yardım et', effect: { beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_artci: {
      bg: 'cadir_kent', hands: 'uzan',
      lines: [
        'Gece bir *artçı* sarsıntı. Çadırlardan çığlıklar.',
        'Küçük bir çocuk *titriyor*, uyuyamıyor.',
      ],
      choices: [
        { text: 'Yanına otur, ona bir masal anlat', effect: { akil: 1, flags: ['masal13'] }, to: '@don' },
        { text: 'Çadırları kontrol et, gevşek kazıkları çak', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
      ],
    },
    e_tir: {
      bg: 'cadir_kent', hands: 'sepet',
      lines: [
        'Uzak bir ilden yardım *tırı* geldi. Boşaltacak kimse yok.',
        'Şoför yorgun, yirmi saattir *yolda*.',
      ],
      choices: [
        { text: 'Tırı boşalt', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: '@don' },
        { text: 'Dağıtım için bir sıra sistemi kur', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_blog: {
      bg: 'ev2008', hands: 'telefon',
      lines: [
        'Bir arkadaşın *blog* açmış. Her gün bir şey yazıyor.',
        '"Sen de yaz," diyor. "Hayatını *anlat*."',
      ],
      choices: [
        { text: 'Takma adla bir blog aç', effect: { akil: 1, flags: ['blog'] }, to: '@don' },
        { text: '"Benim hayatım çok uzun" diyerek gül', effect: { enerji: 5 }, to: '@don' },
      ],
    },
    e_navigasyon: {
      bg: 'ofis2000', hands: 'telefon',
      lines: [
        'Taksi şoförü telefondaki *haritaya* güvenmiyor. "Ben bu şehri ezbere bilirim."',
        'Harita ise başka yol *gösteriyor*.',
      ],
      choices: [
        { text: 'Şoförün yolundan git', effect: { beden: 1 }, to: '@don' },
        { text: 'Haritanın yolunu öner', effect: { akil: 1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'disket', start: 'e_disket', when: (st) => st.yer === 'Ankara' },
    { id: 'tarama', start: 'e_tarama', when: (st) => st.yer === 'Ankara' },
    { id: 'kopek13', start: 'e_kopek13', when: deprem },
    { id: 'telesekreter', start: 'e_telesekreter', when: (st) => st.yer === 'İstanbul' && doksanlar(st) },
    { id: 'modem', start: 'e_modem', when: (st) => st.yer === 'İstanbul' && doksanlar(st) },
    { id: 'kontor', start: 'e_kontor', when: (st) => st.yer === 'İstanbul' && doksanlar(st) },
    { id: 'kaset', start: 'e_kaset', when: (st) => doksanlar(st) },
    { id: 'mac13', start: 'e_mac13', when: (st) => !deprem(st) },
    { id: 'artci', start: 'e_artci', when: deprem },
    { id: 'tir', start: 'e_tir', when: deprem },
    { id: 'blog', start: 'e_blog', when: (st) => ['2005', '2008'].includes(st.yil) },
    { id: 'navigasyon', start: 'e_navigasyon', when: (st) => ['2005', '2008'].includes(st.yil) },
  ],
};

ERA13.hub = {
  intro: (st) => deprem(st)
    ? ['Akşam. Çadır kentte fenerler *yanıyor*.', 'Uzaktan jeneratör sesleri. Kimse tam uyumuyor.']
    : ['Akşam. Ekranların mavi ışığı pencerelerden *taşıyor*.', 'Sokakta bir telefon *çalıyor*, herkes cebine bakıyor.', 'Kentin uğultusu hiç *dinmiyor*.'],
  acts: [
    { id: 'kodla', show: (st) => !deprem(st), text: 'Gece programlama çalış', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, hands: 'kitap',
      res: [['Ekranda bir *döngü*. Aynı işi bin kez yapan bir komut.', 'Makine yorulmuyor.'], ['Bir hata buluyorsun: Bir *noktalı virgül*.', 'Saatlerin gitti ama buldun.']] },
    { id: 'kurye', show: (st) => !deprem(st), text: 'Motosikletli kuryelik yap', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 },
      res: [['Trafikte *zikzaklar*. Paketler zamanında.', 'İki birim para kazandın.'], ['Yağmur, *çamur*, korna.', 'Ama kesen dolu.']] },
    { id: 'tamir', show: (st) => !deprem(st), text: 'Komşuların bilgisayarını onar', effect: { akil: 1, para: 1 },
      res: [['Virüs! *Temizliyorsun*.', 'Komşu bir tabak börek getiriyor.'], ['Kablo *takılı* değilmiş.', 'Bazen çözüm basit.']] },
    { id: 'enkaz', show: deprem, text: 'Gece enkaz nöbeti tut', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 },
      res: [['Saatlerce *dinliyorsun*. Sessizlik.', 'Ama umut nöbeti bırakmıyor.'], ['Gönüllülerle *çay* paylaşıyorsunuz.', 'Kimse kimseyi tanımıyor, herkes kardeş.']] },
    { id: 'cadir_okul', show: deprem, text: 'Çadırda çocuklara ders ver', effect: { akil: 1 }, hands: 'kitap',
      res: [['Bir çadır, bir tahta, *on* çocuk.', 'Okul dediğin bu.'], ['Bir kız *resim* çiziyor: Bir ev, sağlam duvarlı.', 'Duvara asıyorsun.']] },
    { id: 'kosu', text: 'Sahilde koş', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 },
      res: [['Deniz kokusu, *ritim*, nefes.', 'Bedenin binlerce yıldır aynı.'], ['Bir martı seninle *yarışıyor*.', 'O kazanıyor.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda bir *ekran* görüyorsun. İçinde bütün çağların.', 'Dinlendin.']] },
  ],
};
