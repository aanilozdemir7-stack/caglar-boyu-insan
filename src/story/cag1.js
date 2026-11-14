// ÇAĞ 1 — Taş Devri, Göbeklitepe (MÖ 9600)
// Yazım kuralları: tasarım belgesindeki "Ajanın uyacağı yazım kuralları".
// *kelime* = sarı vurgulanan anahtar kelime.
// Satır, koşullu olabilir: { when: (st) => ..., text: '...' }
// Seçim: { text, cost, effect, to, req, reqText, show }
// to: '@olay' + then: 'sahne'  → çağın olay havuzundan rastgele bir olay, sonra 'then'
// to: '@don'                   → olay bitti, ana hikâyeye dön
// Tarihsel dayanak: Göbeklitepe Araştırma Projesi (DAI) yayınları — ceylan göçü avları,
// büyük ziyafetler, binlerce öğütme taşı, yabani siyez/arpa, kayaya oyulmuş su sarnıçları,
// taş ocağında yarım kalmış dev sütun, 43 numaralı "Akbaba Taşı".

const has = (f) => (st) => st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];

export const ERA1 = {
  id: 1,
  name: 'Taş Devri',
  place: 'Göbeklitepe',
  region: 'Şanlıurfa',
  year: 'MÖ 9600',
  currency: 'çakmaktaşı',
  start: 's1',
  next: { name: 'Yerleşik hayat', place: 'Çatalhöyük', year: 'MÖ 7400' },

  scenes: {
    // ---------- BÖLÜM 1: Gece ateşi ----------
    s1: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Bugünkü *Şanlıurfa* yakınları. Bir tepenin üstü.',
        'Kabilen, dev taş *sütunların* arasında toplanmış.',
        'Aşağıda uçsuz bucaksız *Harran Ovası*, karanlıkta uyuyor.',
        'Ateş sönmek üzere. Yaşlı Ana sana *bakıyor*.',
      ],
      choices: [
        { text: 'Karanlığa dal toplamaya git', effect: { enerji: -10, beden: 1 }, to: 's2a' },
        { text: 'Közleri taşlarla çevirip koru', effect: { akil: 1 }, to: 's2b' },
      ],
    },
    s2a: {
      bg: 'karanlik', hands: 'yok', day: 1,
      lines: [
        'Kollarına dal dolduruyorsun.',
        'Çalıların arasında iki çift *göz* parlıyor.',
        'Kurtlar. Aç ve sessizler.',
      ],
      choices: [
        { text: 'Dalları bırak, tepeye koş', effect: { enerji: -10, flags: ['kurttan_kacti'] }, to: 's2a_kac' },
        { text: 'Közden bir dal tutuştur, kurtları korkut', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['cesur'] }, to: 's2a_mesale' },
      ],
    },
    s2a_kac: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Nefes nefese ateşin başına dönüyorsun. Elin *boş*.',
        'Kimse bir şey demiyor. Ama herkes gördü.',
        'Ateş, Yaşlı Ana\'nın üflemesiyle güçlükle *canlanıyor*.',
      ],
      choices: [{ text: 'Ateşin başına otur', to: 'a1' }],
    },
    s2a_mesale: {
      bg: 'karanlik', hands: 'mesale', day: 1,
      lines: [
        'Alev karanlığı yarıyor. Gözler geri *çekiliyor*.',
        'Dalları toplayıp tepeye dönüyorsun.',
        'Ateş yeniden harlanınca biri omzuna *dokunuyor*.',
      ],
      choices: [{ text: 'Ateşin başına otur', to: 'a1' }],
    },
    s2b: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Taşlar ısıyı tutuyor. Ateş *yavaş* yanıyor ama sönmüyor.',
        'Yaşlı Ana uzun uzun taşlarına bakıyor.',
        '"Bunu kimden öğrendin?" diyor. *Cevap* beklemiyor.',
      ],
      choices: [{ text: 'Ateşin başına otur', effect: { flags: ['ana_fark_etti'] }, to: 'a1' }],
    },
    a1: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Herkes ateşin çevresinde toplanıyor. Yaşlı Ana *anlatmaya* başlıyor.',
        '"Akbabalar ölülerin ruhunu göğe taşır," diyor.',
        '"Taşlara hayvan kazımamızın sebebi bu. Taşlar *unutmaz*."',
        'Çocuklar sütunlardaki tilkiye, yaban domuzuna *korkuyla* bakıyor.',
      ],
      choices: [
        { text: 'Sor: "Bu taşları kim dikti?"', effect: { akil: 1 }, to: 'a2a' },
        { text: 'Sessizce dinle, uykuya dal', effect: { enerji: 15 }, to: 'a2b' },
        { text: 'Bütün gece ateşi bekle', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, flags: ['nobet'] }, to: 'a2c' },
      ],
    },
    a2a: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Yaşlı Ana gülümsüyor. "Biz. Bizden öncekiler. Bizden *sonrakiler*."',
        '"Burası tek bir kabilenin değil. Her yaz yüzlerce kişi buraya *gelir*."',
        '"Ziyafet verir, taş dikerler. Sen de bir gün *dikeceksin*."',
      ],
      choices: aksam('s3', 'Sabahı bekle'),
    },
    a2b: {
      bg: 'gece_ates', hands: 'dinlen', day: 1,
      lines: [
        'Rüyanda dev bir *akbaba* görüyorsun.',
        'Kanatlarını açıyor ve seninle *konuşuyor*.',
        '"Gördüğün her şeyi hatırla," diyor. "Çünkü sen *kalacaksın*."',
      ],
      choices: aksam('s3', 'Uyan'),
    },
    a2c: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Gece boyunca ateşi besliyorsun. Yıldızlar yavaşça *dönüyor*.',
        'Şafakta gözlerin yanıyor ama ateş *hâlâ* canlı.',
        'Avcıbaşı *Kartal* uyanınca önce ateşe, sonra sana bakıyor.',
      ],
      choices: aksam('s3', 'Sabahı karşıla'),
    },

    // ---------- BÖLÜM 2: Taş ustası ----------
    s3: {
      bg: 'sutun_gunduz', hands: 'yok', day: 2,
      lines: [
        'Sabah. Taş ustası *Kaya*, dev bir sütuna tilki kazıyor.',
        'Sütunun yanlarında taştan *kollar* var. Elleri önde birleşiyor.',
        'Kaya\'nın çakmaktaşı kalemi kırılmış. Söylenip duruyor.',
        '"Ya bir kalem bul ya da şu taşı kaldırmama *yardım* et."',
      ],
      choices: [
        { text: 'Yeni bir kalem yont', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 's4a' },
        { text: 'Sütunu kaldırmaya yardım et', cost: { enerji: 25 }, effect: { enerji: -25, beden: 2 }, to: 's4b' },
        { text: 'Taşın nereden geldiğini sor', effect: { akil: 1 }, to: 'q1' },
      ],
    },
    s4a: {
      bg: 'sutun_gunduz', hands: 'kalem', day: 2,
      lines: [
        'Çakmaktaşını taşla vura vura *inceltiyorsun*.',
        'Kaya kalemi eline alıp çeviriyor. Sonra gülüyor.',
        'Sana iki parça *çakmaktaşı* uzatıyor. "Al, hak ettin. Şimdi gel benimle."',
      ],
      choices: [{ text: 'Kaya\'nın peşinden git', effect: { para: 2, flags: ['kaya_dost'] }, to: 'q1' }],
    },
    s4b: {
      bg: 'sutun_gunduz', hands: 'uzan', day: 2,
      lines: [
        'Altı kişi ipleri çekiyor. Sen en *öndesin*.',
        'Taş gıcırdayarak yerine oturuyor. Kolların titriyor.',
        'Kaya başını sallıyor: "Gücün var. Gel, sana bu taşların *doğduğu* yeri göstereyim."',
      ],
      choices: [{ text: 'Kaya\'nın peşinden git', to: 'q1' }],
    },
    q1: {
      bg: 'ocak', hands: 'yok', day: 2,
      lines: [
        'Tepenin yamacında bembeyaz bir kireç taşı *ocağı*.',
        'Kayanın içinde yarım kalmış dev bir sütun yatıyor. Boyu yedi adam *boyu*.',
        { when: has('kaya_dost'), text: 'Kaya senin yonttuğun kalemi *beline* takmış.' },
        '"Bunu kayadan ayırmak aylar sürer," diyor Kaya. "Sen olsan nereden *başlardın*?"',
      ],
      choices: [
        { text: 'Taşın damarını incele, çatlaktan başla', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1 }, to: 'q2a' },
        { text: 'Taş baltayla bütün gün vur', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: 'q2b' },
        { text: 'Bu iş sana göre değil, avcılara git', to: 'q_kac' },
      ],
    },
    q_kac: {
      bg: 'ocak', hands: 'yok', day: 2,
      lines: [
        'Kaya arkandan *sesleniyor*: "Taş sabırlı olanı sever!"',
        'Duymazdan geliyorsun. Ama söz aklında *kalıyor*.',
      ],
      choices: aksam('k1', 'Yoluna devam et'),
    },
    q2a: {
      bg: 'ocak', hands: 'kalem', day: 2,
      lines: [
        'Parmağını kayada gezdiriyorsun. İnce bir *çatlak* var.',
        'Oradan vurunca taş büyük parçalar halinde *ayrılıyor*.',
        'Kaya şaşkın: "Taş seninle *konuşuyor* galiba."',
      ],
      choices: [{ text: 'Devam et', to: 'q3' }],
    },
    q2b: {
      bg: 'ocak', hands: 'kalem', day: 2,
      lines: [
        'Saatlerce vuruyorsun. Avuçların su *topluyor*.',
        'Taş ilerliyor. Ama sadece *biraz*.',
        'Kaya elini omzuna koyuyor: "Güç başlatır, *sabır* bitirir."',
      ],
      choices: [{ text: 'Devam et', to: 'q3' }],
    },
    q3: {
      bg: 'ocak', hands: 'uzan', day: 2,
      lines: [
        'Bitmiş bir sütun ocaktan tepeye *taşınacak*.',
        'Elli kişi gerekiyor. Ama çevrede kütük yapacak *ağaç* çok az.',
        'Herkes sana bakıyor. Neden *sana*?',
      ],
      choices: [
        { text: 'Yola çakıl dök, sütunu iplerle kaydır', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['cakil'] }, to: 'q4' },
        { text: 'Elli kişiyle omuz omuza çek', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['omuz'] }, to: 'q4' },
        { text: 'Bir şarkı başlat, herkes aynı anda çeksin', cost: { enerji: 10 }, effect: { enerji: -10, flags: ['sarki'] }, to: 'q4' },
      ],
    },
    q4: {
      bg: 'sutun_gunduz', hands: 'uzan', day: 2,
      lines: [
        { when: has('cakil'), text: 'Çakıllar dev taşın altında *yuvarlanıyor*. Sütun kayar gibi ilerliyor.' },
        { when: has('omuz'), text: 'Elli sırt aynı anda *kasılıyor*. Sütun karış karış ilerliyor.' },
        { when: has('sarki'), text: 'Sesin tepede yankılanıyor. Her nakaratta elli kişi birden *çekiyor*.' },
        'Akşam olduğunda sütun *yerinde*.',
        'Kaya: "Bu taşı bir kabile değil, *kabileler* dikti."',
      ],
      choices: aksam('k1', 'Yorgun ama mutlu, uyu'),
    },

    // ---------- BÖLÜM 3: Karacadağ ----------
    k1: {
      bg: 'karacadag', hands: 'yok', day: 3,
      lines: [
        'Kuzeydoğuda kara taşlı bir dağ: *Karacadağ*.',
        'Yamaçları yabani buğdayla kaplı. Kadınlar ve çocuklar *topluyor*.',
        'Başaklara dokununca taneler yere *dökülüyor*.',
        'Binlerce yıl sonra bilim insanları ilk buğdayın bu yamaçlarda *evcilleştiğini* söyleyecek.',
      ],
      choices: [
        { text: 'Tanesi dökülmeyen başakları ayrı topla', effect: { akil: 1, flags: ['tohum'] }, to: 'k2a' },
        { text: 'Hızla, olabildiğince çok topla', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: 'k2b' },
        { text: 'Geçen yıl dökülen tanelerin yerine bak', effect: { akil: 1, flags: ['filiz'] }, to: 'k2c' },
      ],
    },
    k2a: {
      bg: 'karacadag', hands: 'sepet', day: 3,
      lines: [
        'Bazı başaklar sapına *sıkıca* tutunuyor.',
        'Bunları ayrı bir sepete koyuyorsun. Kimse nedenini *anlamıyor*.',
        'Sen de tam bilmiyorsun. Ama içinde bir *his* var.',
      ],
      choices: [{ text: 'Tepeye dön', to: 'k3' }],
    },
    k2b: {
      bg: 'karacadag', hands: 'sepet', day: 3,
      lines: [
        'Sepetin taşacak kadar *dolu*.',
        'Ama tanelerin yarısı yolda *dökülüyor*.',
        'Arkanda, toprağa düşen taneler bir gün *filizlenecek*.',
      ],
      choices: [{ text: 'Tepeye dön', to: 'k3' }],
    },
    k2c: {
      bg: 'karacadag', hands: 'uzan', day: 3,
      lines: [
        'Geçen yıl dökülen tanelerden yeni buğday *bitmiş*.',
        'Demek tane toprağa düşerse buğday yeniden *doğuyor*.',
        'Bu fikir aklına bir *kıymık* gibi batıyor.',
      ],
      choices: [{ text: 'Tepeye dön', to: 'k3' }],
    },
    k3: {
      bg: 'gece_ates', hands: 'sepet', day: 3,
      lines: [
        'Akşam taneler öğütme taşlarında *eziliyor*.',
        'Tepede yüzlerce, belki binlerce öğütme taşı var. Her biri bir *ailenin*.',
        'Un hazır. Ne yapacağına sen karar ver.',
      ],
      choices: [
        { text: 'Unu suyla yoğur, sıcak taşta pişir', effect: { akil: 1, flags: ['ekmek'] }, to: 'k4a' },
        { text: 'Taneleri suda kaynat, lapa yap', effect: { enerji: 10 }, to: 'k4b' },
        { text: 'Seçtiğin taneleri yemeyip sakla', req: has('tohum'), reqText: 'Ayrı tane toplamadın', effect: { akil: 1, flags: ['tohum_sakla'] }, to: 'k4c' },
      ],
    },
    k4a: {
      bg: 'gece_ates', hands: 'uzan', day: 3,
      lines: [
        'Yassı bir hamur sıcak taşın üstünde *kabarıyor*.',
        '*Kokusu* bütün tepeyi ateşin başına topluyor.',
        'Yaşlı Ana bir parça koparıp uzun uzun *çiğniyor*. "Bunu yarın da yap."',
      ],
      choices: aksam('kh1'),
    },
    k4b: {
      bg: 'gece_ates', hands: 'dinlen', day: 3,
      lines: [
        'Lapa sıcak ve *doyurucu*.',
        'Karnın doyunca gözlerin *ağırlaşıyor*.',
      ],
      choices: aksam('kh1'),
    },
    k4c: {
      bg: 'gece_ates', hands: 'uzan', day: 3,
      lines: [
        'Seçtiğin taneleri bir deri *keseye* saklıyorsun.',
        'Kimse bilmiyor. Ama çok yakında bu topraklarda insanlar buğdayı *ekmeye* başlayacak.',
      ],
      choices: aksam('kh1'),
    },

    // ---------- BÖLÜM 3b: Karahan Tepe ----------
    kh1: {
      bg: 'gece_ates', hands: 'uzan', day: 3,
      lines: [
        'Sabah Yaşlı Ana seni yanına *çağırıyor*.',
        '"Doğuda kardeş bir tepe var. Onları da *ziyafete* çağır."',
        '"Yol iki gün. Yalnız gitme, *kaybolma*."',
      ],
      choices: [
        { text: 'Kartal\'dan bir avcı yoldaş iste', effect: { flags: ['yoldas'] }, to: 'kh2' },
        { text: 'Tek başına, hızlı git', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'kh2' },
        { text: 'Yanına hediye olarak taş kabını al', req: has('tas_kap'), reqText: 'Taş kabın yok', effect: { flags: ['hediye_kap', 'yoldas'] }, to: 'kh2' },
      ],
    },
    kh2: {
      bg: 'karacadag', hands: 'yok', day: 3,
      lines: [
        'Yol kara taşlı tepeler arasından *geçiyor*.',
        { when: has('yoldas'), text: 'Yoldaşın yolu iyi biliyor ama çok *konuşuyor*.' },
        'Önünde iki yol var: sarp kayalıklardan *kestirme* ya da uzun vadi yolu.',
      ],
      choices: [
        { text: 'Kestirmeden, kayalıklardan tırman', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'kh3a' },
        { text: 'Vadiyi izle, suyun yanından yürü', effect: { akil: 1 }, to: 'kh3b' },
      ],
    },
    kh3a: {
      bg: 'firtina', hands: 'yok', day: 3,
      lines: [
        'Kayalıklarda ani bir *rüzgâr*. Taşlar ayağının altından kayıyor.',
        { when: has('yoldas'), text: 'Yoldaşın bileğini *yakalıyor*. Az kalsın düşüyordun.' },
        { when: (st) => !st.flags.includes('yoldas'), text: 'Bir çalıya tutunup *kurtuluyorsun*. Dizlerin kanıyor.' },
        'Ama yolu yarı yarıya *kısalttın*.',
      ],
      choices: [{ text: 'Yola devam et', to: 'kh4' }],
    },
    kh3b: {
      bg: 'dere', hands: 'dinlen', day: 3, textTop: true,
      lines: [
        'Vadi yolu uzun ama *sakin*.',
        'Su kenarında başka bir kabilenin *ayak izleri*. Doğru yoldasın.',
      ],
      choices: [{ text: 'Yola devam et', effect: { enerji: 10 }, to: 'kh4' }],
    },
    kh4: {
      bg: 'kaya_oda', hands: 'yok', day: 4,
      lines: [
        'Doğudaki tepe: kayanın içine oyulmuş bir *oda*.',
        'Sütunlar kayadan doğuyor gibi. Duvardan dev bir insan *başı* çıkıyor.',
        'Binlerce yıl sonra burasına *Karahan Tepe* diyecekler.',
      ],
      choices: [
        { text: 'Başın önünde saygıyla eğil', effect: { flags: ['saygi'] }, to: 'kh5' },
        { text: 'Yaklaş, nasıl oyulduğunu incele', effect: { akil: 1 }, to: 'kh5' },
        { text: 'Elini taşa koy', effect: { beden: 1 }, to: 'kh5' },
      ],
    },
    kh5: {
      bg: 'kaya_oda', hands: 'uzan', day: 4,
      lines: [
        'Tepenin insanları seni *çevreliyor*. Başlarında yaşlı bir adam: *Yılangöz*.',
        { when: has('saygi'), text: '"Taşa saygı duyanı biz de *dinleriz*," diyor.' },
        '"Göbeklitepe\'den mi geldin? Ziyafete neden *gelelim*?"',
      ],
      choices: [
        { text: 'Taş kabını hediye et', req: has('hediye_kap'), reqText: 'Hediyen yok', effect: { flags: ['karahan_dost'] }, to: 'kh6a' },
        { text: 'Pazarlık et: Gelirlerse avdan pay alacaklar', effect: { akil: 1, flags: ['karahan_dost'] }, to: 'kh6b' },
        { text: 'Güreşe davet et: Kazanırsan gelecekler', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: 'kh6c' },
        { text: '1 çakmaktaşı hediye et', cost: { para: 1 }, effect: { para: -1 }, to: 'kh6b' },
      ],
    },
    kh6a: {
      bg: 'kaya_oda', hands: 'uzan', day: 4,
      lines: [
        'Yılangöz kabı iki eliyle *alıyor*. Gözleri parlıyor.',
        '"Bu ellerin işi. Elleri böyle olanın sözü de *sağlamdır*."',
      ],
      choices: [{ text: 'Devam et', to: 'kh7' }],
    },
    kh6b: {
      bg: 'kaya_oda', hands: 'uzan', day: 4,
      lines: [
        'Uzun bir sessizlik. Sonra Yılangöz *gülüyor*.',
        '"Akıllı bir elçi göndermişler. *Geleceğiz*."',
      ],
      choices: [{ text: 'Devam et', to: 'kh7' }],
    },
    kh6c: {
      bg: 'kaya_oda', hands: 'yok', day: 4,
      lines: [
        'Tepenin en güçlü genciyle *güreşiyorsun*. Toz, ter, bağırışlar.',
        { when: (st) => st.beden >= 3, text: 'Sonunda onu sırtüstü *yere* seriyorsun. Tepede alkış kopuyor.' },
        { when: (st) => st.beden < 3, text: 'Yere düşen *sensin*. Ama pes etmeyişin herkesi etkiliyor.' },
        'Yılangöz: "Cesaret de bir *davettir*. Geleceğiz."',
      ],
      choices: [{ text: 'Devam et', effect: { flags: ['karahan_dost'] }, to: 'kh7' }],
    },
    kh7: {
      bg: 'karacadag', hands: 'uzan', day: 5,
      lines: [
        'Dönüş yolunda yanında *yılan* desenli bir boncuk taşıyorsun: Yılangöz\'ün hediyesi.',
        'İki tepe artık *kardeş*. Ziyafet daha da büyük olacak.',
        { when: has('yoldas'), text: 'Yoldaşın bütün yol seni *övüyor*.' },
      ],
      choices: aksam('v1', 'Tepeye dön'),
    },

    // ---------- BÖLÜM 4: Ceylan göçü ----------
    v1: {
      bg: 'av_safak', hands: 'yok', day: 4,
      lines: [
        'Yaz bitiyor. Ova ceylanla *dolup* taşıyor.',
        'Her yıl bu mevsimde binlerce ceylan buradan *göç* eder.',
        { when: has('nobet'), text: 'Kartal seni yanına çağırıyor: "Ateşi bekleyen *sendin*."' },
        'Kartal avcıları topluyor: "Bu yıl nasıl *avlanacağız*?"',
      ],
      choices: [
        { text: 'Taştan uzun duvarlar ör, sürüyü huni gibi daralt', cost: { enerji: 20 }, effect: { enerji: -20, akil: 1, flags: ['tuzak'] }, to: 'v2a' },
        { text: 'Su kenarında pusu kur', effect: { akil: 1, flags: ['pusu'] }, to: 'v2b' },
        { text: 'Mızrağını bile, yeter', effect: { beden: 1 }, to: 'v2c' },
      ],
    },
    v2a: {
      bg: 'av_safak', hands: 'uzan', day: 4,
      lines: [
        'Günlerce taş taşıyorsunuz. İki uzun duvar ovada *birleşiyor*.',
        'Ucunda dar bir *geçit* var. Herkes sana deli gibi bakıyor.',
      ],
      choices: [{ text: 'Avı bekle', to: 's5' }],
    },
    v2b: {
      bg: 'dere', hands: 'dinlen', day: 4, textTop: true,
      lines: [
        'Ceylanlar her sabah aynı göletten *içiyor*.',
        'Kartal: "İyi düşünmüşsün. Ama *sabırlı* olmalıyız."',
      ],
      choices: [{ text: 'Avı bekle', to: 's5' }],
    },
    v2c: {
      bg: 'av_safak', hands: 'kalem', day: 4,
      lines: [
        'Çakmaktaşını yontup mızrak ucunu *keskinleştiriyorsun*.',
        'Ucu güneşte *parlıyor*.',
      ],
      choices: [{ text: 'Avı bekle', to: 's5' }],
    },
    s5: {
      bg: 'av_safak', hands: 'mizrak', day: 4,
      lines: [
        'Şafak. Avcılar bir *ceylan* sürüsünü izliyor.',
        'Kartal eline bir mızrak tutuşturuyor.',
        { when: has('cesur'), text: '"Kurtları kovan sendin, değil mi?" diye *fısıldıyor*.' },
        { when: has('kurttan_kacti'), text: '"Bu sefer *kaçma*," diye fısıldıyor.' },
        'Sürü rüzgâra karşı otluyor. Bir *karar* vermelisin.',
      ],
      choices: [
        { text: 'Sürüyü ördüğün duvarlara sür', show: has('tuzak'), cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, para: 3, flags: ['av_basarili'] }, to: 's6t' },
        { text: 'Sürüyü vadinin dar yerine sür', show: (st) => !st.flags.includes('tuzak'), cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 's6b' },
        { text: 'Sürüye dümdüz saldır', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: 's6a' },
        { text: 'Geride kal, avcıları izle', to: 's6c' },
      ],
    },
    s6a: {
      bg: 'av_safak', hands: 'mizrak', day: 4,
      lines: [
        'Koşuyorsun. Ceylanlar senden çok daha *hızlı*.',
        'Sürü bir anda dağılıyor. Mızrak boşa düşüyor.',
        'Kartal iç çekiyor. O gün kabile *aç* yatacak.',
      ],
      choices: [{ text: 'Dereye inip soluklan', effect: { enerji: -5 }, to: 's7' }],
    },
    s6b: {
      bg: 'av_safak', hands: 'mizrak', day: 4,
      lines: [
        'Avcıları iki yana diziyorsun. Sürü vadiye *giriyor*.',
        'Vadi daralıyor. Kaçacak yer kalmıyor.',
        'O akşam kabile *bolca* et yiyecek. Payına iki çakmaktaşı düşüyor.',
      ],
      choices: [{ text: 'Dereye inip soluklan', effect: { para: 2, flags: ['av_basarili'] }, to: 's7' }],
    },
    s6t: {
      bg: 'av_safak', hands: 'mizrak', day: 4,
      lines: [
        'Sürü duvarların arasına giriyor. Geçit gittikçe *daralıyor*.',
        'O gün yüzlerce ceylan avlanıyor. Bütün kabileler bu *ziyafeti* konuşacak.',
        'Sana deli diyenler şimdi *susuyor*.',
      ],
      choices: [{ text: 'Dereye inip soluklan', to: 's7' }],
    },
    s6c: {
      bg: 'av_safak', hands: 'mizrak', day: 4,
      lines: [
        'Uzaktan izliyorsun. Avcılar sürüyü *kuşatıyor*.',
        'Bir ceylan düşüyor. Ama senin payın *yok*.',
        'Kartal sana bakmıyor bile.',
      ],
      choices: [{ text: 'Dereye inip soluklan', to: 's7' }],
    },
    s7: {
      bg: 'dere', hands: 'dinlen', day: 4, textTop: true,
      lines: [
        'Dere kenarına diz çöküyorsun. Su *serin*.',
        'Suyun yüzeyinde kendi *yüzünü* görüyorsun.',
        { when: (st) => st.enerji < 35, text: 'Çok *yorgunsun*. Gözlerin kapanıyor.' },
        { when: (st) => st.enerji >= 35, text: 'Yorgunsun ama hâlâ *dimdik* duruyorsun.' },
      ],
      choices: [
        { text: 'Gölgede biraz uyu', effect: { enerji: 30 }, to: 's7b' },
        { text: 'Uyumadan tepeye dön', cost: { enerji: 5 }, effect: { enerji: -5, flags: ['erken_dondu'] }, to: '@aksam', then: 's8' },
      ],
    },
    s7b: {
      bg: 'dere', hands: 'dinlen', day: 4, textTop: true,
      lines: [
        'Uyurken suyun sesi bir *şarkıya* dönüşüyor.',
        'Uyandığında yanında küçük, titreyen bir *kurt yavrusu* var.',
        'Annesi ortada yok. Elini koklayıp *kuyruğunu* sallıyor.',
      ],
      choices: [
        { text: 'Yavruyu yanına al', effect: { flags: ['kopek'] }, to: '@aksam', then: 's8' },
        { text: 'Kendi haline bırak', to: '@aksam', then: 's8' },
      ],
    },

    // ---------- BÖLÜM 5: Ziyafet ----------
    s8: {
      bg: 'toplanma', hands: 'yok', day: 5,
      lines: [
        'Tepeye *yabancı* bir kabile gelmiş.',
        { when: has('erken_dondu'), text: 'Erken döndüğün için onları ilk *sen* karşılıyorsun.' },
        { when: has('kopek'), text: 'Kurt yavrusu bacaklarının arasına *saklanıyor*.' },
        'Ellerinde kapkara, cam gibi parlayan taşlar var: *obsidyen*.',
        '"Üç çakmaktaşına bir obsidyen," diyor içlerinden biri.',
      ],
      choices: [
        { text: '3 çakmaktaşı ver, obsidyeni al', cost: { para: 3 }, effect: { para: -3, akil: 1, flags: ['obsidyen'] }, to: 's9a' },
        { text: 'Takası reddet', effect: { flags: ['takas_red'] }, to: 's9b' },
        { text: 'Onları ziyafete davet et', cost: { enerji: 10 }, effect: { enerji: -10, flags: ['yabanci_dost'] }, to: 's9c' },
      ],
    },
    s9a: {
      bg: 'toplanma', hands: 'uzan', day: 5,
      lines: [
        'Obsidyen avucunda soğuk ve *keskin*.',
        'Bununla yapılacak bir bıçak, çakmaktaşının yapamadığını yapar.',
        'Yabancılar memnun. *Güven* böyle başlar.',
      ],
      choices: devam('z1', 'Ziyafete hazırlan'),
    },
    s9b: {
      bg: 'toplanma', hands: 'yok', day: 5,
      lines: [
        'Yabancılar *homurdanıyor*.',
        'Biri yere tükürüp arkasını dönüyor.',
        'Gidiyorlar. Bir daha *gelirler* mi, bilinmez.',
      ],
      choices: devam('z1', 'Ziyafete hazırlan'),
    },
    s9c: {
      bg: 'toplanma', hands: 'uzan', day: 5,
      lines: [
        'Yabancılar birbirine bakıyor. Sonra *gülümsüyorlar*.',
        '"Ateşini paylaşanla taşını da paylaşırız," diyorlar.',
        'Bir parça obsidyeni sana *hediye* ediyorlar.',
      ],
      choices: [{ text: 'Ziyafete hazırlan', effect: { flags: ['obsidyen'] }, to: '@olay', then: 'z1' }],
    },
    z1: {
      bg: 'toplanma', hands: 'uzan', day: 5,
      lines: [
        'Büyük ziyafet için hazırlık başladı. Yüzlerce kişi *gelecek*.',
        'Kayaya oyulmuş dev teknelerde ezilmiş tahıl suyla *bekliyor*.',
        'Avdan gelen et ateşlerin başında *yığılmış*.',
        'Herkesin bir görevi var. Seninki ne *olacak*?',
      ],
      choices: [
        { text: 'Tahıl teknelerini karıştır', effect: { akil: 1, flags: ['tekne'] }, to: 'z2' },
        { text: 'Eti parçala, ateşlere taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['et'] }, to: 'z2' },
        { text: 'Yabancıların dilini öğren', show: has('yabanci_dost'), effect: { akil: 1, flags: ['dil'] }, to: 'z2' },
      ],
    },
    z2: {
      bg: 'ziyafet', hands: 'uzan', day: 5,
      lines: [
        { when: has('tekne'), text: 'Tekneler köpürüyor, ekşi ve keskin bir *koku* yayılıyor.' },
        { when: has('tekne'), text: 'Bunun bir çeşit bira olup olmadığını bilim insanları binlerce yıl sonra hâlâ *tartışacak*.' },
        { when: has('et'), text: 'Kolların omuzlarına kadar *kana* bulanıyor. Ama kimse aç kalmayacak.' },
        { when: has('dil'), text: 'Yabancıların kelimeleri garip. Ama el kol hareketleriyle *anlaşmak* mümkün.' },
        'Gece çöküyor. Ateşler birer birer *yanıyor*.',
      ],
      choices: [{ text: 'Ziyafete katıl', to: 's10' }],
    },
    s10: {
      bg: 'ziyafet', hands: 'uzan', day: 5,
      lines: [
        'Tepede büyük *ziyafet* var.',
        { when: has('yabanci_dost'), text: 'Yabancı kabile de burada. Ateşler birbirine *karışmış*.' },
        { when: has('karahan_dost'), text: 'Doğudaki tepeden Yılangöz ve halkı da *geldi*.' },
        { when: has('av_basarili'), text: 'Ceylan eti dönüyor. Herkes senin *planını* anlatıyor.' },
        'Yaşlı Ana elini kaldırıyor. Herkes *susuyor*.',
        '"Yeni sütuna ne *kazınacak*? Bunu sen seçeceksin."',
      ],
      choices: [
        { text: 'Tilki: kurnazlık', effect: { akil: 1, flags: ['simge_tilki'] }, to: 'z3' },
        { text: 'Yaban domuzu: güç', effect: { beden: 1, flags: ['simge_domuz'] }, to: 'z3' },
        { text: 'Akbaba: ölüm ve yeniden doğuş', effect: { flags: ['simge_akbaba'] }, to: 'z3' },
      ],
    },
    z3: {
      bg: 'sutun_gunduz', hands: 'kalem', day: 6,
      lines: [
        'Kaya seni başka bir taşın başına *çağırıyor*.',
        'Üstünde bir akbaba, kanadının altında bir *daire*, yanında bir akrep.',
        '"Bunu birlikte bitirelim." Binlerce yıl sonra ona *Akbaba Taşı* diyecekler.',
      ],
      choices: [
        { text: 'Akrebi sen kazı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 's11' },
        { text: 'Daireyi kusursuz yuvarla', effect: { akil: 1 }, to: 's11' },
      ],
    },
    s11: {
      bg: 'sutun_gunduz', hands: 'kalem', day: 7,
      lines: [
        'Günler geçiyor. Seçtiğin hayvan da taşa *işleniyor*.',
        'Binlerce yıl sonra biri bu taşları bulacak ve *merak* edecek.',
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Yaşlı Ana\'nın yanına git', to: 'z4' }],
    },
    z4: {
      bg: 'gece_ates', hands: 'uzan', day: 7,
      lines: [
        'Ziyafet bitti. Kabileler ovaya *dağılıyor*.',
        { when: has('kopek'), text: 'Kurt yavrusu artık *büyüdü*. Ayağının dibinde uyuyor.' },
        'Yaşlı Ana elini omzuna koyuyor: "Sen başkasın. Zaman sana *dokunmuyor*."',
        '"Git. Gördüklerini *taşı*."',
      ],
      choices: [{ text: 'Gözlerini kapat', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAY HAVUZU ----------
    oy1: {
      bg: 'karacadag', hands: 'yok',
      lines: [
        'Taşların arasında bir *yılan*!',
        'Bir çocuğun bileğini ısırdı. Çocuk *ağlıyor*.',
      ],
      choices: [
        { text: 'Kolunu sabit tut, Yaşlı Ana\'ya koştur', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 'oy2a' },
        { text: 'Yarayı kesip zehri emmeye çalış', effect: { beden: 1 }, to: 'oy2b' },
      ],
    },
    oy2a: {
      bg: 'gece_ates', hands: 'uzan',
      lines: [
        'Yaşlı Ana bir yaprak ezip yaranın üstüne *basıyor*.',
        'Çocuk günlerce ateşler içinde yatıyor. Sonra *iyileşiyor*.',
        'Annesi sana bir çakmaktaşı *veriyor*.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 1 }, to: '@don' }],
    },
    oy2b: {
      bg: 'gece_ates', hands: 'dinlen',
      lines: [
        'Ağzında acı bir tat. Başın *dönüyor*.',
        'Çocuk iyileşiyor. Ama yarası büyük ve sen gün boyu *halsizsin*.',
        'Yaşlı Ana: "Kesmek zehri değil, *kanı* akıtır."',
      ],
      choices: [{ text: 'Devam et', effect: { enerji: -15 }, to: '@don' }],
    },
    oc1: {
      bg: 'karanlik', hands: 'yok',
      lines: [
        'Hava kararıyor. Küçük *Taşkın* kayıp.',
        'Annesi bağırarak tepeden aşağı *koşuyor*.',
      ],
      choices: [
        { text: 'Ayak izlerini meşaleyle takip et', effect: { akil: 1 }, to: 'oc2a' },
        { text: 'Vadiye in, bağırarak ara', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'oc2b' },
      ],
    },
    oc2a: {
      bg: 'karanlik', hands: 'mesale',
      lines: [
        'Küçük izler bir kaya *kovuğuna* gidiyor.',
        'Taşkın içeride, dizlerini kucaklamış *uyuyor*.',
        'Annesi sana öyle sarılıyor ki nefesin *kesiliyor*.',
      ],
      choices: [{ text: 'Devam et', effect: { flags: ['cocuk_kurtardi'] }, to: '@don' }],
    },
    oc2b: {
      bg: 'karanlik', hands: 'yok',
      lines: [
        'Sesin vadide *yankılanıyor*.',
        'Uzaktan ince bir ses cevap veriyor. Çocuğu *buluyorsun*.',
        'Dönüşte ayağın burkuluyor. Ama Taşkın *sırtında*.',
      ],
      choices: [{ text: 'Devam et', effect: { enerji: -10, flags: ['cocuk_kurtardi'] }, to: '@don' }],
    },
    of1: {
      bg: 'firtina', hands: 'yok',
      lines: [
        'Gökyüzü bir anda *kararıyor*.',
        'Şimşekler ovayı yarıyor. Bir *fırtına* geliyor.',
      ],
      choices: [
        { text: 'Yaşlıları ve çocukları kayalık sığınağa götür', effect: { akil: 1 }, to: 'of2a' },
        { text: 'Ateşi derilerle örtüp koru', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'of2b' },
      ],
    },
    of2a: {
      bg: 'firtina', hands: 'yok',
      lines: [
        'Sığınakta herkes birbirine *sokuluyor*.',
        'Her şimşekte taş sütunlar bir anlığına *aydınlanıyor*.',
        'Kimse yaralanmıyor.',
      ],
      choices: [{ text: 'Fırtınanın dinmesini bekle', to: '@don' }],
    },
    of2b: {
      bg: 'gece_ates', hands: 'uzan',
      lines: [
        'Yağmur sırtını *dövüyor*. Ama ateş sönmüyor.',
        'Fırtına geçince herkes ıslak ve üşümüş, senin ateşine *geliyor*.',
        'Teşekkür olarak önüne çakmaktaşları *bırakıyorlar*.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 1 }, to: '@don' }],
    },
    ob1: {
      bg: 'karacadag', hands: 'uzan',
      lines: [
        'Bir kaya yarığında yaban arıları *vızıldıyor*.',
        'İçeride altın gibi parlayan *bal* var.',
      ],
      choices: [
        { text: 'Yaş otlarla duman yap, arıları sersemlet', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1 }, to: 'ob2a' },
        { text: 'Elini dalıp hızla çek', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'ob2b' },
        { text: 'Arıları rahat bırak', to: '@don' },
      ],
    },
    ob2a: {
      bg: 'karacadag', hands: 'sepet',
      lines: [
        'Duman arıları *yavaşlatıyor*. Petekleri sakince alıyorsun.',
        'Bal, takasta çakmaktaşından da *değerli*.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 2 }, to: '@don' }],
    },
    ob2b: {
      bg: 'karacadag', hands: 'uzan',
      lines: [
        'Onlarca iğne kolunda. *Acı* dayanılmaz.',
        'Ama elin balla *dolu*.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 1 }, to: '@don' }],
    },
    oya1: {
      bg: 'av_safak', hands: 'yok',
      lines: [
        'Ovada yerde yatan bir *yabancı*.',
        'Bacağında derin bir mızrak yarası var. Seni görünce *korkuyor*.',
      ],
      choices: [
        { text: 'Onu sırtında tepeye taşı', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['yarali_dost'] }, to: 'oya2a' },
        { text: 'Su ver ve yolunu göster', to: 'oya2b' },
        { text: 'Görmezden gel', to: '@don' },
      ],
    },
    oya2a: {
      bg: 'gece_ates', hands: 'uzan',
      lines: [
        'Yabancı günlerce sizinle kalıyor. Yarası *kapanıyor*.',
        'Giderken sana delikli bir taş *boncuk* bırakıyor.',
        '"Benim kabilem bunu taşıyana *dokunmaz*," diyor.',
      ],
      choices: [{ text: 'Devam et', effect: { flags: ['boncuk'] }, to: '@don' }],
    },
    oya2b: {
      bg: 'av_safak', hands: 'uzan',
      lines: [
        'Yabancı suyu bir solukta *içiyor*.',
        'Minnetle başını eğiyor ve topallayarak *uzaklaşıyor*.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    ok1: {
      bg: 'sutun_gunduz', hands: 'yok',
      lines: [
        'Günlerdir yağmur yok. Su birikintileri *kurudu*.',
        'Ağızlar kupkuru. Çocuklar *ağlıyor*.',
      ],
      choices: [
        { text: 'Kayaya yağmur suyu toplayacak çukurlar oy', cost: { enerji: 15 }, effect: { enerji: -15, akil: 1, flags: ['sarnic'] }, to: 'ok2a' },
        { text: 'Uzak pınara gidip deri tulumlarla su taşı', cost: { enerji: 25 }, effect: { enerji: -25, beden: 1 }, to: 'ok2b' },
      ],
    },
    ok2a: {
      bg: 'firtina', hands: 'yok',
      lines: [
        'Kayaya oyduğun çukurlar ilk yağmurla *doluyor*.',
        'Binlerce yıl sonra kazıcılar bu tepede kayaya oyulmuş *sarnıçlar* bulacak.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    ok2b: {
      bg: 'av_safak', hands: 'uzan',
      lines: [
        'Güneşin altında saatlerce *yürüyorsun*.',
        'Tulumlar ağır ama *dolu*. Herkes bir yudum içiyor.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 1 }, to: '@don' }],
    },
    otk1: {
      bg: 'sutun_gunduz', hands: 'kalem',
      lines: [
        'Bir usta yumuşak taştan bir *kap* oyuyor.',
        '"Bana yardım et, kaplardan biri *senin* olsun."',
      ],
      choices: [
        { text: 'Sabırla oy, kabı sakla', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['tas_kap'] }, to: '@don' },
        { text: 'Kabı hemen takas et', cost: { enerji: 10 }, effect: { enerji: -10, para: 2 }, to: '@don' },
        { text: 'Teşekkür et, yoluna devam et', to: '@don' },
      ],
    },
    oyl1: {
      bg: 'gece_ates', hands: 'uzan',
      lines: [
        'Gökyüzünde uzun kuyruklu bir *ışık* kayıyor.',
        'Herkes korkuyla bağırıyor. Biri "Gök *yanıyor*!" diyor.',
      ],
      choices: [
        { text: '"Korkmayın, yıldızlar da düşer" de', effect: { akil: 1 }, to: 'oyl2a' },
        { text: 'Herkesle birlikte şarkı söyle', effect: { enerji: 10 }, to: 'oyl2b' },
      ],
    },
    oyl2a: {
      bg: 'gece_ates', hands: 'uzan',
      lines: [
        'Kimse sana tam *inanmıyor*.',
        'Ama sesin sakin. Yavaş yavaş *sakinleşiyorlar*.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    oyl2b: {
      bg: 'gece_ates', hands: 'uzan',
      lines: [
        'Gece boyu ateşin başında şarkılar *söyleniyor*.',
        'Korku şarkıların arasında *eriyor*.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    ot1: {
      bg: 'toplanma', hands: 'uzan',
      lines: [
        'Uzaklardan gelen bir yolcu *deniz kabukları* getirmiş.',
        'Pembe, kıvrımlı, parlak. Hiç *deniz* görmedin.',
      ],
      choices: [
        { text: '2 çakmaktaşına bir kabuk al', cost: { para: 2 }, effect: { para: -2, flags: ['kabuk'] }, to: 'ot2' },
        { text: 'Kabuğun nereden geldiğini sor', effect: { akil: 1 }, to: 'ot2' },
      ],
    },
    ot2: {
      bg: 'toplanma', hands: 'uzan',
      lines: [
        '"Batıda, günlerce yürüyünce, sonu gelmeyen bir *su* var," diyor yolcu.',
        '"Tuzlu. İçilmez. Ama içinde *her şey* yaşar."',
        'Aklında bir *ufuk* açılıyor.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
  },

  events: [
    { id: 'yilan', start: 'oy1' },
    { id: 'cocuk', start: 'oc1' },
    { id: 'firtina', start: 'of1' },
    { id: 'bal', start: 'ob1' },
    { id: 'yarali', start: 'oya1' },
    { id: 'kuraklik', start: 'ok1' },
    { id: 'tas_kap', start: 'otk1' },
    { id: 'yildiz', start: 'oyl1' },
    { id: 'kabuk', start: 'ot1' },
  ],
};

// Akşam düzeni: bölüm aralarında oyuncu üç iş seçer (rastgele üç seçenek gösterilir).
ERA1.hub = {
  bg: 'gece_ates',
  intro: ['Akşam oldu. Tepede ateşler *yanıyor*.', 'Güneş Harran Ovası\'nın ardına *batıyor*.', 'Gün bitiyor. Yıldızlar birer birer *çıkıyor*.'],
  acts: [
    { id: 'odun', text: 'Ateş için odun topla', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, hands: 'sepet',
      res: [['Kuru dalları kollarına *dolduruyorsun*.', 'Bu gece ateş *harlı* yanacak.'], ['Çalıların arasından eski bir kök *söküyorsun*.', 'Sabaha kadar *yanar*.']] },
    { id: 'yont', text: 'Çakmaktaşı yont, takas için alet yap', cost: { enerji: 10 }, effect: { enerji: -10, para: 1 }, hands: 'kalem',
      res: [['Taşa taşla vuruyorsun. İnce bir *kesici* çıkıyor.', 'Takas için bir çakmaktaşı *kazandın*.'], ['İlk iki taş *kırılıyor*. Üçüncüsü kusursuz.', 'Bir çakmaktaşı daha.']] },
    { id: 'dinlen', text: 'Ateşin başında dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Sıcaklık kemiklerine *işliyor*.', 'Yorgunluğun ateşle birlikte *eriyor*.'], ['Gözlerini kapatıyorsun. Kurt sesleri *uzakta*.', 'Dinlendin.']] },
    { id: 'masal', text: 'Yaşlıların hikâyelerini dinle', effect: { akil: 1, enerji: 5 },
      res: [['Yaşlı Ana bitmeyen bir *yağmuru* anlatıyor.', 'Her hikâye bir *ders*.'], ['Kartal ilk mızrağını anlatıyor. Herkes *gülüyor*.', 'Hikâyeler kabileyi bir arada *tutar*.']] },
    { id: 'tuzak', text: 'Tavşan tuzağı kur', cost: { enerji: 15 }, effect: { enerji: -15, para: 1, akil: 1 },
      res: [['İpi bir kaya dibine *geriyorsun*.', 'Sabaha bir tavşan *yakalanıyor*.'], ['Tuzağa bir keklik *düşüyor*.', 'Yarın sabah karnın *tok*.']] },
    { id: 'ip', text: 'Çocuklara ip örmeyi öğret', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1 },
      res: [['Küçük parmaklar lifleri *büküyor*.', 'Bir gün bu iplerle dev taşlar *çekilecek*.'], ['Çocuklar ilk iplerini birbirine *gösteriyor*.', 'Öğretmek, iki kere *öğrenmektir*.']] },
    { id: 'yildiz', text: 'Yıldızları izle, yönleri ezberle', effect: { akil: 1 },
      res: [['Her gece aynı yerde duran bir *yıldız* var.', 'Kaybolursan seni o *bulur*.'], ['Yıldızlar mevsimlerle birlikte *dönüyor*.', 'Gökyüzü de bir *takvim*.']] },
  ],
};
