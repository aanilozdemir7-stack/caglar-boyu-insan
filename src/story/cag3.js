// ÇAĞ 3 — Yazının gelişi, Kültepe / Kaniş-Karum (MÖ 1900)
// Yazım kuralları: tasarım belgesindeki "Ajanın uyacağı yazım kuralları".
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak (Kültepe tabletleri, Asur Ticaret Kolonileri Çağı):
// - Tepede yerli kralın sarayı, eteklerde Asurlu tüccarların mahallesi "karum".
// - Asur'dan eşek kervanlarıyla kalay ve kumaş gelir; karşılığında gümüş ve altın gider.
// - Saray giriş vergisi alır ve kumaşların bir kısmını ucuza satın alma hakkına sahiptir.
// - Vergiden kaçmak için "dar yol" denen kaçakçılık yolları kullanılır; kalay küçük paketlerle gizlenir.
// - Tabletler kil zarflara konup mühürlenir; tüccarların evlerinde arşiv odaları vardır.
// - Evlilik ve boşanma sözleşmeleri yazılır; yerli kadınların boşanma hakkı vardır.
// - Tabletlerdeki yerli adlar ve sözcükler, yazıya geçmiş en eski Hint-Avrupa izleridir.
// - Karum büyük bir yangınla yok olmuş; yangın kil tabletleri pişirip korumuştur.
// - Demir (gökten düşen) bu dönemde gümüşten de altından da çok daha değerlidir.
// Karakter adları kurgu ama dönemin ad kalıplarına uygundur.

const has = (f) => (st) => st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];

export const ERA3 = {
  id: 3,
  name: 'Yazının gelişi',
  place: 'Kültepe',
  region: 'Kayseri',
  year: 'MÖ 1900',
  currency: 'şekel',
  start: 't1',
  next: { name: 'Hititler ve Tunç Çağı', place: 'Hattuşa', year: 'MÖ 1300' },

  carry(st) {
    const eski = st.para;
    st.para = Math.max(3, Math.round(eski / 2));
    st.enerji = Math.max(st.enerji, 70);
    const ayna = st.flags.includes('ayna') ? ' Obsidyen aynan heybende.' : '';
    return `${eski} ölçek buğdayın, ${st.para} şekel gümüşe denk geliyor.${ayna}`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Varış ----------
    t1: {
      bg: 'karum_sokak', hands: 'uzan', day: 1,
      lines: [
        'Gözlerini açtığında yine binlerce yıl *geçmiş*.',
        'Kaniş. Tepede kralın *sarayı*, eteğinde tüccarların mahallesi: *karum*.',
        'Taş döşeli sokaklar, iki katlı evler, her yanda *eşek* anırması.',
        'Kulağına iki dil çarpıyor: yerlilerin dili ve uzak Asur\'dan gelenlerin *Asurcası*.',
      ],
      choices: [
        { text: 'Asurlu bir tüccarın kapısını çal, iş iste', to: 't2a' },
        { text: 'Yerli bir bronz ustasının atölyesine git', effect: { beden: 1 }, to: 't2b' },
        { text: 'Meydanda insanları dinle, dili çöz', effect: { akil: 1 }, to: 't2c' },
      ],
    },
    t2a: {
      bg: 'karum_sokak', hands: 'uzan', day: 1,
      lines: [
        'Kapıyı *Enlil-bani* açıyor. Sakallı, yorgun, gözleri hesap dolu.',
        'Asur şehrinden buraya haftalar süren yolu *defalarca* yürümüş.',
        '"Elin ayağın sağlam mı? Yük taşıyabilir misin? Sayı *sayabilir* misin?"',
      ],
      choices: [{ text: '"Her işi yaparım"', effect: { flags: ['enlil'] }, to: 't3' }],
    },
    t2b: {
      bg: 'atolye', hands: 'uzan', day: 1,
      lines: [
        'Ustanın adı *Peruwa*. Yerli; Asurlulardan pek hoşlanmıyor.',
        '"Kalayı onlar getiriyor, bakırı biz. Ama bronzu *biz* yapıyoruz."',
        'Taş kalıplarda balta ve hançer *şekilleri* var.',
      ],
      choices: [{ text: 'Yanında çalışmak istediğini söyle', effect: { flags: ['peruwa'] }, to: 't3' }],
    },
    t2c: {
      bg: 'karum_sokak', hands: 'uzan', day: 1,
      lines: [
        'Asurlular Asurca, yerliler *Neşa* dilini konuşuyor.',
        'Kulak verdikçe kelimeler *anlam* kazanıyor. Yerli dil sana tuhaf biçimde yakın.',
        'Bu yerli sözcükler bir gün yazıya geçmiş en eski Hint-Avrupa *izleri* sayılacak.',
      ],
      choices: [{ text: 'Tüccarlara tercümanlık teklif et', effect: { flags: ['tercuman'] }, to: 't3' }],
    },
    t3: {
      bg: 'karum_sokak', hands: 'uzan', day: 1,
      lines: [
        'Akşam karumda bir *haber* yayılıyor.',
        'Asur\'dan büyük bir kervan yola çıkmış: Otuz kara eşek, sırtlarında *kalay* ve kumaş.',
        'Kalay, bakırla karışınca *bronz* olur. Bütün Anadolu onu bekliyor.',
        'Herkes hazırlanıyor. Sen de.',
      ],
      choices: [
        { text: 'Depoyu temizle, raflar kur', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@aksam', then: 'y1' },
        { text: 'Fiyatları öğren: Kalay kaça, kumaş kaça?', effect: { akil: 1, flags: ['fiyat'] }, to: '@aksam', then: 'y1' },
      ],
    },

    // ---------- BÖLÜM 2: Yazı ----------
    y1: {
      bg: 'arsiv', hands: 'yok', day: 2,
      lines: [
        'Enlil-bani\'nin evinde bir oda tavana kadar kil *tabletle* dolu.',
        'Mektuplar, borç senetleri, kervan hesapları. Burada her şey *yazılır*.',
        'Kâtip *Aşşur-malik*, ıslak kile kamış kalemle işaretler basıyor.',
        { when: has('damga'), text: 'Çatalhöyük\'te kile bastığın sarmalı *hatırlıyorsun*. Bu, onun çok uzak bir torunu.' },
      ],
      choices: [
        { text: '"Yazmayı öğrenmek istiyorum"', effect: { akil: 1, flags: ['yazi'] }, to: 'y2a' },
        { text: '"Yazı tüccarların işi, ben yük taşırım"', effect: { beden: 1 }, to: 'y2b' },
        { text: 'Yerli dildeki kelimeleri yazdırmayı öner', show: has('tercuman'), effect: { akil: 2, flags: ['yazi', 'sozluk'] }, to: 'y2c' },
      ],
    },
    y2a: {
      bg: 'arsiv', hands: 'tablet', day: 2,
      lines: [
        'Çivi yazısında yüzlerce *işaret* var.',
        'Ama tüccarlar işlerini sınırlı sayıda işaretle görüyor. *Öğrenilebilir*.',
        'Aşşur-malik ilk işareti gösteriyor: *gümüş*.',
      ],
      choices: [
        { text: 'Gece de çalış', cost: { enerji: 15 }, effect: { enerji: -15, akil: 1 }, to: 'y3' },
        { text: 'Önce sayıları öğren', effect: { flags: ['sayilar'] }, to: 'y3' },
      ],
    },
    y2b: {
      bg: 'karum_sokak', hands: 'kese', day: 2,
      lines: [
        'Depoda kalay külçelerini *istifliyorsun*. Her çuval mühürlü.',
        'Mührü bozuk yük, kavga demek. Bunu çabuk *öğreniyorsun*.',
      ],
      choices: [{ text: 'Arşive geri dön', to: 'y3' }],
    },
    y2c: {
      bg: 'arsiv', hands: 'tablet', day: 2,
      lines: [
        'Aşşur-malik yerli bir kelimeyi Asurca işaretlerle *yazıyor*.',
        'Ses ses, hece hece. Bir dil ilk kez *kile* geçiyor.',
        'Aşşur-malik başını kaldırıyor: "Bu dili bilen bir kâtip *altın* değerinde."',
      ],
      choices: [{ text: 'Devam et', to: 'y3' }],
    },
    y3: {
      bg: 'arsiv', hands: 'tablet', day: 2,
      lines: [
        'Her tablet ince bir kil *zarfa* konur. Zarfın üstüne mühür yuvarlanır.',
        'Zarfı kırmadan kimse içindeki yazıyı *değiştiremez*.',
        'Enlil-bani: "Mührün yoksa *sözün* de yok."',
      ],
      choices: [
        { text: 'Kendine taştan silindir mühür kazıt', cost: { para: 2 }, effect: { para: -2, flags: ['muhur'] }, to: 'y4a' },
        { text: 'Şimdilik Enlil-bani\'nin mührünü kullan', to: 'y4b' },
      ],
    },
    y4a: {
      bg: 'arsiv', hands: 'tablet', day: 2,
      lines: [
        'Parmak boyunda taştan bir silindir. Üstünde senin seçtiğin *desen*.',
        { when: has('simge_akbaba'), text: 'Desen bir *akbaba*. Göbeklitepe\'den beri yanında taşıdığın bir anı.' },
        { when: has('simge_tilki'), text: 'Desen bir *tilki*. Göbeklitepe\'de kazınan tilkinin hatırasına.' },
        'Kile yuvarladığında desen bir şerit gibi *açılıyor*.',
      ],
      choices: aksam('v1'),
    },
    y4b: {
      bg: 'arsiv', hands: 'tablet', day: 2,
      lines: [
        'Başkasının mührü, başkasının *sözü*.',
        'Bir gün senin de kendi mührün olacak.',
      ],
      choices: aksam('v1'),
    },

    // ---------- BÖLÜM 3: Kervan ----------
    v1: {
      bg: 'kervan_yol', hands: 'yular', day: 3,
      lines: [
        'Kervan *göründü*! Toz bulutu içinde kara eşekler.',
        'Sırtlarında mühürlü çuvallar: kalay ve kumaş.',
        'Enlil-bani seni yükleri ve *mühürleri* kontrol etmeye gönderiyor.',
      ],
      choices: [
        { text: 'Mühürleri tek tek, dikkatle kontrol et', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1 }, to: 'v2a' },
        { text: 'Yükleri indirmeye yardım et', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'v2b' },
      ],
    },
    v2a: {
      bg: 'kervan_yol', hands: 'yular', day: 3,
      lines: [
        'Bir kalay çuvalının mührü *farklı*. Kenarı kırılıp yeniden yapıştırılmış.',
        'Biri yolda çuvalı *açmış*.',
      ],
      choices: [{ text: 'Kervancıya bak', to: 'v3' }],
    },
    v2b: {
      bg: 'kervan_yol', hands: 'uzan', day: 3,
      lines: [
        'Çuvallar ağır. Eşekler yorgun, sen de.',
        'İndirirken bir çuvalın beklenenden *hafif* olduğunu fark ediyorsun.',
      ],
      choices: [{ text: 'Kervancıya bak', to: 'v3' }],
    },
    v3: {
      bg: 'kervan_yol', hands: 'yok', day: 3,
      lines: [
        'Kervancı *Puzur* gözlerini kaçırıyor.',
        'Eksik kalay, Asur\'da bir ailenin aylarca *ekmeği* demek.',
        'Ne yapacaksın?',
      ],
      choices: [
        { text: 'Herkesin önünde hesap sor', to: 'v4a' },
        { text: 'Sessizce Enlil-bani\'ye söyle', effect: { akil: 1 }, to: 'v4b' },
        { text: 'Puzur\'la baş başa konuş', to: 'v4c' },
      ],
    },
    v4a: {
      bg: 'kervan_yol', hands: 'yok', day: 3,
      lines: [
        'Puzur kızarıyor. "Yolda haydutlara *haraç* verdim!" diye bağırıyor.',
        'Kimse ona inanmıyor. Ama kimse de *kanıtlayamıyor*.',
      ],
      choices: [{ text: 'Karuma dön', to: 'v5' }],
    },
    v4b: {
      bg: 'arsiv', hands: 'tablet', day: 3,
      lines: [
        'Enlil-bani Asur\'dan gelen yük listesini *açıyor*. Her şey yazılı.',
        'Rakamlar konuşuyor: Kalay yolda azalmış. Puzur\'un payı *kesiliyor*.',
        'Enlil-bani sana bir şekel gümüş *uzatıyor*.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 1 }, to: 'v5' }],
    },
    v4c: {
      bg: 'kervan_yol', hands: 'uzan', day: 3,
      lines: [
        'Puzur sonunda *itiraf* ediyor: Yolda çocuğu hastalanmış.',
        'Kalayın bir kısmını bir kasabada satıp *ilaç* almış.',
      ],
      choices: [
        { text: 'Sırrını sakla, açığı kendi gümüşünle kapat', cost: { para: 2 }, effect: { para: -2, flags: ['puzur_dost'] }, to: 'v5' },
        { text: 'Enlil-bani\'ye anlat, adil olsun', to: 'v5' },
      ],
    },
    v5: {
      bg: 'karum_sokak', hands: 'uzan', day: 3,
      lines: [
        'Eşekler ahırlara, yükler depolara *taşınıyor*.',
        'Kervanla gelen eşekler de burada satılacak. Dönüş yükü *hafif*: gümüş ve altın.',
        { when: has('puzur_dost'), text: 'Puzur uzaktan sana başını *eğiyor*. Bir dost kazandın.' },
      ],
      choices: aksam('ht1', 'Uyumaya git'),
    },

    // ---------- BÖLÜM 3b: Hattuş seferi ----------
    ht1: {
      bg: 'karum_sokak', hands: 'yular', day: 4,
      lines: [
        'Enlil-bani seni kuzeye, *Hattuş* karumuna gönderiyor.',
        '"Kalayı orada daha pahalı satarız. Yolda *Kızılırmak* var. Dikkatli ol."',
        { when: has('puzur_dost'), text: 'Puzur hemen gönüllü *oluyor*: "Seninle gelirim."' },
      ],
      choices: [
        { text: 'Kervanı sen yönet', effect: { akil: 1, flags: ['kervan_basi'] }, to: 'ht2' },
        { text: 'Eşekleri sen sür, yönetimi deneyimliye bırak', effect: { beden: 1 }, to: 'ht2' },
      ],
    },
    ht2: {
      bg: 'kizilirmak', hands: 'yular', day: 5,
      lines: [
        'Kızılırmak *kabarık*. Suyu kırmızı topraktan renk almış.',
        'Kıyıda kütüklerden yapılmış bir *sal* ve ücretini isteyen bir salcı.',
      ],
      choices: [
        { text: 'Salcıya 1 şekel ver, yükleri salla geçir', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: 'ht3a' },
        { text: 'Sığ yeri bul, eşeklerle yürüyerek geç', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: 'ht3b' },
        { text: 'Suyun çekilmesini bekle', to: 'ht3c' },
      ],
    },
    ht3a: {
      bg: 'kizilirmak', hands: 'yok', day: 5,
      lines: [
        'Sal sallanıyor ama *batmıyor*. Yükler kuru.',
        'Salcı: "Akıllı tüccar suyla *pazarlık* etmez."',
      ],
      choices: [{ text: 'Yola devam et', to: 'ht4' }],
    },
    ht3b: {
      bg: 'kizilirmak', hands: 'yular', day: 5,
      lines: [
        'Su beline kadar. Akıntı eşekleri *itiyor*.',
        'Bir çuval ıslanıyor ama kumaş değil, kalay. *Kurtuldu*.',
      ],
      choices: [{ text: 'Yola devam et', to: 'ht4' }],
    },
    ht3c: {
      bg: 'kizilirmak', hands: 'dinlen', day: 5,
      lines: [
        'İki gün kıyıda *bekliyorsunuz*. Su çekiliyor.',
        'Geç kaldınız. Hattuş\'ta kalay fiyatı belki *düştü*.',
      ],
      choices: [{ text: 'Yola devam et', effect: { enerji: 20, flags: ['gecikti'] }, to: 'ht4' }],
    },
    ht4: {
      bg: 'saray_kapi', hands: 'yok', day: 6,
      lines: [
        'Hattuş. Kayalık bir tepede yerli kralın *sarayı*.',
        'Burada da bir karum var. Daha küçük ama *kalabalık*.',
        { when: has('gecikti'), text: 'Başka bir kervan senden önce gelmiş. Kalay *ucuzlamış*.' },
        'Kalayını nasıl satacaksın?',
      ],
      choices: [
        { text: 'Sarayla doğrudan anlaş, hediye ver', cost: { para: 1 }, effect: { para: 2, flags: ['hattus_saray'] }, to: 'ht5a' },
        { text: 'Pazarda en yüksek fiyatı bekle', effect: { akil: 1, para: 3 }, to: 'ht5b' },
        { text: 'Kalayı bakırla takas et, Kaniş\'te sat', effect: { akil: 1, para: 2, flags: ['bakir_takas'] }, to: 'ht5b' },
      ],
    },
    ht5a: {
      bg: 'saray_kapi', hands: 'kese', day: 6,
      lines: [
        'Saray görevlisi seni *kabul* ediyor. Kalay bir anda satılıyor.',
        'Kralın adamları adını *ezberliyor*. Bu, ileride işine yarayabilir.',
      ],
      choices: [{ text: 'Dönüş yoluna çık', to: 'ht6' }],
    },
    ht5b: {
      bg: 'karum_sokak', hands: 'kese', day: 6,
      lines: [
        'Günlerce pazarlık. Sonunda kesen *ağırlaşıyor*.',
        { when: has('bakir_takas'), text: 'Eşekler bu kez bakırla *yüklü*. Kaniş\'te iyi para edecek.' },
      ],
      choices: [{ text: 'Dönüş yoluna çık', to: 'ht6' }],
    },
    ht6: {
      bg: 'kervan_yol', hands: 'yular', day: 7,
      lines: [
        'Dönüş yolu *uzun*. Gece kamplarında tüccarlar konuşuyor:',
        '"Kuzeyde kralların arası *bozuk*. Bir gün bu kentler birbirini yakacak."',
        'Yıllar sonra *Anitta* adlı bir kral Hattuş\'u yıkıp lanetleyecek. Sen bunu *bilmiyorsun*. Henüz.',
      ],
      choices: aksam('s1', 'Kaniş\'e var'),
    },

    // ---------- BÖLÜM 4: Saray, vergi ve dar yol ----------
    s1: {
      bg: 'saray_kapi', hands: 'yok', day: 4,
      lines: [
        'Kervan önce tepedeki *saraya* uğramak zorunda.',
        'Saray bir giriş vergisi alır. Kumaşların bir kısmını da ucuza *satın alma* hakkı vardır.',
        'Saray görevlisi en güzel kumaşları *seçmeye* başlıyor.',
      ],
      choices: [
        { text: 'Kumaşları olduğu gibi göster', effect: { para: -1, flags: ['durust'] }, to: 's2a' },
        { text: 'En iyi kumaşları çuvalların dibine sakla', effect: { flags: ['hile'] }, to: 's2b' },
        { text: 'Görevliye gümüş hediye et', cost: { para: 2 }, effect: { para: -2, flags: ['rusvet'] }, to: 's2c' },
      ],
    },
    s2a: {
      bg: 'saray_kapi', hands: 'kese', day: 4,
      lines: [
        'Görevli kumaşlarını alıyor ve ödemesini *yapıyor*. Az ama dürüst.',
        'Giderken adını *soruyor*. Saray seni hatırlayacak.',
      ],
      choices: [{ text: 'Karuma dön', to: 's3' }],
    },
    s2b: {
      bg: 'saray_kapi', hands: 'yok', day: 4,
      lines: [
        'Görevli bir çuvalı ters *çeviriyor*.',
        'Gizlediğin kumaşlar yere saçılıyor. Etraftaki herkes *susuyor*.',
        'Ceza: iki şekel gümüş. Ve kötü bir *ün*.',
      ],
      choices: [{ text: 'Cezayı öde', effect: { para: -2, flags: ['ceza'] }, to: 's3' }],
    },
    s2c: {
      bg: 'saray_kapi', hands: 'kese', day: 4,
      lines: [
        'Görevli gümüşü avucuna *saklıyor*. Seçimi biraz gevşiyor.',
        'Ama bir dahaki kervanda da gümüş *bekleyecek*.',
      ],
      choices: [{ text: 'Karuma dön', to: 's3' }],
    },
    s3: {
      bg: 'gece_karum', hands: 'yok', day: 4,
      lines: [
        'Gece Enlil-bani seni yanına *çağırıyor*.',
        '"Vergiler bizi bitiriyor. Bir sonraki kervanı *dar yoldan* getireceğiz."',
        'Dar yol: dağ patikaları, gümrük kapılarından uzak. *Kaçakçılığın* adı.',
      ],
      choices: [
        { text: 'Kabul et', to: 'd1' },
        { text: '"Yakalanırsak karumun anlaşması bozulur" diyerek reddet', effect: { akil: 1, flags: ['red_kacak'] }, to: 's4' },
      ],
    },
    d1: {
      bg: 'dar_yol', hands: 'yular', day: 5,
      lines: [
        'Gece. Dar bir patikada eşekleri *yedeğe* almışsın.',
        'Uzakta bir meşale. Bir saray *bekçisi*.',
      ],
      choices: [
        { text: 'Kalayı küçük paketlere böl, giysilerinin içine sakla', effect: { akil: 1, flags: ['kacak_gizli'] }, to: 'd2a' },
        { text: 'Eşekleri hızla kayalığın arkasına çek', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: 'd2b' },
        { text: 'Bekçiye git, gümüş teklif et', cost: { para: 2 }, effect: { para: -2, flags: ['bekci'] }, to: 'd2c' },
      ],
    },
    d2a: {
      bg: 'dar_yol', hands: 'yok', day: 5,
      lines: [
        'Paketler bedeninin her yerinde. Bekçi seni *yoksul* bir yolcu sanıyor.',
        'Kalay şafakta karuma *sızıyor*. Vergisiz.',
        'Bir tabletin köşesine bu yöntem *yazılacak*: "Kalayı küçük paketlerle getirin."',
      ],
      choices: [{ text: 'Karuma gir', effect: { para: 4 }, to: 's4' }],
    },
    d2b: {
      bg: 'dar_yol', hands: 'yular', day: 5,
      lines: [
        'Kayalık seni saklıyor. Ama bir eşek *kayıyor*.',
        'Yükü uçuruma düşüyor. Kurtulan kalay, kaybın *yarısı*.',
      ],
      choices: [{ text: 'Karuma gir', effect: { para: 1 }, to: 's4' }],
    },
    d2c: {
      bg: 'dar_yol', hands: 'kese', day: 5,
      lines: [
        'Bekçi gümüşü alıyor. "Beni *görmedin*," diyor.',
        'Ama artık bir *tanığın* var.',
      ],
      choices: [{ text: 'Karuma gir', effect: { para: 2 }, to: 's4' }],
    },
    s4: {
      bg: 'karum_sokak', hands: 'yok', day: 5,
      lines: [
        'Karum meclisi toplandı. Tüccarlar ve kâtipler bir *davayı* tartışıyor.',
        'Bir tüccar, borcunu ödemeyen ortağını şikâyet ediyor. Kanıt: mühürlü bir *tablet*.',
        { when: has('yazi'), text: 'Tableti okumak için *seni* çağırıyorlar.' },
      ],
      choices: [
        { text: 'Tableti yüksek sesle oku', req: has('yazi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 1, flags: ['okudu'] }, to: 's5a' },
        { text: 'Tanıklık et, gördüğünü söyle', to: 's5b' },
        { text: 'Uzak dur', to: 's5c' },
      ],
    },
    s5a: {
      bg: 'arsiv', hands: 'tablet', day: 5,
      lines: [
        'Rakamlar açık: borç, faiz, ödeme *günü*.',
        'Meclis kararını veriyor. Yazı, yine *sözden* güçlü çıkıyor.',
        'Karar da bir tablete yazılıp *mühürleniyor*.',
      ],
      choices: aksam('h1'),
    },
    s5b: {
      bg: 'karum_sokak', hands: 'uzan', day: 5,
      lines: [
        'Sözlerin dinleniyor. Ama meclis yine de *tabletin* ne dediğine bakıyor.',
        'Burada söz uçar, *yazı* kalır.',
      ],
      choices: aksam('h1'),
    },
    s5c: {
      bg: 'karum_sokak', hands: 'yok', day: 5,
      lines: [
        'Davayı uzaktan izliyorsun. Burada her şey *kayıt* altında.',
        'Bir taş ustasının zamanından beri dünya çok *değişti*.',
      ],
      choices: aksam('h1'),
    },

    // ---------- BÖLÜM 5: Sözleşmeler ve yangın ----------
    h1: {
      bg: 'arsiv', hands: 'yok', day: 6,
      lines: [
        'Enlil-bani\'nin Anadolulu eşi *Kunnaniya* bir sözleşme hazırlatıyor.',
        'Burada kadınlar da ticaret yapar, mal sahibi olur. *Boşanma* hakları vardır.',
        'Sözleşmeye bir *tanık* lazım.',
      ],
      choices: [
        { text: 'Tanık ol', effect: { flags: ['tanik'] }, to: 'h2a' },
        { text: 'Kâtiplik yap, sözleşmeyi sen yaz', req: has('yazi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 1, flags: ['katip'] }, to: 'h2b' },
      ],
    },
    h2a: {
      bg: 'arsiv', hands: 'tablet', day: 6,
      lines: [
        { when: has('muhur'), text: 'Kendi mührünü kile *yuvarlıyorsun*. Desenin diğerlerinin yanında.' },
        'Sözleşmede yazıyor: Ayrılık olursa ödenecek gümüş ve evde kimin *kalacağı*.',
        'Dört bin yıl sonra bu tabletler okunduğunda insanlar *şaşıracak*.',
      ],
      choices: [{ text: 'Devam et', to: 'h3' }],
    },
    h2b: {
      bg: 'arsiv', hands: 'tablet', day: 6,
      lines: [
        'Kamış kalemi kile *bastırıyorsun*. Elin titremiyor.',
        'Kunnaniya yazdıklarını dinliyor ve başıyla *onaylıyor*.',
        'Artık sen de bir *kâtipsin*.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 2 }, to: 'h3' }],
    },
    h3: {
      bg: 'karum_sokak', hands: 'kese', day: 6,
      lines: [
        'Enlil-bani sana bir *teklif* yapıyor.',
        '"Assur\'da yatırımcılar ortak bir keseye altın koyar. Kese yıllarca ticarette *döner*."',
        '"Sen de *ortak* ol."',
      ],
      choices: [
        { text: 'Gümüşünü ortak keseye koy', cost: { para: 4 }, effect: { para: -4, flags: ['ortak'] }, to: 'h4a' },
        { text: 'Kendi işini kur: Anadolu içinde bakır ticareti', effect: { akil: 1, flags: ['bakirci'] }, to: 'h4b' },
        { text: 'Peruwa\'nın atölyesinde bronz ustası ol', effect: { beden: 1, flags: ['bronzcu'] }, to: 'h4c' },
      ],
    },
    h4a: {
      bg: 'arsiv', hands: 'tablet', day: 6,
      lines: [
        'Adın kesenin ortakları arasına *yazılıyor*.',
        'Kazanç da kayıp da artık *ortak*.',
      ],
      choices: devam('h5', 'Akşamı bekle'),
    },
    h4b: {
      bg: 'kervan_yol', hands: 'yular', day: 6,
      lines: [
        'Küçük bir kervan kuruyorsun: dört eşek, bir *yardımcı*.',
        'Bakırı bir şehirden alıp başka bir şehirde *satıyorsun*.',
        { when: has('puzur_dost'), text: 'Yardımcın *Puzur*. Yol boyu sana borcunu ödüyor.' },
      ],
      choices: [{ text: 'Karuma dön', effect: { para: 3 }, to: '@olay', then: 'h5' }],
    },
    h4c: {
      bg: 'atolye', hands: 'uzan', day: 6,
      lines: [
        'Kalay ve bakır potada *eriyor*. Doğru oran, sağlam bronz.',
        'Taş kalıplara döktüğün baltalar *parlıyor*.',
        { when: has('peruwa'), text: 'Peruwa omzuna vuruyor: "Artık bu atölye *senin* de."' },
      ],
      choices: [{ text: 'Akşamı bekle', effect: { para: 2 }, to: '@olay', then: 'h5' }],
    },
    h5: {
      bg: 'gece_karum', hands: 'yok', day: 7,
      lines: [
        'Gece bir *gürültü*. Evin arka odasında gölgeler.',
        '*Hırsızlar*! Gümüşü ve tabletleri arıyorlar.',
        'Tüccarların yazdığı gibi: "Tabletleri *uyuduğun* yerde sakla."',
      ],
      choices: [
        { text: 'Tabletleri kurtar: içlerinde bütün alacaklar yazılı', effect: { akil: 1, flags: ['tablet_kurtardi'] }, to: 'h6a' },
        { text: 'Gümüş kesesini kap', effect: { flags: ['gumus_kurtardi'] }, to: 'h6b' },
        { text: 'Hırsızların üstüne atıl', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['hirsiz_yakaladi'] }, to: 'h6c' },
      ],
    },
    h6a: {
      bg: 'arsiv', hands: 'tablet', day: 7,
      lines: [
        'Tablet sepetini kucaklayıp *kaçıyorsun*.',
        'Gümüşün bir kısmı gitti. Ama alacakların *kayıtlı*. Borçlular ödeyecek.',
      ],
      choices: [{ text: 'Sabahı bekle', effect: { para: 2 }, to: 'h7' }],
    },
    h6b: {
      bg: 'gece_karum', hands: 'kese', day: 7,
      lines: [
        'Keseyi kurtarıyorsun. Ama tabletlerin bir kısmı *kırılmış*.',
        'Kimin sana borçlu olduğunu artık *kanıtlayamazsın*.',
      ],
      choices: [{ text: 'Sabahı bekle', effect: { para: -2 }, to: 'h7' }],
    },
    h6c: {
      bg: 'gece_karum', hands: 'uzan', day: 7,
      lines: [
        'Hırsızlardan biri kaçıyor, diğerini *yakalıyorsun*.',
        'Meclis onu yargılayacak. Kolunda derin bir *sıyrık* kaldı.',
      ],
      choices: [{ text: 'Sabahı bekle', to: 'h7' }],
    },
    h7: {
      bg: 'erciyes_ova', hands: 'uzan', day: 8,
      lines: [
        'Erciyes\'in karlı tepesi karumun üstünde *parlıyor*.',
        { when: has('katip'), text: 'Artık bir kâtipsin. Adın binlerce tabletin *birinde* yazılı.' },
        { when: has('ortak'), text: 'Ortak kesedeki gümüşün Asur yollarında *dönüyor*.' },
        { when: has('bakirci'), text: 'Eşeklerin Anadolu\'nun dört bir yanına bakır *taşıyor*.' },
        { when: has('bronzcu'), text: 'Döktüğün bronz baltalar uzak köylerde *kullanılıyor*.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'h8' }],
    },
    h8: {
      bg: 'erciyes_ova', hands: 'dinlen', day: 8,
      lines: [
        'Bir gün bu karum büyük bir *yangınla* yok olacak.',
        'Ama ateş kil tabletleri pişirip taşlaştıracak. Binlerce yıl *koruyacak*.',
        'Yazı, insanı *unutulmaktan* kurtarmaya başladı.',
        'Ufukta, Kızılırmak\'ın kıvrımında yeni bir güç doğuyor: *Hititler*.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAY HAVUZU ----------
    u_mektup: {
      bg: 'arsiv', hands: 'tablet',
      lines: [
        'Asur\'dan bir *mektup* geldi. Enlil-bani\'nin Asur\'daki kız kardeşi yazıyor:',
        '"Kumaşları dokudum, kervanla gönderdim. Gümüş hâlâ gelmedi. Evde *ekmek* yok."',
        'Bu mektuplar binlerce yıl sonra *okunacak*. Dertler hiç değişmeyecek.',
      ],
      choices: [
        { text: 'Cevabı sen yaz, gümüşü bu kervanla gönder', req: has('yazi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 1 }, to: '@don' },
        { text: 'Enlil-bani\'yi uyar', to: '@don' },
      ],
    },
    u_esek: {
      bg: 'kervan_yol', hands: 'yular',
      lines: [
        'Eşeklerden biri *topallıyor*. Toynağına bir taş saplanmış.',
        'Yük bekliyor, yol *uzun*.',
      ],
      choices: [
        { text: 'Toynağı temizle, eşeği bir gün dinlendir', effect: { akil: 1 }, to: 'u_esek2' },
        { text: 'Eşeği sat, yenisini al', cost: { para: 1 }, effect: { para: -1 }, to: 'u_esek2' },
      ],
    },
    u_esek2: {
      bg: 'kervan_yol', hands: 'yular',
      lines: [
        'Kervan yeniden *yola* çıkıyor.',
        'Bu yollarda en değerli şey kalay değil, *sağlam* bir eşek.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    u_demir: {
      bg: 'karum_sokak', hands: 'kese',
      lines: [
        'Bir yabancı küçük, kararmış bir parça *demir* gösteriyor.',
        '"Gökten düşen taştan," diyor. Bu çağda demir *altından* bile değerli.',
      ],
      choices: [
        { text: 'Bütün gümüşünü ver, al', cost: { para: 4 }, effect: { para: -4, flags: ['demir'] }, to: 'u_demir2' },
        { text: 'Sadece dokun ve geri ver', effect: { akil: 1 }, to: 'u_demir2' },
      ],
    },
    u_demir2: {
      bg: 'karum_sokak', hands: 'uzan',
      lines: [
        'Soğuk, ağır, *garip* bir metal.',
        'Bir gün demir, bronzun *yerini* alacak. Ama o gün henüz uzak.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    u_salgin: {
      bg: 'gece_karum', hands: 'yok',
      lines: [
        'Karumda bir *salgın*. Bazı evler kapılarını kapattı.',
        'Tabletlerde bile yazıyor: "Hastalık var, *yola* çıkmayın."',
      ],
      choices: [
        { text: 'Hastalara su ve ekmek taşı', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['salgin_yardim'] }, to: 'u_salgin2' },
        { text: 'Evinden çıkma, bekle', effect: { enerji: 10 }, to: 'u_salgin2' },
      ],
    },
    u_salgin2: {
      bg: 'gece_karum', hands: 'dinlen',
      lines: [
        'Haftalar sonra salgın *geçiyor*.',
        { when: has('salgin_yardim'), text: 'Karumda herkes seni *tanıyor* artık.' },
        'Kervanlar yeniden *yola* çıkıyor.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    u_borc: {
      bg: 'karum_sokak', hands: 'kese',
      lines: [
        'Yerli bir çiftçi Enlil-bani\'ye olan borcunu *ödeyemiyor*.',
        'Faiziyle birlikte borç her ay *büyüyor*. Çiftçinin gözleri yaşlı.',
      ],
      choices: [
        { text: 'Hasada kadar süre ver', effect: { akil: 1, flags: ['sure_verdi'] }, to: 'u_borc2' },
        { text: 'Karşılığında tarlasını iste', effect: { para: 3, flags: ['acimasiz'] }, to: 'u_borc2' },
        { text: 'Faizi kendi cebinden sil', cost: { para: 1 }, effect: { para: -1, flags: ['comert'] }, to: 'u_borc2' },
      ],
    },
    u_borc2: {
      bg: 'karum_sokak', hands: 'uzan',
      lines: [
        { when: has('acimasiz'), text: 'Çiftçi tarlasını *bırakıyor*. Sana bakmadan gidiyor.' },
        { when: (st) => !st.flags.includes('acimasiz'), text: 'Çiftçi ellerini *öpmek* istiyor. Geri çekiliyorsun.' },
        'Her borç bir tablete, her tablet bir *hayata* bağlı.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    u_ritton: {
      bg: 'atolye', hands: 'uzan',
      lines: [
        'Bir çömlekçi saraya hediye edilecek *hayvan biçimli* bir içki kabı yapıyor.',
        '"Ne biçiminde olsun?" diye *soruyor*.',
      ],
      choices: [
        { text: 'Kartal', effect: { flags: ['ritton_kartal'] }, to: '@don' },
        { text: 'Boğa', effect: { flags: ['ritton_boga'] }, to: '@don' },
        { text: 'Aslan', effect: { flags: ['ritton_aslan'] }, to: '@don' },
      ],
    },
    u_haydut: {
      bg: 'kervan_yol', hands: 'yular',
      lines: [
        'Bir geçitte yolunu *haydutlar* kesiyor.',
        '"Yükün yarısı bizim, ya da *canın*."',
      ],
      choices: [
        { text: 'Yükün bir kısmını ver, kervanı kurtar', cost: { para: 2 }, effect: { para: -2 }, to: 'u_haydut2' },
        { text: 'Sopayı kap, karşı koy', cost: { enerji: 25 }, effect: { enerji: -25, beden: 1 }, to: 'u_haydut2' },
        { text: '"Bu kervan sarayın koruması altında" diye blöf yap', effect: { akil: 1 }, to: 'u_haydut2' },
      ],
    },
    u_haydut2: {
      bg: 'kervan_yol', hands: 'yok',
      lines: [
        'Haydutlar dağlara *çekiliyor*.',
        'Tüccarlar bu yüzden yol boyunca kasabalara *haraç* öder.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    u_dil: {
      bg: 'karum_sokak', hands: 'uzan',
      lines: [
        'Bir Asurlu ile bir yerli kadın *pazarlık* ediyor. Anlaşamıyorlar.',
        'Kadın yün satıyor, Asurlu yanlış *anlıyor*.',
      ],
      choices: [
        { text: 'Araya gir, iki dili de konuş', req: (st) => st.flags.includes('tercuman') || st.flags.includes('dil') || st.flags.includes('yazi'), reqText: 'Asurca bilmiyorsun', effect: { akil: 1, para: 1 }, to: '@don' },
        { text: 'Karışma', to: '@don' },
      ],
    },
    u_lapis: {
      bg: 'karum_sokak', hands: 'kese',
      lines: [
        'Kervanların en dibinden gece mavisi bir taş çıkıyor: *lacivert taşı*.',
        'Doğunun en uzak dağlarından *aylarca* yol gelmiş.',
      ],
      choices: [
        { text: 'Bir parça al', cost: { para: 2 }, effect: { para: -2, flags: ['lapis'] }, to: '@don' },
        { text: 'Sadece rengine bak', to: '@don' },
      ],
    },
  },

  events: [
    { id: 'mektup', start: 'u_mektup' },
    { id: 'esek', start: 'u_esek' },
    { id: 'demir', start: 'u_demir' },
    { id: 'salgin', start: 'u_salgin' },
    { id: 'borc', start: 'u_borc' },
    { id: 'ritton', start: 'u_ritton' },
    { id: 'haydut', start: 'u_haydut' },
    { id: 'dil', start: 'u_dil' },
    { id: 'lapis', start: 'u_lapis' },
  ],
};

// Akşam düzeni
ERA3.hub = {
  bg: 'gece_karum',
  intro: ['Akşam. Karumda kandiller *yanıyor*.', 'Erciyes\'in tepesi son ışıkla *kızarıyor*.', 'Eşekler ahırlarda *sakinleşiyor*.'],
  acts: [
    { id: 'ders', text: 'Aşşur-malik\'ten yazı dersi al', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['yazi'] }, hands: 'tablet',
      res: [['Islak kile *gümüş*, *kalay*, *kumaş* işaretlerini basıyorsun.', 'Yavaş yavaş *okuyabiliyorsun*.'], ['Aşşur-malik yanlışlarını kamışla *düzeltiyor*.', 'Yazı, sabır *ister*.']] },
    { id: 'kopya', text: 'Bir tableti temize çek', req: (st) => st.flags.includes('yazi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 1, para: 1 }, hands: 'tablet',
      res: [['Eski bir borç senedini yeni kile *aktarıyorsun*.', 'Kâtiplik *para* eder.'], ['Bir mektubun kopyası Asur\'a *gidecek*.', 'Senin yazın, uzak bir şehirde *okunacak*.']] },
    { id: 'ahir', text: 'Eşeklerin bakımını yap', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'yular',
      res: [['Toynakları temizliyor, yemlerini *veriyorsun*.', 'Kervancılar sana bir *şekel* bırakıyor.'], ['Yaşlı bir eşek başını omzuna *yaslıyor*.', 'Bu yollarda dostluk da *yük taşır*.']] },
    { id: 'han', text: 'Handa tüccar sohbetine katıl', effect: { akil: 1, enerji: 5 },
      res: [['Kalay fiyatı *yükselmiş*. Bunu bilen kazanır.', 'Kulağın artık *altın* değerinde.'], ['Bir tüccar Asur\'daki şehir meclisini *anlatıyor*.', 'Ticaretin de kuralları *var*.']] },
    { id: 'dinlen', text: 'Evde dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Taş duvarlar günün sıcağını *tutuyor*.', 'Derin bir uyku.'], ['Sokaktan son eşek sesleri *geliyor*.', 'Dinlendin.']] },
    { id: 'pazar', text: 'Pazarda yün sat', cost: { enerji: 5 }, effect: { enerji: -5, para: 1 }, hands: 'kese',
      res: [['Bir yerli kadın yününü *ölçüyor*, sen tartıyorsun.', 'Gümüş kesene *giriyor*.'], ['Pazarlık iki dilde *sürüyor*.', 'Sonunda herkes *memnun*.']] },
    { id: 'korukler', text: 'Atölyede körük çek', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 },
      res: [['Körük her solukta ateşi *beyazlatıyor*.', 'Bronz kalıba *akıyor*.'], ['Kolların yanıyor, yüzün *isli*.', 'Usta sana bir şekel *atıyor*.']] },
  ],
};
