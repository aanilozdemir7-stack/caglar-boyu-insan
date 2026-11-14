// ÇAĞ 5 — Demir Çağı krallıkları: Tuşpa (Van, Urartu) → Gordion (Frigya) → Sardes (Lidya)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - Urartu başkenti Tuşpa, Van Gölü'nün doğu kıyısında uzun, yüksek bir kaya kütlesinin üstündedir.
//   Kayadaki en eski yazıt Kral Sarduri'nin adını ve baş tanrı Haldi'yi anar.
// - Kral Menua (MÖ 810-785) 70 km'yi aşan taş bir kanalla Tuşpa'ya su getirmiştir; kanal bugün de akar.
// - Urartu kalelerinde yağ ve tahıl dolu sıra sıra küplerden oluşan ambarlar vardır.
//   Bronz ustalığı ünlüdür: Boğa başlı kazanlar, kemerler, kalkanlar, miğferler ("... Haldi'ye adadı").
//   Urartu kazan süsleri Frigya'ya ve Yunanistan'a kadar yayılmıştır. Asur, kuzeydeki baş düşmandır.
// - Gordion'daki büyük tümülüste (MÖ 8. yy sonu) cenaze şöleni: Mercimekli, ızgara kuzu/keçi yahnisi;
//   şarap, arpa birası ve bal şarabı karışımı bir içki. Yüze yakın bronz kâse. Ahşap mezar odası.
// - Efsaneye göre Midas, dokunduğunu altına çeviren lanetinden Paktolos (Sart Çayı) suyunda yıkanarak kurtulur;
//   çay o yüzden altın taşır. Bu çay, altın-gümüş karışımı elektron taşır.
// - Lidya'da Alyattes zamanında (MÖ 600 dolayı) aslan başlı ilk elektron sikkeler basılır.
// - Herodot: Lidyalılar ilk perakende dükkânları açan ve (bir kıtlıkta) aşık gibi oyunları icat eden halktır.
// - Lidya-Med savaşı, 28 Mayıs 585'te Halys (Kızılırmak) kıyısındaki savaşta güneş tutulunca biter;
//   tutulmayı Miletli Thales önceden bildirmiştir. Barış bir evlilikle mühürlenir.
// Karakter adları kurgu, dönemin ad kalıplarına uygundur.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const vanda = (st) => st.yer === 'Tuşpa';
const sardeste = (st) => st.yer === 'Sardes';
const yolda = (st) => st.yer === 'Gordion';

export const ERA5 = {
  id: 5,
  name: 'Demir Çağı krallıkları',
  place: 'Tuşpa',
  region: 'Van, Polatlı ve Manisa',
  year: 'MÖ 790',
  currency: 'şekel',
  start: 'v1',
  next: { name: 'Antik çağ', place: 'Bergama', year: 'MÖ 180' },

  carry(st) {
    st.para = Math.max(3, st.para);
    st.enerji = Math.max(st.enerji, 70);
    st.flags = st.flags.filter((f) => !['iz'].includes(f));
    const demir = st.flags.includes('demirci') ? ' Hattuşa\'da gördüğün demir sırrı artık herkesin.' : '';
    return `${st.para} şekel gümüşle yeni çağa giriyorsun.${demir}`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Tuşpa ----------
    v1: {
      bg: 'van_kale', hands: 'uzan', day: 1, place: 'Tuşpa', year: 'MÖ 790',
      lines: [
        'Gözlerini *turkuaz* bir gölün kıyısında açıyorsun. Su tuzlu, ufuk geniş.',
        'Gölün kıyısında upuzun bir *kaya* yükseliyor. Üstünde surlar, burçlar.',
        'Burası *Tuşpa*. Urartu krallığının başkenti.',
        'Kayanın yüzüne oyulmuş çivi yazılarında bir *tanrı* adı: Haldi.',
      ],
      choices: [
        { text: 'Kalenin eteğindeki demirci çarşısına git', effect: { beden: 1 }, to: 'v2a' },
        { text: 'Kaya yazıtını okumaya çalış', effect: { akil: 1 }, to: 'v2b' },
        { text: 'Bahçelerde çalışan köylülere katıl', to: 'v2c' },
      ],
    },
    v2a: {
      bg: 'urartu_atolye', hands: 'cekic', day: 1,
      lines: [
        'Her örsün başında bir usta. Ateşte kızaran şey bu kez bronz değil: *demir*.',
        { when: has('demirci'), text: 'Hattuşa\'da körük çektiğin o sır artık *herkesin* elinde.' },
        'Kılıçlar, mızrak uçları, *saban* demirleri. Demir artık sıradan bir maden.',
        'Usta *Ardini* göğsüne vuruyor: "Bronzu süs için, demiri iş için döveriz."',
      ],
      choices: [{ text: 'Çırak olmak iste', effect: { flags: ['ardini'] }, to: 'v3' }],
    },
    v2b: {
      bg: 'van_kale', hands: 'uzan', day: 1,
      lines: [
        'İşaretler *tanıdık*: Asur çivi yazısı. Ama dil başka.',
        { when: has('yazi'), text: 'Kültepe\'den, Hattuşa\'dan bildiğin işaretler burada da *yaşıyor*.' },
        '"Sarduri der ki: Bu taşları ben *getirdim*. Bu duvarı ben yaptım."',
        'Bir yaşlı kâtip yanına geliyor: "Okuyabiliyor musun? Saraya *gel*."',
      ],
      choices: [{ text: 'Kâtiple saraya git', effect: { akil: 1, flags: ['saray_katibi'] }, to: 'v3' }],
    },
    v2c: {
      bg: 'kanal', hands: 'orak', day: 1,
      lines: [
        'Bu kurak vadide *yemyeşil* bahçeler. Bağlar, elma ağaçları, ekin.',
        'Hepsi bir *kanaldan* geliyor. Taş döşeli, gürül gürül akan bir su.',
        'Yaşlı bir bahçıvan: "Kral *Menua* yaptırdı. Dağlardan buraya kadar."',
      ],
      choices: [{ text: 'Bağda iş iste', effect: { beden: 1, flags: ['bahcivan'] }, to: 'v3' }],
    },
    v3: {
      bg: 'kanal', hands: 'uzan', day: 1,
      lines: [
        'Akşam kanalın kıyısında *oturuyorsun*.',
        'Su, yetmiş kilometreden fazla yol gelmiş. Dereleri *aşmış*, kayaları delmiş.',
        'Bir taşta yine bir yazı: "Menua der ki: Bu kanalı ben açtım. Kim bu yazıyı *silerse*, tanrılar onu silsin."',
      ],
      choices: aksam('mk1'),
    },
    mk1: {
      bg: 'van_kale', hands: 'uzan', day: 2,
      lines: [
        'Sabah kentin dışındaki bir kayalığa bir *alay* gidiyor.',
        'Kayaya oyulmuş, kapıya benzeyen bir *niş*. Ama ardında oda yok.',
        'Rahipler buna "tanrının *kapısı*" diyor. Haldi oradan çıkıp gelirmiş.',
      ],
      choices: [
        { text: 'Alaya katıl', to: 'mk2' },
        { text: 'Nişin iki yanındaki uzun yazıya bak', effect: { akil: 1 }, to: 'mk2' },
      ],
    },
    mk2: {
      bg: 'van_kale', hands: 'uzan', day: 2,
      lines: [
        'Yazıt *upuzun*: Onlarca tanrının adı, alt alta.',
        'Her birinin yanında bir sayı: Kaç *boğa*, kaç koyun kurban edilecek.',
        'Haldi\'ye en çok. Ötekilere *sırayla* daha az.',
        'Bu bir dua değil, bir *hesap* gibi.',
      ],
      choices: [
        { text: '"Tanrılara bile bütçe yapmışlar" diye gül', effect: { akil: 1 }, to: 'mk3' },
        { text: 'Kurban edilecek koçları sürüden ayırmaya yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: 'mk3' },
      ],
    },
    mk3: {
      bg: 'van_kale', hands: 'uzan', day: 2,
      lines: [
        'Tören bitince etler halka *dağıtılıyor*.',
        'Yoksul bir kadın payını *alamadı*. Kalabalıkta itilip kakılmış.',
      ],
      choices: [
        { text: 'Kendi payını ona ver', effect: { enerji: -5, flags: ['comert'] }, to: 'mk4' },
        { text: 'Dağıtanlara sıranın bozulduğunu söyle', effect: { akil: 1 }, to: 'mk4' },
        { text: 'Payını ye, yola koyul', effect: { enerji: 10 }, to: 'mk4' },
      ],
    },
    mk4: {
      bg: 'kanal', hands: 'uzan', day: 2,
      lines: [
        'Gölün kıyısında, öğle sıcağında *dinleniyorsun*.',
        { when: has('comert'), text: 'Kadın uzaktan sana el *sallıyor*.' },
        'Kayadaki yazılar, kanallar, kurbanlar... Bu krallık her şeyi *ölçüyor*.',
        'Ve ölçtüğü her şeyi taşa *yazıyor*.',
      ],
      choices: devam('v4'),
    },
    v4: {
      bg: 'urartu_ambar', hands: 'uzan', day: 2,
      lines: [
        'Kalenin içinde dev bir *ambar*. Sıra sıra, insan boyunda küpler.',
        'Her küpün omzuna ne kadar *aldığı* yazılmış: Şarap, yağ, arpa.',
        'Ambar sorumlusu telaşlı: "Asur ordusu *yaklaşıyor* diyorlar. Kuşatma uzun sürebilir."',
      ],
      choices: [
        { text: 'Küplerin kaydını tut, ne kadar dayanırız hesapla', effect: { akil: 1, flags: ['hesapci'] }, to: 'v5a' },
        { text: 'Bahçelerden kaleye yük taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: 'v5b' },
        { text: 'Kanalın girişini korumayı öner', effect: { akil: 1, flags: ['kanal_koru'] }, to: 'v5a' },
      ],
    },
    v5a: {
      bg: 'urartu_ambar', hands: 'tablet', day: 2,
      lines: [
        'Hesap *net*: Kale bir yıl dayanır. Ama kanal kesilirse bahçeler kurur.',
        { when: has('kanal_koru'), text: 'Komutan önerini *beğeniyor*. Kanal boyunca gözcü kuleleri kurulacak.' },
        'Urartu kaleleri hep *yüksekte*: Saldırana zor, korunana kolay.',
      ],
      choices: devam('v6'),
    },
    v5b: {
      bg: 'kanal', hands: 'sepet', day: 2,
      lines: [
        'Sırtında elma, üzüm, *arpa*. Kayalık yokuşu defalarca tırmanıyorsun.',
        'Akşam bacakların titriyor. Ama ambar *doluyor*.',
      ],
      choices: devam('v6'),
    },
    v6: {
      bg: 'urartu_atolye', hands: 'uzan', day: 3,
      lines: [
        'Saray atölyesinde dev bir *bronz kazan* dökülüyor.',
        'Kenarına dört *boğa başı* takılacak. Kazan tanrı Haldi\'ye adanacak.',
        'Usta: "Bu kazanlar denizi aşıp uzak ülkelere *gidiyor*. Herkes bizim işimizi istiyor."',
      ],
      choices: [
        { text: 'Boğa başlarından birini sen dök', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['boga'] }, to: 'v7' },
        { text: 'Kazanın kenarına adak yazısını kazı', req: (st) => st.flags.includes('yazi') || st.flags.includes('saray_katibi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 2, flags: ['adak'] }, to: 'v7' },
        { text: 'Kalıp için balmumu hazırla', effect: { akil: 1, para: 1 }, to: 'v7' },
      ],
    },
    v7: {
      bg: 'van_kale', hands: 'uzan', day: 3,
      lines: [
        'Kazan *parlıyor*. Boğalar sanki göle bakıyor.',
        { when: has('adak'), text: 'Kenarda senin kazıdığın satır: "... bu kazanı tanrı *Haldi*\'ye adadı."' },
        'O gece ufukta *ateşler* görünüyor. Asur öncüleri.',
      ],
      choices: aksam('v8'),
    },
    v8: {
      bg: 'van_kale', hands: 'mizrak', day: 4,
      lines: [
        'Sabah Asur atlıları vadiye *iniyor*. Bahçeleri yağmalıyorlar.',
        'Kalenin kapıları *kapandı*. Dışarıda kalanlar kaleye koşuyor.',
        { when: has('kanal_koru'), text: 'Gözcüler zamanında haber verdi. Kanalın başındakiler *kurtuldu*.' },
      ],
      choices: [
        { text: 'Surlarda mızrakla nöbet tut', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: 'v9a' },
        { text: 'Dışarıda kalan köylüleri içeri al', effect: { beden: 1, flags: ['koylu'] }, to: 'v9b' },
        { text: 'Ambarı kilitle, karneyi sen dağıt', show: has('hesapci'), effect: { akil: 2 }, to: 'v9b' },
      ],
    },
    v9a: {
      bg: 'van_kale', hands: 'mizrak', day: 4,
      lines: [
        'Asurlular kayaya *tırmanamıyor*. Oklar boşa gidiyor.',
        'Günler sonra ordu, yağmaladığıyla *geri* dönüyor.',
        'Kale düşmedi. Ama bahçeler *yanmış*.',
      ],
      choices: [{ text: 'Bahçelere in', to: 'v10' }],
    },
    v9b: {
      bg: 'urartu_ambar', hands: 'sepet', day: 4,
      lines: [
        'Kadınlar, çocuklar, *keçiler* kaleye doluşuyor.',
        'Ambardaki küpler herkese *yetiyor*. Çünkü biri onları önceden saymış.',
        'Asurlular kayaya tırmanamıyor ve günler sonra *çekiliyor*.',
      ],
      choices: [{ text: 'Bahçelere in', to: 'v10' }],
    },
    v10: {
      bg: 'kanal', hands: 'orak', day: 5,
      lines: [
        'Kanal *sağlam*. Su hâlâ akıyor.',
        'Yanmış bahçelere yeniden *fidan* dikiliyor.',
        { when: has('bahcivan'), text: 'Bahçıvan sana gülümsüyor: "Su akıyorsa *her şey* geri gelir."' },
        'Bu kanal yirmi sekiz yüzyıl sonra bile *akacak*.',
      ],
      choices: [
        { text: 'Fidan dik', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 'v11' },
        { text: 'Bahçıvanlara suyun sırayla paylaşımını öner', effect: { akil: 1, flags: ['su_sirasi'] }, to: 'v11' },
      ],
    },
    v11: {
      bg: 'van_kale', hands: 'uzan', day: 5,
      lines: [
        'Yıllar geçiyor. Kralların adı değişiyor, *sen* değişmiyorsun.',
        'Batıdan gelen tüccarlar *Frigya* krallığını anlatıyor.',
        '"Kralları Midas\'ın sarayı *altın* gibi parlıyormuş."',
        'Urartu kazanları da batıya gidiyor. Belki sen de *gitmelisin*.',
      ],
      choices: [
        { text: 'Bir bronz kervanına katılıp batıya git', effect: { para: 1 }, to: 'f1' },
        { text: 'Kazanını sırtla, tek başına yürü', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'f1' },
      ],
    },

    // ---------- BÖLÜM 2: Gordion ----------
    f1: {
      bg: 'gordion_tumulus', hands: 'yular', day: 6, place: 'Gordion', year: 'MÖ 700',
      lines: [
        'Haftalar sonra geniş bir ovada, Sakarya\'nın kıyısında bir kent: *Gordion*.',
        'Ovada tepecikler *yükseliyor*. Ama doğal değiller: Krallar için yığılmış toprak.',
        'Bugün en büyüğü yığılıyor. Kent *yasta*.',
      ],
      choices: [
        { text: 'Toprak taşıyanlara katıl', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: 'f2a' },
        { text: 'Yas tutanlara kimin öldüğünü sor', effect: { akil: 1 }, to: 'f2b' },
      ],
    },
    f2a: {
      bg: 'gordion_tumulus', hands: 'sepet', day: 6,
      lines: [
        'Binlerce sepet toprak. Tepe, ova üstünde bir *dağ* olacak.',
        'Altında ardıç ve çam kütüklerinden bir *oda* var. Kral orada yatıyor.',
      ],
      choices: devam('f3', 'Şölene git'),
    },
    f2b: {
      bg: 'gordion_tumulus', hands: 'uzan', day: 6,
      lines: [
        'Yaşlı bir kadın: "Kral öldü. Altmış yıldan fazla *yaşadı*."',
        '"Toprağın altına ahşap bir oda yaptılar. Yanına masalar, kazanlar *koydular*."',
        '"Gömmeden önce *şölen* var. Sen de gel."',
      ],
      choices: devam('f3', 'Şölene git'),
    },
    f3: {
      bg: 'gordion_soylen', hands: 'uzan', day: 6,
      lines: [
        'Yüz kişi bronz kâselerle oturmuş. Masalar oyma, *kakmalı*.',
        'Kazanlarda *mercimekli*, ızgarada önce kızartılmış kuzu yahnisi.',
        'İçki tuhaf: Şarap, arpa birası ve bal şarabı *karışık*. Altın sarısı.',
        'Bir adam kâsesine *balmumundan* bir şerit yapıştırıp adını yazıyor. Kâsesi karışmasın diye.',
      ],
      choices: [
        { text: 'Yahniyi tat, aç karnını doyur', effect: { enerji: 20 }, to: 'f4a' },
        { text: 'Kazanın kenarındaki boğa başlarına bak', show: has('boga'), effect: { akil: 1, flags: ['kazan_tanidi'] }, to: 'f4b' },
        { text: 'Sen de kâsene adını yaz', req: (st) => st.flags.includes('yazi') || st.flags.includes('saray_katibi'), reqText: 'Yazı bilmiyorsun', effect: { akil: 1 }, to: 'f4a' },
      ],
    },
    f4a: {
      bg: 'gordion_soylen', hands: 'dinlen', day: 6,
      lines: [
        'Bir ozan *Midas*\'ı anlatıyor. Ama bu kral değil, efsanedeki Midas.',
        '"Dokunduğu her şey *altın* oldu. Ekmeği de, suyu da, kızı da."',
        '"Sonunda batıdaki *Paktolos* çayında yıkandı. Lanet suya geçti. O çay şimdi altın taşır."',
      ],
      choices: [{ text: '"O çay nerede?"', effect: { flags: ['paktolos'] }, to: 'f5' }, { text: 'Masala gül, iç', effect: { enerji: 5 }, to: 'f5' }],
    },
    f4b: {
      bg: 'gordion_soylen', hands: 'uzan', day: 6,
      lines: [
        'Kazanın kenarında dört *boğa başı*. Biri tanıdık bir eğriyle bakıyor.',
        'Senin döktüğün başlardan *biri*. Van\'dan buraya kadar gelmiş.',
        'Bir ozan *Midas* masalını anlatıyor: Batıdaki Paktolos çayının altın taşıdığını.',
      ],
      choices: [{ text: '"O çay nerede?"', effect: { flags: ['paktolos'] }, to: 'f5' }],
    },
    f5: {
      bg: 'gordion_tumulus', hands: 'uzan', day: 7,
      lines: [
        'Tümülüs tamamlandı. Ova yeni bir *tepe* kazandı.',
        'Ama doğudan kötü haberler var: Atlı göçebeler, *Kimmerler*, köyleri yakıyor.',
        { when: has('paktolos'), text: 'Aklın o altın çayda. Yol *batıyı* gösteriyor.' },
      ],
      choices: aksam('s1', 'Gordion\'da son gece'),
    },

    // ---------- BÖLÜM 3: Sardes ve ilk sikke ----------
    s1: {
      bg: 'paktolos', hands: 'uzan', day: 8, place: 'Sardes', year: 'MÖ 600',
      lines: [
        'Yine yıllar *geçti*. Yine yürüdün.',
        'Bozdağ\'ın eteğinden inen bir çay. Kumunda *parıltılar*.',
        'Burası *Paktolos*. Kıyısında Lidya\'nın başkenti, Sardes.',
        'İnsanlar çayın kumunu koyun postlarında *yıkıyor*. Ağır altın taneleri postta kalıyor.',
      ],
      choices: [
        { text: 'Bir post al, sen de yıka', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: 's2a' },
        { text: 'Tanelere bak: Bu sarı, ama tam altın değil', effect: { akil: 1, flags: ['elektron'] }, to: 's2b' },
        { text: 'Kente çık, pazara git', to: 's2c' },
      ],
    },
    s2a: {
      bg: 'paktolos', hands: 'uzan', day: 8,
      lines: [
        'Saatler sonra postta bir avuç *sarı* kum.',
        'Bir yıkıcı gülüyor: "Altın değil o, *elektron*. Altınla gümüş karışık."',
        '"Kimi tanede altın çok, kiminde gümüş. *Değerini* bilmek zor."',
      ],
      choices: [{ text: 'Kente çık', to: 's3' }],
    },
    s2b: {
      bg: 'paktolos', hands: 'uzan', day: 8,
      lines: [
        'Rengi soluk. Altınla gümüşün *karışımı*: elektron.',
        'Her tanenin içinde başka *oranda* altın var.',
        'Pazarda bunu tartmak yetmez. Kimse neyi aldığını tam *bilemez*.',
      ],
      choices: [{ text: 'Kente çık', to: 's3' }],
    },
    s2c: {
      bg: 'sardes_pazar', hands: 'uzan', day: 8,
      lines: [
        'Sardes pazarı *kalabalık*. Ama burada bir şey farklı.',
        'Tezgâhların arkasında *dükkânlar*: Bir kapı, bir raf, sabit bir satıcı.',
        'Kervan beklemeden, her gün, her saat *alışveriş*.',
      ],
      choices: [{ text: 'Pazarı dolaş', to: 's3' }],
    },
    s3: {
      bg: 'sardes_pazar', hands: 'kese', day: 8,
      lines: [
        'Bir tüccar keseni açtırıyor. Gümüş parçalarını tek tek *tartıyor*.',
        'Sonra birini *kesip* içine bakıyor: "İçi bakır mı, gümüş mü?"',
        'Her alışverişte terazi, bıçak, *kavga*.',
        { when: has('hesap'), text: 'Uluburun\'daki kâtibin dediği gibi: "Yanlış sayarsan *kafanı* keserler."' },
      ],
      choices: [
        { text: '"Ağırlığı ve saflığı belli parçalar olsa..." diye düşün', effect: { akil: 1, flags: ['fikir'] }, to: 's4' },
        { text: 'Tüccarla pazarlığa gir', effect: { para: 1 }, to: 's4' },
      ],
    },
    s4: {
      bg: 'darphane', hands: 'uzan', day: 9,
      lines: [
        'Sarayın yanındaki atölyede *Kral Alyattes*\'in adamları çalışıyor.',
        'Elektron taneleri eritilip *aynı* ağırlıkta damlalar hâline getiriliyor.',
        'Sonra bir örsün üstüne konup yukarıdan çekiçle bir *damga* vuruluyor.',
        'Damgada kükreyen bir *aslan başı*.',
      ],
      choices: [
        { text: 'Çekiçle damgayı sen vur', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, flags: ['darpci'] }, to: 's5a' },
        { text: 'Tartı ustasına yardım et', effect: { akil: 1, flags: ['tartici'] }, to: 's5b' },
        { text: '"Neden aslan?" diye sor', effect: { akil: 1 }, to: 's5c' },
      ],
    },
    s5a: {
      bg: 'darphane', hands: 'cekic', day: 9,
      lines: [
        'Çekici kaldırıyor, *vuruyorsun*.',
        'Damla yassılaşıyor. Üstünde aslan, altında *zımbanın* izi.',
        'Elinde dünyanın ilk *sikkelerinden* biri.',
      ],
      choices: [{ text: 'Sikkeye bak', to: 's6' }],
    },
    s5b: {
      bg: 'darphane', hands: 'para', day: 9,
      lines: [
        'Her damla teraziye *konuyor*. Ağırsa yontuluyor, hafifse geri gidiyor.',
        'Kralın *sözü*: Bu damgalı parça hep aynı ağırlıkta.',
        'Artık kimse kesip *bakmayacak*.',
      ],
      choices: [{ text: 'Sikkeye bak', to: 's6' }],
    },
    s5c: {
      bg: 'darphane', hands: 'uzan', day: 9,
      lines: [
        'Usta güldü: "Aslan *kralın* işaretidir."',
        '"Bu damgayı gören bilir: Ağırlığına *kral* kefil."',
        '"Kral kefil olunca, kimse *tartmaz*."',
      ],
      choices: [{ text: 'Sikkeye bak', to: 's6' }],
    },
    s6: {
      bg: 'darphane', hands: 'para', day: 9, currency: 'sikke',
      lines: [
        'Bu bir *sikke*. Değeri, ağırlığı, sahibi belli.',
        'Kralın adamları eski gümüş parçalarını yeni sikkelerle *değiştiriyor*.',
        { when: has('fikir'), text: 'Pazarda aklına gelen fikir, şimdi *avucunda*.' },
        'Artık paran *sikke* ile sayılıyor.',
      ],
      choices: [
        { text: 'Gümüşünü sikkeye çevir', effect: { akil: 1 }, to: 's7' },
        { text: 'Bir sikkeyi dişle, sına', effect: { beden: 1 }, to: 's7' },
      ],
    },
    s7: {
      bg: 'sardes_pazar', hands: 'para', day: 10,
      lines: [
        'Pazarda bir mucize: Sikkeyi gören satıcı *tartmadan* malı veriyor.',
        'Alışveriş *hızlanıyor*. Dükkânlar çoğalıyor.',
        'Bir dükkâncı kadın: "Artık bir çocuk bile *alışveriş* yapabilir."',
      ],
      choices: [
        { text: 'Bir dükkân kiralamayı düşün', cost: { para: 2 }, effect: { para: -2, flags: ['dukkan'] }, to: 's8a' },
        { text: 'Sarayın darphanesinde çalışmaya devam et', effect: { para: 1, flags: ['darphane'] }, to: 's8b' },
        { text: 'Paktolos\'ta altın yıkamayı sür', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, to: 's8b' },
      ],
    },
    ef1: {
      bg: 'sardes_pazar', hands: 'yular', day: 10,
      lines: [
        'Kral, *Efes*\'teki Artemis tapınağına bir kese sikke gönderiyor.',
        'Kervana bir güvenilir adam *lazım*. Seni seçiyorlar.',
        'Yol, Bozdağ\'ın eteklerinden denize *iniyor*.',
      ],
      choices: [
        { text: 'Keseyi kendi beline bağla', effect: { beden: 1 }, to: 'ef2' },
        { text: 'Keseyi ikiye böl, birini eşeğe sakla', effect: { akil: 1, flags: ['bolunmus'] }, to: 'ef2' },
      ],
    },
    ef2: {
      bg: 'dar_yol', hands: 'kese', day: 10,
      lines: [
        'Bir geçitte üç adam *yolu* kesiyor.',
        '"Kralın parası mı o? Kral *uzakta*."',
      ],
      choices: [
        { text: 'Sopayla karşı koy', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: 'ef3' },
        { text: 'Belindeki yarıyı ver, kaç', show: has('bolunmus'), effect: { akil: 1 }, to: 'ef3' },
        { text: '"Bu sikkeler tanrıçanın. Ona el süren lanetlenir"', effect: { akil: 1 }, to: 'ef3' },
      ],
    },
    ef3: {
      bg: 'tapinak_efes', hands: 'para', day: 11, place: 'Efes',
      lines: [
        'Efes. Bataklık bir ovada, dev bir *tapınak* yükseliyor: Artemis\'in evi.',
        'Rahipler sikkeleri tapınağın *temeline*, taşların altına gömüyor.',
        '"Tanrıçanın hazinesi. Bin yıl *güvende* kalsın."',
        'İyonyalı tüccarlar sikkeleri merakla *evirip çeviriyor*.',
      ],
      choices: [
        { text: 'Bir sikkeyi de sen göm', effect: { flags: ['temel'] }, to: 'ef4' },
        { text: 'İyonyalılara sikkenin nasıl basıldığını anlat', effect: { akil: 1, para: 1 }, to: 'ef4' },
      ],
    },
    ef4: {
      bg: 'tapinak_efes', hands: 'uzan', day: 11,
      lines: [
        'Limanda gemiler dört bir yana *gidiyor*: Adalar, Mısır, Karadeniz.',
        'Her gemide biraz Lidya *sikkesi*. Fikir denize açıldı.',
        { when: has('temel'), text: 'Gömdüğün sikke bir gün kazıcıların fırçası altında *gün yüzüne* çıkacak.' },
        'Sardes\'e dönüş yolu *uzun*.',
      ],
      choices: devam('s9', 'Sardes\'e dön'),
    },
    s8a: {
      bg: 'sardes_pazar', hands: 'sepet', day: 10,
      lines: [
        'Küçük bir dükkân. Rafta *boyalı* yün, merhem, koku.',
        'Lidya *merhemleri* bütün kıyıda ünlü.',
        'Her gün kapını *açıyorsun*. Müşteri tanıyor, sen müşteriyi.',
      ],
      choices: aksam('ef1'),
    },
    s8b: {
      bg: 'darphane', hands: 'cekic', day: 10,
      lines: [
        'Her gün yüzlerce *aslan*. Çekiç sesi kulağına yerleşiyor.',
        'Sikkeler *İyonya* kentlerine, adalara, denize gidiyor.',
        'Bir buluş bir pazarı değil, *dünyayı* değiştiriyor.',
      ],
      choices: aksam('ef1'),
    },
    s9: {
      bg: 'sardes_pazar', hands: 'uzan', day: 11,
      lines: [
        'Kentte *sıkıntı*. Kuraklık; ekmek az.',
        'Bir ihtiyar meydanda bağırıyor: "Bir gün yiyelim, bir gün *oynayalım*! Açlığı unuturuz."',
        'İnsanlar *aşık* kemikleriyle, taşlarla oyunlar oynuyor.',
      ],
      choices: [
        { text: 'Oyuna katıl, moral ver', effect: { enerji: 10, flags: ['oyuncu'] }, to: 's10' },
        { text: 'Dükkânından ekmek dağıt', show: has('dukkan'), cost: { para: 1 }, effect: { para: -1, flags: ['comert'] }, to: 's10' },
        { text: 'Ambarların hesabını yapıp krala sun', effect: { akil: 1 }, to: 's10' },
      ],
    },
    s10: {
      bg: 'sardes_pazar', hands: 'uzan', day: 11,
      lines: [
        'Kuraklık geçiyor. Oyunlar *kalıyor*.',
        'Ama doğudan başka bir bulut: *Medler*. Kızılırmak\'ın ötesinde güçlü bir ordu.',
        'Lidya ile Med arasında savaş *başladı*. Beş yıldır sürüyor.',
      ],
      choices: [{ text: 'Orduyla doğuya git', to: 't0' }],
    },

    // ---------- BÖLÜM 4: Güneşin karardığı gün ----------
    t0: {
      bg: 'kervan_yol', hands: 'mizrak', day: 12, place: 'Kızılırmak', year: 'MÖ 585',
      lines: [
        'Ordu günlerce doğuya *yürüyor*. Mızraklar, kalkanlar, atlı okçular.',
        'Geceleri kamp ateşlerinin başında askerler *korkularını* anlatıyor.',
        '"Medlerin okçuları gökyüzünü *karartırmış*," diyor genç bir asker.',
        'Bir başkası sırıtıyor: "Gökyüzünü karartacak tek şey *tanrılardır*."',
      ],
      choices: [
        { text: 'Genç askere mızrak tutmayı öğret', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, flags: ['genc_asker'] }, to: 't1' },
        { text: 'Ateşin başında yıldızlara bak', effect: { akil: 1 }, to: 't1' },
        { text: 'Erken yat, güç topla', effect: { enerji: 15 }, to: 't1' },
      ],
    },
    t1: {
      bg: 'kizilirmak', hands: 'mizrak', day: 12,
      lines: [
        'Kızılırmak kıyısı. Bir yanda Lidya, öbür yanda *Med* ordusu.',
        'Ordunun yanında Miletli bir bilge var: *Thales*.',
        'Herkese aynı şeyi söylüyor: "Bu yıl gün *ortasında* güneş kararacak."',
        'Askerler gülüyor.',
      ],
      choices: [
        { text: 'Thales\'e nasıl bildiğini sor', effect: { akil: 1, flags: ['thales'] }, to: 't2a' },
        { text: 'Mızrağını bile, saflara gir', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 't2b' },
      ],
    },
    t2a: {
      bg: 'kizilirmak', hands: 'uzan', day: 12,
      lines: [
        'Thales ellerini *açıyor*: "Gökyüzü düzenle döner. Tutulmalar da."',
        '"Babil\'in kâtipleri yüzyıllardır *yazmış*. Ben sadece okudum ve hesapladım."',
        { when: has('yazi'), text: 'Yazının yine bir şeyi *kurtardığını* düşünüyorsun: Bilgiyi.' },
        '"Tanrıların öfkesi değil bu. *Gök* kendi yolunda."',
      ],
      choices: [{ text: 'Savaş alanına dön', to: 't3' }],
    },
    t2b: {
      bg: 'kizilirmak', hands: 'mizrak', day: 12,
      lines: [
        'Ordular *çarpışıyor*. Toz, bağırış, demir sesi.',
        'Mızrağın ağır. Kolların *yanıyor*.',
      ],
      choices: [{ text: 'Savaşmaya devam et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 't3' }],
    },
    t3: {
      bg: 'tutulma', hands: 'yok', day: 12,
      lines: [
        'Birden ışık *soluyor*. Gün ortasında gölgeler uzuyor.',
        'Güneşin önüne kara bir *disk* kayıyor. Kuşlar susuyor.',
        'Gündüz *gece* oluyor.',
        'İki ordu da silahlarını *indiriyor*.',
      ],
      choices: [
        { text: '"Korkmayın! Bunu Thales bildirmişti!" diye bağır', show: has('thales'), effect: { akil: 2, flags: ['bagirdi'] }, to: 't4' },
        { text: 'Yere çök, bekle', to: 't4' },
        { text: 'Yanındaki genç askeri sakinleştir', effect: { beden: 1 }, to: 't4' },
      ],
    },
    t4: {
      bg: 'kizilirmak', hands: 'uzan', day: 12,
      lines: [
        'Işık geri *geliyor*. Ama savaş geri gelmiyor.',
        'İki kral bunu bir *işaret* sayıyor. Barış konuşulmaya başlanıyor.',
        { when: has('bagirdi'), text: 'Askerler sana tuhaf bakıyor. Bir bilginin *korkuyu* yenebildiğini gördüler.' },
        'Barış bir evlilikle mühürleniyor: Lidya kralının kızı, Med prensine *gelin* gidecek.',
      ],
      choices: [{ text: 'Barışı izle', to: 't4b' }],
    },
    t4b: {
      bg: 'kizilirmak', hands: 'uzan', day: 12,
      lines: [
        'İki ordunun arasındaki ovada çadırlar *kuruluyor*.',
        'Krallar kollarını kesip birbirinin *kanını* içerek yemin ediyor. Eski bir adet.',
        { when: has('genc_asker'), text: 'Mızrak tutmayı öğrettiğin genç asker sağ salim *gülümsüyor*.' },
        'Askerler mızraklarını *yere* bırakıyor. Kızılırmak sakin akıyor.',
      ],
      choices: [{ text: 'Sardes\'e dön', to: 't5' }],
    },
    t5: {
      bg: 'sardes_pazar', hands: 'para', day: 13, place: 'Sardes',
      lines: [
        { when: has('darpci'), text: 'İlk aslanı sen *vurdun*. O sikke artık elden ele dolaşıyor.' },
        { when: has('dukkan'), text: 'Dükkânın Sardes\'in en işlek *sokağında*.' },
        { when: has('su_sirasi'), text: 'Van\'daki bahçıvanlar suyu hâlâ senin dediğin *sırayla* paylaşıyor olmalı.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 't6' }],
    },
    t6: {
      bg: 'paktolos', hands: 'dinlen', day: 13,
      lines: [
        'Bir gün Lidya düşecek. Ama *sikke* düşmeyecek.',
        'Aslanın yerine kartallar, kralların yüzleri, tanrılar *basılacak*.',
        'Bir gün senin cebinde bile *bozuk para* şıngırdayacak.',
        'Batıda, Ege kıyısında *bilgeler* gökyüzünü, sayıları, dünyayı sorgulamaya başladı.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_at: {
      bg: 'kanal', hands: 'yular',
      lines: [
        'Urartu atları *ünlüdür*. Asur kralları bile onları ister.',
        'Bir tay *ürkmüş*, bahçeleri çiğniyor.',
      ],
      choices: [
        { text: 'Tayı sakinleştir', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@don' },
        { text: 'Önüne yem koy, bekle', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kemer: {
      bg: 'urartu_atolye', hands: 'uzan',
      lines: [
        'Bir usta bronz bir *kemer* işliyor. Üstünde avcılar, aslanlar, kanatlı yaratıklar.',
        '"Kemer bir okçunun *karnını* korur. Süsü de ruhunu."',
      ],
      choices: [
        { text: 'Bir kemer satın al', cost: { para: 2 }, effect: { para: -2, flags: ['kemer'] }, to: '@don' },
        { text: 'Desene bir kartal ekle', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_deprem: {
      bg: 'van_kale', hands: 'uzan',
      lines: [
        'Yer *sallanıyor*. Kalenin bir burcu çöküyor.',
        'Van bölgesi *depremleri* iyi bilir.',
      ],
      choices: [
        { text: 'Enkazın altındakileri çıkar', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['kurtarici'] }, to: '@don' },
        { text: 'Herkesi açık alana topla', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kimmer: {
      bg: 'kervan_yol', hands: 'mizrak',
      lines: [
        'Ufukta *atlılar*. Göçebe Kimmerler, kervanları vuruyor.',
        'Okları atın üstünden *dönerek* atıyorlar.',
      ],
      choices: [
        { text: 'Kervanı kayalığa sür', effect: { akil: 1 }, to: '@don' },
        { text: 'Yükün bir kısmını bırak, kaç', cost: { para: 1 }, effect: { para: -1 }, to: '@don' },
      ],
    },
    e_dugum: {
      bg: 'gordion_tumulus', hands: 'uzan',
      lines: [
        'Bir tapınağın önünde eski bir *araba* duruyor. Oku bir düğümle bağlı.',
        'Düğüm öyle karışık ki *ucu* görünmüyor.',
        '"Bu düğümü çözen Asya\'ya *hükmedecek*," diyorlar.',
      ],
      choices: [
        { text: 'Çözmeyi dene', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 'e_dugum2' },
        { text: 'Gülüp geç', to: 'e_dugum2' },
      ],
    },
    e_dugum2: {
      bg: 'gordion_tumulus', hands: 'uzan',
      lines: [
        'Düğüm *çözülmüyor*. Kimse çözemiyor.',
        'Dört yüz yıl sonra genç bir kral gelip onu kılıcıyla *kesecek*.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_sahte: {
      bg: 'sardes_pazar', hands: 'para',
      lines: [
        'Bir sikke elinde *hafif* geliyor. Kenarı törpülenmiş.',
        'Biri sikkelerin kenarından altın *kazıyor*.',
      ],
      choices: [
        { text: 'Kazıyıcıyı izle, saray muhafızına bildir', effect: { akil: 1 }, to: '@don' },
        { text: 'Sikkeyi geri ver, tam ağırlık iste', effect: { para: 1 }, to: '@don' },
      ],
    },
    e_lir: {
      bg: 'sardes_pazar', hands: 'uzan',
      lines: [
        'Bir sokak müzisyeni *lir* çalıyor. Ezgi hüzünlü, tuhaf aralıklı.',
        'Bu ezgi tarzına bir gün "*Lidya* makamı" diyecekler.',
      ],
      choices: [
        { text: 'Birlikte söyle', effect: { enerji: 10 }, to: '@don' },
        { text: 'Bir sikke at', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: '@don' },
      ],
    },
    e_merhem: {
      bg: 'sardes_pazar', hands: 'kese',
      lines: [
        'Bir kadın yanık merhemi *satıyor*. Kokusu keskin.',
        '"Lidya merhemi. Ege\'nin *her* limanında aranır."',
      ],
      choices: [
        { text: 'Bir kavanoz al', cost: { para: 1 }, effect: { para: -1, enerji: 15 }, to: '@don' },
        { text: 'Tarifini sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_aslan: {
      bg: 'paktolos', hands: 'mizrak',
      lines: [
        'Bozdağ\'dan inen bir *aslan* sürüye dalıyor.',
        'Çobanlar bağırıyor. Aslan, sikkelerdeki gibi *kükrüyor*.',
      ],
      choices: [
        { text: 'Mızrakla sürüyü koru', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: '@don' },
        { text: 'Ateş yak, aslanı ürküt', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_bilge: {
      bg: 'sardes_pazar', hands: 'uzan',
      lines: [
        'Ege kıyısından gelen bir *gezgin*, kralın sarayına gidiyor.',
        '"Milet\'te Thales diye biri var," diyor. "Her şeyin *sudan* doğduğunu söylüyor."',
      ],
      choices: [
        { text: 'Onunla tartış', effect: { akil: 1 }, to: '@don' },
        { text: 'Yolunu tarif et', effect: { para: 1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'at', start: 'e_at', when: vanda },
    { id: 'kemer', start: 'e_kemer', when: vanda },
    { id: 'deprem', start: 'e_deprem', when: vanda },
    { id: 'kimmer', start: 'e_kimmer', when: yolda },
    { id: 'dugum', start: 'e_dugum', when: yolda },
    { id: 'sahte', start: 'e_sahte', when: (st) => sardeste(st) && st.birim === 'sikke' },
    { id: 'lir', start: 'e_lir', when: sardeste },
    { id: 'merhem', start: 'e_merhem', when: sardeste },
    { id: 'aslan', start: 'e_aslan', when: sardeste },
    { id: 'bilge', start: 'e_bilge', when: sardeste },
  ],
};

ERA5.hub = {
  intro: (st) => vanda(st)
    ? ['Gölün üstünde gün *batıyor*. Su mor, kaya kızıl.', 'Kalenin burçlarında nöbetçiler *değişiyor*.', 'Kanalın şırıltısı geceye *karışıyor*.']
    : yolda(st)
      ? ['Ovada rüzgâr *esiyor*. Tümülüslerin gölgesi uzun.', 'Sakarya\'nın kıyısında kurbağalar *ötüyor*.']
      : ['Sardes\'te dükkânlar *kapanıyor*.', 'Bozdağ\'ın üstünde ilk *yıldızlar*.', 'Paktolos karanlıkta bile *parlıyor*.'],
  acts: [
    { id: 'bag', show: vanda, text: 'Bağda üzüm topla', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'sepet',
      res: [['Salkımlar ağır, tatlı.', 'Urartu şarabı *küplere* doluyor.'], ['Parmakların mor.', 'Bağcı sana bir *şekel* veriyor.']] },
    { id: 'ocak', show: vanda, text: 'Demircide körük çek', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, hands: 'cekic',
      res: [['Demir kızarıyor, *dövülüyor*, suya batıyor.', 'Bir saban demiri doğuyor.'], ['Ardini omzuna *vuruyor*.', '"Elin alışıyor."']] },
    { id: 'yazit', show: vanda, text: 'Kâtipten Urartuca öğren', effect: { akil: 1, flags: ['yazi'] }, hands: 'tablet',
      res: [['Asur işaretleri, Urartu sözcükleri. Dil dile *yamanmış*.', 'Yeni bir dil *açılıyor*.'], ['"Kim bu yazıyı silerse..." Lanet kalıplarını *ezberliyorsun*.', 'Krallar unutulmaktan *korkuyor*.']] },
    { id: 'tumulus', show: yolda, text: 'Tümülüse toprak taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'sepet',
      res: [['Sepet sepet toprak.', 'Tepe *yükseliyor*.'], ['Ustabaşı adını *yazıyor*.', 'Yarın ücretini alacaksın.']] },
    { id: 'dokuma', show: yolda, text: 'Frig dokumacılarını izle', effect: { akil: 1 },
      res: [['Tezgâhta geometrik *desenler*.', 'Kırmızı, sarı, kahverengi.'], ['Dokumacı, mezar odasındaki *kumaşları* anlatıyor.', 'Kral boyalı kumaşlar üstünde yatıyor.']] },
    { id: 'altin', show: sardeste, text: 'Paktolos\'ta altın yıka', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 },
      res: [['Post ağırlaşıyor. Parıltı *çoğalıyor*.', 'Darphaneye *satıyorsun*.'], ['Ayakların buz gibi.', 'Ama kesen *ağır*.']] },
    { id: 'dukkanci', show: sardeste, text: 'Bir dükkânda tezgâhtarlık yap', cost: { enerji: 5 }, effect: { enerji: -5, para: 1, akil: 1 }, hands: 'para',
      res: [['Sikkeyi *alıyorsun*, malı veriyorsun. Tartı yok.', 'Ne kolay!'], ['Müşteriler seni *tanımaya* başlıyor.', 'Güven de bir sermaye.']] },
    { id: 'asik', show: sardeste, text: 'Meydanda aşık oyna', effect: { enerji: 10 },
      res: [['Kemikler havada *dönüyor*. Kazandın!', 'Gülüşmeler.'], ['Yaşlı bir adam seni *yeniyor*.', '"Lidya\'nın icadı," diyor gururla.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda bir *aslan* görüyorsun.', 'Dinlendin.']] },
  ],
};
