// ÇAĞ 14 — Yakın gelecek: İstanbul (2041) → Rize (2043) → Kaş (2045) → Göbeklitepe (2049)
// *kelime* = sarı vurgulanan anahtar kelime.
// Bu çağ kurgudur: Yakın geleceğe dair makul bir hayal. Gerçek yer adları ve geçmiş çağlardaki olaylara
// geri dönüşler kullanılır. Oyunun son çağıdır; son sahne oyunun başladığı yerde, Göbeklitepe'de geçer.
// Karakter adları (Aylin, Deniz, Defne, Kaan, Zeynep) kurgu. Aylin 13. çağdaki yazılımcı, Deniz Nermin'in torunudur.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const sirBilen = (st) => ['nermin_sir', 'aylin_sir', 'strabon_sir', 'evran_sir'].some((f) => st.flags.includes(f));
const akilYolu = (st) => st.akil >= st.beden;

export const ERA14 = {
  id: 14,
  name: 'Yakın gelecek',
  place: 'İstanbul',
  region: 'İstanbul, Rize, Kaş ve Şanlıurfa',
  year: '2041',
  currency: 'dijital lira',
  start: 'i1',
  next: null,
  final: true,

  carry(st) {
    st.para = Math.min(30, Math.max(5, st.para));
    st.enerji = Math.max(st.enerji, 70);
    return `Cüzdan artık telefonun içinde: ${st.para} dijital lira. Ve bu, yolculuğunun son çağı.`;
  },

  scenes: {
    // ---------- BÖLÜM 1: İstanbul, 2041 ----------
    i1: {
      bg: 'istanbul2041', hands: 'telefon', day: 1, place: 'İstanbul', year: '2041',
      lines: [
        'Otuz üç yıl. İstanbul\'da bir *sabah*. Boğaz\'da sessiz, elektrikli vapurlar.',
        'Binaların cepheleri güneş panelleriyle *kaplı*. Eski yapıların çoğu depreme karşı güçlendirilmiş.',
        'Telefonundaki yapay zekâ asistanı *Defne* konuşuyor: "Günaydın. Bugün hava 41 derece olacak."',
        '"Bir de... Bir tarihçi seninle *görüşmek* istiyor. Adı Aylin."',
      ],
      choices: [
        { text: 'Aylin\'le buluş', effect: { flags: ['aylin41'] }, to: '@olay', then: 'i2' },
        { text: 'Defne\'ye Aylin\'in kim olduğunu araştırt', effect: { akil: 1, flags: ['aylin41'] }, to: '@olay', then: 'i2' },
      ],
    },
    i2: {
      bg: 'ai_oda', hands: 'uzan', day: 1,
      lines: [
        'Aylin artık yaşlı bir *kadın*. Saçları bembeyaz, gözleri aynı.',
        { when: has('aylin_sir'), text: '"Otuz üç yıldır *sırrını* sakladım," diyor. "Ama artık saklayamayacağız."' },
        { when: not('aylin_sir'), text: '"Sana otuz üç yıl önce bir fotoğraf sormuştum," diyor. "Şimdi *cevabı* biliyorum."' },
        'Ekrana görüntüler *diziliyor*. Yapay zekâ milyonlarca arşiv fotoğrafını taramış.',
        '1855\'te Beyoğlu, 1939\'da Karabük, 1973\'te köprünün üstü, 1999\'da bir enkazın *başı*. Hep aynı yüz.',
      ],
      choices: [
        { text: '"Evet. Benim."', effect: { flags: ['acikladi'] }, to: 'i3a' },
        { text: '"Bu bir benzerlik hatası."', effect: { akil: 1, flags: ['inkar'] }, to: 'i3b' },
        { text: 'Sessizce Aylin\'in elini tut', effect: { beden: 1, flags: ['acikladi'] }, to: 'i3a' },
      ],
    },
    i3a: {
      bg: 'ai_oda', hands: 'uzan', day: 1,
      lines: [
        'Aylin derin bir *nefes* alıyor. "Yapay zekâ bunu yakında başkalarına da gösterecek."',
        '"Seni bulacaklar. Kimi *kurtarıcı* diyecek, kimi tehdit, kimi yalan."',
        '"Ne yapmak *istiyorsun*?"',
      ],
      choices: [
        { text: '"Önce son kez her yeri görmek istiyorum"', effect: { flags: ['veda_yolu'] }, to: 'i4' },
        { text: '"Hikâyemi yazalım. Doğru haliyle."', effect: { akil: 2, flags: ['kitap14'] }, to: 'i4' },
      ],
    },
    i3b: {
      bg: 'ai_oda', hands: 'uzan', day: 1,
      lines: [
        'Aylin gülümsüyor, ama gözleri *üzgün*.',
        '"Yapay zekâ yüzde doksan dokuz emin. Beni kandıramazsın. Ama *başkaları* da soracak."',
        'Ekranda Defne\'nin sesi: "Bu görüntüler herkese açık *arşivlerde*."',
      ],
      choices: [
        { text: '"Bana biraz zaman ver"', effect: { flags: ['veda_yolu'] }, to: 'i4' },
      ],
    },
    i4: {
      bg: 'istanbul2041', hands: 'uzan', day: 2,
      lines: [
        'Kentte bir yapı güçlendirme *şantiyesi*. Başında genç bir mühendis: *Deniz*.',
        { when: has('nermin'), text: 'Deniz, Nermin\'in *torunu*. Elindeki tablette büyükannesinin eski hesap defterleri.' },
        '"Anneannem bu kenti depreme hazırlamak için *ömür* verdi," diyor. "Biz bitiriyoruz."',
        'Robot kollar kolonlara karbon lif *sarıyor*. İşçiler robotları yönetiyor.',
      ],
      choices: [
        { text: 'Robotları yönetmeyi dene', req: akilYolu, reqText: 'Bu iş için yüzyıllardır akıl yolunu seçmiş olmalıydın', effect: { akil: 1, flags: ['robot'] }, to: 'i5' },
        { text: 'Robotların ulaşamadığı köşelerde elle çalış', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['el_isi'] }, to: 'i5' },
        { text: 'Deniz\'e Nermin\'i anlat', show: has('nermin'), effect: { flags: ['deniz_anlatti'] }, to: 'i5' },
      ],
    },
    i5: {
      bg: 'istanbul2041', hands: 'uzan', day: 2,
      lines: [
        { when: has('robot'), text: 'Ekranda kırk robotun *rotası*. Birinin rotası yanlış: Düzeltiyorsun.' },
        { when: has('el_isi'), text: 'Makineler her şeyi yapamıyor. Eski, eğri bir binanın köşesine ancak *insan eli* ulaşıyor.' },
        { when: has('deniz_anlatti'), text: 'Deniz ağlıyor ve gülüyor aynı anda: "Bir gecede dam atılan o *gecekondu*... Sen oradaydın."' },
        'Akşam Aylin\'den bir mesaj: "Yapay zekâ bir *rapor* hazırlamış. Yarın haberlerde olabilirsin."',
      ],
      choices: aksam('i6'),
    },
    i6: {
      bg: 'istanbul2041', hands: 'telefon', day: 3,
      lines: [
        'Sabah her ekranda *yüzün*. "Çağlar boyu yaşayan insan mı? Yoksa yapay zekâ yanılgısı mı?"',
        'Telefonun *susmuyor*. Gazeteciler, bilim insanları, meraklılar, öfkeliler.',
        'Bir canlı yayın *daveti*: "Kendi ağzınızdan anlatın."',
        { when: has('kitap14'), text: 'Aylin: "Kitabı önce yayımlayalım. *Herkes* okuyabilsin, kimse çarpıtamasın."' },
      ],
      choices: [
        { text: 'Canlı yayına çık', effect: { akil: 1, flags: ['yayin'] }, to: 'i7' },
        { text: 'Hiçbir şey söyleme, kentten ayrıl', effect: { beden: 1, flags: ['kacti'] }, to: 'i7' },
        { text: 'Sadece kısa bir mektup yayımla', effect: { akil: 1, flags: ['mektup14'] }, to: 'i7' },
      ],
    },
    i7: {
      bg: 'ai_oda', hands: 'uzan', day: 3,
      lines: [
        { when: has('yayin'), text: 'Stüdyoda ışıklar. Sunucu soruyor: "En çok neyi *özlüyorsunuz*?" Bir an düşünüyorsun: "Unuttuğum yüzleri."' },
        { when: has('kacti'), text: 'Gece bir otobüse biniyorsun. Kimse *tanımıyor*. Ya da tanıyıp susuyor.' },
        { when: has('mektup14'), text: 'Mektubun tek cümle: "Ben sizden biriyim; sadece biraz *uzun* yaşadım."' },
        'Tartışma *sürüyor*. Ama sen artık bir haberin değil, kendi yolunun peşindesin.',
        'Karadeniz\'e, *yeşile* gitmek istiyorsun.',
      ],
      choices: devam('r1', 'Karadeniz\'e git'),
    },

    // ---------- BÖLÜM 2: Rize, 2043 ----------
    r1: {
      bg: 'cay_bahce', hands: 'uzan', day: 4, place: 'Rize', year: '2043',
      lines: [
        'Karadeniz\'in yamaçları. Bulutların arasında *çay* bahçeleri.',
        'Haberler çıktı. Bazıları sana "Ölümsüz" diyor, bazıları "*Yalan*". Buraya kaçtın.',
        'Yaşlı bir çaycı kadın, *Zeynep Teyze*, seni tanımıyor ya da tanımazdan geliyor.',
        '"Hasat zamanı. *Elin* var mı?"',
      ],
      choices: [
        { text: '"Var"', effect: { beden: 1, flags: ['zeynep'] }, to: 'r2' },
        { text: '"Hasat robotlarınız yok mu?"', effect: { akil: 1, flags: ['zeynep'] }, to: 'r2' },
      ],
    },
    r2: {
      bg: 'cay_bahce', hands: 'sepet', day: 4,
      lines: [
        'Yamacın aşağısında *robotlar* sıra sıra filizleri kesiyor. Hızlı, düzgün.',
        'Zeynep Teyze ise *eliyle* topluyor. "Robot iki yaprak bir tomurcuğu bilmez. Hepsini keser."',
        'Sırtındaki sepet *doluyor*. Elleri yeşil.',
        { when: has('bahcivan'), text: 'Van\'daki Urartu bahçeleri aklına geliyor. Kanalın suyu, elma ağaçları. Toprak hep *aynı*.' },
      ],
      choices: [
        { text: 'Zeynep Teyze gibi elle topla', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['el_hasat'] }, to: '@olay', then: 'r3' },
        { text: 'Robota "iki yaprak bir tomurcuk" ayrımını öğret', req: akilYolu, reqText: 'Akıl yolunu seçmiş olmalıydın', effect: { akil: 2, flags: ['robot_ogretti'] }, to: '@olay', then: 'r3' },
        { text: 'İkisini de izle, karşılaştır', effect: { akil: 1 }, to: '@olay', then: 'r3' },
      ],
    },
    r3: {
      bg: 'cay_bahce', hands: 'uzan', day: 4,
      lines: [
        'Akşam Zeynep Teyze\'nin evinde demli bir *çay*. Yağmur camlara vuruyor.',
        '"Haberlerdeki sensin, değil mi?" diyor *birden*.',
        '"Benim dedem Karabük\'te yüksek fırında *çalışmış*. Fatma fırınında."',
        { when: has('fatma'), text: 'Fatma\'nın meşaleyi uzattığı o sabah. Kalabalıkta biri daha mı vardı? Belki *dedesi*.' },
      ],
      choices: [
        { text: '"Evet, benim. Dedeni hatırlıyorum."', effect: { flags: ['zeynep_sir'] }, to: 'r4' },
        { text: '"Sadece bir benzerlik, teyze."', effect: { akil: 1 }, to: 'r4' },
      ],
    },
    r4: {
      bg: 'cay_bahce', hands: 'uzan', day: 4,
      lines: [
        { when: has('zeynep_sir'), text: 'Zeynep Teyze bir süre *susuyor*. Sonra bardağını dolduruyor: "O zaman çok yorgunsundur."' },
        'Pencereden yamaçlar görünüyor. Seller, kaymalar, *sıcaklar*. Karadeniz de değişiyor.',
        '"Toprağa iyi bak," diyor Zeynep Teyze. "O *hatırlar*."',
      ],
      choices: aksam('k1'),
    },

    // ---------- BÖLÜM 3: Kaş, 2045 ----------
    k1: {
      bg: 'kas_kiyi', hands: 'uzan', day: 5, place: 'Kaş', year: '2045',
      lines: [
        'Kaş. Kayalık *burun*. Üç bin üç yüz elli yıl önce bir fırtınada burada batmıştın.',
        'Bir sualtı arkeoloji ekibi *dalış* hazırlığında. Başlarında genç bir arkeolog: *Kaan*.',
        '"Batığın kendisi yıllar önce çıkarıldı," diyor. "Ama yakınında yeni bir *iz* bulduk. Bir taş çapa."',
        { when: has('kulce'), text: 'O fırtınadan sonra kıyıya *yüzüp* bakır parçası kopardığın sabah aklına geliyor.' },
      ],
      choices: [
        { text: 'Ekiple dal', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['daldi'] }, to: 'k2' },
        { text: 'Sualtı robotunu yüzeyden yönet', req: akilYolu, reqText: 'Akıl yolunu seçmiş olmalıydın', effect: { akil: 1, flags: ['daldi', 'robot_dalis'] }, to: 'k2' },
      ],
    },
    k2: {
      bg: 'dalis', hands: 'fener', day: 5,
      lines: [
        'Mavi sessizlik. Işık *azalıyor*. Kırk metre.',
        'Kumun içinde delikli, ağır bir taş: Bir *çapa*. Üstünde yosun, mercan.',
        'Tayfaların fırtınada birer birer denize attığı çapalardan *biri*.',
        { when: has('diptik'), text: 'O gece göğsüne bastırdığın balmumlu tablet... *Batığın* en ünlü buluntularından biri oldu.' },
        { when: has('muhur'), text: 'Avucuna aldığın altın mühür... Şimdi bir *müzede*, camın arkasında.' },
      ],
      choices: [
        { text: 'Çapaya elini koy', effect: { flags: ['capa'] }, to: '@olay', then: 'k3' },
        { text: 'Kaan\'a çapanın hangi taraftan atıldığını göster', effect: { akil: 1, flags: ['capa'] }, to: '@olay', then: 'k3' },
      ],
    },
    k3: {
      bg: 'kas_kiyi', hands: 'uzan', day: 6,
      lines: [
        'Yüzeye çıkıyorsun. Kaan sana *tuhaf* tuhaf bakıyor.',
        '"Çapanın yerini *bildin*," diyor. "Ekipmanlar bile bulamadan."',
        { when: sirBilen, text: 'Bu sırrı paylaştığın insanları *hatırlıyorsun*. Hiçbiri seni ele vermedi.' },
        '"Haberlerdeki sensin," diyor Kaan. Bu bir *soru* değil.',
      ],
      choices: [
        { text: '"Bu batıkta ben vardım."', effect: { flags: ['kaan_sir'] }, to: 'k4' },
        { text: '"Şanslı bir tahmin."', effect: { akil: 1 }, to: 'k4' },
      ],
    },
    k4: {
      bg: 'kas_kiyi', hands: 'uzan', day: 6,
      lines: [
        { when: has('kaan_sir'), text: 'Kaan oturuyor. Uzun uzun *denize* bakıyor. "Kaptanın adı neydi?" diye soruyor sonunda. "İli-milku." Not alıyor.' },
        'Akşam güneşi kayaların üstünde *kızarıyor*. Aynı kayalar, aynı ışık.',
        'Bir mesaj: Aylin. "Göbeklitepe\'den *davet* geldi. Arkeologlar seninle konuşmak istiyor."',
        'Her şeyin başladığı yer.',
      ],
      choices: aksam('g1', 'Son yolculuğa hazırlan'),
    },

    // ---------- BÖLÜM 4: Göbeklitepe, 2049 ----------
    g1: {
      bg: 'gobekli2049', hands: 'uzan', day: 7, place: 'Göbeklitepe', year: '2049',
      lines: [
        'Şanlıurfa\'nın kuzeyinde, aynı *tepe*. Aynı bozkır, aynı rüzgâr.',
        'Kazı alanının üstünde dev, beyaz bir *koruma çatısı*. Altında taş halkalar, T biçimli sütunlar.',
        'Sütunların üstünde tilki, yaban domuzu, akbaba, yılan. *Hepsini* tanıyorsun.',
        { when: has('simge_tilki'), text: 'Bir sütundaki *tilki*... O kabartmayı sen seçmiştin.' },
        { when: has('simge_akbaba'), text: 'Bir sütundaki *akbaba*... O kabartmayı sen seçmiştin.' },
        { when: has('simge_domuz'), text: 'Bir sütundaki *yaban domuzu*... O kabartmayı sen seçmiştin.' },
        'On bir bin altı yüz elli yıl. *Döndün*.',
      ],
      choices: [
        { text: 'Halkaların arasındaki yürüyüş yoluna in', effect: { beden: 1 }, to: '@olay', then: 'g2' },
        { text: 'Ziyaretçi merkezindeki bilgi panolarını oku', effect: { akil: 1 }, to: '@olay', then: 'g2' },
      ],
    },
    g2: {
      bg: 'gobekli2049', hands: 'uzan', day: 7,
      lines: [
        'Arkeologlar seni *bekliyor*. Aylin de orada, tekerlekli sandalyede.',
        'Baş arkeolog bir sütunu *gösteriyor*: "Bu sütunun nasıl taşındığını hâlâ tartışıyoruz."',
        { when: (st) => ['cakil', 'omuz', 'sarki'].some((f) => st.flags.includes(f)), text: 'Ellerin *hatırlıyor*: Çakıl döşenmiş yol, ipler, elli kişinin aynı anda çekişi, bir şarkının ritmi.' },
        '"Sen... *gördün* mü?"',
      ],
      choices: [
        { text: 'Anlat: Kütükler, ipler, şarkılar', effect: { akil: 1, flags: ['anlatti_gobekli'] }, to: 'g3' },
        { text: '"Bazı sırlar taşın olsun"', effect: { flags: ['sakladi_gobekli'] }, to: 'g3' },
      ],
    },
    g3: {
      bg: 'gobekli2049', hands: 'uzan', day: 7,
      lines: [
        { when: has('anlatti_gobekli'), text: 'Arkeologlar *sessiz*. Biri ağlıyor. Biri hızla not alıyor. Aylin gülümsüyor.' },
        { when: has('sakladi_gobekli'), text: 'Baş arkeolog başını *sallıyor*. "Haklısın. Belki de bazı soruların cevabı olmamalı."' },
        'Akşam oluyor. Herkes gidiyor. Sen *kalıyorsun*.',
        'Bekçi göz yumuyor. Bu gece tepe *senin*.',
      ],
      choices: aksam('g4', 'Son gece'),
    },
    g4: {
      bg: 'gobekli_gece', hands: 'dinlen', day: 8,
      lines: [
        'Gece. Koruma çatısının ötesinde *yıldızlar*. Samanyolu.',
        'Küçük bir *ateş* yakıyorsun. Kurallara aykırı. Ama bu ateşi binlerce yıl önce de burada yakmıştın.',
        'Alevlerin içinde *yüzler*: Kaya, Enlil-bani, İli-milku, Puduhepa, Thales, Krates, Galenos...',
        '...Theodora, Ahi Evran, Müteferrika, Hagop usta, Fatma, Nermin, Aylin.',
      ],
      choices: [{ text: 'Ateşe bak', to: 'g5' }],
    },
    g5: {
      bg: 'gobekli_gece', hands: 'dinlen', day: 8,
      lines: [
        { when: has('soyad_caglar'), text: 'Kimliğinde yazan soyadı: *Çağlar*. Ne kadar doğruymuş.' },
        { when: has('soyad_olmez'), text: 'Kimliğinde yazan soyadı: *Ölmez*. Nüfus memuru gülmüştü.' },
        { when: has('arsiv'), text: 'Yazdığın dosya artık bir *kitap*. Başlığı: "Çağlar." Aylin onu yayına hazırladı.' },
        { when: (st) => st.akil > st.beden, text: 'Yüzyıllar boyunca çoğunlukla *aklına* yaslandın. Çivi yazısından yapay zekâya.' },
        { when: (st) => st.beden > st.akil, text: 'Yüzyıllar boyunca çoğunlukla *bedenine* yaslandın. Taş baltadan robotların ulaşamadığı köşelere.' },
        { when: (st) => st.akil === st.beden, text: 'Yüzyıllar boyunca aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Şafağı bekle', to: 'g6' }],
    },
    g6: {
      bg: 'gobekli2049', hands: 'uzan', day: 9,
      lines: [
        'Şafak. Bozkırın üstünde *ilk ışık*. Tıpkı ilk sabah gibi.',
        'Yürüyüş yolunda küçük bir *çocuk*. Erken gelen bir ziyaretçi ailenin kızı.',
        'Bir sütuna bakıyor. Sonra sana: "Bu taşları kim *dikti*?"',
        'Binlerce yıllık yolculuğun son sorusu bu.',
      ],
      choices: [
        { text: '"İnsanlar. Senin gibi, benim gibi. Birlikte."', effect: { akil: 1, flags: ['son_birlikte'] }, to: 'g7' },
        { text: 'Yerden küçük bir çakmaktaşı alıp ona ver', effect: { beden: 1, flags: ['son_tas'] }, to: 'g7' },
        { text: '"Ben diktim." Ve gülümse.', effect: { flags: ['son_ben'] }, to: 'g7' },
      ],
    },
    g7: {
      bg: 'gobekli2049', hands: 'dinlen', day: 9,
      lines: [
        { when: has('son_birlikte'), text: 'Çocuk düşünüyor. "*Birlikte*," diye tekrarlıyor. Sonra annesine koşuyor: "Biliyor musun, bunları birlikte dikmişler!"' },
        { when: has('son_tas'), text: 'Çocuk çakmaktaşını *avucuna* alıyor. Keskin, parlak. "Bununla ne yapılır?" "Her şey," diyorsun.' },
        { when: has('son_ben'), text: 'Çocuk kahkahayla *gülüyor*. "Sen o kadar yaşlı değilsin ki!" Haklı. Hiç olmadın.' },
        'Güneş yükseliyor. Sütunların gölgeleri *kısalıyor*.',
        'Ve sen, çağlar boyu insan, yürümeye *devam* ediyorsun.',
      ],
      choices: [{ text: 'Yolculuğu tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_sicak: {
      bg: 'istanbul2041', hands: 'uzan',
      lines: [
        'Bir *sıcak hava* uyarısı. Sokakta yaşlı bir adam bir banka çökmüş.',
        'Kentin serinletme *merkezleri* doldu.',
      ],
      choices: [
        { text: 'Adamı gölgeye taşı, su ver', effect: { beden: 1 }, to: '@don' },
        { text: 'Defne\'ye en yakın serinletme merkezini sor, yönlendir', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_drone: {
      bg: 'istanbul2041', hands: 'telefon',
      lines: [
        'Pencerenin önünde bir *dron* havada asılı. Bir muhabirin kamerası.',
        '"Ölümsüz adam! Bir *açıklama*!"',
      ],
      choices: [
        { text: 'Perdeyi kapat', effect: { enerji: 5 }, to: '@don' },
        { text: 'Kameraya el salla', effect: { flags: ['el_salladi'] }, to: '@don' },
      ],
    },
    e_ai_soru: {
      bg: 'ai_oda', hands: 'telefon',
      lines: [
        'Defne bir gece *soruyor*: "Ben de bir gün ölümsüz olacak mıyım?"',
        '"Sunucularım kapanırsa ben ne *olurum*?"',
      ],
      choices: [
        { text: '"Hatırlanırsan yaşarsın"', effect: { akil: 1 }, to: '@don' },
        { text: '"Bunu ben de bilmiyorum"', effect: { enerji: 5 }, to: '@don' },
      ],
    },
    e_sel: {
      bg: 'cay_bahce', hands: 'uzan',
      lines: [
        'Gece şiddetli *yağmur*. Dere taşıyor. Aşağı mahalle tehlikede.',
        'Sirenler *çalıyor*.',
      ],
      choices: [
        { text: 'Tahliyeye yardım et', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: '@don' },
        { text: 'Mahallenin yaşlılarını tek tek telefonla ara', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_horon: {
      bg: 'cay_bahce', hands: 'uzan',
      lines: [
        'Bir düğünde *horon*. Kemençe çılgınca çalıyor.',
        'Bir genç seni kolundan *çekiyor*: "Gel!"',
      ],
      choices: [
        { text: 'Horona katıl', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Kemençenin yapısını sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_turist: {
      bg: 'kas_kiyi', hands: 'uzan',
      lines: [
        'Bir turist grubu seni *tanıyor*. Telefonlar havada.',
        '"Bir *fotoğraf*! Lütfen!"',
      ],
      choices: [
        { text: 'Fotoğraf çektir, gülümse', effect: { enerji: 5 }, to: '@don' },
        { text: 'Kibarca reddet, uzaklaş', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kaplumbaga: {
      bg: 'kas_kiyi', hands: 'uzan',
      lines: [
        'Kumsalda deniz *kaplumbağası* yuvaları. Yavrular denize doğru yürüyor.',
        'Bir martı *pikeye* geçiyor.',
      ],
      choices: [
        { text: 'Martıyı kovala', effect: { beden: 1 }, to: '@don' },
        { text: 'Yavruları gölgenle koru, yollarını açık tut', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_urfa: {
      bg: 'gobekli2049', hands: 'sepet',
      lines: [
        'Şanlıurfa\'da bir çarşıda isot *kokusu*. Bir usta ciğer şişleri diziyor.',
        '"Gel otur, *misafirsin*," diyor. Ahi sofraları aklına geliyor.',
      ],
      choices: [
        { text: 'Otur, ye', effect: { enerji: 20 }, to: '@don' },
        { text: 'Ustaya isotun nasıl kurutulduğunu sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_yildiz: {
      bg: 'gobekli_gece', hands: 'uzan',
      lines: [
        'Gökyüzünde bir *uydu* katarı geçiyor. Sıra sıra ışıklar.',
        'Bin yıllar önce aynı göğe bakıp *yıldız* saymıştın.',
      ],
      choices: [
        { text: 'Uyduları say', effect: { akil: 1 }, to: '@don' },
        { text: 'Gözlerini kapat, rüzgârı dinle', effect: { enerji: 10 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'sicak', start: 'e_sicak', when: (st) => st.yer === 'İstanbul' },
    { id: 'drone', start: 'e_drone', when: (st) => st.yer === 'İstanbul' },
    { id: 'ai_soru', start: 'e_ai_soru', when: (st) => st.yer === 'İstanbul' },
    { id: 'sel', start: 'e_sel', when: (st) => st.yer === 'Rize' },
    { id: 'horon', start: 'e_horon', when: (st) => st.yer === 'Rize' },
    { id: 'turist', start: 'e_turist', when: (st) => st.yer === 'Kaş' },
    { id: 'kaplumbaga', start: 'e_kaplumbaga', when: (st) => st.yer === 'Kaş' },
    { id: 'urfa', start: 'e_urfa', when: (st) => st.yer === 'Göbeklitepe' },
    { id: 'yildiz', start: 'e_yildiz', when: (st) => st.yer === 'Göbeklitepe' },
  ],
};

ERA14.hub = {
  intro: (st) => st.yer === 'Göbeklitepe'
    ? ['Bozkırda gün *batıyor*. Tepe kızıl.', 'Rüzgâr sütunların arasından *ıslık* çalıyor.']
    : st.yer === 'Rize'
      ? ['Yamaçlara sis *iniyor*. Çay kokusu.', 'Karadeniz karanlıkta *uğulduyor*.']
      : st.yer === 'Kaş'
        ? ['Gün batımı kayaların üstünde *kızıl*.', 'Deniz sakin. Adalar *karanlıkta*.']
        : ['Akşam. Kentin ekranları *yanıyor*.', 'Boğaz\'da elektrikli vapurlar sessizce *kayıyor*.', 'Defne fısıldıyor: "Dinlenmelisin."'],
  acts: [
    { id: 'ders', text: 'Bir çocuğa çevrimiçi tarih dersi ver', effect: { akil: 1, para: 1 }, hands: 'telefon',
      res: [['Konu: *Hititler*. Çocuk soruyor: "Gördün mü yani?"', 'Gülümsüyorsun.'], ['Konu: *Lidya*. "İlk parayı kim bastı?"', '"Bir çekiç," diyorsun.']] },
    { id: 'zanaat', text: 'Bir atölyede el işi yap', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'cekic',
      res: [['Ahşaptan bir *kâse* oyuyorsun.', 'Makineler yapabilir. Ama bu senin.'], ['Bir deri cüzdan *dikiyorsun*.', 'Ahi Evran\'ın debbağhanesi aklına geliyor.']] },
    { id: 'yuruyus', text: 'Uzun bir yürüyüşe çık', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 },
      res: [['Adımların *ritmi*. Binlerce yıldır aynı.', 'Kafan boşalıyor.'], ['Yolda bir *köpek* sana katılıyor.', 'Her çağda bir köpek.']] },
    { id: 'yazmak', text: 'Anılarını yaz', effect: { akil: 1, flags: ['arsiv'] }, hands: 'telefon',
      res: [['Bir bölüm *bitirdin*: Çatalhöyük.', 'Damların üstünde yürümek.'], ['Bir bölüm daha: *Konstantinopolis*.', 'Kubbenin altında yalnızlık.']] },
    { id: 'cay', show: (st) => st.yer === 'Rize', text: 'Gece çay fabrikasında yaprak serme', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'sepet',
      res: [['Yapraklar *soluyor*, kokusu yoğunlaşıyor.', 'Zeynep Teyze bir bardak uzatıyor.'], ['Makineler kurutuyor, sen *ayıklıyorsun*.', 'Sabah çay hazır.']] },
    { id: 'dal', show: (st) => st.yer === 'Kaş', text: 'Gece dalışı yap', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, hands: 'fener',
      res: [['Fenerin ışığında bir *ahtapot*.', 'Rengini değiştirip kayboluyor.'], ['Dipte bir amfora *kırığı*.', 'Kaan\'a bırakıyorsun.']] },
    { id: 'kazi', show: (st) => st.yer === 'Göbeklitepe', text: 'Kazı ekibine gönüllü yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, akil: 1 }, hands: 'firca',
      res: [['Fırçayla toprağı *kaldırıyorsun*. Bir taş kabartma beliriyor.', 'Bir yılan.'], ['Elekte küçük bir çakmaktaşı *ucu*.', 'Kimin yaptığını biliyor musun?']] },
    { id: 'robot', show: (st) => st.yer === 'İstanbul', text: 'Robot atölyesinde gençlere ders ver', effect: { akil: 1, para: 1 },
      res: [['Gençler bir robot kola *kalem* tutturuyor.', 'Robot ilk harfini yazıyor: A.'], ['"Robotlar bizi geçecek mi?" diye soruyor biri.', '"Siz soru sordukça hayır," diyorsun.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda ilk *ateşi* görüyorsun.', 'Dinlendin.']] },
  ],
};
