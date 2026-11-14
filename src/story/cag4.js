// ÇAĞ 4 — Hititler ve Tunç Çağı: Uluburun (Kaş) → Hattuşa (Çorum) → Yazılıkaya
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - Uluburun batığı (MÖ 14. yy sonu, Kaş açıkları): ~10 ton Kıbrıs bakırı (öküz derisi biçimli külçeler),
//   ~1 ton kalay, mavi/turkuaz cam külçeler, Kenan küplerinde sakız reçinesi, fildişi, abanoz,
//   Nefertiti adlı altın bir bok böceği mührü, fildişi menteşeli ahşap bir yazı tableti, onlarca taş çapa.
//   1982'de süngerci Mehmet Çakır "kulplu metal bisküviler" gördüğünü anlatınca bulundu.
// - Hattuşa: Aslanlı Kapı, Kral Kapısı, Büyük Tapınak (Fırtına Tanrısı ve Arinna Güneş Tanrıçası),
//   dev depo küpleri, sekiz dilde tablet arşivi. Hititler yükü karadan taşır.
// - Hitit yasaları misilleme yerine çoğunlukla tazminat öngörür (özgür birinin elini kıranın 20 şekel ödemesi gibi).
// - Kikkuli'nin at eğitimi metni Hattuşa arşivindedir. Kuş falı (kuşların uçuşundan kehanet) yaygındır.
// - MÖ 1274 Kadeş: Muwatalli II ile Ramses II; iki taraf da zafer ilan eder.
// - MÖ 1259: III. Hattuşili ile Ramses arasında bilinen en eski barış antlaşması; gümüş tablete Akadca yazılır.
//   Kraliçe Puduhepa antlaşmayı mühürler, Mısır kraliçesi Nefertari ile mektuplaşır.
// - Yazılıkaya: kentin yakınındaki kaya tapınağı; bahar bayramı burada kutlanır, tanrı alayı kayaya oyulmuştur.
// - Hititçe, yazıya geçmiş en eski Hint-Avrupa dilidir. Demir çok değerlidir; III. Hattuşili bir mektupta
//   "şu an iyi demir yok" der. MÖ 1200 dolaylarında Hattuşa terk edilir.
// Karakter adları kurgu, dönemin ad kalıplarına uygundur.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const denizde = (st) => st.yer === 'Uluburun' || st.yer === 'Likya';
const kentte = (st) => st.yer === 'Hattuşa';

export const ERA4 = {
  id: 4,
  name: 'Hititler ve Tunç Çağı',
  place: 'Uluburun',
  region: 'Kaş ve Çorum',
  year: 'MÖ 1305',
  currency: 'şekel',
  start: 'g1',
  next: { name: 'Demir Çağı krallıkları', place: 'Tuşpa', year: 'MÖ 790' },

  carry(st) {
    st.para = Math.min(25, Math.max(3, st.para));
    st.enerji = Math.max(st.enerji, 70);
    const yazi = st.flags.includes('yazi') ? ' Kâtiplik bilgin hâlâ aklında.' : '';
    return `Gümüşün hâlâ gümüş: ${st.para} şekel.${yazi}`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Gemi ----------
    g1: {
      bg: 'gemi_deniz', hands: 'uzan', day: 1, place: 'Uluburun', year: 'MÖ 1305',
      lines: [
        'Bu kez gözlerini *dalgaların* üstünde açıyorsun.',
        'Sedir tahtasından bir gemi. Tek direk, kare bir *yelken*.',
        'Güvertede kulplu, öküz derisi biçimli *bakır* külçeler yığılı.',
        'Sağında, sarp kayalarıyla *Likya* kıyısı uzanıyor.',
      ],
      choices: [
        { text: 'Halatlara koş, yelkene yardım et', effect: { beden: 1 }, to: 'g2a' },
        { text: 'Yükün hesabını tutan adamın yanına git', effect: { akil: 1 }, to: 'g2b' },
        { text: 'Pruvada yalnız duran yolcuyla konuş', to: 'g2c' },
      ],
    },
    g2a: {
      bg: 'gemi_deniz', hands: 'yular', day: 1,
      lines: [
        'Kaptan *İli-milku* sana bağırıyor: "Çek! Rüzgârı kaçırma!"',
        'Kolların ilk kez bir *yelkenin* gücünü hissediyor.',
        'Tayfalar seni hemen aralarına *alıyor*.',
      ],
      choices: [{ text: 'Kaptana gemiyi sor', effect: { flags: ['tayfa'] }, to: 'g3' }],
    },
    g2b: {
      bg: 'gemi_deniz', hands: 'tablet', day: 1,
      lines: [
        'Kâtip, *balmumu* sürülmüş, fildişi menteşeli ahşap bir tablet tutuyor.',
        'Yazıp yazıp *siliyor*. Kil gibi kırılmıyor, defalarca kullanılıyor.',
        { when: has('yazi'), text: 'Kültepe\'de öğrendiğin işaretleri *tanıyorsun*. Kâtip şaşırıyor.' },
        '"Üç yüz elli külçe bakır. Bir ton *kalay*. Yanlış sayarsam kafamı keserler."',
      ],
      choices: [{ text: 'Saymasına yardım et', effect: { akil: 1, flags: ['sayim'] }, to: 'g3' }],
    },
    g2c: {
      bg: 'gemi_deniz', hands: 'uzan', day: 1,
      lines: [
        'Yolcu, batının adalarından gelmiş bir *elçi*. Kılıcı süslü, bakışı kibirli.',
        '"Bu yük bir kralın *hediyesi*. Bir başka krala gidiyor."',
        'Krallar birbirine bakır, altın, *cam* gönderiyor. Barış böyle satın alınıyor.',
      ],
      choices: [{ text: 'Elçiye kimin hediyesi olduğunu sor', effect: { akil: 1, flags: ['elci'] }, to: 'g3' }],
    },
    g3: {
      bg: 'gemi_deniz', hands: 'uzan', day: 1,
      lines: [
        'Ambar bir *dünya* gibi: Kıbrıs bakırı, uzak doğudan kalay.',
        'Gök mavisi ve *turkuaz* cam külçeler. Fildişi, kara abanoz.',
        'Kenan küplerinde *sakız reçinesi*: Tapınaklarda yakılacak.',
        'Bir de küçük, altın bir *bok böceği* mührü. Üstünde bir Mısır kraliçesinin adı.',
      ],
      choices: [
        { text: 'Gece güverte nöbetini üstlen', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@aksam', then: 'g4' },
        { text: 'Yükün değerini hesapla', effect: { akil: 1, flags: ['hesap'] }, to: '@aksam', then: 'g4' },
      ],
    },
    g4: {
      bg: 'gemi_deniz', hands: 'uzan', day: 2,
      lines: [
        'Sabah. Gemi *uzun bir burnu* dönmek üzere.',
        'Kaptan göğe bakıyor. Batıda bulutlar *kararıyor*.',
        '"Burnu dönersek iki gün kazanırız. Dönemezsek..." Cümlesini *bitirmiyor*.',
      ],
      choices: [
        { text: '"Koya sığınalım, fırtınayı bekleyelim"', effect: { akil: 1, flags: ['uyardi'] }, to: 'g5a' },
        { text: '"Dönelim, rüzgâr bizden yana"', effect: { beden: 1 }, to: 'g5b' },
        { text: 'Sus, tayfalarla yükü bağla', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, flags: ['bagladi'] }, to: 'g5b' },
      ],
    },
    g5a: {
      bg: 'gemi_deniz', hands: 'uzan', day: 2,
      lines: [
        'Kaptan seni *dinliyor*. Gemi kıyıya yöneliyor.',
        'Ama rüzgâr birden *dönüyor*. Koya varmaya vakit yok.',
        'Her şey bir anda *başlıyor*.',
      ],
      choices: [{ text: 'Tutun!', to: 'g6' }],
    },
    g5b: {
      bg: 'gemi_deniz', hands: 'yular', day: 2,
      lines: [
        'Yelken *gerildi*. Gemi burnu dönmeye başlıyor.',
        'Ardından gökyüzü *patlıyor*.',
      ],
      choices: [{ text: 'Tutun!', to: 'g6' }],
    },
    g6: {
      bg: 'firtina_deniz', hands: 'yular', day: 2,
      lines: [
        'Dalgalar güverteyi *yalıyor*. Direk inliyor.',
        'Tayfalar taş *çapaları* denize atıyor. Birini, bir daha, bir daha.',
        'Gemi kayalara doğru *sürükleniyor*.',
        { when: has('bagladi'), text: 'Bağladığın halatlar yükü bir süre daha *tutuyor*.' },
      ],
      choices: [
        { text: 'Direğe sarıl, sonuna kadar dayan', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'g7a' },
        { text: 'Balmumlu yazı tabletini kurtar', effect: { akil: 1, flags: ['diptik'] }, to: 'g7b' },
        { text: 'Altın mührü kap', effect: { flags: ['muhur'] }, to: 'g7c' },
      ],
    },
    g7a: {
      bg: 'firtina_deniz', hands: 'yok', day: 2,
      lines: [
        'Gövde kayaya *çarpıyor*. Bir çatırtı, sonra soğuk.',
        'Gemi bakır yüküyle birlikte *dibe* iniyor.',
        'Sen bir tahta parçasına *tutunuyorsun*.',
      ],
      choices: [{ text: 'Kıyıya yüz', cost: { enerji: 10 }, effect: { enerji: -10 }, to: 'g8' }],
    },
    g7b: {
      bg: 'firtina_deniz', hands: 'tablet', day: 2,
      lines: [
        'Tableti göğsüne bastırıyorsun. Gemi *yarılıyor*.',
        'Bir dalga seni *fırlatıyor*. Tablet hâlâ elinde.',
      ],
      choices: [{ text: 'Kıyıya yüz', cost: { enerji: 10 }, effect: { enerji: -10 }, to: 'g8' }],
    },
    g7c: {
      bg: 'firtina_deniz', hands: 'kese', day: 2,
      lines: [
        'Avucunda küçük, ağır bir *altın*. Gemi altında yok oluyor.',
        'Karanlık suya *dalıyorsun*.',
      ],
      choices: [{ text: 'Kıyıya yüz', cost: { enerji: 10 }, effect: { enerji: -10 }, to: 'g8' }],
    },
    g8: {
      bg: 'kas_kiyi', hands: 'dinlen', day: 3, place: 'Likya',
      lines: [
        'Sabah. Taşlı bir kıyıdasın. Yanında iki tayfa ve *kâtip*.',
        'Kaptan İli-milku *yok*. Gemi kayalığın dibinde, kırk metreden derinde.',
        'Su öyle berrak ki aşağıda bakır külçelerin *kızıllığı* seçiliyor.',
        { when: has('uyardi'), text: 'Kâtip sana bakıyor: "Seni dinleseydi..." Başını *eğiyor*.' },
      ],
      choices: [
        { text: 'Dal, bir külçe çıkarmayı dene', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, para: 3, flags: ['kulce'] }, to: 'g9a' },
        { text: 'Yaralılara bak, ateş yak', effect: { akil: 1, flags: ['yaralilar'] }, to: 'g9b' },
        { text: 'Kayıp tayfaları kıyı boyunca ara', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'g9b' },
      ],
    },
    g9a: {
      bg: 'kas_kiyi', hands: 'kese', day: 3,
      lines: [
        'Ciğerlerin yanıyor. Bir kulpu yakalıyor, *çekiyorsun*.',
        'Külçe çok ağır; ancak *kırık* bir parçasını koparabiliyorsun.',
        'Yine de kıyıdaki köyde bu parça bir avuç *gümüş* eder.',
      ],
      choices: aksam('k1'),
    },
    g9b: {
      bg: 'kas_kiyi', hands: 'uzan', day: 3,
      lines: [
        'Kâtip titriyor. Ateş yanınca *konuşmaya* başlıyor.',
        '"Bu yükü yeniden kimse *toplayamaz*. Deniz aldı."',
        '"Ama ben Hattuşa yolunu biliyorum. Hititler her şeyi *karadan* taşır."',
      ],
      choices: aksam('k1'),
    },

    // ---------- BÖLÜM 2: Karadan Hattuşa'ya ----------
    k1: {
      bg: 'dar_yol', hands: 'uzan', day: 4, place: 'Likya',
      lines: [
        'Dağ köylerinde *Lukka* halkı yaşıyor. Denizcidirler, korsandırlar.',
        'Kâtip *Zida* ile kıyıdan içeri, dağlara doğru tırmanıyorsunuz.',
        'Bir köyün önünde silahlı adamlar yolu *kesiyor*.',
      ],
      choices: [
        { text: 'Kıyıdaki batığı anlat, yardım iste', effect: { akil: 1 }, to: 'k2a' },
        { text: 'Bakır parçasını hediye et', show: has('kulce'), cost: { para: 2 }, effect: { para: -2, flags: ['lukka_dost'] }, to: 'k2b' },
        { text: 'Altın mührü göster', show: has('muhur'), effect: { flags: ['lukka_dost'] }, to: 'k2b' },
        { text: 'Geri çekil, başka yol bul', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'k3' },
      ],
    },
    k2a: {
      bg: 'dar_yol', hands: 'uzan', day: 4,
      lines: [
        'Reis gülüyor: "Batık mı? Deniz *bizim* tarlamız."',
        'Ama seni yine de *geçiriyor*. Yanına bir rehber veriyor.',
      ],
      choices: [{ text: 'Rehberle yürü', to: 'k3' }],
    },
    k2b: {
      bg: 'dar_yol', hands: 'kese', day: 4,
      lines: [
        'Reisin gözleri *parlıyor*. Hediye kabul.',
        '"Hitit yoluna kadar adamlarım sizi *korur*."',
      ],
      choices: [{ text: 'Yola çık', effect: { enerji: 10 }, to: 'k3' }],
    },
    k3: {
      bg: 'kervan_yol', hands: 'yular', day: 5,
      lines: [
        'Dağlar *açılıyor*. Önünde uçsuz bucaksız bir yayla.',
        'Yolda bir Hitit *ulak* kervanı. Eşekler, arabalar, mühürlü sandıklar.',
        'Ulakbaşı Zida\'yı tanıyor: "Batık mı? Kral *duyacak*."',
      ],
      choices: [
        { text: 'Kervana katıl, yük taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: 'k3b' },
        { text: 'Ulakbaşına batığı ayrıntılarıyla anlat', effect: { akil: 1, flags: ['rapor'] }, to: 'k3b' },
      ],
    },
    k3b: {
      bg: 'kervan_yol', hands: 'uzan', day: 5,
      lines: [
        'Kralın yolunda belirli aralıklarla *konaklar* var.',
        'Ulaklar yorgun atlarını bırakıp *taze* atlarla devam ediyor.',
        'Ulakbaşı: "Bir mektup böylece Hattuşa\'dan denize günler içinde *ulaşır*."',
        'Gece konakta ateş başında bir ulak, yolda gördüğü *kuraklığı* anlatıyor.',
      ],
      choices: [
        { text: 'Atların bakımına yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'k3c' },
        { text: 'Ulaktan Hititçe kelimeler öğren', effect: { akil: 1, flags: ['hititce'] }, to: 'k3c' },
      ],
    },
    k3c: {
      bg: 'erciyes_ova', hands: 'uzan', day: 6,
      lines: [
        'Ufukta karlı bir dağın *tepesi*. Kültepe\'den tanıdığın Erciyes.',
        { when: has('enlil'), text: 'Eteğindeki karumda Enlil-bani ile çalıştığın günler *aklına* geliyor. Artık kimse onları hatırlamıyor.' },
        { when: not('enlil'), text: 'Eteğindeki eski karum çoktan *terk* edilmiş. Tabletler toprağın altında.' },
        'Zamanın *bir tek* sana dokunmadığını yine hissediyorsun.',
      ],
      choices: [{ text: 'Yola devam et', to: 'k4' }],
    },
    k4: {
      bg: 'kizilirmak', hands: 'uzan', day: 6,
      lines: [
        'Günler sonra kızıl sulu bir ırmak: Hititlerin *Maraşantiya* dediği nehir.',
        { when: has('demir'), text: 'Kültepe\'deki o *gök demirini* hatırlıyorsun. Bu topraklar ona hâlâ âşık.' },
        'Ulakbaşı kuzeyi gösteriyor: "Yarın *Hattuşa*."',
      ],
      choices: devam('h1', 'Yürü'),
    },

    // ---------- BÖLÜM 3: Hattuşa ----------
    h1: {
      bg: 'hattusa_kapi', hands: 'uzan', day: 7, place: 'Hattuşa',
      lines: [
        'Kocaman taş surlar dağın sırtını *sarıyor*.',
        'Kapının iki yanında taşa oyulmuş iki *aslan*. Ağızları açık, gözleri sende.',
        'Burası Hititlerin başkenti: *Hattuşa*. "Bin tanrının ülkesi."',
        'Muhafız mızrağını indiriyor: "Kimsin, ne *istiyorsun*?"',
      ],
      choices: [
        { text: '"Kâtibim. Saraya hizmet etmek istiyorum"', req: has('yazi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 1, flags: ['katip'] }, to: 'h2a' },
        { text: '"Atlardan anlarım"', effect: { beden: 1, flags: ['seyis'] }, to: 'h2b' },
        { text: '"Tapınakta her işi yaparım"', effect: { flags: ['tapinak'] }, to: 'h2c' },
        { text: 'Ulakbaşının seni krala götürmesini iste', show: has('rapor'), effect: { akil: 1, flags: ['rapor_kral'] }, to: 'h2d' },
      ],
    },
    h2a: {
      bg: 'saray_hitit', hands: 'tablet', day: 7,
      lines: [
        'Sarayın arşivinde raflar binlerce *tabletle* dolu.',
        'Sekiz ayrı dilde yazılmış: Hititçe, Luvice, Hurrice, *Akadca*...',
        'Baş kâtip seni sınıyor: "Bu Akadca. *Oku*."',
        'Uluslararası yazışmaların dili Akadca. Krallar birbirine *böyle* yazıyor.',
      ],
      choices: [
        { text: 'Yavaşça oku', effect: { akil: 1 }, to: 'h3' },
        { text: 'Balmumlu tableti göster', show: has('diptik'), effect: { akil: 1, flags: ['baskatip'] }, to: 'h3' },
      ],
    },
    h2b: {
      bg: 'savas_arabasi', hands: 'yular', day: 7,
      lines: [
        'Ahırlar kentin dışında. Yüzlerce at, yüzlerce *savaş arabası*.',
        'Ahır ustası *Kikkuli*\'nin yazdırdığı eğitim tabletini okutuyor.',
        'Yüzlerce gün süren bir program: koşu, dinlenme, *su*, yem.',
        '"Atı acele eğitirsen *ölür*. Sabırla eğitirsen seni yaşatır."',
      ],
      choices: [{ text: 'Ahırda işe başla', effect: { beden: 1, para: 1 }, to: 'h3' }],
    },
    h2c: {
      bg: 'tapinak_hitit', hands: 'sepet', day: 7,
      lines: [
        'Büyük Tapınak: *Fırtına Tanrısı* ve Arinna\'nın Güneş Tanrıçası\'nın evi.',
        'Çevresinde bir insan boyundan uzun dev *küpler*. Buğday, yağ, şarap.',
        'Rahipler sabah akşam *tartıyor*, sayıyor, mühürlüyor.',
      ],
      choices: [{ text: 'Ambar işine başla', effect: { beden: 1, para: 1 }, to: 'h3' }],
    },
    h2d: {
      bg: 'saray_hitit', hands: 'uzan', day: 7,
      lines: [
        'Ulakbaşı seni sarayın *iç avlusuna* götürüyor.',
        'Bir saray yöneticisi batığı *dinliyor*. Kaybın hesabını yazdırıyor.',
        '"Hediye bize gelmiyordu. Ama denizlerdeki *her* kayıp bizi ilgilendirir."',
        'Sana sarayda bir *iş* veriyor.',
      ],
      choices: [{ text: 'Teşekkür et', effect: { para: 2, flags: ['saray'] }, to: 'h3' }],
    },
    h3: {
      bg: 'hattusa_kapi', hands: 'uzan', day: 7,
      lines: [
        'Akşam yukarı kentte *yürüyorsun*. Her köşede bir tapınak.',
        'Çarşıda Hititçe konuşuluyor. Kelimeler sana yine *tanıdık* geliyor.',
        { when: has('sozluk'), text: 'Kültepe\'de yazdırdığın yerli kelimeler burada *yaşıyor*: su, ekmek, baba.' },
        'Hititçe, yazıya geçmiş en eski *Hint-Avrupa* dili.',
      ],
      choices: aksam('h4'),
    },
    h4: {
      bg: 'saray_hitit', hands: 'uzan', day: 8,
      lines: [
        'Sabah kentte bir *dava*. Bir adam, komşusunun elini kırmış.',
        'Hakim *yasa* tabletini açıyor.',
        '"Özgür birinin elini kıran, ona *yirmi şekel* gümüş öder."',
        'Göze göz yok. Hitit yasası *ödemeyle* barıştırıyor.',
      ],
      choices: [
        { text: '"Para acıyı siler mi?" diye sor', effect: { akil: 1 }, to: 'h5a' },
        { text: '"Yasası olan ülke sağlam ülkedir"', effect: { akil: 1, flags: ['yasa'] }, to: 'h5a' },
        { text: 'Yaralıya git, elini sar', effect: { beden: 1, flags: ['sardi'] }, to: 'h5b' },
      ],
    },
    h5a: {
      bg: 'saray_hitit', hands: 'uzan', day: 8,
      lines: [
        'Hakim sana bakıyor: "Kan, kan *getirir*. Gümüş, sofrayı."',
        '"Eski yasalar daha sertti. Biz onları *yumuşattık*."',
      ],
      choices: devam('n1'),
    },
    h5b: {
      bg: 'saray_hitit', hands: 'uzan', day: 8,
      lines: [
        'Adamın elini iki tahta arasına *sarıyorsun*.',
        '"Yirmi şekel güzel," diyor gülümseyerek. "Ama *elim* daha güzeldi."',
      ],
      choices: devam('n1'),
    },

    // ---------- Ara bölüm: Kayıp buğday ----------
    n1: {
      bg: 'tapinak_hitit', hands: 'uzan', day: 8,
      lines: [
        'Tapınak ambarında bir *telaş*. Üç küp buğday eksik.',
        'Her küpün ağzı kil bir *mühürle* kapatılır. Mühür kırılırsa herkes görür.',
        'Ama bu küplerin mühürleri *sağlam*.',
        'Ambar başı terliyor: "Bulamazsam suç *bende* kalır."',
      ],
      choices: [
        { text: 'Mühürleri tek tek incele', effect: { akil: 1 }, to: 'n2a' },
        { text: 'Gece ambarı gözetle', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'n2b' },
        { text: 'Bekçilerle konuş', to: 'n2c' },
      ],
    },
    n2a: {
      bg: 'tapinak_hitit', hands: 'uzan', day: 8,
      lines: [
        'Mühürde bir *kraliyet* işareti var. Ama çizgileri biraz bulanık.',
        'Gerçek mühür keskindir. Bu, eski bir mühür izinden alınmış bir *kopya*.',
        'Biri sahte mühür *yapmış*.',
      ],
      choices: [{ text: 'Mühür arşivine git', effect: { flags: ['iz'] }, to: 'n3' }],
    },
    n2b: {
      bg: 'gece_karum', hands: 'mesale', day: 8,
      lines: [
        'Gece yarısı bir gölge küplerin arasında *dolaşıyor*.',
        'Bir küpün mührünü sıcak bir bıçakla *kaldırıyor*, buğdayı çuvala dolduruyor.',
        'Sonra yeni bir mühür *basıyor*.',
      ],
      choices: [{ text: 'Mühür taşını gör ve hatırla', effect: { flags: ['iz'] }, to: 'n3' }],
    },
    n2c: {
      bg: 'tapinak_hitit', hands: 'uzan', day: 8,
      lines: [
        'Yaşlı bekçi: "Ben bir şey görmedim. Ama genç kâtip her akşam *geç* çıkıyor."',
        'Genç bekçi ise *susuyor*. Gözlerini kaçırıyor.',
      ],
      choices: [
        { text: 'Genç bekçiyi sıkıştır', effect: { beden: 1 }, to: 'n3' },
        { text: 'Genç kâtibi izle', effect: { akil: 1, flags: ['iz'] }, to: 'n3' },
      ],
    },
    n3: {
      bg: 'saray_hitit', hands: 'tablet', day: 9,
      lines: [
        'Sarayın altındaki arşivde binlerce kil *mühür baskısı* saklı.',
        'Her belge, her sandık, her küp mühürlenip *kaydedilir*.',
        { when: has('iz'), text: 'Sahte mührün kalıbını buluyorsun: Yıllar önce ölmüş bir *yöneticinin* mührü.' },
        { when: not('iz'), text: 'Aradığın şeyi bilmeden *bulmak* zor. Ama bir mühür dikkatini çekiyor.' },
        'Ölü bir adamın mührünü *kim* kullanır?',
      ],
      choices: [
        { text: 'Bulduklarını hakime anlat', effect: { akil: 1, flags: ['dedektif'] }, to: 'n4a' },
        { text: 'Hırsızla kendin yüzleş', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'n4b' },
      ],
    },
    n4a: {
      bg: 'saray_hitit', hands: 'uzan', day: 9,
      lines: [
        'Ölen yöneticinin *oğlu*, babasının mühür taşını saklamış.',
        'Hakim yasayı okuyor: Çalınan buğdayı *fazlasıyla* geri ödeyecek.',
        'Ambar başı sana sarılıyor. Eline bir kese *tutuşturuyor*.',
      ],
      choices: [{ text: 'Keseyi al', effect: { para: 3 }, to: 'n5' }, { text: '"Sadece adalet istedim"', effect: { akil: 1, flags: ['durust'] }, to: 'n5' }],
    },
    n4b: {
      bg: 'gece_karum', hands: 'uzan', day: 9,
      lines: [
        'Hırsızı çuvallarla *yakalıyorsun*. Genç biri. Ellerinin derisi kemiğine yapışmış.',
        '"Ailem *açtı*," diyor. "Babamın mührü kalan tek şeydi."',
      ],
      choices: [
        { text: 'Onu hakime teslim et', effect: { para: 2 }, to: 'n5' },
        { text: 'Buğdayı geri koydur, bırak gitsin', effect: { flags: ['merhamet'] }, to: 'n5' },
      ],
    },
    n5: {
      bg: 'hattusa_kapi', hands: 'uzan', day: 9,
      lines: [
        'Bir mühür, bir *imza* gibidir. Ama bir taş parçası da çalınabilir.',
        { when: has('merhamet'), text: 'Genç adam ertesi sabah ambara gelip *işe* başlıyor.' },
        { when: has('dedektif'), text: 'Saray, mühür kayıtlarını yeniden *düzenliyor*. Senin önerinle.' },
        'Kent, adını öğreniyor.',
      ],
      choices: aksam('h6'),
    },
    h6: {
      bg: 'savas_arabasi', hands: 'uzan', day: 9,
      lines: [
        'Kentin dışındaki ovada savaş arabaları *talim* yapıyor.',
        'Hitit arabası üç kişilik: Sürücü, savaşçı, *kalkancı*.',
        'Güneyde *Mısır* ile gerilim büyüyor. Herkes yaklaşan savaşı konuşuyor.',
      ],
      choices: [
        { text: 'Sürücülük talimine katıl', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['surucu'] }, to: 'h7' },
        { text: 'Arabaların hesabını tutan kâtibe yardım et', effect: { akil: 1, para: 1 }, to: 'h7' },
        { text: 'Uzaktan izle', effect: { enerji: 5 }, to: 'h7' },
      ],
    },
    h7: {
      bg: 'hattusa_kapi', hands: 'uzan', day: 9,
      lines: [
        'Akşam bir haber: Kral *Muvatalli* ordusunu güneye götürecek.',
        'Asi ırmağı kıyısındaki *Kadeş* kentine. Karşısında Mısır firavunu Ramses.',
        'Binlerce araba kentten *çıkıyor*. Toz göğü kapatıyor.',
      ],
      choices: aksam('m1'),
    },

    // ---------- BÖLÜM 4: Kadeş ve yılların geçişi ----------
    m1: {
      bg: 'savas_arabasi', hands: 'uzan', day: 10, year: 'MÖ 1274',
      lines: [
        'Yıllar *geçiyor*. Sen yaşlanmıyorsun.',
        'Kadeş seferinden *dönenler* kente akıyor.',
        'Hititler "Kazandık" diyor. Mısırlıların da "*Biz* kazandık" dediği söyleniyor.',
        { when: has('surucu'), text: 'Talim ettiğin sürücülerin bir kısmı *dönmedi*.' },
      ],
      choices: [
        { text: 'Gazilerin anlattıklarını dinle', effect: { akil: 1 }, to: 'm2a' },
        { text: 'Yaralı atlara bak', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'm2b' },
      ],
    },
    m2a: {
      bg: 'hattusa_kapi', hands: 'uzan', day: 10,
      lines: [
        'Yaşlı bir savaşçı: "Firavunu *kuşattık*. Ama yardım geldi, kurtuldu."',
        '"Kadeş bizde kaldı. Ama ikimiz de çok *kan* kaybettik."',
        'Kimse tam kazanmadı. İki taraf da *yoruldu*.',
      ],
      choices: devam('m3'),
    },
    m2b: {
      bg: 'savas_arabasi', hands: 'yular', day: 10,
      lines: [
        'Bir atın bacağında derin bir ok *yarası*.',
        'Kikkuli\'nin tabletinde yazdığı gibi: Su, dinlenme, *sabır*.',
        'At haftalar sonra yeniden *koşuyor*.',
      ],
      choices: devam('m3'),
    },
    m3: {
      bg: 'saray_hitit', hands: 'uzan', day: 11,
      lines: [
        'Sarayda bir hizmetkâr sana uzun uzun *bakıyor*.',
        '"Sen... annem kızken de burdaydın. Hiç *değişmedin*."',
        'Sırrın tehlikede. Yaşlanmayan biri ya *tanrı* sayılır ya da büyücü.',
      ],
      choices: [
        { text: '"Babam olmalı, ona çok benzerim"', effect: { akil: 1 }, to: '@aksam', then: 'm4' },
        { text: 'Bir süre kentten uzaklaş, sonra dön', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['uzaklasti'] }, to: '@aksam', then: 'm4' },
        { text: 'Gülümse, cevap verme', to: '@aksam', then: 'm4' },
      ],
    },
    m4: {
      bg: 'saray_hitit', hands: 'uzan', day: 12, year: 'MÖ 1259',
      lines: [
        { when: has('uzaklasti'), text: 'Yıllar sonra kente başka bir *adla* dönüyorsun.' },
        'Artık tahtta *III. Hattuşili* var. Yanında güçlü eşi, Kraliçe *Puduhepa*.',
        'Sarayda büyük bir *heyecan*. Mısır\'dan elçiler gelmiş.',
        'Savaşın yerine *barış* konuşuluyor.',
      ],
      choices: [
        { text: 'Kâtipler odasına koş', show: (st) => st.flags.includes('katip') || st.flags.includes('yazi'), effect: { akil: 1 }, to: 'm5a' },
        { text: 'Elçilerin atlarıyla ilgilen', effect: { beden: 1, para: 1 }, to: 'm5b' },
        { text: 'Kalabalığa karış, dinle', to: 'm5b' },
      ],
    },
    m5a: {
      bg: 'saray_hitit', hands: 'tablet', day: 12,
      lines: [
        'Baş kâtip bir *gümüş* tableti gösteriyor. Üstünde Akadca bir metin.',
        'Hitit ile Mısır arasında bir *barış* antlaşması.',
        '"Birbirimize asla saldırmayacağız. Biri saldırırsa öteki *yardıma* gelecek."',
        '"Kaçakları geri vereceğiz. Ama onları *cezalandırmayacağız*."',
      ],
      choices: [
        { text: 'Kil kopyasını sen yaz', cost: { enerji: 10 }, effect: { enerji: -10, akil: 2, flags: ['antlasma'] }, to: 'm6' },
        { text: 'Bir maddeyi yumuşatmayı öner', effect: { akil: 1, flags: ['madde'] }, to: 'm6' },
      ],
    },
    m5b: {
      bg: 'hattusa_kapi', hands: 'yular', day: 12,
      lines: [
        'Mısırlı seyisler atlarını sana *emanet* ediyor.',
        'Konuştukları dil yabancı. Ama atlar her dilde *aynı*.',
        'Bir seyis fısıldıyor: "Barış olacak. Gümüş bir tablete *yazacaklar*."',
      ],
      choices: [{ text: 'Saraya kulak ver', to: 'm6' }],
    },
    m6: {
      bg: 'saray_hitit', hands: 'uzan', day: 12,
      lines: [
        'Kraliçe Puduhepa antlaşmayı kendi *mührüyle* onaylıyor.',
        'Bir kraliçe, bir krallığın en önemli belgesini *mühürlüyor*.',
        'Bu, bugün bilinen en eski *barış* antlaşması.',
        { when: has('antlasma'), text: 'Kopyalardan birinde senin el yazın *var*.' },
      ],
      choices: [
        { text: 'Kraliçeye yaklaş', effect: { akil: 1 }, to: 'm7' },
        { text: 'Uzakta dur, izle', to: 'm7' },
      ],
    },
    m7: {
      bg: 'saray_hitit', hands: 'tablet', day: 13,
      lines: [
        'Puduhepa Mısır kraliçesi *Nefertari*\'ye bir mektup yazdırıyor.',
        '"Kardeşim, ben iyiyim, ülkem iyi. Senin için de *iyilik* diliyorum."',
        'İki kraliçe, iki düşman ülkenin kraliçesi, *kız kardeş* diye yazışıyor.',
      ],
      choices: [
        { text: 'Mektubu kile sen geçir', show: (st) => st.flags.includes('katip') || st.flags.includes('yazi'), effect: { akil: 1, flags: ['mektup_puduhepa'] }, to: 'm8' },
        { text: 'Mektubu taşıyacak ulağa yol erzakı hazırla', effect: { beden: 1, para: 1 }, to: 'm8' },
        { text: 'Bu barışın ne kadar süreceğini düşün', effect: { akil: 1 }, to: 'm8' },
      ],
    },
    m8: {
      bg: 'hattusa_kapi', hands: 'uzan', day: 13,
      lines: [
        'Barış haberi kentte *bayram* gibi karşılanıyor.',
        'Antlaşmanın bir kopyası bir gün denizlerin ötesinde, bütün ulusların *meclisinde* asılacak.',
        'Ama sen bunu henüz *bilmiyorsun*.',
      ],
      choices: aksam('y1'),
    },

    // ---------- BÖLÜM 5: Yazılıkaya ve son ----------
    y1: {
      bg: 'yazilikaya', hands: 'uzan', day: 14, year: 'MÖ 1235',
      lines: [
        'Yine yıllar geçti. Bahar *geldi*.',
        'Kentin yakınında, kayaların arasında açık bir tapınak: *Yazılıkaya*.',
        'Kaya duvarlarında bir *tanrılar alayı*. Sivri külahlı, uzun kuyruklu.',
        'Bahar bayramı başlıyor. Kral ve kraliçe alayın *önünde*.',
      ],
      choices: [
        { text: 'Alayda kurban hayvanlarını taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'y2a' },
        { text: 'Kaya kabartmalarındaki tanrıları say', effect: { akil: 1 }, to: 'y2b' },
        { text: 'Ekmek ve şarap dağıt', effect: { flags: ['ekmek'] }, to: 'y2c' },
      ],
    },
    y2a: {
      bg: 'yazilikaya', hands: 'yular', day: 14,
      lines: [
        'Boğalar ve koçlar *süslenmiş*. Boynuzlarında renkli kurdeleler.',
        'Müzisyenler davul ve lir *çalıyor*.',
      ],
      choices: [{ text: 'Alayı izle', to: 'y3' }],
    },
    y2b: {
      bg: 'yazilikaya', hands: 'uzan', day: 14,
      lines: [
        'Bir duvarda erkek tanrılar, karşı duvarda *tanrıçalar*.',
        'Ortada buluşuyorlar: Fırtına Tanrısı ve eşi *Hebat*.',
        'Bin tanrının ülkesi: Hititler her fethettikleri yerin tanrısını da *eve* getirdi.',
      ],
      choices: [{ text: 'Alayı izle', to: 'y3' }],
    },
    y2c: {
      bg: 'yazilikaya', hands: 'sepet', day: 14,
      lines: [
        'Tapınak tabletlerinde onlarca *ekmek* adı geçiyor.',
        'Ballı, yağlı, incirli... Bayram ekmekleri *elden ele* geçiyor.',
      ],
      choices: [{ text: 'Alayı izle', effect: { enerji: 10 }, to: 'y3' }],
    },
    y3: {
      bg: 'yazilikaya', hands: 'uzan', day: 14,
      lines: [
        'Gece meşaleler yanıyor. Bir *kuş falcısı* gökyüzünü izliyor.',
        '"Kuşlar soldan uçtu," diyor. Yüzü *asık*.',
        'Kuzeyden kuraklık haberleri, denizden *yabancı* gemiler.',
        { when: has('lukka_dost'), text: 'Lukka halkının adı da *akıncılar* arasında anılıyor.' },
      ],
      choices: [
        { text: '"Kuşlar değil, ambarlar konuşur. Küpleri sayalım"', effect: { akil: 1 }, to: 'y4' },
        { text: 'Surların onarımına gönüllü ol', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'y4' },
      ],
    },
    y4: {
      bg: 'tapinak_hitit', hands: 'uzan', day: 15,
      lines: [
        'Kral, Mısır\'dan *buğday* istiyor. Gemiler tahıl taşıyor.',
        'Bir zamanlar düşman olan ülke, şimdi Hatti\'yi *doyuruyor*.',
        'Barış, açlıkta bile *işe* yarıyor.',
        { when: has('madde'), text: 'Antlaşmadaki o madde aklına geliyor: "Biri zorda kalırsa öteki *yardıma* gelecek."' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'y5' }],
    },
    y5: {
      bg: 'hattusa_kapi', hands: 'uzan', day: 15,
      lines: [
        { when: has('katip'), text: 'Artık bir saray kâtibisin. Antlaşmalar senin *elinden* geçti.' },
        { when: (st) => st.flags.includes('seyis') || st.flags.includes('surucu'), text: 'Atların ve arabaların seni *tanıyor*. Bedenin bu çağda güçlendi.' },
        { when: has('tapinak'), text: 'Tapınak küplerinin *her biri* senin elinden geçti.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Son kez kente bak', to: 'y6' }],
    },
    y6: {
      bg: 'hattusa_kapi', hands: 'dinlen', day: 15,
      lines: [
        'Bir gün Hattuşa *boşalacak*. Saray yanacak, tabletler toprağa gömülecek.',
        'Ama demir *yayılacak*. Hititlerin sakladığı sır herkesin olacak.',
        'Üç bin iki yüz yıl sonra Kaş açıklarında bir süngerci dalacak.',
        '"Dipte *kulplu metal bisküviler* var," diyecek. Senin batığın.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_yunus: {
      bg: 'gemi_deniz', hands: 'uzan',
      lines: [
        'Geminin yanında bir sürü *yunus* beliriyor.',
        'Tayfalar seviniyor: "Yunus gelirse deniz *dost* demektir."',
      ],
      choices: [
        { text: 'Onlara balık at', effect: { enerji: 5 }, to: '@don' },
        { text: 'Yunusların yönünü izle, akıntıyı oku', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_korsan: {
      bg: 'kas_kiyi', hands: 'mizrak',
      lines: [
        'Uzakta hızlı, alçak bir tekne. Kürekçileri *silahlı*.',
        '"Korsanlar!" Herkes bir şeye *sarılıyor*.',
      ],
      choices: [
        { text: 'Kayaların arasına saklan', effect: { akil: 1 }, to: 'e_korsan2' },
        { text: 'Mızrağı kap, kıyıyı savun', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: 'e_korsan2' },
      ],
    },
    e_korsan2: {
      bg: 'kas_kiyi', hands: 'uzan',
      lines: [
        'Tekne kıyıya yanaşmadan *uzaklaşıyor*.',
        'Bu sularda her yelken bir *tehdit*, her koy bir saklanak.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_demir: {
      bg: 'saray_hitit', hands: 'kilic',
      lines: [
        'Saray atölyesinde bir usta, *demirden* bir hançer bileyliyor.',
        'Bir krala hediye edilecek. Değeri *altından* fazla.',
        '"Demiri ateşte dövmek bir *sır*," diyor. "Herkese söylemeyiz."',
      ],
      choices: [
        { text: 'Ustanın yanında körük çek, izle', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['demirci'] }, to: '@don' },
        { text: 'Sırrı sor', effect: { akil: 1 }, to: 'e_demir2' },
      ],
    },
    e_demir2: {
      bg: 'saray_hitit', hands: 'uzan',
      lines: [
        'Usta gülüyor: "Ateş, çekiç, su. Ve *sabır*."',
        '"Krala bile şimdilik iyi demir yok diye *yazıyoruz*. Az ve değerli kalsın."',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_kus: {
      bg: 'hattusa_kapi', hands: 'uzan',
      lines: [
        'Bir kuş falcısı surların üstünden gökyüzünü *izliyor*.',
        'Kral bir sefere çıkmadan önce kuşların *yönünü* soruyor.',
        '"Kartal sağdan geçti. Tanrılar *izin* veriyor."',
      ],
      choices: [
        { text: 'Kuşlara inan', effect: { enerji: 5 }, to: '@don' },
        { text: 'Rüzgârın yönünü fark et: Kuşlar ona göre uçuyor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_cam: {
      bg: 'hattusa_kapi', hands: 'kese',
      lines: [
        'Çarşıda bir tüccar mavi bir *cam* külçe satıyor.',
        'Gemideki külçelerin *aynısı*. Belki denizden biri çıkardı.',
      ],
      choices: [
        { text: 'Satın al', cost: { para: 2 }, effect: { para: -2, flags: ['cam'] }, to: '@don' },
        { text: '"Bu bir batıktan çıkmış" de', effect: { akil: 1 }, to: '@don' },
        { text: 'Geç', to: '@don' },
      ],
    },
    e_ulak: {
      bg: 'kervan_yol', hands: 'tablet',
      lines: [
        'Yorgun bir ulak kapıya *yığılıyor*. Elinde mühürlü bir kil zarf.',
        'Mısır\'dan, Babil\'den, Asur\'dan mektuplar böyle *gelir*.',
      ],
      choices: [
        { text: 'Ulağa su ver, dinlendir', effect: { beden: 1 }, to: '@don' },
        { text: 'Zarfı saraya ulaştır', effect: { para: 1 }, to: '@don' },
      ],
    },
    e_elci: {
      bg: 'saray_hitit', hands: 'uzan',
      lines: [
        'Batıdaki *Ahhiyava* ülkesinden bir elçi geliyor.',
        'Hitit kralı onun kralına "*kardeşim*" diye mektup yazıyor. Ama ikisi de birbirine güvenmiyor.',
        { when: has('elci'), text: 'Gemideki o kibirli elçiyi *hatırlıyorsun*. Aynı ülkeden.' },
      ],
      choices: [
        { text: 'Elçinin dilini çözmeye çalış', effect: { akil: 1 }, to: '@don' },
        { text: 'Elçinin muhafızlarıyla güreş', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: '@don' },
      ],
    },
    e_kurak: {
      bg: 'tapinak_hitit', hands: 'sepet',
      lines: [
        'Yağmur *yağmadı*. Tarlalar çatlak.',
        'Tapınak küpleri açılıyor, buğday *ölçülerek* dağıtılıyor.',
      ],
      choices: [
        { text: 'Dağıtıma yardım et', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: '@don' },
        { text: 'Kim ne kadar aldı, kayda geçir', effect: { akil: 1 }, to: '@don' },
        { text: 'Kendi payını yoksul bir aileye ver', effect: { enerji: -10, flags: ['comert'] }, to: '@don' },
      ],
    },
    e_bira: {
      bg: 'hattusa_kapi', hands: 'uzan',
      lines: [
        'Bir meyhanede kamış *pipetlerle* ortak küpten bira içiliyor.',
        'Ayyaşın biri kavga *çıkarıyor*.',
      ],
      choices: [
        { text: 'Kavgayı ayır', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Bir kamış al, sen de iç', cost: { para: 1 }, effect: { enerji: 10, para: -1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'yunus', start: 'e_yunus', when: denizde },
    { id: 'korsan', start: 'e_korsan', when: denizde },
    { id: 'demir', start: 'e_demir', when: kentte },
    { id: 'kus', start: 'e_kus', when: kentte },
    { id: 'cam', start: 'e_cam', when: kentte },
    { id: 'ulak', start: 'e_ulak', when: kentte },
    { id: 'elci', start: 'e_elci', when: kentte },
    { id: 'kurak', start: 'e_kurak', when: kentte },
    { id: 'bira', start: 'e_bira', when: kentte },
  ],
};

ERA4.hub = {
  intro: (st) => denizde(st)
    ? ['Gün batıyor. Deniz *bakır* rengine dönüyor.', 'Yıldızlar birer birer *çıkıyor*.', 'Dalga sesi bir *ninni* gibi.']
    : ['Akşam. Hattuşa\'nın surlarında meşaleler *yanıyor*.', 'Tapınaktan son ilahiler *duyuluyor*.', 'Kentin üstüne serin bir dağ havası *iniyor*.'],
  acts: [
    { id: 'kurek', show: denizde, text: 'Halatları onar', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, hands: 'yular',
      res: [['Islak halatları tek tek *örüyorsun*.', 'Tayfalar sana *güveniyor*.'], ['Parmakların su topluyor.', 'Ama yarın yelken *dayanacak*.']] },
    { id: 'balik', show: denizde, text: 'Balık tut', cost: { enerji: 5 }, effect: { enerji: 5, beden: 1 },
      res: [['Kayalardan oltayı *atıyorsun*.', 'Akşama ızgara *balık*.'], ['İki balık, bir de *ahtapot*.', 'Karnın doydu.']] },
    { id: 'yildiz', show: denizde, text: 'Yıldızlara bakarak yön bul', effect: { akil: 1 },
      res: [['Kuzeyde hiç kıpırdamayan bir *yıldız* var.', 'Denizciler yolu onunla *bulur*.'], ['Yıldızlar gecenin *saati* gibi dönüyor.', 'Göğü okumayı *öğreniyorsun*.']] },
    { id: 'katip', show: kentte, text: 'Arşivde tablet kopyala', req: has('yazi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 1, para: 1 }, hands: 'tablet',
      res: [['Eski bir antlaşmanın kopyasını *çıkarıyorsun*.', 'Arşiv bir krallığın *hafızası*.'], ['Hurrice bir ilahiyi Hititçeye *aktarıyorsun*.', 'Kelimeler dilden dile *geçiyor*.']] },
    { id: 'ders', show: kentte, text: 'Kâtiplik okulunda çivi yazısı çalış', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['yazi'] }, hands: 'tablet',
      res: [['Hitit kâtipleri Mezopotamya işaretlerini kendi dillerine *uyarlamış*.', 'Yazmaya *başlıyorsun*.'], ['Öğretmen yanlışını *siliyor*, yeniden yazdırıyor.', 'El yavaş yavaş *alışıyor*.']] },
    { id: 'ahir', show: kentte, text: 'Ahırda atları tımarla', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'yular',
      res: [['Atların yelesini *tarıyorsun*.', 'Seyisbaşı sana bir *şekel* veriyor.'], ['Genç bir kısrak sana *alışıyor*.', 'Avucundan arpa *yiyor*.']] },
    { id: 'firin', show: kentte, text: 'Tapınak fırınında ekmek pişir', cost: { enerji: 5 }, effect: { enerji: -5, para: 1 }, hands: 'sepet',
      res: [['Hamuru *yoğuruyor*, fırına sürüyorsun.', 'Kent sıcak ekmek *kokuyor*.'], ['Rahipler ekmeği tanrılara *sunuyor*.', 'Kalanı fırıncılara *kalıyor*.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Gözlerini *kapatıyorsun*.', 'Derin bir uyku.'], ['Rüyanda yine bir *gemi* görüyorsun.', 'Dinlendin.']] },
  ],
};
