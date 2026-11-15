// ÇAĞ 10 — Makine devri: Hereke (1843) → Zeytinburnu (1848) → İstanbul ve telgraf (1851-1856)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - 1839 Tanzimat Fermanı'ndan sonra devlet eliyle fabrikalaşma hamlesi: Feshane, İzmit çuha, Veliefendi basma,
//   Zeytinburnu Demir Fabrikası (yapımı 1843'te başladı; makineler ve ustaların bir kısmı Avrupa'dan).
// - Hereke: 1843'te özel bir atölye olarak kuruldu, 1845'te saraya bağlanıp "Fabrika-i Hümayun" oldu;
//   önce sarayların perdelik ve döşemelik ipekli kumaşlarını dokudu (halı çok daha sonra başladı).
// - Fabrikalarda yabancı ustalar yüksek aylık alırdı; yerli işçiler çoğunlukla ağır işlerde çalışırdı.
// - 1851 Şirket-i Hayriye Boğaz'da buharlı vapur işletmeye başladı; 1853'te Dolmabahçe Gazhanesi.
// - Telgraf: 1847'de Beylerbeyi Sarayı'nda Abdülmecid'e gösterildi; Kırım Savaşı sırasında İstanbul-Edirne-Şumnu
//   hattı Eylül 1855'te açıldı, Sivastopol haberi bu hatla geldi. Mayıs 1856'da Telgrafçı Mustafa Efendi
//   Edirne'den İstanbul'a ilk Türkçe telgrafı çekti.
// Oyunun temel fikri: Makine çağında akıl ile beden arasındaki seçimler insanı farklı yollara iter.
// Karakter adları (Rıfat, Hagop usta, Mr. Wilson, Nazife) kurgu.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const yazar = (st) => st.flags.includes('yazi');
// Bütün oyun boyunca biriken iz: ölümsüz insanın yüzyıllar boyunca neye yaslandığı
const akilci = (st) => st.akil >= st.beden;
const fabrikada = (st) => st.yer === 'Zeytinburnu';

export const ERA10 = {
  id: 10,
  name: 'Makine devri',
  place: 'Hereke',
  region: 'Kocaeli ve İstanbul',
  year: '1843',
  currency: 'kuruş',
  start: 'h1',
  next: { name: 'Cumhuriyet sanayisi', place: 'Karabük', year: '1939' },

  carry(st) {
    st.para = Math.min(30, Math.max(5, st.para * 2));
    st.enerji = Math.max(st.enerji, 70);
    return `Yüz yılda fiyatlar arttı: Kesende ${st.para} kuruş var.`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Hereke ----------
    h1: {
      bg: 'hereke_kiyi', hands: 'uzan', day: 1, place: 'Hereke', year: '1843',
      lines: [
        'Gözlerini bir *körfezin* kıyısında açıyorsun. Karşıda yeşil tepeler.',
        'Kıyıda yeni yapılmış taş bir bina. Pencereleri *sıra sıra*.',
        'İçeriden ritmik bir ses geliyor: Tak-tak, *tak-tak*. Tezgâhlar.',
        'Burası *Hereke*. Ve yüzyıl değişmiş: Avrupa\'da makineler insanların işini *alıyor*.',
      ],
      choices: [
        { text: 'Atölyeye gir, iş iste', effect: { beden: 1 }, to: 'h2' },
        { text: 'Kıyıdaki gemiden inen sandıklara bak', effect: { akil: 1, flags: ['sandik'] }, to: 'h2' },
      ],
    },
    h2: {
      bg: 'dokuma_tezgah', hands: 'uzan', day: 1,
      lines: [
        'İçeride uzun sıralar hâlinde *dokuma tezgâhları*. İpek iplikler, renk renk.',
        'Ustabaşı *Hagop usta*: "Sarayın perdeleri, döşemeleri burada dokunacak."',
        { when: has('sandik'), text: 'Sandıklardan yeni *tezgâh* parçaları çıkıyor. Demir dişliler, makaralar.' },
        '"Elin ince mi? Gözün keskin mi? Yoksa *sırtın* mı sağlam?"',
      ],
      choices: [
        { text: '"Desen okumayı bilirim"', effect: { akil: 1, flags: ['desenci'] }, to: '@olay', then: 'h3' },
        { text: '"Sırtım sağlam"', effect: { beden: 1, flags: ['hamal10'] }, to: '@olay', then: 'h3' },
        { text: '"Ne iş varsa yaparım"', effect: { para: 1 }, to: '@olay', then: 'h3' },
      ],
    },
    h3: {
      bg: 'dokuma_tezgah', hands: 'uzan', day: 1,
      lines: [
        { when: has('desenci'), text: 'Hagop usta sana bir *desen* kâğıdı veriyor. Kareli, her kare bir düğüm.' },
        { when: has('hamal10'), text: 'İpek balyalarını iskeleden atölyeye *taşıyorsun*. Ağır ama düzenli.' },
        'Dokumacı kadınlardan *Nazife*, mekiği bir ok gibi atıyor.',
        '"Buradaki her kumaş bir *saraya* gidecek," diyor. "Ama biz o sarayı hiç görmeyeceğiz."',
        { when: has('mozaik'), text: 'Bizans\'ta mozaik taşlarını yerleştirdiğin günler aklına geliyor. Hep başkasının *sarayı*.' },
      ],
      choices: aksam('h4'),
    },
    h4: {
      bg: 'dokuma_tezgah', hands: 'uzan', day: 2,
      lines: [
        'Fransa\'dan getirilen yeni bir tezgâh *kuruldu*. Üstünde delikli kartonlar dizilmiş.',
        'Hagop usta anlatıyor: "Her kartın delikleri hangi ipliğin *kalkacağını* söyler."',
        '"Desen artık dokumacının *aklında* değil. Kartlarda."',
        'Nazife tezgâha *kuşkuyla* bakıyor.',
      ],
      choices: [
        { text: 'Kartların mantığını çöz', effect: { akil: 2, flags: ['kart'] }, to: 'h5a' },
        { text: 'Nazife\'nin yanında eski tezgâhta çalış', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, flags: ['nazife'] }, to: 'h5b' },
      ],
    },
    h5a: {
      bg: 'dokuma_tezgah', hands: 'kitap', day: 2,
      lines: [
        'Bir delik: İplik kalkar. Delik yok: *İnmez*. İki ihtimal.',
        'Kartları sıraya dizersen tezgâh bir *şiir* gibi deseni okuyor.',
        { when: has('kure'), text: 'Bu kadar basit bir şeyden bu kadar karmaşık bir şeyin doğması... *Sayılar* gibi.' },
        'Bir gün bu delikli kartlar bambaşka *makineleri* yönetecek. Ama bunu henüz kimse bilmiyor.',
      ],
      choices: devam('h6'),
    },
    h5b: {
      bg: 'dokuma_tezgah', hands: 'uzan', day: 2,
      lines: [
        'Nazife hızlı, *kusursuz*. Ama yeni tezgâh ondan da hızlı.',
        '"Annem de dokurdu, ninem de," diyor. "Torunum belki *tezgâh başında* bekleyecek, sadece."',
        'Elleri bir an *duruyor*. Sonra yeniden başlıyor.',
      ],
      choices: devam('h6'),
    },
    h6: {
      bg: 'hereke_kiyi', hands: 'uzan', day: 3, year: '1845',
      lines: [
        'İki yıl sonra kıyıya bir *saltanat kayığı* yanaşıyor.',
        'Atölye artık sarayın: *Fabrika-i Hümayun*. Padişahın fabrikası.',
        'Paşalar kumaşları evirip çeviriyor. Bir paşa sana *dönüyor*.',
        '"İstanbul\'da büyük bir demir fabrikası kuruluyor. Orada *adam* lazım."',
      ],
      choices: [
        { text: '"Giderim"', effect: { flags: ['istanbul'] }, to: '@aksam', then: 'z1' },
        { text: '"Nazife ve arkadaşları ne olacak?"', show: has('nazife'), effect: { akil: 1, flags: ['istanbul', 'sordu'] }, to: '@aksam', then: 'z1' },
      ],
    },

    // ---------- BÖLÜM 2: Zeytinburnu ve yol ayrımı ----------
    z1: {
      bg: 'demir_fabrika', hands: 'uzan', day: 4, place: 'Zeytinburnu', year: '1848',
      lines: [
        'Zeytinburnu kıyısında *dev* bir yapı. Bacalardan kara duman.',
        'İçeride yüksek fırınlar, buhar makineleri, *çekiçler*. Yer sarsılıyor.',
        'Makineler İngiltere\'den gelmiş. Ustaların çoğu da *yabancı*.',
        'İngiliz mühendis *Mr. Wilson* işçileri ikiye ayırıyor.',
      ],
      choices: [
        { text: 'Mühendislerin çizim odasına başvur', req: (st) => akilci(st) || yazar(st), reqText: 'Bunun için yüzyıllar boyu aklını kullanmış olmalıydın', effect: { akil: 1, flags: ['muhendis'] }, to: 'z2a' },
        { text: 'Fırınlara, ateşçilerin yanına git', effect: { beden: 1, flags: ['atesci'] }, to: 'z2b' },
      ],
    },
    z2a: {
      bg: 'muhendis_oda', hands: 'kalem', day: 4,
      lines: [
        'Uzun masalarda *çizimler*: Dişliler, kazanlar, borular. Her biri ölçülü, sayılı.',
        'Mr. Wilson seni sınıyor: "Bu kazanın içindeki basınç kaç *atmosfer*?"',
        { when: has('pompa'), text: 'Davud Ağa\'nın tulumbası geliyor aklına: *Basınç*, piston, su.' },
        { when: has('mimar'), text: 'Anthemios\'un çizdiği kubbe hesaplarını düşünüyorsun. Yük, *açı*, denge.' },
        'Cevabını *veriyorsun*. Wilson kaşlarını kaldırıyor.',
      ],
      choices: [{ text: 'Masana otur', effect: { para: 2 }, to: '@olay', then: 'z3' }],
    },
    z2b: {
      bg: 'demir_fabrika', hands: 'cekic', day: 4,
      lines: [
        'Fırının ağzında sıcaklık *dayanılmaz*. Kürek kürek kömür atıyorsun.',
        'Ateşçibaşı *Rıfat*: "Burası ölümsüzlere bile ağır gelir," diyor, bilmeden.',
        'Çizim odasının camlarının ardında temiz ceketli adamlar, *kâğıt* başında.',
        { when: (st) => st.akil < st.beden, text: 'Yüzyıllardır hep *bedenine* yaslandın. Kapı şimdi sana bu taraftan açıldı.' },
      ],
      choices: [{ text: 'Küreği al', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: '@olay', then: 'z3' }],
    },
    z3: {
      bg: 'demir_fabrika', hands: 'uzan', day: 5,
      lines: [
        'Günler fabrikanın *düdüğüyle* başlıyor, düdüğüyle bitiyor.',
        'Artık güneşe göre değil, *saate* göre çalışılıyor.',
        { when: has('muhendis'), text: 'Masanda bir buhar makinesinin parçaları. Senin çizimin bir gün *dökülecek*.' },
        { when: has('atesci'), text: 'Akşamları ellerin titriyor. Ama Rıfat\'la aranda bir *dostluk* başlıyor.' },
        'Yabancı ustalar yerli işçilerin *kat kat* fazlasını alıyor. Herkes biliyor.',
      ],
      choices: [
        { text: 'Bu farkı Mr. Wilson\'a söyle', effect: { akil: 1, flags: ['adalet'] }, to: 'z4' },
        { text: 'İşçilerle konuş, bir sandık kurun', effect: { beden: 1, flags: ['sandik_kurdu'] }, to: 'z4' },
        { text: 'Sus, işine bak', effect: { para: 1 }, to: 'z4' },
      ],
    },
    z4: {
      bg: 'demir_fabrika', hands: 'yok', day: 5,
      lines: [
        'Bir öğleden sonra bir *kazan* ıslık çalmaya başlıyor. Göstergenin ibresi kırmızıda.',
        'Biri bağırıyor: "*Patlayacak!*"',
        'Herkes kapıya koşuyor. Kazanın yanında genç bir çırak *donmuş* kalmış.',
      ],
      choices: [
        { text: 'Basınç vanasını aç', show: has('muhendis'), effect: { akil: 2, flags: ['kazan_kurtardi'] }, to: 'z5' },
        { text: 'Çırağı kucakla, dışarı fırla', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['cirak_kurtardi'] }, to: 'z5' },
        { text: 'Ateşi küreklerle fırından çek', show: has('atesci'), cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['kazan_kurtardi'] }, to: 'z5' },
      ],
    },
    z5: {
      bg: 'demir_fabrika', hands: 'uzan', day: 5,
      lines: [
        { when: has('kazan_kurtardi'), text: 'İbre *düşüyor*. Islık susuyor. Kimse ölmedi.' },
        { when: has('cirak_kurtardi'), text: 'Arkanızda bir gümbürtü. Kazanın kapağı *uçuyor*. Ama çırak kollarında, sağ.' },
        'Mr. Wilson ilk kez yerli işçilerin yanına *iniyor*. Uzun uzun bakıyor.',
        { when: has('adalet'), text: '"Haklıydın," diyor sana. "Bu fabrika *hepimizin* üstünde duruyor."' },
      ],
      choices: aksam('z6'),
    },
    z6: {
      bg: 'muhendis_oda', hands: 'uzan', day: 6,
      lines: [
        'Ertesi gün Wilson seni odasına *çağırıyor*.',
        { when: has('muhendis'), text: '"İngiltere\'ye bir öğrenci gönderiyoruz. Makine okumak için. *Sen* git."' },
        { when: has('atesci'), text: '"Ateşçibaşı oluyorsun. Fırının bütün ekibi *senin*. Ama oradan çıkamazsın."' },
        'Pencereden Boğaz\'a bakıyorsun. Bir *vapur* geçiyor.',
        '"İstanbul değişiyor," diyor Wilson. "Bu değişimin *neresinde* olmak istiyorsun?"',
      ],
      choices: [
        { text: '"Burada kalıp makineleri öğreneceğim"', effect: { akil: 1, flags: ['kaldi'] }, to: 'z7' },
        { text: '"Kente gidip yeni işleri göreceğim"', effect: { flags: ['gitti'] }, to: 'z7' },
        { text: '"Rıfat\'ı ve işçileri bırakmam"', show: has('atesci'), effect: { beden: 1, flags: ['kaldi', 'rifat'] }, to: 'z7' },
      ],
    },
    z7: {
      bg: 'demir_fabrika', hands: 'uzan', day: 6,
      lines: [
        { when: has('rifat'), text: 'Rıfat elini *sıkıyor*: "Biz buranın kemikleriyiz. Kemik olmadan makine durmaz."' },
        { when: has('kaldi'), text: 'Fabrikanın düdüğü artık senin de *saatin*.' },
        { when: has('gitti'), text: 'Kapıdan çıkarken arkana bakıyorsun. Bacalar *tütüyor*.' },
        'Ama makineler *hep* yanında olacak. Bu çağdan kaçış yok.',
      ],
      choices: devam('i1'),
    },

    // ---------- BÖLÜM 3: Değişen İstanbul ----------
    i1: {
      bg: 'vapur_bogaz', hands: 'uzan', day: 6, place: 'İstanbul', year: '1851',
      lines: [
        'Boğaz\'da bir *vapur*. Yan çarkları dönüyor, bacası tütüyor.',
        'Kayıkçılar *söyleniyor*: "Bu kara canavar ekmeğimizi elimizden alacak."',
        'Ama yolcular *bayılıyor*. Üsküdar\'dan Beşiktaş\'a rüzgâra bakmadan.',
      ],
      choices: [
        { text: 'Vapura bin', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: '@olay', then: 'i2' },
        { text: 'Kayıkçılarla konuş', effect: { akil: 1, flags: ['kayikci'] }, to: '@olay', then: 'i2' },
        { text: 'Vapurun kazan dairesine bak', effect: { beden: 1 }, to: '@olay', then: 'i2' },
      ],
    },
    i2: {
      bg: 'gaz_lamba', hands: 'uzan', day: 7, year: '1853',
      lines: [
        'Akşam Beyoğlu\'nda caddeler *aydınlık*. Fenerlerin içinde mum değil: Gaz.',
        'Dolmabahçe\'de bir *gazhane* kurulmuş. Kömürden gaz çıkarıyor, borularla taşıyor.',
        'Bir *lambacı* elindeki uzun sırıkla lambaları tek tek yakıyor.',
      ],
      choices: [
        { text: 'Lambacıya yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@aksam', then: 'i3' },
        { text: 'Gazın nasıl yandığını öğren', effect: { akil: 1 }, to: '@aksam', then: 'i3' },
        { text: 'Işıklar altında yürü', effect: { enerji: 10 }, to: '@aksam', then: 'i3' },
      ],
    },
    i3: {
      bg: 'gaz_lamba', hands: 'uzan', day: 7,
      lines: [
        'Bir kahvehanede *savaş* konuşuluyor. Rus ordusu Tuna\'da.',
        'İngiliz ve Fransız gemileri Boğaz\'dan *geçiyor*. Kırım\'a gidiyorlar.',
        'Biri gazeteyi yüksek sesle *okuyor*. Ama haber üç hafta önceki.',
        '"Keşke haber *anında* gelse," diyor biri. Herkes gülüyor.',
      ],
      choices: devam('i4'),
    },
    i4: {
      bg: 'vapur_bogaz', hands: 'uzan', day: 7,
      lines: [
        'Haliç kıyısında bir fabrikadan yüz binlerce *fes* çıkıyor: Feshane.',
        'Sarıklar azalıyor, *fes* ve ceket çoğalıyor. Devlet memurları bile böyle giyiniyor.',
        'Aynada kendine bakıyorsun. Kürk, keten, ipek, *yün* giydin. Şimdi de bu.',
      ],
      choices: [
        { text: 'Bir fes al, tak', cost: { para: 1 }, effect: { para: -1, flags: ['fes'] }, to: '@aksam', then: 't1' },
        { text: 'Eski giysilerinle kal', effect: { beden: 1 }, to: '@aksam', then: 't1' },
        { text: 'Feshane\'nin makinelerini görmeye git', effect: { akil: 1 }, to: '@aksam', then: 't1' },
      ],
    },

    // ---------- BÖLÜM 4: Telgraf ----------
    t1: {
      bg: 'telgraf_direk', hands: 'uzan', day: 8, year: '1855',
      lines: [
        'Edirne yolunda tarlaların ortasında *direkler*. Aralarında ince bir tel.',
        'Fransız mühendisler bağırıyor. Askerler direk *dikiyor*.',
        'Tel İstanbul\'dan Edirne\'ye, oradan Tuna\'ya, oradan *Avrupa*\'ya uzanacak.',
      ],
      choices: [
        { text: 'Direk dikenlere katıl', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['direkci'] }, to: 't2a' },
        { text: 'Mühendislere tercümanlık yap', req: (st) => akilci(st) || yazar(st), reqText: 'Dil öğrenmeyi seçmedin', effect: { akil: 2, flags: ['tercuman10'] }, to: 't2b' },
        { text: 'Askerlere su taşı', effect: { beden: 1, para: 1 }, to: 't2a' },
      ],
    },
    t2a: {
      bg: 'telgraf_direk', hands: 'cekic', day: 8,
      lines: [
        'Bir direk, bir *çukur*, bir direk daha. Günlerce.',
        'Teli gerip *bağlıyorsun*. Cam fincanlar yalıtıyor.',
        { when: has('direkci'), text: 'Akşam bir köylü soruyor: "Bu tel *ne* taşıyacak?" "Söz," diyorsun.' },
      ],
      choices: devam('t3'),
    },
    t2b: {
      bg: 'telgraf', hands: 'uzan', day: 8,
      lines: [
        'Mühendis aleti *gösteriyor*: Bir pil, bir tel, bir mıknatıs.',
        '"Akım gidince öbür uçtaki iğne *oynar*. Kısa, uzun. Nokta, çizgi."',
        '"Her harf bir dizi nokta ve çizgi. Dünyanın öbür ucuna *saniyede*."',
        { when: has('thales'), text: 'Thales\'in kehribarı ovunca tüyü çektiğini anlatırlardı. O küçük *güç*, şimdi bunu yapıyor.' },
      ],
      choices: devam('t3'),
    },
    t3: {
      bg: 'telgraf', hands: 'mors', day: 9,
      lines: [
        'Eylül. Galata\'daki *telgrafhanede* kalabalık.',
        'Hat açıldı. Herkes ilk haberi *bekliyor*.',
        'Makine *tıkırdıyor*. Telgrafçı bir şerit kâğıda bakıyor, yazıyor.',
        '"Sivastopol *düştü*." Haber, birkaç saat önce olmuş.',
      ],
      choices: [
        { text: 'Mesajı Fransızcadan çevir, sokağa duyur', show: has('tercuman10'), effect: { akil: 1 }, to: 't4' },
        { text: 'Haberi koşarak kahvehaneye götür', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: 't4' },
        { text: 'Telgrafçının elini izle', effect: { akil: 1, flags: ['mors_izle'] }, to: 't4' },
      ],
    },
    t4: {
      bg: 'gaz_lamba', hands: 'uzan', day: 9,
      lines: [
        'Kahvehanede o adam yine orada. Gazete elinde, *ağzı* açık.',
        '"Bu sabah olmuş? Bu *sabah* mı?"',
        'Haber artık atla, gemiyle değil, *tel* ile geliyor.',
        { when: has('kayikci'), text: 'Kayıkçıların korkusu gibi, ulakların da işi *bitecek*. Makine yine bir mesleği yuttu.' },
      ],
      choices: aksam('t4b'),
    },
    t4b: {
      bg: 'telgraf', hands: 'uzan', day: 10,
      lines: [
        'Telgrafhanede *kuyruk*. Tüccarlar fiyat soruyor, aileler asker oğullarından haber bekliyor.',
        'Bir kadın oğluna tek bir *kelime* göndermek istiyor. Ama her kelimenin parası var.',
        '"Ne yazayım?" diye soruyor. Gözleri *dolu*.',
      ],
      choices: [
        { text: '"Bekliyoruz" yaz', effect: { flags: ['bekliyoruz'] }, to: 't4c' },
        { text: 'Mesajın parasını sen öde', cost: { para: 2 }, effect: { para: -2, flags: ['comert'] }, to: 't4c' },
      ],
    },
    t4c: {
      bg: 'telgraf', hands: 'mors', day: 10,
      lines: [
        'Mesaj *gidiyor*. Kadın teli gözleriyle izliyor, sanki kelimeyi görecekmiş gibi.',
        'Bir saat sonra makine *tıkırdıyor*. Cevap!',
        '"*Sağım*." Tek kelime. Kadın yere çöküp ağlıyor.',
        'Hiçbir çağda bir kelime bu kadar *hızlı* bu kadar uzağa gitmemişti.',
      ],
      choices: devam('t5'),
    },
    t5: {
      bg: 'telgraf', hands: 'mors', day: 10, year: '1856',
      lines: [
        'Mayıs. Telgrafçı *Mustafa Efendi* Edirne\'den bir deneme yapacak.',
        'Bugüne kadar bütün telgraflar Fransızca. Mustafa Efendi ise *Türkçe* göndermek istiyor.',
        'Ama Türkçenin harfleri için bir *alfabe* yok. Kendi işaretlerini uydurmuş.',
      ],
      choices: [
        { text: 'İstanbul ucunda mesajı sen çöz', show: (st) => st.flags.includes('mors_izle') || st.flags.includes('tercuman10'), effect: { akil: 2, flags: ['ilk_turkce'] }, to: 't6' },
        { text: 'Hatta bir kopukluk var: Tele sen tırman', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['hat_onardi'] }, to: 't6' },
        { text: 'Kalabalıkla bekle', to: 't6' },
      ],
    },
    t6: {
      bg: 'telgraf', hands: 'uzan', day: 10,
      lines: [
        { when: has('hat_onardi'), text: 'Kopuk teli bağlıyorsun. Ellerin uyuşuyor ama *akım* geçiyor.' },
        'İğne *oynuyor*. Nokta, çizgi, nokta.',
        { when: has('ilk_turkce'), text: 'Kâğıda harf harf *yazıyorsun*. Okuyorsun. Türkçe!' },
        'Edirne\'den İstanbul\'a ilk *Türkçe* telgraf.',
        'Odada alkış. Mustafa Efendi\'nin adı bir gün okul kitaplarına *girecek*.',
      ],
      choices: [{ text: 'Geleceğe bak', to: 't7' }],
    },
    t7: {
      bg: 'vapur_bogaz', hands: 'uzan', day: 11,
      lines: [
        { when: has('muhendis'), text: 'Yüzyıllar boyu aklına yaslandın. Makine çağında bu sana *masa* başını açtı.' },
        { when: has('atesci'), text: 'Yüzyıllar boyu bedenine yaslandın. Makine çağında bu seni *fırının* önüne getirdi.' },
        { when: has('kazan_kurtardi'), text: 'O gün kazanın patlamasını önledin. Bunu Wilson da, Rıfat da *unutmadı*.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Ufka bak', to: 't8' }],
    },
    t8: {
      bg: 'vapur_bogaz', hands: 'dinlen', day: 11,
      lines: [
        'İzmir\'den Aydın\'a bir *demiryolu* döşenmeye başlanacak. Raylar, lokomotifler.',
        'Telgraf telleri Bağdat\'a, Basra\'ya *uzanacak*.',
        'Bir imparatorluk yorulacak, dağılacak. Ve aynı topraklarda yeni bir *devlet* doğacak.',
        'O devlet, dumanı tüten *fabrikalarını* kendi kuracak.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_ipekbocegi: {
      bg: 'dokuma_tezgah', hands: 'sepet',
      lines: [
        'Bursa\'dan bir sepet *koza* geldi. Bazıları delinmiş, kelebek çıkmış.',
        '"Delik koza ipeği *kırar*," diyor Nazife.',
      ],
      choices: [
        { text: 'Kozaları ayıkla', effect: { akil: 1 }, to: '@don' },
        { text: 'Kazanda kozaları kaynat, ipeği çek', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_boya: {
      bg: 'hereke_kiyi', hands: 'firca',
      lines: [
        'Boyahanede kazanlar *fokurduyor*: Kökboya kırmızısı, çivit mavisi.',
        'Bir boyacı İngiltere\'den gelen *kimyasal* bir boya gösteriyor. "Çok ucuz. Ama rengi solar mı?"',
      ],
      choices: [
        { text: 'İkisini de dene, güneşte beklet', effect: { akil: 1 }, to: '@don' },
        { text: 'Kazanları karıştır', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_saat: {
      bg: 'demir_fabrika', hands: 'uzan',
      lines: [
        'Fabrikanın kapısına büyük bir *saat* asıldı.',
        'Geç kalanın yevmiyesinden *kesiliyor*. İşçiler söyleniyor.',
      ],
      choices: [
        { text: 'Saatin nasıl çalıştığını sor', effect: { akil: 1 }, to: '@don' },
        { text: 'Geç kalan bir işçiyi savun', effect: { beden: 1, flags: ['savundu'] }, to: '@don' },
      ],
    },
    e_yarali: {
      bg: 'demir_fabrika', hands: 'uzan',
      lines: [
        'Bir işçinin eli *çarka* kaptırılmış.',
        'Fabrikada hekim *yok*. Herkes birbirine bakıyor.',
      ],
      choices: [
        { text: 'Kolunu sıkıca bağla, kanamayı durdur', show: (st) => st.flags.includes('usta_hekim') || st.flags.includes('sifa') || st.flags.includes('galenos'), effect: { akil: 2 }, to: '@don' },
        { text: 'Onu sırtla, hastaneye koş', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: '@don' },
        { text: 'Bir araba bul', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_gazete: {
      bg: 'gaz_lamba', hands: 'kitap',
      lines: [
        'Bir çocuk *gazete* satıyor. Takvim-i Vekayi, Ceride-i Havadis.',
        { when: has('dizgici'), text: 'Matbaa artık her gün çalışıyor. Müteferrika\'nın harfleri *torunlarını* görse...' },
        '"Havadis! *Havadis!*"',
      ],
      choices: [
        { text: 'Bir gazete al', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: '@don' },
        { text: 'Çocuğa bir simit al', cost: { para: 1 }, effect: { para: -1, flags: ['comert'] }, to: '@don' },
        { text: 'Manşetleri omzunun üstünden oku', to: '@don' },
      ],
    },
    e_fotograf: {
      bg: 'gaz_lamba', hands: 'uzan',
      lines: [
        'Beyoğlu\'nda bir dükkânın camında *tuhaf* resimler. Gerçek gibi, gri tonlu.',
        '"*Fotoğraf*," diyor dükkâncı. "Güneş çiziyor. Bir dakika kıpırdamadan durursanız."',
      ],
      choices: [
        { text: 'Fotoğrafını çektir', cost: { para: 2 }, effect: { para: -2, flags: ['fotograf'] }, to: 'e_fotograf2' },
        { text: 'Geç', to: '@don' },
      ],
    },
    e_fotograf2: {
      bg: 'gaz_lamba', hands: 'uzan',
      lines: [
        'Bir dakika *kıpırdamadan* duruyorsun.',
        'Sonra camın üstünde *yüzün*. Binlerce yıldır hiç değişmeyen yüzün.',
        'Bu, senin ilk *portren*. Belki bir gün biri onu bulup şaşıracak.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_kayikci: {
      bg: 'vapur_bogaz', hands: 'yular',
      lines: [
        'Yaşlı bir kayıkçı vapurun dalgasında *sallanıyor*. Kayığına su dolmuş.',
        '"Kırk yıldır bu sularda kürek çekerim," diyor. "Şimdi kim *biner* bana?"',
      ],
      choices: [
        { text: 'Kayığına bin, ücretini öde', cost: { para: 1 }, effect: { para: -1, enerji: 5 }, to: '@don' },
        { text: '"Vapur iskelesinde iş ara" de', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_hagop: {
      bg: 'dokuma_tezgah', hands: 'uzan',
      lines: [
        'Hagop usta bir kumaşın tersini *gösteriyor*. Düğümler, atlamalar, iplik uçları.',
        '"Kumaşın güzelliği yüzünde, *ustalığı* tersinde görünür."',
      ],
      choices: [
        { text: 'Ters yüzdeki hatayı bul', effect: { akil: 1 }, to: '@don' },
        { text: 'Hatalı sırayı söküp yeniden doku', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_ingiliz: {
      bg: 'demir_fabrika', hands: 'uzan',
      lines: [
        'Bir İngiliz usta sana bir alet uzatıp bir şey *bağırıyor*. Anlamıyorsun.',
        '"*Wrench!* Wrench!" Elini sallıyor.',
      ],
      choices: [
        { text: 'Aletlerin İngilizce adlarını öğrenmeye başla', effect: { akil: 1 }, to: '@don' },
        { text: 'İşaretle anlaş, anahtarı uzat', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_demirhane: {
      bg: 'demir_fabrika', hands: 'cekic',
      lines: [
        'Bir kalıptan ilk *demir boru* çıkıyor. Bir vapurun kazanı için.',
        'Ustalar *alkışlıyor*. Artık her şey dışarıdan gelmeyecek.',
      ],
      choices: [
        { text: 'Boruyu soğutma havuzuna taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: '@don' },
        { text: 'Borunun ölçüsünü kontrol et', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_beykoz: {
      bg: 'vapur_bogaz', hands: 'kese',
      lines: [
        'Beykoz\'dan gelen bir camcı küçük bir sürahi *satıyor*. Üstünde bülbül gözü gibi süslemeler.',
        '"*Çeşm-i bülbül*," diyor. "Bir tane bile aynı değil."',
      ],
      choices: [
        { text: 'Bir tane al', cost: { para: 2 }, effect: { para: -2, flags: ['cesmibulbul'] }, to: '@don' },
        { text: 'Nasıl üflendiğini sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kirim: {
      bg: 'vapur_bogaz', hands: 'uzan',
      lines: [
        'İskelede Kırım\'dan dönen *yaralı* askerler.',
        'Üsküdar\'daki kışlada İngiliz bir *hemşire* geceleri lambasıyla dolaşıyormuş.',
      ],
      choices: [
        { text: 'Yaralıları kışlaya taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: '@don' },
        { text: 'Kışlaya temiz çarşaf ve sabun götür', cost: { para: 1 }, effect: { para: -1, akil: 1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'ipekbocegi', start: 'e_ipekbocegi', when: (st) => st.yer === 'Hereke' },
    { id: 'boya', start: 'e_boya', when: (st) => st.yer === 'Hereke' },
    { id: 'saat', start: 'e_saat', when: fabrikada },
    { id: 'ingiliz', start: 'e_ingiliz', when: fabrikada },
    { id: 'demirhane', start: 'e_demirhane', when: fabrikada },
    { id: 'hagop', start: 'e_hagop', when: (st) => st.yer === 'Hereke' },
    { id: 'yarali', start: 'e_yarali', when: fabrikada },
    { id: 'gazete', start: 'e_gazete', when: (st) => st.yer === 'İstanbul' },
    { id: 'fotograf', start: 'e_fotograf', when: (st) => st.yer === 'İstanbul' },
    { id: 'kayikci', start: 'e_kayikci', when: (st) => st.yer === 'İstanbul' },
    { id: 'beykoz', start: 'e_beykoz', when: (st) => st.yer === 'İstanbul' },
    { id: 'kirim', start: 'e_kirim', when: (st) => st.yer === 'İstanbul' && ['1855', '1856'].includes(st.yil) },
  ],
};

ERA10.hub = {
  intro: (st) => fabrikada(st)
    ? ['Fabrikanın akşam *düdüğü* çalıyor.', 'Bacaların dumanı kızıl gökyüzüne *karışıyor*.', 'İşçiler kapıdan yorgun *çıkıyor*.']
    : st.yer === 'Hereke'
      ? ['Körfezin üstünde gün *batıyor*.', 'Tezgâhların sesi *duruyor*. Sessizlik.']
      : ['İstanbul\'da gaz lambaları *yanıyor*.', 'Boğaz\'da son vapurun *düdüğü*.', 'Kahvehanelerde savaş *konuşuluyor*.'],
  acts: [
    { id: 'tezgah', show: (st) => st.yer === 'Hereke', text: 'Akşam dokumaya kal', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 2 },
      res: [['Mekik *gidip geliyor*. İpek parlıyor.', 'Hagop usta iki kuruş ekliyor.'], ['Bir sıra *bitiyor*. Desen beliriyor.', 'Bir saray perdesi doğuyor.']] },
    { id: 'desen', show: (st) => st.yer === 'Hereke', text: 'Desen kâğıtlarını kareye çevir', effect: { akil: 1, para: 1 }, hands: 'kalem',
      res: [['Bir lale, yüz kare *oluyor*.', 'Lale Devri\'ndeki laleler aklına geliyor.'], ['Kartları *delmeye* hazır.', 'Makine artık okuyabilir.']] },
    { id: 'mesai', show: fabrikada, text: 'Fazla mesaiye kal', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, para: 3 }, hands: 'cekic',
      res: [['Gece vardiyası. Fırın hiç *sönmüyor*.', 'Üç kuruş fazla.'], ['Gözlerin kapanıyor. Ama *dayanıyorsun*.', 'Makine durmuyor, sen de.']] },
    { id: 'kurs', show: fabrikada, text: 'Mühendislerin akşam dersine katıl', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1 }, hands: 'kitap',
      res: [['Geometri, *kuvvet*, kaldıraç.', 'Bazı şeyleri Bergama\'dan beri biliyorsun.'], ['Wilson tahtaya bir *kazan* çiziyor.', 'Basıncı hesaplıyorsun.']] },
    { id: 'fransizca', show: (st) => st.yer !== 'Hereke', text: 'Bir Levantenden Fransızca öğren', effect: { akil: 1, flags: ['yazi'] }, hands: 'kitap',
      res: [['Yeni bir *alfabe*: Latin harfleri.', 'Bir gün kendi dilin de bu harflerle yazılacak.'], ['"Bonjour." *Gülümsüyorsun*.', 'Yeni bir dil, yeni bir kapı.']] },
    { id: 'hamallik', show: (st) => st.yer !== 'Hereke', text: 'İskelede kömür taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'sepet',
      res: [['Vapurlar *kömür* yutuyor.', 'Kara toz her yerin.'], ['Bir çuval daha, bir çuval *daha*.', 'İki kuruş kazandın.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda bir *düdük* çalıyor. Sabah gerçekten çalıyor.', 'Dinlendin.']] },
  ],
};
