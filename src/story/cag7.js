// ÇAĞ 7 — Bizans: Konstantinopolis (MS 531-542)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - Justinianos 527'de imparator oldu; eşi Theodora'nın babası Hipodrom'da Yeşiller'in ayı bakıcısıydı.
// - Hipodrom'da araba yarışları; seyirciler Maviler ve Yeşiller diye iki büyük taraftar grubuna ayrılır.
// - Justinianos'un hukukçuları eski Roma yasalarını derleyip tek bir yasa külliyatına dönüştürür (529-534).
// - Ocak 532 Nika ayaklanması: Maviler ve Yeşiller birleşip "Nika!" (Yen!) diye bağırır, kent yanar,
//   eski Ayasofya kül olur, Hypatios imparator ilan edilir. Theodora kaçmayı reddeder. Narses Mavilere altın dağıtır,
//   Belisarios'un askerleri Hipodrom'da yaklaşık 30.000 kişiyi öldürür.
// - Yeni Ayasofya 40 gün sonra başlar, Trallesli (Aydın) Anthemios ve Miletli İsidoros'un yönetiminde
//   beş yılı biraz aşkın sürede, 537'de tamamlanır. Justinianos'un "Süleyman, seni geçtim!" dediği anlatılır.
//   Kubbe 557-558 depremlerinden sonra kısmen çöker, yeniden yapılır.
// - Yerebatan (Bazilika) Sarnıcı aynı yıllarda yapılır; eski yapılardan toplanan sütunlar kullanılır.
// - 541'de veba Mısır'dan tahıl gemileriyle gelir; 542'de kentte günde binlerce kişi ölür. İmparator da hastalanır, iyileşir.
// Karakter adları (Yorgi, Eudokia, Stefanos) kurgu, dönemin ad kalıplarına uygundur.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const yazar = (st) => st.flags.includes('yazi');
const veba = (st) => st.flags.includes('veba_basladi');

export const ERA7 = {
  id: 7,
  name: 'Bizans',
  place: 'Konstantinopolis',
  region: 'İstanbul',
  year: 'MS 531',
  currency: 'follis',
  start: 'k1',
  next: { name: 'Selçuklu ve Ahilik', place: 'Kayseri', year: '1205' },

  carry(st) {
    const eski = st.para;
    st.para = Math.min(25, Math.max(4, eski));
    st.enerji = Math.max(st.enerji, 70);
    return `Dinarların bronz follise çevrildi: ${st.para} follis.`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Kent ----------
    k1: {
      bg: 'mese', hands: 'uzan', day: 1, place: 'Konstantinopolis', year: 'MS 531',
      lines: [
        'Gözlerini iki denizin arasındaki bir *kentte* açıyorsun.',
        'Sütunlu, kemerli, upuzun bir cadde: *Mese*. Dükkânlar, kiliseler, saraylar.',
        'Burası *Konstantinopolis*. Roma\'nın yeni başkenti, dünyanın en kalabalık kenti.',
        'Herkes aynı şeyi konuşuyor: Yarınki *araba yarışı*.',
      ],
      choices: [
        { text: 'Hipodrom\'a git, ahırlarda iş ara', effect: { beden: 1, flags: ['ahirci'] }, to: 'k2a' },
        { text: 'Saray yakınındaki hukukçuların yanına git', effect: { akil: 1 }, to: 'k2b' },
        { text: 'Bir fırında çırak ol', effect: { para: 1, flags: ['firinci'] }, to: 'k2c' },
      ],
    },
    k2a: {
      bg: 'hipodrom', hands: 'yular', day: 1,
      lines: [
        'Hipodrom *devasa*. Ortasında Mısır\'dan getirilmiş taş bir dikilitaş.',
        'Dört atlı arabalar pistte *antrenman* yapıyor.',
        'Seyis *Yorgi* atın boynunu okşuyor: "Mavi misin, *Yeşil* mi?"',
        '"Burada herkes birinden yana. Ortası *yok*."',
      ],
      choices: [
        { text: '"Maviyim"', effect: { flags: ['mavi'] }, to: '@aksam', then: 'k3' },
        { text: '"Yeşilim"', effect: { flags: ['yesil'] }, to: '@aksam', then: 'k3' },
        { text: '"Ben atlardan yanayım"', effect: { akil: 1 }, to: '@aksam', then: 'k3' },
      ],
    },
    k2b: {
      bg: 'saray_biz', hands: 'kitap', day: 1,
      lines: [
        'Bir salonda onlarca hukukçu, yüz yıllık *yasaları* masalara yığmış.',
        'İmparator *Justinianos* istiyor ki Roma\'nın bütün yasaları tek bir kitapta toplansın.',
        'Baş hukukçu *Stefanos*: "Çelişenleri ayıkla, tekrarları sil, kalanını *düzenle*."',
        { when: has('yasa'), text: 'Hattuşa\'daki yasa tabletleri aklına geliyor. Yasalar hep *yeniden* yazılır.' },
      ],
      choices: [
        { text: 'Kâtip olarak iş iste', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 1, flags: ['hukukcu'] }, to: '@aksam', then: 'k3' },
        { text: 'Tomar taşıyıcısı ol', effect: { beden: 1, flags: ['hukukcu'] }, to: '@aksam', then: 'k3' },
      ],
    },
    k2c: {
      bg: 'mese', hands: 'sepet', day: 1,
      lines: [
        'Fırıncı *Eudokia* sabahın karanlığında hamur yoğuruyor.',
        'Devlet her gün halka *bedava* ekmek dağıtıyor. Fırınlar gece gündüz yanıyor.',
        '"Ekmek yoksa kent *ayaklanır*," diyor Eudokia. "Bunu imparator da bilir."',
      ],
      choices: [{ text: 'Hamura gir', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@aksam', then: 'k3' }],
    },
    k3: {
      bg: 'hipodrom', hands: 'uzan', day: 2,
      lines: [
        'Yarış günü. Hipodrom\'da *on binlerce* insan.',
        'İmparator locasında *Justinianos*. Yanında imparatoriçe *Theodora*.',
        'Kalabalık fısıldıyor: "Theodora\'nın babası burada *ayı* bakıcısıydı. Annesi akrobat."',
        'Arabalar dönemeci *alıyor*. Yer sarsılıyor.',
      ],
      choices: [
        { text: 'Mavilerin arabasına bağır', effect: { enerji: 5, flags: ['mavi'] }, to: 'k4' },
        { text: 'Yeşillerin arabasına bağır', effect: { enerji: 5, flags: ['yesil'] }, to: 'k4' },
        { text: 'Seyirciyi izle: Burada asıl yarış başka', effect: { akil: 1 }, to: 'k4' },
      ],
    },
    k4: {
      bg: 'hipodrom', hands: 'uzan', day: 2,
      lines: [
        'Yarış bitiyor. Ama kalabalık *dağılmıyor*.',
        'Taraftarlar imparatora *bağırıyor*: Vergiler çok ağır! Vali hırsız!',
        'Muhafızlar iki taraftan da adamlar *yakalıyor*. Asılacaklar.',
      ],
      choices: aksam('k5'),
    },
    k5: {
      bg: 'mese', hands: 'uzan', day: 3, year: 'MS 532',
      lines: [
        'Ocak ayı. İdam edilenlerden ikisi, darağacı *kırılınca* düşüp kurtuldu. Biri Mavi, biri Yeşil.',
        'Rahipler onları bir kiliseye *sakladı*. Halk affedilmelerini istiyor.',
        'İmparator *susuyor*.',
        { when: has('hukukcu'), text: 'Stefanos endişeli: "Yasa açık. Ama kalabalık *yasa* dinlemez."' },
      ],
      choices: [
        { text: 'Kiliseye yiyecek götür', effect: { beden: 1, flags: ['kilise'] }, to: '@olay', then: 'k6' },
        { text: 'Komşulara "Evde kalın" de', effect: { akil: 1, flags: ['uyardi7'] }, to: '@olay', then: 'k6' },
        { text: 'Hipodrom\'a git, ne olacağını gör', effect: { enerji: -5 }, to: '@olay', then: 'k6' },
      ],
    },

    // ---------- BÖLÜM 2: Nika ----------
    k6: {
      bg: 'hipodrom', hands: 'uzan', day: 4,
      lines: [
        'Yeni bir yarış. Ama bu kez Maviler ve Yeşiller *aynı* şeyi bağırıyor.',
        '"*Nika!* Nika!" Yen! Yen!',
        'Ama yenilecek olan rakip araba değil. *İmparator*.',
        'Kalabalık Hipodrom\'dan taşıyor. Ellerinde *meşaleler*.',
      ],
      choices: [
        { text: 'Kalabalığa katıl', effect: { beden: 1, flags: ['nika'] }, to: 'n1a' },
        { text: 'Fırına koş, Eudokia\'yı koru', show: has('firinci'), effect: { beden: 1, flags: ['eudokia'] }, to: 'n1b' },
        { text: 'Ahırlara koş, atları çıkar', show: has('ahirci'), cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['atlar'] }, to: 'n1b' },
        { text: 'Saraydaki tomarları kurtar', show: has('hukukcu'), effect: { akil: 1, flags: ['tomarlar'] }, to: 'n1b' },
        { text: 'Kendini kurtar, evine kapan', to: 'n1b' },
      ],
    },
    n1a: {
      bg: 'yangin_sehir', hands: 'mesale', day: 4,
      lines: [
        'Kalabalık hapishaneyi *açıyor*. Sonra valinin evini yakıyor.',
        'Rüzgâr alevleri *büyütüyor*. Sokaklar yanıyor.',
        'Biri bağırıyor: "Büyük *kilise* yanıyor!"',
        'Elindeki meşale birden *ağırlaşıyor*.',
      ],
      choices: [
        { text: 'Meşaleyi bırak, kiliseye koş', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'n2' },
        { text: 'Kalabalıkla yürümeye devam et', effect: { flags: ['yakti'] }, to: 'n2' },
      ],
    },
    n1b: {
      bg: 'yangin_sehir', hands: 'uzan', day: 4,
      lines: [
        { when: has('eudokia'), text: 'Eudokia\'yla fırının kapısını *kapatıyorsunuz*. Dışarıda alevler.' },
        { when: has('atlar'), text: 'Atları birer birer *çıkarıyorsun*. Gözleri korkudan bembeyaz.' },
        { when: has('tomarlar'), text: 'Kucak kucak tomarı sarayın *taş* odasına taşıyorsun.' },
        'Kent *yanıyor*. Gökyüzü gece gündüz kızıl.',
        'Biri bağırıyor: "Büyük *kilise* yanıyor! Ayasofya!"',
      ],
      choices: [{ text: 'Kiliseye bak', to: 'n2' }],
    },
    n2: {
      bg: 'yangin_sehir', hands: 'yok', day: 5,
      lines: [
        'Eski Ayasofya\'nın ahşap çatısı *çöküyor*.',
        'Yüz yıllık kilise, birkaç saatte *kül* oluyor.',
        'Kalabalık yeni bir imparator ilan ediyor: Yaşlı bir soylu, *Hypatios*.',
        'Sarayda Justinianos *kaçmaya* hazırlanıyor. Liman gemileri bekliyor.',
      ],
      choices: [
        { text: 'Saraya git', effect: { akil: 1 }, to: 'n3' },
        { text: 'Yangını söndürmeye çalış', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['itfaiye'] }, to: 'n3' },
      ],
    },
    n3: {
      bg: 'saray_biz', hands: 'uzan', day: 5,
      lines: [
        'Saray salonunda imparator, komutanlar ve *Theodora*.',
        'Herkes kaçmayı konuşurken Theodora *ayağa* kalkıyor.',
        '"Kaçmak kolay. Gemiler hazır, deniz açık. Ama kaçan, bir daha *imparator* olmaz."',
        '"Bana sorarsanız, mor imparator kaftanı güzel bir *kefendir*. Ben kalıyorum."',
      ],
      choices: [
        { text: 'Hayranlıkla dinle', effect: { akil: 1 }, to: 'n4' },
        { text: 'Komutanların yüzüne bak: Bu sözler kan dökecek', effect: { akil: 1, flags: ['sezdi'] }, to: 'n4' },
      ],
    },
    n4: {
      bg: 'hipodrom', hands: 'uzan', day: 6,
      lines: [
        'Komutan *Narses* bir kese altınla Hipodrom\'a giriyor. Mavilerin başlarına *dağıtıyor*.',
        '"Hypatios bir Yeşil dostu. Siz Maviler ona mı *kalacaksınız*?"',
        'Maviler birden *çıkıp* gidiyor. Hipodrom\'da Yeşiller yalnız kalıyor.',
        'Sonra kapılardan askerler *giriyor*. Belisarios\'un askerleri.',
      ],
      choices: [
        { text: 'İnsanları yan kapıya yönlendir', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['kurtardi'] }, to: 'n5a' },
        { text: 'Kaç', to: 'n5b' },
        { text: 'Kalabalığın içinde yere çök', show: has('nika'), to: 'n5b' },
      ],
    },
    n5a: {
      mood: 'dark',
      bg: 'hipodrom', hands: 'uzan', day: 6,
      lines: [
        'Bir avuç insanı dar bir geçitten *çıkarıyorsun*.',
        'Arkanda çığlıklar. Sonra *sessizlik*.',
        'O gün Hipodrom\'da yaklaşık *otuz bin* kişi öldürüldü.',
      ],
      choices: [{ text: 'Sabahı bekle', to: 'n6' }],
    },
    n5b: {
      mood: 'dark',
      bg: 'mese', hands: 'yok', day: 6,
      lines: [
        'Sokaklarda koşuyorsun. Arkanda *çığlıklar*.',
        'Sonra kent *sessizleşiyor*. Korkunç bir sessizlik.',
        'O gün Hipodrom\'da yaklaşık *otuz bin* kişi öldürüldü.',
      ],
      choices: [{ text: 'Sabahı bekle', to: 'n6' }],
    },
    n6: {
      bg: 'yangin_sehir', hands: 'dinlen', day: 7,
      lines: [
        'Ayaklanma *bitti*. Hypatios idam edildi.',
        { when: has('yakti'), text: 'Ellerindeki is kokusu bir türlü *çıkmıyor*.' },
        { when: has('kurtardi'), text: 'Kurtardığın bir kadın sabah kapını *çalıyor*. Elinde ekmek.' },
        'Kentin yarısı kül. Ölümsüz olmak, en çok böyle günlerde *ağır*.',
      ],
      choices: aksam('a1'),
    },

    // ---------- BÖLÜM 3: Ayasofya ve sarnıç ----------
    a1: {
      bg: 'ayasofya_insa', hands: 'uzan', day: 8,
      lines: [
        'Yangından *kırk gün* sonra imparator yeni bir kilise istiyor.',
        'Dünyada benzeri olmayan bir *kubbe*. Gökten sarkıyormuş gibi.',
        'İki mimar çağrıldı: Trallesli *Anthemios* ve Miletli *İsidoros*.',
        'İkisi de Anadolulu. İkisi de mimardan çok *matematikçi*.',
      ],
      choices: [
        { text: 'Anthemios\'a hesaplarında yardım et', effect: { akil: 2, flags: ['mimar'] }, to: 'a2a' },
        { text: 'Tuğla ve harç taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, para: 2, flags: ['usta'] }, to: 'a2b' },
        { text: 'Sarnıç inşaatına git', effect: { flags: ['sarnic'] }, to: 'a2c' },
      ],
    },
    a2a: {
      bg: 'ayasofya_insa', hands: 'kalem', day: 8,
      lines: [
        'Anthemios parşömene daireler, *üçgenler* çiziyor.',
        '"Kare bir zeminin üstüne yuvarlak bir kubbe nasıl *oturur*?"',
        'Dört köşede eğri üçgenler: *Pandantif*. Yük köşelerden ayaklara iniyor.',
        { when: has('kure'), text: 'Krates\'in küresini hatırlıyorsun. Bir küre, bir kareye *böyle* oturur.' },
      ],
      choices: devam('a3'),
    },
    a2b: {
      bg: 'ayasofya_insa', hands: 'kerpic', day: 8,
      lines: [
        'On bin işçi. Gece gündüz *çalışılıyor*.',
        'Tuğlalar kalın harçla *diziliyor*. İskeleler göğe tırmanıyor.',
        { when: has('debbag'), text: 'Kolların, Bergama\'da deri kazıdığın günlerden beri bu kadar *yorulmamıştı*.' },
      ],
      choices: devam('a3'),
    },
    a2c: {
      bg: 'sarnic', hands: 'fener', day: 8,
      lines: [
        'Yerin altında *karanlık* bir orman: Yüzlerce sütun.',
        'Sütunlar kentin dört yanındaki eski yapılardan *toplanmış*. Hiçbiri birbirine benzemiyor.',
        'Birinin dibine, ters çevrilmiş bir *Medusa* başı konmuş.',
        '"Kuşatmada kent *susuz* kalmasın," diyor ustabaşı.',
      ],
      choices: [
        { text: 'Medusa başını düzeltmeyi öner', effect: { akil: 1 }, to: 'a3' },
        { text: 'Su kanallarını temizle', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, to: 'a3' },
      ],
    },
    a3: {
      bg: 'ayasofya_insa', hands: 'uzan', day: 9, year: 'MS 535',
      lines: [
        'Yıllar *geçiyor*. Kubbenin kemeri yükseliyor.',
        'Bir sabah iskelenin tepesinde bir *çatırtı*. Kemerlerden biri esniyor.',
        'İşçiler *kaçışıyor*. Ustabaşı bağırıyor.',
      ],
      choices: [
        { text: 'İsidoros\'a koş: Ayaklar daha kalın olmalı', show: has('mimar'), effect: { akil: 2, flags: ['kurtardi_kubbe'] }, to: 'a4' },
        { text: 'İskeleye tırman, desteği yerleştir', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['kurtardi_kubbe'] }, to: 'a4' },
        { text: 'İşçileri aşağı indir', effect: { beden: 1 }, to: 'a4' },
      ],
    },
    a4: {
      bg: 'ayasofya_insa', hands: 'uzan', day: 9,
      lines: [
        { when: has('kurtardi_kubbe'), text: 'Kemer *tutuldu*. İsidoros sırtını sıvazlıyor.' },
        'Harç kurumadan üstüne yük bindirilmiş. Ustalar *bekleyecek*.',
        'Anthemios: "Taş sabırsızlığı *affetmez*."',
      ],
      choices: aksam('a5'),
    },
    a5: {
      bg: 'ayasofya', hands: 'yok', day: 10, year: 'MS 537',
      lines: [
        'Aralık ayı. *Beş yıl* ve birkaç ay sonra kilise hazır.',
        'İçeri giriyorsun. Kubbe *havada* asılı gibi. Kırk pencereden ışık süzülüyor.',
        'Duvarlar renkli *mermerle*, tavan altın mozaiklerle kaplı.',
        'İmparator içeri giriyor, susuyor. Sonra fısıldıyor: "Süleyman, seni *geçtim*."',
      ],
      choices: [
        { text: 'Kubbeye bak, sus', effect: { enerji: 15 }, to: 'a6' },
        { text: 'Işığın hangi saatte nereye düştüğünü hesapla', effect: { akil: 1 }, to: 'a6' },
      ],
    },
    a6: {
      bg: 'ayasofya', hands: 'uzan', day: 10,
      lines: [
        'Bu kubbe *bin yıl* boyunca dünyanın en büyüğü olacak.',
        'Bir gün bu yapı başka bir dinin *ibadethanesi* olacak. Sonra bir müze, sonra yine ibadethane.',
        'Ama kubbe *hep* orada olacak.',
        { when: has('usta'), text: 'Tuğlalardan birini sen koydun. Hangisi olduğunu *bilmiyorsun*. Ama oradasın.' },
      ],
      choices: devam('v1'),
    },

    // ---------- BÖLÜM 4: Veba ----------
    v1: {
      bg: 'mese', hands: 'uzan', day: 11, year: 'MS 542',
      lines: [
        'Mısır\'dan tahıl gemileri geliyor. Ambarlara *fareler* iniyor.',
        'Önce liman mahallesinde ateşler. Sonra koltuk altlarında *şişlikler*.',
        'Sonra her yerde. *Veba*.',
      ],
      choices: [
        { text: 'Hastalara su taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['veba_basladi', 'bakici'] }, to: 'v2a' },
        { text: '"Limanı kapatın, tahılı ayırın" diye yetkililere git', effect: { akil: 1, flags: ['veba_basladi', 'karantina'] }, to: 'v2b' },
        { text: 'Kentten kaçmayı düşün', effect: { flags: ['veba_basladi'] }, to: 'v2c' },
      ],
    },
    v2a: {
      bg: 'veba', hands: 'uzan', day: 11,
      lines: [
        'Evler *kapalı*. Kapılarda hasta yüzler.',
        'Bir çocuk su istiyor. Annesi çoktan *ölmüş*.',
        'Sen hastalanmıyorsun. Ölümsüzlüğün bu kez bir *işe* yarıyor.',
      ],
      choices: devam('v3'),
    },
    v2b: {
      bg: 'saray_biz', hands: 'uzan', day: 11,
      lines: [
        'Bir saray yetkilisi seni *dinliyor*. Ama başını sallıyor.',
        '"Kent tahılsız *kalamaz*. Limanı kapatırsak açlıktan ölürler."',
        'Haklı da. Haksız da. Bu çağda kimse fareleri, pireleri *bilmiyor*.',
      ],
      choices: devam('v3'),
    },
    v2c: {
      bg: 'mese', hands: 'yular', day: 11,
      lines: [
        'Kent kapılarında *kalabalık*. Herkes kaçmak istiyor.',
        'Ama kaçanlar hastalığı da *götürüyor*. Köylere, kasabalara.',
        'Geri *dönüyorsun*. Kaçmanın bir anlamı yok.',
      ],
      choices: devam('v3'),
    },
    v3: {
      bg: 'veba', hands: 'yok', day: 12,
      lines: [
        'Bir tarihçi yazıyor: Günde *binlerce* kişi ölüyor.',
        'Mezarlıklar *doldu*. Ölüler sur kulelerine taşınıyor.',
        'İmparatorun bile *hastalandığı* söyleniyor.',
      ],
      choices: [
        { text: 'Ölüleri taşıyan arabalara yardım et', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: 'v4' },
        { text: 'Ölenlerin adlarını bir deftere yaz', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 2, flags: ['defter'] }, to: 'v4' },
        { text: 'Yetim çocukları bir kiliseye topla', effect: { beden: 1, flags: ['yetimler'] }, to: 'v4' },
      ],
    },
    v4: {
      bg: 'veba', hands: 'uzan', day: 12,
      lines: [
        'Fırınlar *kapanıyor*. Ekmek yok. Kent açlıkla da savaşıyor.',
        { when: has('eudokia'), text: 'Eudokia fırının kapısını sana *açıyor*: "Hamuru sen yoğur, ben pişireyim."' },
        { when: has('firinci'), text: 'Fırında bir avuç *un* kalmış. Ne yapacaksın?' },
      ],
      choices: [
        { text: 'Unla ekmek pişirip hastalara dağıt', show: has('firinci'), cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['ekmekci'] }, to: 'v5' },
        { text: 'Kendi paranla ekmek al, dağıt', cost: { para: 2 }, effect: { para: -2, flags: ['comert'] }, to: 'v5' },
        { text: 'Dinlen, güç topla', effect: { enerji: 20 }, to: 'v5' },
      ],
    },
    v5: {
      mood: 'dark',
      bg: 'mese', hands: 'uzan', day: 13,
      lines: [
        'Aylar sonra hastalık *azalıyor*. İmparator iyileşiyor.',
        'Kent nüfusunun büyük bölümü *gitti*. Sokaklar yarı boş.',
        { when: has('yetimler'), text: 'Topladığın çocuklardan biri sana *gülümsüyor*. Hayatta.' },
        { when: has('defter'), text: 'Defterinde binlerce *ad*. Kimse onları unutmayacak.' },
      ],
      choices: aksam('v6'),
    },
    v6: {
      bg: 'ayasofya', hands: 'uzan', day: 13,
      lines: [
        'Kubbenin altında *yalnızsın*.',
        { when: has('mimar'), text: 'İsidoros\'un hesaplarını sen de *biliyorsun*. Bu kubbe bir gün depremle çökecek ve yeniden yapılacak.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'v7' }],
    },
    v7: {
      bg: 'ayasofya', hands: 'dinlen', day: 13,
      lines: [
        'Justinianos\'un yasa kitabı bir gün bütün Avrupa\'nın *hukukuna* temel olacak.',
        'Bu kent bin yıl daha *ayakta* kalacak. Defalarca kuşatılacak, yağmalanacak.',
        'Doğudan yeni halklar gelecek: Bozkırdan, atlarıyla, *Türkler*.',
        'Ve bir gün Anadolu\'nun ortasında kervansaraylar, *loncalar* yükselecek.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_ayi: {
      bg: 'hipodrom', hands: 'uzan',
      lines: [
        'Hipodrom\'un arkasında bir adam zincirli bir *ayıyı* oynatıyor.',
        'Yaşlı bir kadın gülüyor: "İmparatoriçenin babası da *ayıcıydı*. Kim bilir, belki bu ayının dedesi..."',
      ],
      choices: [
        { text: 'Ayıcıya bir follis at', cost: { para: 1 }, effect: { para: -1, enerji: 10 }, to: '@don' },
        { text: 'Ayının zincirine bak: Yarası var. Sahibine söyle', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_ipek: {
      bg: 'mese', hands: 'kese',
      lines: [
        'Bir tüccar gizlice *mor* bir ipek gösteriyor.',
        'Mor yalnızca *imparatorun* rengi. Başkası giyerse ceza ağır.',
        '"Az kaldı," diye fısıldıyor. "İpeğin *sırrı* da bir gün buraya gelecek."',
      ],
      choices: [
        { text: 'Uzak dur', effect: { akil: 1 }, to: '@don' },
        { text: 'Sıradan bir ipek kumaş al', cost: { para: 2 }, effect: { para: -2, flags: ['ipek'] }, to: '@don' },
      ],
    },
    e_su: {
      bg: 'mese', hands: 'uzan',
      lines: [
        'Kemerli *su yolu* bir yerden sızdırıyor. Mahallenin çeşmesi kurudu.',
        'Kadınlar testileriyle *bekliyor*.',
      ],
      choices: [
        { text: 'Sızıntıyı bul, kapat', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: '@don' },
        { text: 'Su ustalarına haber ver', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_mozaik: {
      bg: 'saray_biz', hands: 'uzan',
      lines: [
        'Bir mozaik ustası, minicik renkli *taşları* kireçli harca bastırıyor.',
        'Altın taşların içinde gerçek *altın* var: İki cam arasında ince bir yaprak.',
      ],
      choices: [
        { text: 'Bir yüzün gözünü sen yerleştir', effect: { akil: 1, flags: ['mozaik'] }, to: '@don' },
        { text: 'Taşları renklerine göre ayır', effect: { para: 1 }, to: '@don' },
      ],
    },
    e_dilenci: {
      bg: 'mese', hands: 'uzan',
      lines: [
        'Bir kör *dilenci* elinde bir tahta levha tutuyor. Üstünde eski bir yazı.',
        '"Bir zamanlar *asker*dim," diyor. "Şimdi kimse beni tanımıyor."',
      ],
      choices: [
        { text: 'Ona bir follis ver', cost: { para: 1 }, effect: { para: -1, flags: ['comert'] }, to: '@don' },
        { text: 'Onu kilisenin yoksullar evine götür', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_liman: {
      bg: 'mese', hands: 'sepet',
      lines: [
        'Haliç\'te gemiler *boşalıyor*: Karadeniz\'den tuzlu balık, kürk, bal.',
        'Hamallar az. Liman başı bağırıyor: "Çalışana *follis*!"',
      ],
      choices: [
        { text: 'Çuval taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, to: '@don' },
        { text: 'Kayıtları tut', effect: { akil: 1, para: 1 }, to: '@don' },
      ],
    },
    e_ikona: {
      bg: 'mese', hands: 'uzan',
      lines: [
        'Bir manastırın önünde ahşap bir *ikona*. Altın yaldızlı, gözleri iri.',
        'İnsanlar önünde *mum* yakıyor.',
      ],
      choices: [
        { text: 'Bir mum yak', cost: { para: 1 }, effect: { para: -1, enerji: 10 }, to: '@don' },
        { text: 'Ressama boyaları sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_hamam: {
      bg: 'saray_biz', hands: 'dinlen',
      lines: [
        'Hipodrom\'un yanındaki büyük *hamam*. Duvarlarında antik heykeller.',
        'Yangından *kurtulmuş* birkaç heykel kalmış.',
      ],
      choices: [
        { text: 'Yıkan', cost: { para: 1 }, effect: { para: -1, enerji: 25 }, to: '@don' },
        { text: 'Kırık heykelleri toplamaya yardım et', effect: { beden: 1 }, to: '@don' },
      ],
    },
    e_hekim: {
      bg: 'veba', hands: 'uzan',
      lines: [
        'Bir hekim hastaların başında *Galenos*\'un kitabını okuyor.',
        { when: has('galenos'), text: 'O adı duyunca kalbin *sıkışıyor*. Genç Galenos, arena, lamba ışığı...' },
        '"Dört sıvı dengesi," diyor. Ama hastalık *dinlemiyor*.',
      ],
      choices: [
        { text: 'Ona temiz su ve kaynatılmış bez öner', effect: { akil: 1 }, to: '@don' },
        { text: 'Hastaları yıkamasına yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'ayi', start: 'e_ayi', when: not('veba_basladi') },
    { id: 'ipek', start: 'e_ipek', when: not('veba_basladi') },
    { id: 'su', start: 'e_su' },
    { id: 'mozaik', start: 'e_mozaik', when: not('veba_basladi') },
    { id: 'dilenci', start: 'e_dilenci' },
    { id: 'liman', start: 'e_liman', when: not('veba_basladi') },
    { id: 'ikona', start: 'e_ikona' },
    { id: 'hamam', start: 'e_hamam', when: not('veba_basladi') },
    { id: 'hekim', start: 'e_hekim', when: veba },
  ],
};

ERA7.hub = {
  intro: (st) => veba(st)
    ? ['Akşam. Sokaklarda yalnızca ölü arabalarının *gıcırtısı*.', 'Kiliselerde mumlar *yanıyor*. Dualar fısıltıyla.']
    : ['Akşam. Mese\'de dükkânlar fenerlerini *yakıyor*.', 'Boğaz\'ın üstünde gün *batıyor*.', 'Kiliselerin çanları *çalıyor*.'],
  acts: [
    { id: 'ahir', text: 'Hipodrom ahırlarında atları tımarla', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'yular',
      res: [['Yarış atları *sinirli*, güçlü.', 'Yorgi sana bir follis atıyor.'], ['Bir at yüzünü sana *sürtüyor*.', 'Atlar her çağda aynı.']] },
    { id: 'hukuk', text: 'Hukukçular için yasa kopyala', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 1, para: 1 }, hands: 'kalem',
      res: [['Yüzyıllık bir yasa, yeni sözcüklerle *yeniden*.', 'Stefanos başını sallıyor.'], ['İki yasa birbiriyle *çelişiyor*. Birini işaretliyorsun.', 'Düzen, emek ister.']] },
    { id: 'yunanca', text: 'Bir rahipten Yunanca okuma öğren', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1, flags: ['yazi'] }, hands: 'kitap',
      res: [['Harfler *tanıdık*: Bergama\'da gördüğün harfler.', 'Hızla *okuyorsun*.'], ['Rahip seni *övüyor*.', '"Bu yaşta öğrenen az olur." Yaşını bilse...']] },
    { id: 'firin', text: 'Fırında gece ekmeği pişir', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'sepet',
      res: [['Fırının ağzı bir *güneş* gibi.', 'Sabah ekmekleri halka dağıtılacak.'], ['Eudokia sana sıcak bir *somun* uzatıyor.', 'Karnın doydu.']] },
    { id: 'insaat', show: (st) => st.flags.includes('mimar') || st.flags.includes('usta') || st.flags.includes('sarnic'), text: 'Şantiyede gece vardiyası', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'kerpic',
      res: [['Meşaleler altında tuğla *diziliyor*.', 'Kubbe gece de büyüyor.'], ['Ustabaşı sana iki follis *sayıyor*.', 'Yarın yine.']] },
    { id: 'bogaz', text: 'Boğaz kıyısında balık tut', effect: { enerji: 10 },
      res: [['Akıntı hızlı. Ama bir *lüfer* takılıyor.', 'Akşama ızgara.'], ['Karşı kıyıda Asya\'nın *ışıkları*.', 'İki kıta, bir nefes.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda bir *kubbe* görüyorsun. Ucu yok.', 'Dinlendin.']] },
  ],
};
