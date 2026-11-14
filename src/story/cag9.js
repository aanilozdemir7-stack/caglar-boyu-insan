// ÇAĞ 9 — Osmanlı ve matbaa: İstanbul, Lale Devri (1720-1730)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - Lale Devri (1718-1730): III. Ahmed ve Sadrazam Nevşehirli Damat İbrahim Paşa. Kâğıthane'de Sadabad
//   köşkleri iki ayda yapılır; lale tutkusu, bahçe eğlenceleri, şiir ve kahvehane kültürü.
// - 1720: Fransız asıllı Gerçek Davud Ağa, Damat İbrahim Paşa'nın görevlendirmesiyle Tulumbacı Ocağı'nı kurar;
//   tulumbayla yangına müdahale eden ilk düzenli birlik. Ahşap İstanbul sık sık yanar.
// - Yirmisekiz Mehmed Çelebi 1720-21'de Paris elçisidir; oğlu Said Efendi onunla gider.
// - İbrahim Müteferrika (Macar asıllı, 1674-1745) ve Said Efendi matbaa için izin ister; Müteferrika
//   "Vesîletü't-Tıbâa" risalesini yazar. 5 Temmuz 1727 fermanı ve şeyhülislam fetvası ile dinî kitaplar dışında
//   basım serbest bırakılır. Matbaa harfleri dökülür, Hollanda'dan/Avrupa'dan alet getirilir.
// - İlk kitap Vankulu Lügati (iki cilt), Ocak 1729. Müteferrika ölümüne kadar 17 eser basar; bazıları haritalıdır.
// - Eylül 1730 Patrona Halil isyanı: Damat İbrahim Paşa öldürülür, III. Ahmed tahttan iner, Sadabad yağmalanır.
//   Matbaa bir süre durur.
// - Çiçek hastalığına karşı aşılama (çiçek aşısı) İstanbul'daki halk uygulamasıydı; İngiliz elçisinin eşi
//   Lady Mary Montagu 1717'de bunu görüp İngiltere'ye taşıdı.
// Karakter adları (Rıza Efendi, Zehra Hanım, Mustafa usta) kurgu.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const yazar = (st) => st.flags.includes('yazi');
const matbaada = (st) => st.flags.includes('matbaa');

export const ERA9 = {
  id: 9,
  name: 'Osmanlı ve matbaa',
  place: 'İstanbul',
  region: 'İstanbul',
  year: '1720',
  currency: 'kuruş',
  start: 'l1',
  next: { name: 'Makine devri', place: 'Hereke', year: '1843' },

  carry(st) {
    st.para = Math.min(25, Math.max(4, st.para + 2));
    st.enerji = Math.max(st.enerji, 70);
    const bilgi = st.flags.includes('yazi') ? ' Yazıyı bilmen bu çağda kapı açacak.' : '';
    return `Gümüş dirhemlerin ${st.para} kuruş ediyor.${bilgi}`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Lale Devri ----------
    l1: {
      bg: 'sadabad', hands: 'uzan', day: 1, place: 'İstanbul', year: '1720',
      lines: [
        'Gözlerini bir derenin kıyısında, *lale* tarhlarının ortasında açıyorsun.',
        'Derenin iki yanında beyaz köşkler, mermer *havuzlar*, fıskiyeler.',
        'Burası Kâğıthane: *Sadabad*. Padişahın ve sadrazamın gözdesi.',
        'Uzakta, iki denizin arasında o kent: *İstanbul*. Kubbeler, minareler.',
        { when: has('usta'), text: 'Kubbelerin arasında birini *tanıyorsun*. Ayasofya. Artık minareleri var.' },
      ],
      choices: [
        { text: 'Bahçıvanlara katıl, lale dik', effect: { beden: 1, flags: ['bahcivan9'] }, to: 'l2a' },
        { text: 'Bir kahvehaneye otur, kenti dinle', effect: { akil: 1 }, to: 'l2b' },
        { text: 'Bir hattatın dükkânına git', effect: { akil: 1, flags: ['hattat_dukkan'] }, to: 'l2c' },
      ],
    },
    l2a: {
      bg: 'sadabad', hands: 'sepet', day: 1,
      lines: [
        'Bahçıvanbaşı bir *soğanı* avucunda tutuyor. Bir mücevher gibi.',
        '"Bu *badem* laleden. Bir tanesi bir ev fiyatına satılır."',
        'Bir lale bir şiir gibi *adlandırılıyor*: Nur-ı Adn, Dürr-i Yekta, Gül-i Sadabad.',
      ],
      choices: [{ text: 'Soğanları özenle dik', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@olay', then: 'l3' }],
    },
    l2b: {
      bg: 'kahvehane', hands: 'uzan', day: 1,
      lines: [
        'Kahvehane *dolu*. Biri şiir okuyor, biri tavla oynuyor, biri gazete... henüz yok.',
        'Bir köşede bir meddah hikâye *anlatıyor*. Herkes gülüyor.',
        'Masada yeni bir haber: "Elçi Mehmed Çelebi *Paris*\'ten döndü!"',
        '"Diyor ki Frenkler kitapları elle yazmıyor. *Makineyle* basıyorlar."',
      ],
      choices: [{ text: '"Makineyle mi?" diye sor', effect: { akil: 1, flags: ['paris'] }, to: '@olay', then: 'l3' }],
    },
    l2c: {
      bg: 'hattat', hands: 'kalem', day: 1,
      lines: [
        'Hattat *Rıza Efendi* kamış kalemini mürekkebe batırıyor.',
        'Bir harfi yazmak için *nefesini* tutuyor. Harf, bir dans gibi akıyor.',
        { when: yazar, text: 'Arap harflerini Kayseri\'den biliyorsun. Ama böyle *güzelliğini* hiç görmedin.' },
        '"Bir Kuran\'ı yazmak bir *ömür* sürer," diyor. "Kitap, sabırdan doğar."',
      ],
      choices: [
        { text: 'Mürekkep ve kâğıt hazırlamakta yardım et', effect: { beden: 1, para: 1 }, to: '@olay', then: 'l3' },
        { text: 'Yazı dersi iste', effect: { akil: 1, flags: ['yazi'] }, to: '@olay', then: 'l3' },
      ],
    },
    l3: {
      bg: 'lale_gece', hands: 'uzan', day: 1,
      lines: [
        'Akşam bahçede bir *şenlik*. Ağaçlara fenerler asılmış.',
        'Lalelerin arasında *kaplumbağalar* yürüyor. Sırtlarında yanan mumlar.',
        'Işıklar bahçede *ağır ağır* dolaşıyor. Saz çalınıyor, gazeller okunuyor.',
        'Bir köşede bir yaşlı adam *söyleniyor*: "Saray eğlenirken çarşı aç."',
      ],
      choices: [
        { text: 'Şenliğin tadını çıkar', effect: { enerji: 15 }, to: '@aksam', then: 'l4' },
        { text: 'Yaşlı adamın yanına git', effect: { akil: 1, flags: ['huzursuz'] }, to: '@aksam', then: 'l4' },
      ],
    },
    l4: {
      bg: 'ahsap_mahalle', hands: 'uzan', day: 2,
      lines: [
        'Sabah. Ahşap evlerin sıkış sıkış dizildiği bir *mahalle*.',
        'Cumbalar, kafesler, dar *sokaklar*. Her ev bir öncekine yaslanmış.',
        'Birden bir ses: "*Yangın var!*"',
        'Bir evin damından duman *yükseliyor*. Rüzgâr esiyor.',
      ],
      choices: [
        { text: 'Kova zincirine katıl', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'l5a' },
        { text: 'Yan evlerdeki insanları çıkar', effect: { beden: 1, flags: ['kurtardi9'] }, to: 'l5a' },
        { text: '"Ateşin önündeki evi yıkın!" diye bağır', effect: { akil: 1 }, to: 'l5a' },
      ],
    },
    l5a: {
      bg: 'ahsap_yangin', hands: 'uzan', day: 2,
      lines: [
        'Kovalar *yetmiyor*. Alevler sokağın öbür yanına atlıyor.',
        'Sonra bir *çan* sesi. Koşarak gelen adamlar, omuzlarında bir *alet*.',
        'Bir sandık, bir kol, bir *hortum*. Biri kolu inip kaldırıyor, hortumdan su fışkırıyor.',
        'Başlarında Fransız aksanlı biri: *Gerçek Davud Ağa*.',
      ],
      choices: [
        { text: 'Tulumbanın koluna geç', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['tulumbaci'] }, to: 'l6' },
        { text: 'Tulumbaya su taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'l6' },
        { text: 'Tulumbanın nasıl çalıştığını izle', effect: { akil: 1, flags: ['pompa'] }, to: 'l6' },
      ],
    },
    l6: {
      bg: 'ahsap_mahalle', hands: 'uzan', day: 2,
      lines: [
        'Yangın *söndü*. On ev gitti, ama bütün mahalle değil.',
        'Davud Ağa elini sıkıyor: "Sadrazam bir *ocak* kurdu. Maaşlı tulumbacılar. Sen de gel."',
        { when: has('pompa'), text: '"Pistonu gördün mü? Hava basıncı. Suyu *iter*. Basit, ama kimse düşünmemişti."' },
        'Yanmış evlerin sahipleri ağlıyor. Mahalleli *yardım* topluyor.',
      ],
      choices: [
        { text: 'Tulumbacı ocağına yazıl', effect: { para: 2, flags: ['ocak'] }, to: 'l7' },
        { text: 'Evsiz kalanlara yardım topla', effect: { flags: ['comert'] }, to: 'l7' },
        { text: 'Teşekkür et, kendi yoluna dön', to: 'l7' },
      ],
    },
    l7: {
      bg: 'kahvehane', hands: 'uzan', day: 3,
      lines: [
        'Kahvehanede herkes *çiçek* hastalığını konuşuyor. Mahallede çocuklar hasta.',
        'Yaşlı bir kadın, *Zehra Hanım*, elinde bir iğne ve bir ceviz kabuğu.',
        '"Hafif geçirenin yarasından alırım, sağlam çocuğun koluna *çizerim*. Hafif hastalanır, bir daha tutmaz."',
        'Bir İngiliz elçisinin karısı bunu *görmüş*, kendi oğluna yaptırmış. Şimdi İngiltere\'ye anlatıyormuş.',
      ],
      choices: [
        { text: 'Zehra Hanım\'a yardım et', effect: { akil: 1, flags: ['asi'] }, to: '@aksam', then: 'm1' },
        { text: '"Tehlikeli değil mi?" diye sor', effect: { akil: 1 }, to: '@aksam', then: 'm1' },
        { text: 'Hasta çocukların evine su ve ekmek taşı', effect: { beden: 1 }, to: '@aksam', then: 'm1' },
      ],
    },

    // ---------- BÖLÜM 2: Matbaa ----------
    m1: {
      bg: 'hattat', hands: 'kitap', day: 4, year: '1726',
      lines: [
        'Yıllar geçti. Bir *konağın* odasında iki adam masaya eğilmiş.',
        'Biri *Said Efendi*: Babasıyla Paris\'e gitmiş, matbaayı görmüş.',
        'Öteki *İbrahim Müteferrika*: Macar asıllı, saray adamı, haritacı, *bilgin*.',
        'Önlerinde bir risale: "Matbaanın yararları." Sadrazama *sunulacak*.',
      ],
      choices: [
        { text: 'Risaleyi temize çek', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 2, flags: ['risale', 'matbaa'] }, to: 'm1b' },
        { text: 'Bergama\'yı, Celsus\'u, kaybolan kitapları anlat', effect: { akil: 1, flags: ['matbaa'] }, to: 'm1b' },
        { text: '"Size el emeği lazım mı?" diye sor', effect: { beden: 1, flags: ['matbaa'] }, to: 'm1b' },
      ],
    },
    m1b: {
      bg: 'hattat', hands: 'uzan', day: 4,
      lines: [
        'Said Efendi Paris\'i *anlatıyor*: Geniş caddeler, rasathane, kütüphaneler.',
        '"Bir matbaaya girdim. Adamlar *kurşun* harfleri diziyor, bir kol çekiyor, sayfa çıkıyor."',
        '"Bir günde, bizim hattatların bir ayda yazacağını *basıyorlar*."',
        { when: has('paris'), text: 'Kahvehanede duyduğun söylenti *gerçekmiş*.' },
      ],
      choices: [
        { text: '"Biz de yapabiliriz"', effect: { akil: 1 }, to: 'm2' },
        { text: '"Ne kadar para gerekir?"', effect: { akil: 1, flags: ['butce'] }, to: 'm2' },
      ],
    },
    m2: {
      bg: 'hattat', hands: 'uzan', day: 4,
      lines: [
        'Müteferrika risalesini *okuyor*:',
        '"Kitaplar elle yazıldıkça az kalır, *yanlış* kopyalanır, yangında yok olur."',
        '"Basılan kitap *ucuz* olur, çok olur, doğru olur."',
        { when: has('debbag'), text: 'Bergama\'da kazıdığın derileri düşünüyorsun. Bin dokuz yüz yıl sonra yine aynı *dert*.' },
      ],
      choices: [
        { text: '"Hattatlar ne olacak?" diye sor', effect: { akil: 1, flags: ['hattat_soru'] }, to: 'm3' },
        { text: '"Hemen başlayalım"', effect: { beden: 1 }, to: 'm3' },
      ],
    },
    m3: {
      bg: 'hattat', hands: 'kalem', day: 5, year: '1727',
      lines: [
        { when: has('hattat_soru'), text: 'Müteferrika: "Kuran\'ı ve dinî kitapları basmayacağız. Onlar hattatların *kalacak*."' },
        'Temmuz ayı. Padişahın *fermanı* geliyor. Şeyhülislamın fetvasıyla.',
        'Sözlük, tarih, coğrafya, bilim: *Basılabilir*.',
        'Rıza Efendi sana bakıyor. Gözlerinde hem kaygı, hem *merak*.',
      ],
      choices: [
        { text: 'Rıza Efendi\'ı harflerin çizimine davet et', effect: { akil: 1, flags: ['hattat_harf'] }, to: 'm4' },
        { text: 'Onu rahatlat: "Güzel yazı makineyle yapılmaz"', effect: { akil: 1 }, to: 'm4' },
      ],
    },
    m4: {
      bg: 'matbaa', hands: 'cekic', day: 5,
      lines: [
        'Müteferrika\'nın evinin bir odası *atölye* oldu.',
        'Önce *harfler*: Her harfin kalıbı oyuluyor, içine kurşun karışımı dökülüyor.',
        'Ama Arap harfleri *bitişik* yazılır. Her harfin baş, orta, son biçimi var.',
        'Yüzlerce farklı *parça*. Latin harfleriyle basmaktan çok daha zor.',
        { when: has('hattat_harf'), text: 'Rıza Efendi kalıplar için harfleri *çiziyor*. Gülümsüyor bile.' },
      ],
      choices: [
        { text: 'Harf dök', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['dokumcu'] }, to: '@olay', then: 'm5' },
        { text: 'Harfleri kasalara sırala, dizgici ol', effect: { akil: 2, flags: ['dizgici'] }, to: '@olay', then: 'm5' },
        { text: 'Mürekkebi hazırla: is, yağ, sabır', effect: { akil: 1, beden: 1 }, to: '@olay', then: 'm5' },
      ],
    },
    m5: {
      bg: 'matbaa', hands: 'uzan', day: 6,
      lines: [
        'Ahşap *baskı makinesi* kuruldu. Bir vida, bir kol, düz bir tabla.',
        { when: has('dizgici'), text: 'Harfleri *ters* diziyorsun. Sağdan sola, ters yüz. Aynada okur gibi.' },
        'Mürekkep sürülüyor, kâğıt konuyor, *kol* çekiliyor.',
        'Kâğıt kalkıyor. Üstünde *yazı*.',
      ],
      choices: [
        { text: 'İlk sayfayı ışığa tut', effect: { akil: 1 }, to: 'm6' },
        { text: 'Kolu bir daha çek, bir daha', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'm6' },
      ],
    },
    m6: {
      bg: 'matbaa', hands: 'kitap', day: 6,
      lines: [
        'Bir sayfa. Sonra yüz. Sonra *binlerce*.',
        'Bir hattatın bir ömürde yazacağını, makine *haftalar* içinde basıyor.',
        { when: has('tomarlar'), text: 'Konstantinopolis\'te yangından kurtardığın tomarları düşünüyorsun. Artık tek kopya *kalmayacak*.' },
        { when: has('kodeks'), text: 'Bergama\'da önerdiğin sayfalı kitap, şimdi *makineden* çıkıyor.' },
      ],
      choices: aksam('m7'),
    },
    m7: {
      bg: 'matbaa', hands: 'kitap', day: 7, year: '1729',
      lines: [
        'Ocak ayı. İlk kitap *bitti*: Vankulu Lügati. Arapça-Türkçe büyük bir sözlük.',
        'İki cilt. *Yüzlerce* nüsha.',
        'Müteferrika ilk nüshayı *okşuyor*. Sonra sana uzatıyor.',
        '"Bu senin de kitabın."',
      ],
      choices: [
        { text: 'Kitabı Rıza Efendi\'a götür', show: has('hattat_harf'), effect: { flags: ['dostluk'] }, to: 'm8' },
        { text: 'Kahvehanede herkese göster', effect: { akil: 1 }, to: 'm8' },
        { text: 'Sessizce raflara diz', to: 'm8' },
      ],
    },
    m8: {
      bg: 'kahvehane', hands: 'kitap', day: 7,
      lines: [
        { when: has('dostluk'), text: 'Rıza Efendi kitabı uzun uzun *inceliyor*. "Harfler güzel olmuş," diyor. "Ama kalemin ruhu yok." Sonra gülümsüyor.' },
        'Kahvehanede kitap elden ele *dolaşıyor*. Kimi şaşkın, kimi kuşkulu.',
        'Ama fiyatı ortada: El yazmasının çok altında. Bir *öğrenci* bile alabilir.',
      ],
      choices: [
        { text: 'Sıradaki kitap için harita çizimine yardım et', effect: { akil: 1, flags: ['harita'] }, to: '@aksam', then: 'h1' },
        { text: 'Kâğıt balyalarını matbaaya taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 2 }, to: '@aksam', then: 'h1' },
      ],
    },

    h1: {
      bg: 'matbaa', hands: 'uzan', day: 8, year: '1730',
      lines: [
        'Matbaada yeni bir iş: *Yeni Dünya*\'yı anlatan bir kitap. Okyanusun ötesindeki kıtayı.',
        'Kitapta *haritalar* ve resimler olacak. Ama resim harfle basılmaz.',
        'Müteferrika bir bakır levha *gösteriyor*: "Çizgiyi bakıra kazıyacağız. Mürekkep oyuklara dolacak."',
      ],
      choices: [
        { text: 'Bakıra kıyı çizgilerini kazı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, akil: 1, flags: ['oymaci'] }, to: 'h2' },
        { text: 'Yer adlarını harita için hazırla', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 2 }, to: 'h2' },
        { text: 'Levhaları cilala', effect: { beden: 1, para: 1 }, to: 'h2' },
      ],
    },
    h2: {
      bg: 'matbaa', hands: 'kitap', day: 8,
      lines: [
        'İlk harita *basılıyor*. Kıyılar, adalar, rüzgâr gülleri.',
        { when: has('kure'), text: 'Bergama\'da Krates\'in küresinde boş duran *okyanus* şimdi doluyor.' },
        { when: has('anlatti_van'), text: 'Strabon\'a anlattığın Van Gölü bile bir gün böyle bir *haritaya* girecek.' },
        'Müteferrika: "Bir haritayı elle kopyalayan, her seferinde bir *yanlış* ekler. Baskı eklemez."',
      ],
      choices: [
        { text: 'Haritayı kahvehaneye götür, göster', effect: { akil: 1 }, to: 'h3' },
        { text: 'Kurumaları için sayfaları as', effect: { beden: 1 }, to: 'h3' },
      ],
    },
    h3: {
      bg: 'kahvehane', hands: 'kitap', day: 8,
      lines: [
        'Kahvehanede *kalabalık* haritanın başında. Biri parmağıyla okyanusu geçiyor.',
        '"Demek dünya bu kadar *büyük*."',
        'Ama masanın öbür ucunda başka bir konu: Vergiler, savaş, *öfke*.',
      ],
      choices: devam('p1'),
    },

    // ---------- BÖLÜM 3: Patrona ----------
    p1: {
      bg: 'kahvehane', hands: 'uzan', day: 9,
      lines: [
        'Eylül. Kahvehanede başka bir *hava*. Sesler alçak, yüzler asık.',
        'İran cephesinden kötü haberler. Vergiler ağır. Saray hâlâ *eğleniyor*.',
        'Bir hamam tellağı bağırıyor: Adı *Patrona Halil*. Arkasında kalabalık büyüyor.',
        { when: has('huzursuz'), text: 'Sadabad\'daki yaşlı adamın sözü aklına geliyor: "Saray eğlenirken çarşı *aç*."' },
      ],
      choices: [
        { text: 'Kalabalığı dinle, ne istiyorlar?', effect: { akil: 1 }, to: 'p2' },
        { text: 'Matbaaya koş, Müteferrika\'yı uyar', show: matbaada, effect: { flags: ['uyardi9'] }, to: 'p2' },
        { text: 'Evine kapan', to: 'p2' },
      ],
    },
    p2: {
      bg: 'ahsap_yangin', hands: 'uzan', day: 8,
      lines: [
        'Dükkânlar *kapanıyor*. Kalabalık saraya yürüyor.',
        'İsyancılar sadrazamın teslim edilmesini *istiyor*.',
        'Kâğıthane\'den dumanlar yükseliyor. Sadabad köşkleri *yağmalanıyor*.',
      ],
      choices: [
        { text: 'Matbaanın kapısında bekle', show: matbaada, cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['nobet'] }, to: 'p3' },
        { text: 'Tulumbayla yangınlara koş', show: has('ocak'), cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: 'p3' },
        { text: 'Komşuları evlerine sok, kapıları kapat', effect: { akil: 1 }, to: 'p3' },
      ],
    },
    p3: {
      mood: 'dark',
      bg: 'sadabad', hands: 'yok', day: 10,
      lines: [
        'Birkaç gün içinde her şey *değişiyor*. Sadrazam öldürüldü. Padişah tahttan indi.',
        'Sadabad\'ın beyaz köşkleri *talan* edildi. Lale tarhları çiğnendi.',
        'Lale Devri, bir isyanla *bitti*.',
      ],
      choices: [
        { text: 'Matbaaya git', to: 'p4' },
      ],
    },
    p4: {
      bg: 'matbaa', hands: 'uzan', day: 10,
      lines: [
        'Matbaanın kapısı *sağlam*. İçeride makine, harfler, kâğıtlar.',
        { when: has('nobet'), text: 'Kapıda nöbet tuttuğun geceler *boşa* gitmedi.' },
        'Ama Müteferrika yorgun. Koruyucusu sadrazam *yok*. Baskılar bir süre duracak.',
        '"Duracak, ama *bitmeyecek*," diyor. "Harfler bir kez döküldü."',
      ],
      choices: [
        { text: 'Harfleri sandıklara koy, sakla', effect: { beden: 1, flags: ['harfler'] }, to: '@olay', then: 'p5' },
        { text: 'Basılmış kitapların listesini tut', effect: { akil: 1 }, to: '@olay', then: 'p5' },
      ],
    },
    p5: {
      bg: 'halic', hands: 'uzan', day: 11,
      lines: [
        { when: has('dizgici'), text: 'Parmakların hâlâ harfleri arıyor. Ters, sağdan sola, *kurşun*.' },
        { when: has('tulumbaci'), text: 'Tulumbacı ocağı büyüyor. Her mahallede bir *tulumba*.' },
        { when: has('asi'), text: 'Zehra Hanım\'ın aşısı Avrupa\'ya *yayılıyor*. Yıllar sonra bir İngiliz hekim onu geliştirecek.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'p6' }],
    },
    p6: {
      bg: 'halic', hands: 'dinlen', day: 11,
      lines: [
        'Müteferrika ölünceye kadar *on yedi* eser basacak. Haritalarla, çizimlerle.',
        'Matbaa yavaş ama *durmadan* yayılacak.',
        'Avrupa\'da *buhar* gücüyle çalışan makineler yapılıyor. Bir gün buraya da gelecekler.',
        'Ve bir gün bu kentin kıyılarında *fabrika* bacaları tütecek.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_sakaci: {
      bg: 'ahsap_mahalle', hands: 'uzan',
      lines: [
        'Bir *saka* sırtındaki kırbayla çeşmeden ev ev su taşıyor.',
        'Yaşlı adam yokuşta *soluklanıyor*.',
      ],
      choices: [
        { text: 'Kırbayı yokuşun başına sen taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Ona bir kahve ısmarla', cost: { para: 1 }, effect: { para: -1, enerji: 5 }, to: '@don' },
      ],
    },
    e_simit: {
      bg: 'halic', hands: 'sepet',
      lines: [
        'Kıyıda bir *simitçi*. Tablası başında, sesi kulak tırmalıyor.',
        '"Taze *simiiit*!"',
      ],
      choices: [
        { text: 'Bir simit al', cost: { para: 1 }, effect: { para: -1, enerji: 15 }, to: '@don' },
        { text: 'Simitçiye tablasını taşımakta yardım et', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_kayik: {
      bg: 'halic', hands: 'yular',
      lines: [
        'Haliç\'te bir *kayıkçı* müşteri bekliyor. Kürekleri ince, kayığı zarif.',
        '"Üsküdar\'a mı, Eyüp\'e mi?"',
      ],
      choices: [
        { text: 'Kürek çekmeyi dene', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Kayıkçıya kentin haberlerini sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_lale: {
      bg: 'sadabad', hands: 'kese',
      lines: [
        'Bir tüccar gizlice *nadir* bir lale soğanı satıyor. Fiyatı fahiş.',
        '"Saray fiyatları sabitledi," diye fısıldıyor. "Ama ben *kaçak* satarım."',
      ],
      choices: [
        { text: 'Al, sonra pahalıya sat', cost: { para: 2 }, effect: { para: 1, flags: ['spekulator'] }, to: '@don' },
        { text: 'Reddet', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_meddah: {
      bg: 'kahvehane', hands: 'uzan',
      lines: [
        'Meddah bir *mendil* sallıyor, sopasını yere vuruyor.',
        'Bir cimri tüccarı taklit ediyor. Bütün kahvehane *kırılıyor*.',
      ],
      choices: [
        { text: 'Kahkahalarla gül', effect: { enerji: 15 }, to: '@don' },
        { text: 'Meddaha kendi hikâyeni anlat', effect: { akil: 1, flags: ['meddah'] }, to: '@don' },
      ],
    },
    e_karagoz: {
      bg: 'lale_gece', hands: 'uzan',
      lines: [
        'Bir perdenin arkasında ışık. Renkli deriden *tasvirler*: Karagöz ve Hacivat.',
        'Hacivat süslü sözlerle konuşuyor, Karagöz hepsini *ters* anlıyor.',
      ],
      choices: [
        { text: 'İzle', effect: { enerji: 15 }, to: '@don' },
        { text: 'Hayalî\'ye tasvirleri nasıl yaptığını sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_ebru: {
      bg: 'hattat', hands: 'firca',
      lines: [
        'Bir usta su dolu teknenin yüzüne *boya* serpiyor.',
        'Bir iğneyle desen çiziyor, kâğıdı bastırıyor: *Ebru*.',
      ],
      choices: [
        { text: 'Bir lale deseni dene', effect: { akil: 1 }, to: '@don' },
        { text: 'Kâğıtları kurumaya as', effect: { para: 1 }, to: '@don' },
      ],
    },
    e_kitapci: {
      bg: 'kahvehane', hands: 'kitap',
      lines: [
        'Sahaflar çarşısında bir kitapçı *basma* bir kitabı evirip çeviriyor.',
        '"Ucuz ama *soğuk*," diyor. "El yazmasının bir sıcaklığı vardır."',
      ],
      choices: [
        { text: '"Ama herkes okuyabilir" de', effect: { akil: 1 }, to: '@don' },
        { text: 'Bir el yazması satın al', cost: { para: 2 }, effect: { para: -2, flags: ['elyazmasi'] }, to: '@don' },
      ],
    },
    e_hamal: {
      bg: 'halic', hands: 'sepet',
      lines: [
        'İskelede bir *hamal* sırtına bir dolap yüklemiş.',
        'Semeri eğilmiş. Ayağı *kayıyor*.',
      ],
      choices: [
        { text: 'Yükün altına gir, destek ol', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: '@don' },
        { text: 'Bir el arabası bul', effect: { akil: 1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'sakaci', start: 'e_sakaci' },
    { id: 'simit', start: 'e_simit' },
    { id: 'kayik', start: 'e_kayik' },
    { id: 'lale', start: 'e_lale', when: (st) => !['1730'].includes(st.yil) },
    { id: 'meddah', start: 'e_meddah' },
    { id: 'karagoz', start: 'e_karagoz' },
    { id: 'ebru', start: 'e_ebru' },
    { id: 'kitapci', start: 'e_kitapci', when: (st) => st.yil === '1729' || st.yil === '1730' },
    { id: 'hamal', start: 'e_hamal' },
  ],
};

ERA9.hub = {
  intro: ['Akşam ezanı *okunuyor*. Haliç\'in üstünde gökyüzü mor.', 'Kahvehanelerde fenerler *yanıyor*.', 'Bekçi sopasını yere *vuruyor*: "Yangın var mı?"'],
  acts: [
    { id: 'tulumba', show: (st) => st.flags.includes('ocak') || st.flags.includes('tulumbaci'), text: 'Tulumbacı ocağında nöbet tut', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 2 },
      res: [['Gece sakin. Tulumbayı *yağlıyorsun*.', 'Davud Ağa sana iki kuruş veriyor.'], ['Gece yarısı bir *çan*. Küçük bir yangın, hemen sönüyor.', 'İşini biliyorsun artık.']] },
    { id: 'hat', text: 'Hattata mürekkep ve kâğıt hazırla', effect: { para: 1, akil: 1 }, hands: 'kalem',
      res: [['Kâğıdı yumurta akıyla *aharlıyor*, mührelerle parlatıyorsun.', 'Rıza Efendi beğeniyor.'], ['İs mürekkebini *eziyorsun*. Saatler sürüyor.', 'Kalem artık kayacak.']] },
    { id: 'dizgi', show: matbaada, text: 'Matbaada gece dizgisi yap', effect: { akil: 1, para: 1 }, hands: 'kitap',
      res: [['Harfleri tek tek *diziyorsun*. Ters, sağdan sola.', 'Bir sayfa hazır.'], ['Bir harf *eksik*. Kasalarda arıyorsun.', 'Sabaha karşı buluyorsun.']] },
    { id: 'kahve', text: 'Kahvehanede sohbete katıl', cost: { para: 1 }, effect: { para: -1, akil: 1, enerji: 10 },
      res: [['Kahve *acı*, sohbet tatlı.', 'Bir şair yeni gazelini okuyor.'], ['Biri Frenk elçilerini *anlatıyor*.', 'Dünya değişiyor, herkes hissediyor.']] },
    { id: 'hamallik', text: 'İskelede yük taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'sepet',
      res: [['Kahve çuvalları, *şeker* sandıkları.', 'İki kuruş kazandın.'], ['Sırtın sızlıyor.', 'Ama bu kent *taşımakla* yaşıyor.']] },
    { id: 'lale', text: 'Bahçede lale soğanlarını ayıkla', cost: { enerji: 5 }, effect: { enerji: -5, beden: 1, para: 1 }, hands: 'sepet',
      res: [['Soğanları *boylarına* göre ayırıyorsun.', 'Bahçıvanbaşı memnun.'], ['Bir soğanın üstünde çürük bir *leke*. Ayırıyorsun.', 'Bir tane bütün tarhı bozar.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda *harfler* görüyorsun. Ters, sağdan sola.', 'Dinlendin.']] },
  ],
};
