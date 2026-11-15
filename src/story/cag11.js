// ÇAĞ 11 — Cumhuriyet sanayisi: Kayseri (1928-1935) → Karabük (1937-1939)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - 1 Kasım 1928'de Latin harflerine dayalı yeni Türk alfabesi kabul edildi; 1929 başında Millet Mektepleri
//   açıldı, yetişkinler akşamları okuma yazma öğrendi.
// - 1934 Soyadı Kanunu: Herkes bir soyadı seçti.
// - Sümerbank'ın ilk fabrikası Kayseri Bez Fabrikası; temeli 20 Mayıs 1934'te atıldı, Eylül 1935'te üretime başladı.
// - Karabük Demir ve Çelik Fabrikası'nın temeli 3 Nisan 1937'de çeltik tarlalarının üzerinde atıldı.
//   İlk yüksek fırın 9 Eylül 1939'da ateşlendi, ertesi gün ilk Türk ham demiri alındı.
//   Fırını köylü kızı Fatma ateşlediği için fırın "Fatma" adını aldı.
// Karakter adları (Hacer Öğretmen, Ömer Usta, İsmail) kurgu.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const kayseri = (st) => st.yer === 'Kayseri';
const karabuk = (st) => st.yer === 'Karabük' || st.yer === 'Zonguldak';

export const ERA11 = {
  id: 11,
  name: 'Cumhuriyet sanayisi',
  place: 'Kayseri',
  region: 'Kayseri ve Karabük',
  year: '1928',
  currency: 'lira',
  start: 'a1',
  next: { name: 'Kalkınma yılları', place: 'Eskişehir', year: '1961' },

  carry(st) {
    st.para = Math.min(20, Math.max(3, Math.round(st.para / 3)));
    st.enerji = Math.max(st.enerji, 70);
    return `Kuruşların artık Türk lirası: Kesende ${st.para} lira var.`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Yeni harfler ----------
    a1: {
      bg: 'kasaba_meydan', hands: 'uzan', day: 1, place: 'Kayseri', year: '1928',
      lines: [
        'Yine *Erciyes*. Yine Kayseri. Ama her şey yeniden *değişiyor*.',
        'Meydanda bir kara tahta. Üstünde tanıdık ama tuhaf *harfler*: A, B, C...',
        'Bir öğretmen kalabalığa sesleniyor: "*Yeni* alfabe! Akşamları okul var. Herkese açık."',
        { when: has('yazi'), text: 'Çivi yazısı, Yunan harfleri, Arap harfleri... Sen yine *yeni* bir yazı öğreneceksin.' },
      ],
      choices: [
        { text: 'Okula yazıl', effect: { akil: 1, flags: ['millet_mektebi'] }, to: 'a2a' },
        { text: '"Ben eski yazıyı biliyorum" de', show: has('yazi'), effect: { akil: 1, flags: ['eski_yazi'] }, to: 'a2b' },
        { text: 'Pazarda hamallığa devam et', effect: { beden: 1, para: 1 }, to: 'a2c' },
      ],
    },
    a2a: {
      bg: 'millet_mektebi', hands: 'kalem', day: 1,
      lines: [
        'Akşam. Bir okulun sınıfı *dolu*: Çiftçiler, esnaf, kadınlar, ihtiyarlar.',
        'Öğretmen *Hacer Hanım* tahtaya yazıyor: "A-NA". "BA-BA".',
        'Yanındaki yaşlı adam *titreyen* elleriyle harfleri çiziyor.',
        '"Altmış yaşındayım," diyor. "Torunuma *mektup* yazacağım."',
      ],
      choices: [
        { text: 'Yaşlı adama yardım et', effect: { akil: 1, flags: ['yasli_dost'] }, to: '@olay', then: 'a3' },
        { text: 'Kendi defterine odaklan', effect: { akil: 1 }, to: '@olay', then: 'a3' },
      ],
    },
    a2b: {
      bg: 'millet_mektebi', hands: 'kitap', day: 1,
      lines: [
        'Hacer Hanım gülümsüyor: "O zaman sana *yeni* bir iş: Benimle birlikte öğret."',
        '"Eski harfleri bilenler yeni harfleri *çabuk* öğrenir. Bilmeyenlere de sen anlatırsın."',
        'Sınıfın önüne geçiyorsun. Elinde bir *tebeşir*.',
      ],
      choices: [{ text: 'Tahtaya ilk harfi yaz', effect: { akil: 1, flags: ['ogretmen11'] }, to: '@olay', then: 'a3' }],
    },
    a2c: {
      bg: 'kasaba_meydan', hands: 'sepet', day: 1,
      lines: [
        'Pazarda bir tüccar sana bir *liste* uzatıyor. Yeni harflerle yazılmış.',
        '"Bunu oku da malları *ayır*."',
        'Okuyamıyorsun. Tüccar söylenerek başkasını *çağırıyor*.',
        'Yeni çağda okuyamayan, yine *sırtıyla* çalışacak.',
      ],
      choices: [
        { text: 'Akşam okula git', effect: { akil: 1, flags: ['millet_mektebi'] }, to: '@olay', then: 'a3' },
        { text: 'Omuz silk, yükü taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@olay', then: 'a3' },
      ],
    },
    a3: {
      bg: 'millet_mektebi', hands: 'kalem', day: 2,
      lines: [
        'Haftalar geçiyor. Sınıfta bir *sınav*. Herkes bir cümle yazacak.',
        { when: has('yasli_dost'), text: 'Yaşlı adam cümlesini *yazıyor*: "Torunum, seni çok özledim." Gözleri dolu.' },
        { when: has('ogretmen11'), text: 'Öğrencilerin tek tek tahtaya kalkıyor. Biri harfleri *ters* yazıyor, düzeltiyorsun.' },
        'Hacer Hanım: "Bu harfler *herkesin*. Artık okuma bir sınıfın değil, bir milletin işi."',
      ],
      choices: [
        { text: 'Cümleni yaz: "Ben çok eskiyim ama bu harfler yeni."', effect: { akil: 1 }, to: '@aksam', then: 's1' },
        { text: 'Cümleni yaz: "Erciyes beni tanır."', effect: { akil: 1 }, to: '@aksam', then: 's1' },
        { text: 'Cümleni yaz: "Ekmek, su, iş."', effect: { beden: 1 }, to: '@aksam', then: 's1' },
      ],
    },

    // ---------- BÖLÜM 2: Soyadı ----------
    s1: {
      bg: 'kasaba_meydan', hands: 'kitap', day: 3, year: '1934',
      lines: [
        'Yıllar geçiyor. Bir *yasa* çıktı: Herkes bir soyadı alacak.',
        'Nüfus memurunun önünde *kuyruk*. Herkes ad arıyor.',
        'Biri "*Demirci*" diyor, mesleğinden. Biri "*Erciyes*" diyor, dağdan. Biri "*Yılmaz*" diyor, karakterinden.',
        'Sıra sana geliyor. Memur kalemini kaldırıyor: "*Soyadın*?"',
      ],
      choices: [
        { text: '"Çağlar"', effect: { akil: 1, flags: ['soyad_caglar'] }, to: 's2' },
        { text: '"Taşçı" — ilk elimdeki aletten', effect: { beden: 1, flags: ['soyad_tasci'] }, to: 's2' },
        { text: '"Ölmez"', effect: { flags: ['soyad_olmez'] }, to: 's2' },
        { text: '"Yazıcı" — çivi yazısından beri', show: has('yazi'), effect: { akil: 1, flags: ['soyad_yazici'] }, to: 's2' },
      ],
    },
    s2: {
      bg: 'kasaba_meydan', hands: 'uzan', day: 3,
      lines: [
        { when: has('soyad_caglar'), text: 'Memur yazıyor: "*Çağlar*." Kimse bunun ne kadar doğru olduğunu bilmiyor.' },
        { when: has('soyad_tasci'), text: 'Memur yazıyor: "*Taşçı*." Göbeklitepe\'deki ilk çakmaktaşı aklına geliyor.' },
        { when: has('soyad_olmez'), text: 'Memur gülüyor: "*Ölmez* mi? İddialı." Sen de gülüyorsun. Ama onun bilmediği bir şey var.' },
        { when: has('soyad_yazici'), text: 'Memur yazıyor: "*Yazıcı*." Kil tabletten deftere, kaç bin yıl.' },
        'Binlerce yıldır *adsız* yaşadın. Artık resmî bir adın var.',
      ],
      choices: aksam('s3'),
    },
    s3: {
      bg: 'millet_mektebi', hands: 'uzan', day: 4,
      lines: [
        'Aralık ayı. Hacer Hanım sınıfa koşarak *giriyor*. Elinde bir gazete.',
        '"Kadınlar artık *milletvekili* seçimlerinde oy verebilecek! Seçilebilecek de!"',
        'Sınıftaki kadınlar birbirine *bakıyor*. Biri gazeteyi heceleyerek okuyor: "SE-ÇİM."',
      ],
      choices: [
        { text: 'Gazeteyi yüksek sesle oku', effect: { akil: 1 }, to: 's4' },
        { text: 'Kutlama için çay demle', effect: { beden: 1 }, to: 's4' },
      ],
    },
    s4: {
      bg: 'kasaba_meydan', hands: 'uzan', day: 4,
      lines: [
        'Hacer Hanım: "Annem okuma bilmezdi. Ben *öğretmenim*. Kızım ne olacak, kim bilir?"',
        { when: (st) => st.flags.includes('antlasma') || st.flags.includes('mektup_puduhepa'), text: 'Hattuşa\'da bir antlaşmayı mühürleyen Kraliçe Puduhepa aklına *geliyor*.' },
        'Binlerce yıl boyunca kararları hep *erkekler* aldı. Sen hepsini gördün.',
        'Bu sefer bir kapı *aralanıyor*.',
      ],
      choices: devam('f1'),
    },

    // ---------- BÖLÜM 3: Bez fabrikası ----------
    f1: {
      bg: 'bez_fabrika', hands: 'uzan', day: 4, year: '1935',
      lines: [
        'Kayseri\'nin dışında dev bir *fabrika*. Testere dişi çatılar, sıra sıra pencereler.',
        'Devletin yeni kurduğu Sümerbank\'ın *ilk* fabrikası. Pamuktan bez dokunacak.',
        'Kapıda yüzlerce köylü *bekliyor*. Çoğu ilk kez bir fabrikaya giriyor.',
        { when: (st) => st.flags.includes('desenci') || st.flags.includes('nazife'), text: 'Hereke\'deki tezgâhlar *aklına* geliyor. Bu sefer makineler yüzlerce.' },
      ],
      choices: [
        { text: 'Dokuma salonuna başvur', effect: { beden: 1, flags: ['dokumaci11'] }, to: 'f2a' },
        { text: 'Bakım atölyesine, makinelerin yanına', req: (st) => st.akil >= st.beden || st.flags.includes('millet_mektebi'), reqText: 'Okuma yazma ve makine bilgisi gerekli', effect: { akil: 1, flags: ['bakimci'] }, to: 'f2b' },
        { text: 'İşçilere okuma yazma öğret', show: (st) => st.flags.includes('ogretmen11') || st.flags.includes('millet_mektebi'), effect: { akil: 1, flags: ['fabrika_ogretmen'] }, to: 'f2c' },
      ],
    },
    f2a: {
      bg: 'bez_fabrika', hands: 'uzan', day: 4,
      lines: [
        'Salonda yüzlerce tezgâh aynı anda *çalışıyor*. Ses kulağını sağır ediyor.',
        'Ustabaşı *Ömer Usta*: "Mekik kaçarsa *durdur*. Elini sokma."',
        'Yanındaki genç kız *İsmet*, köyden yeni gelmiş. İlk maaşını annesine göndereceğini söylüyor.',
      ],
      choices: [
        { text: 'İsmet\'e tezgâhı öğret', effect: { beden: 1, flags: ['ismet'] }, to: 'f3' },
        { text: 'Hızını artır, prim kazan', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, to: 'f3' },
      ],
    },
    f2b: {
      bg: 'bez_fabrika', hands: 'cekic', day: 4,
      lines: [
        'Bakım atölyesinde *yabancı* uzmanlar ve genç Türk teknisyenler.',
        'Makinelerin kılavuzları yabancı dilde. Bir mühendis onları *Türkçeye* çeviriyor.',
        '"Bir gün bu makineleri de *biz* yapacağız," diyor.',
        { when: has('muhendis'), text: 'Zeytinburnu\'ndaki çizim masası aklına geliyor. Yüz yıl *geçmiş*.' },
      ],
      choices: [
        { text: 'Kılavuz çevirisine yardım et', effect: { akil: 2, flags: ['cevirmen11'] }, to: 'f3' },
        { text: 'Bozuk bir dişliyi elle tornala', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: 'f3' },
      ],
    },
    f2c: {
      bg: 'millet_mektebi', hands: 'kalem', day: 4,
      lines: [
        'Akşam vardiyasından sonra fabrikanın yemekhanesi *sınıf* oluyor.',
        'Yorgun işçiler tahtaya *bakıyor*. Bazıları uyukluyor.',
        '"Bugün bir kelime öğrenelim," diyorsun. "*Fabrika*."',
      ],
      choices: [{ text: 'Harfleri tek tek göster', effect: { akil: 1 }, to: 'f3' }],
    },
    f3: {
      bg: 'bez_fabrika', hands: 'uzan', day: 5,
      lines: [
        'Bir sabah bir tezgâhın kayışı *kopuyor*. Mekik fırlıyor.',
        { when: has('ismet'), text: 'İsmet tezgâhın *tam* önünde.' },
        { when: not('ismet'), text: 'Genç bir işçi tezgâhın *tam* önünde.' },
      ],
      choices: [
        { text: 'Ana şalteri indir', show: has('bakimci'), effect: { akil: 2, flags: ['salter'] }, to: 'f4' },
        { text: 'İşçiyi kenara çek', cost: { enerji: 10 }, effect: { enerji: -10, beden: 2, flags: ['kurtardi11'] }, to: 'f4' },
        { text: '"Dur!" diye bağır', effect: { flags: ['bagirdi11'] }, to: 'f4' },
      ],
    },
    f4: {
      bg: 'bez_fabrika', hands: 'uzan', day: 5,
      lines: [
        { when: has('salter'), text: 'Bütün salon bir anda *susuyor*. Mekik yere düşüyor. Kimse yaralanmadı.' },
        { when: has('kurtardi11'), text: 'Mekik omzunu *sıyırıp* geçiyor. Ama işçi sağ salim.' },
        { when: has('bagirdi11'), text: 'İşçi son anda *eğiliyor*. Mekik duvara saplanıyor.' },
        'Ömer Usta ertesi gün herkese *iş güvenliği* dersi veriyor. Tezgâhlara koruma takılıyor.',
      ],
      choices: aksam('f5'),
    },
    f5: {
      bg: 'lojman', hands: 'uzan', day: 6,
      lines: [
        'Fabrikanın yanında *lojmanlar*, bir hamam, bir okul, bir sinema salonu.',
        'Akşamları işçiler aileleriyle *film* izliyor. Çoğu ilk kez.',
        'Fabrika sadece bez *dokumuyor*. Bir yaşam biçimi dokuyor.',
        { when: has('ismet'), text: 'İsmet ilk maaşıyla annesine bir *basma* elbise almış. Mektubunu da kendi yazmış.' },
      ],
      choices: [
        { text: 'Sinemaya git', effect: { enerji: 15 }, to: '@olay', then: 'f6' },
        { text: 'Gece kursunda ders ver', show: (st) => st.flags.includes('fabrika_ogretmen') || st.flags.includes('ogretmen11'), effect: { akil: 1 }, to: '@olay', then: 'f6' },
        { text: 'Fazla mesaiye kal', cost: { enerji: 15 }, effect: { enerji: -15, para: 2 }, to: '@olay', then: 'f6' },
      ],
    },
    f6: {
      bg: 'tren_istasyon', hands: 'uzan', day: 7, year: '1937',
      lines: [
        'İki yıl sonra fabrikaya bir *mektup* geliyor.',
        'Karadeniz\'in iç yamaçlarında, Karabük\'te dev bir *demir-çelik* fabrikası kurulacak.',
        '"Tecrübeli adam *lazım*. Gönüllü olan trene binsin."',
      ],
      choices: [
        { text: 'Trene bin', effect: { flags: ['karabuk'] }, to: '@aksam', then: 'y1' },
        { text: 'İsmet ve arkadaşlarıyla vedalaş, sonra bin', show: has('ismet'), effect: { flags: ['karabuk', 'veda11'] }, to: '@aksam', then: 'y1' },
      ],
    },

    y1: {
      bg: 'tren_istasyon', hands: 'uzan', day: 8, place: 'Ankara',
      lines: [
        'Tren yolda *Ankara*\'da duruyor. Yeni başkent.',
        'Bozkırın ortasında *inşaatlar*: Bakanlıklar, okullar, geniş bulvarlar, ağaç fidanları.',
        'Bir ihtiyar: "Buralar *bataklıktı*. Şimdi bak."',
      ],
      choices: [
        { text: 'Aktarma beklerken şehri gez', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 'y2' },
        { text: 'Peronda yük taşıyıcılara yardım et', effect: { beden: 1, para: 1 }, to: 'y2' },
      ],
    },
    y2: {
      bg: 'kasaba_meydan', hands: 'uzan', day: 8,
      lines: [
        'Ankara\'nın kalesinden bakınca bozkır *uzanıyor*.',
        { when: (st) => st.flags.includes('katip') || st.flags.includes('surucu') || st.flags.includes('tapinak'), text: 'Kuzeydoğuda, birkaç günlük yolda *Hattuşa* var. Toprağın altında, arşiviyle, aslanlarıyla.' },
        'Bu topraklar hep yeni başkentler gördü. Hattuşa, Gordion, Sardes, Konstantinopolis, *Ankara*.',
        'Tren düdüğü çalıyor. Karabük\'e *devam*.',
      ],
      choices: devam('k1', 'Trene dön'),
    },

    // ---------- BÖLÜM 4: Karabük ----------
    k1: {
      bg: 'celtik_tarla', hands: 'uzan', day: 8, place: 'Karabük', year: '1937',
      lines: [
        'Karabük. Küçük bir köy, *çeltik* tarlaları, bir tren istasyonu.',
        'Tarlaların ortasında kazıklar *çakılmış*. Burada bir fabrika yükselecek.',
        'Nisan ayı. Bir tören: Fabrikanın *temeli* atılıyor.',
        'Çevre köylerden yüzlerce insan *gelmiş*. Çoğu daha önce bir fabrika görmemiş.',
      ],
      choices: [
        { text: 'Temel kazısına katıl', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2 }, to: 'k2a' },
        { text: 'Mühendislerin çadırına git', effect: { akil: 1, flags: ['santiye_muhendis'] }, to: 'k2b' },
        { text: 'Köylülerin endişelerini dinle', effect: { akil: 1, flags: ['koylu11'] }, to: 'k2c' },
      ],
    },
    k2a: {
      bg: 'celtik_tarla', hands: 'cekic', day: 8,
      lines: [
        'Çamur dizine kadar. Kürek, kazma, *el arabası*.',
        'Yanında köylü genç *İsmail*. "Babam çeltik ekerdi burada. Ben *demir* dökeceğim."',
        'Akşam ellerin su toplamış. Ama temel *derinleşiyor*.',
      ],
      choices: devam('zg1'),
    },
    k2b: {
      bg: 'celtik_tarla', hands: 'kitap', day: 8,
      lines: [
        'Çadırda yabancı firmanın mühendisleri ve genç Türk *mühendisler*.',
        'Planlar masaya *yayılmış*: Kok fabrikası, yüksek fırın, çelikhane, haddehane.',
        '"Kömür Zonguldak\'tan, cevher *Divriği*\'den gelecek. Ortası Karabük."',
        { when: has('cevirmen11'), text: 'Kayseri\'de çevirdiğin kılavuzlar burada da *işe* yarıyor.' },
      ],
      choices: devam('zg1'),
    },
    k2c: {
      bg: 'celtik_tarla', hands: 'uzan', day: 8,
      lines: [
        'Yaşlı bir köylü kadın: "Tarlalarımız *gidiyor*. Ne yiyeceğiz?"',
        'Genç oğlu: "Ana, fabrikada iş var. *Maaş* var. Okul gelecek."',
        'İkisi de *haklı*. Her çağ bir şey alıp bir şey veriyor.',
      ],
      choices: [
        { text: 'Kadının tarlası için kamulaştırma bedelini öğrenmesine yardım et', effect: { akil: 1 }, to: '@olay', then: 'zg1' },
        { text: 'Oğluna fabrikada iş bulmasında yardım et', effect: { beden: 1 }, to: '@olay', then: 'zg1' },
      ],
    },
    zg1: {
      bg: 'maden_ocak', hands: 'uzan', day: 9, place: 'Zonguldak',
      lines: [
        'Mühendisler seni *Zonguldak*\'a gönderiyor. Fırınlar için kömürün düzenli gelmesi gerek.',
        'Karadeniz kıyısında kapkara *tepeler*. Her yerde ocak ağızları, vagonlar, toz.',
        'Madenciler yüzleri kömür karası, *lambalarıyla* yerin altına iniyor.',
      ],
      choices: [
        { text: 'Bir vardiya madene in', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['madenci'] }, to: 'zg2a' },
        { text: 'Sevkiyat defterini düzenle', effect: { akil: 1, flags: ['sevkiyat'] }, to: 'zg2b' },
      ],
    },
    zg2a: {
      bg: 'maden_ic', hands: 'fener', day: 9,
      lines: [
        'Dar bir *galeri*. Tavan alçak, hava ağır. Kazma sesleri yankılanıyor.',
        'Yaşlı madenci *Hüseyin Dayı*: "Kuşu dinle. Kanarya susarsa *koş*."',
        'Kafeste küçük sarı bir kuş. Grizu gazı gelirse önce o *bayılır*.',
        'Bu vardiya kanarya *ötüyor*. Sekiz saat sonra gün ışığına çıkıyorsun.',
      ],
      choices: [{ text: 'Yüzündeki kömürü yıka', effect: { para: 2 }, to: 'zg3' }],
    },
    zg2b: {
      bg: 'maden_ocak', hands: 'kitap', day: 9,
      lines: [
        'Vagonlar sayılıyor, *tartılıyor*, trene yükleniyor.',
        'Defter karışık: Bazı vagonlar iki kez *yazılmış*, bazıları hiç.',
        { when: (st) => st.flags.includes('hesap') || st.flags.includes('defterci'), text: 'Yüzyıllardır yük *saydın*: Bakır külçeler, kervan yükleri. Defteri bir günde düzeltiyorsun.' },
        'Artık her vagonun bir *numarası* var.',
      ],
      choices: [{ text: 'Karabük\'e dön', effect: { akil: 1 }, to: 'zg3' }],
    },
    zg3: {
      bg: 'tren_istasyon', hands: 'uzan', day: 9,
      lines: [
        'Kömür treni Karabük\'e *dönüyor*. Sen de üstündesin.',
        'Karadeniz\'in kömürü, Sivas\'ın *cevheri*, Karabük\'ün ateşi. Bir ülkenin dört yanı bir fırında buluşacak.',
        { when: has('madenci'), text: 'Ellerin günlerce *kömür* kokuyor.' },
      ],
      choices: aksam('k3'),
    },
    k3: {
      mood: 'dark',
      bg: 'celtik_tarla', hands: 'uzan', day: 10, year: '1938', place: 'Karabük',
      lines: [
        'Bir yıl. Tarlaların yerinde *bacalar*, kuleler, ray hatları.',
        'Binlerce işçi. *Barakalar*, aşevleri, bir hastane.',
        'Bir sabah bir iskele *çöküyor*. Bir işçi altında kaldı.',
      ],
      choices: [
        { text: 'Enkazı kaldır', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['iskele'] }, to: 'k4' },
        { text: 'Hastaneye koş, doktoru getir', effect: { akil: 1 }, to: 'k4' },
        { text: 'İskele bağlantılarının neden koptuğunu incele', show: (st) => st.flags.includes('santiye_muhendis') || st.flags.includes('bakimci'), effect: { akil: 2, flags: ['iskele_inceleme'] }, to: 'k4' },
      ],
    },
    k4: {
      bg: 'celtik_tarla', hands: 'uzan', day: 9,
      lines: [
        { when: has('iskele'), text: 'İşçiyi çıkarıyorsunuz. *Bacağı* kırık ama yaşıyor.' },
        { when: has('iskele_inceleme'), text: 'Bağlantı cıvataları *eksik* sıkılmış. Bütün iskeleler yeniden kontrol ediliyor.' },
        'Bu fabrika *alın teriyle*, bazen de canla kuruluyor.',
        'İsmail sana bakıyor: "Bunu *unutmayacağım*."',
      ],
      choices: aksam('k4b'),
    },
    k4b: {
      mood: 'dark',
      bg: 'lojman', hands: 'yok', day: 11,
      lines: [
        'Kasım ayı. Bir sabah şantiyenin radyosundan *acı* bir haber.',
        'Cumhuriyet\'in kurucusu *Mustafa Kemal Atatürk* hayatını kaybetti.',
        'Bütün şantiye *duruyor*. Vinçler, kazmalar, el arabaları. Kimse konuşmuyor.',
        'İsmail\'in gözleri dolu: "Bu fabrikayı *o* istemişti."',
      ],
      choices: [
        { text: 'Sessizce başını eğ', effect: { enerji: 5 }, to: 'k4c' },
        { text: 'İsmail\'in omzuna elini koy', effect: { beden: 1 }, to: 'k4c' },
      ],
    },
    k4c: {
      bg: 'celtik_tarla', hands: 'uzan', day: 11,
      lines: [
        'Ertesi sabah işçiler yine şantiyede. Herkesin yüzünde aynı *kararlılık*.',
        'Ustabaşı: "Fırını *zamanında* yakacağız. Bu, onun da sözüydü."',
        'Kış boyunca *çalışılıyor*. Kar altında, projektör ışığında.',
      ],
      choices: devam('k5'),
    },
    k5: {
      bg: 'yuksek_firin', hands: 'uzan', day: 12, year: '1939',
      lines: [
        'Eylül. *Yüksek fırın* hazır. Gökyüzüne yükselen çelik bir kule.',
        'Bütün kasaba toplanmış. *Tören* var.',
        'Fırını kim ateşleyecek? Mühendisler bir köylü kızını *seçiyor*: Fatma.',
        'Fatma elinde meşaleyle *öne* çıkıyor. Elleri titriyor.',
      ],
      choices: [
        { text: 'Fatma\'ya cesaret ver', effect: { akil: 1, flags: ['fatma'] }, to: 'k6' },
        { text: 'Meşalenin yanmasına yardım et', effect: { beden: 1 }, to: 'k6' },
        { text: 'Kalabalığın arasından sessizce izle', effect: { enerji: 10 }, to: 'k6' },
      ],
    },
    k6: {
      bg: 'yuksek_firin', hands: 'yok', day: 12,
      lines: [
        'Fatma meşaleyi fırının ağzına *uzatıyor*. Bir uğultu.',
        'Kok kömürü *tutuşuyor*. Fırının içinden turuncu bir ışık.',
        { when: has('fatma'), text: 'Fatma sana dönüyor, *gülümsüyor*. "Yaptım!"' },
        'Fırının adı o gün konuyor: "*Fatma*."',
      ],
      choices: [{ text: 'Gece boyunca bekle', cost: { enerji: 10 }, effect: { enerji: -10 }, to: 'k7' }],
    },
    k7: {
      bg: 'yuksek_firin', hands: 'uzan', day: 13,
      lines: [
        'Ertesi gün fırının deliği *açılıyor*. Erimiş demir kanala akıyor.',
        'Kıpkırmızı, beyaz, *sarı*. Bütün kalabalık sessiz.',
        'Bu, bu topraklarda bir fabrikada dökülen *ilk* yerli ham demir.',
        { when: has('demirci'), text: 'Hattuşa\'da bir usta "Demir bir sırdır," demişti. Üç bin yıl sonra sır, bir *fabrika* oldu.' },
        { when: has('kulce'), text: 'Uluburun\'dan kopardığın bakır parçası aklına geliyor. Metal hep *seninle* yürüdü.' },
      ],
      choices: [
        { text: 'İsmail\'le kucaklaş', effect: { beden: 1 }, to: '@olay', then: 'k8' },
        { text: 'Döküm sıcaklığını kaydet', effect: { akil: 1 }, to: '@olay', then: 'k8' },
      ],
    },
    k8: {
      bg: 'tren_istasyon', hands: 'uzan', day: 13,
      lines: [
        'Ama aynı günlerde radyoda kötü *haberler*: Avrupa\'da büyük bir savaş başladı.',
        'Fabrika bütün savaş boyunca *çalışacak*. Rayları, boruları, sacıyla.',
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'k9' }],
    },
    k9: {
      bg: 'yuksek_firin', hands: 'dinlen', day: 13,
      lines: [
        'Karabük\'e "fabrikalar kuran *fabrika*" denecek. Buradan yetişenler başka fabrikalar kuracak.',
        'Fatma\'dan sonra başka fırınlar da *kadın* adları alacak.',
        'Ve yirmi yıl sonra bir gün, bir devlet başkanı mühendislere *imkânsız* bir iş verecek:',
        '"Kendi otomobilimizi *yapın*."',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_radyo: {
      bg: 'kasaba_meydan', hands: 'uzan',
      lines: [
        'Kahvehanede yeni bir *radyo*. Herkes etrafına toplanmış.',
        'Ankara\'dan bir ses *haberleri* okuyor. Bir ihtiyar cihazın arkasına bakıyor: "İçinde adam mı var?"',
      ],
      choices: [
        { text: 'İhtiyara radyonun nasıl çalıştığını anlat', effect: { akil: 1 }, to: '@don' },
        { text: 'Gülüp türküleri dinle', effect: { enerji: 10 }, to: '@don' },
      ],
    },
    e_mektup: {
      bg: 'millet_mektebi', hands: 'kalem',
      lines: [
        'Okuma yazma bilmeyen bir kadın, askerdeki oğluna *mektup* yazdırmak istiyor.',
        'Mahallede bunu yapan *arzuhalci* para istiyor.',
      ],
      choices: [
        { text: 'Mektubu sen yaz', req: (st) => st.flags.includes('millet_mektebi') || st.flags.includes('ogretmen11'), reqText: 'Yeni harfleri bilmiyorsun', effect: { akil: 1, flags: ['comert'] }, to: '@don' },
        { text: 'Arzuhalcinin parasını öde', cost: { para: 1 }, effect: { para: -1 }, to: '@don' },
        { text: 'Okuma bilen bir komşu bulmasına yardım et', to: '@don' },
      ],
    },
    e_pastirma: {
      bg: 'kasaba_meydan', hands: 'kese',
      lines: [
        'Bir dükkânda tavandan sarkan *pastırmalar*. Çemen kokusu sokağa taşıyor.',
        'Usta: "Kervancılar bunu atın eyerinin altında *taşırmış*. Yolda bozulmasın diye."',
      ],
      choices: [
        { text: 'Bir parça al', cost: { para: 1 }, effect: { para: -1, enerji: 15 }, to: '@don' },
        { text: 'Çemen hazırlamasına yardım et', effect: { beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_futbol: {
      bg: 'lojman', hands: 'uzan',
      lines: [
        'Fabrika işçileri bir *futbol* takımı kurmuş. Bir oyuncu eksik.',
        '"Sen de gel! *Kaleye* geç!"',
      ],
      choices: [
        { text: 'Kaleye geç', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Hakemlik yap', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kok: {
      bg: 'yuksek_firin', hands: 'uzan',
      lines: [
        'Kok fabrikasında kömür, havasız fırınlarda *pişiriliyor*. Duman ve gaz.',
        'Genç bir işçi *öksürüyor*. Maske takmamış.',
      ],
      choices: [
        { text: 'Ona maskeni ver', effect: { beden: 1 }, to: '@don' },
        { text: 'Ustabaşına havalandırmayı şikâyet et', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kar: {
      bg: 'tren_istasyon', hands: 'uzan',
      lines: [
        'Kar yolları *kapattı*. Kömür treni geç kaldı. Fırınlar soğuyabilir.',
        'Gönüllüler raylardaki karı *küreyecek*.',
      ],
      choices: [
        { text: 'Kürek al', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2 }, to: '@don' },
        { text: 'Gönüllüler için çay kazanı kur', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_bisiklet: {
      bg: 'kasaba_meydan', hands: 'uzan',
      lines: [
        'Bir postacı *bisikletle* geçiyor. Çocuklar peşinden koşuyor.',
        'Zinciri *atmış*. Postacı yolda kalmış.',
      ],
      choices: [
        { text: 'Zinciri tak', effect: { beden: 1 }, to: '@don' },
        { text: 'Mektupları sen dağıt', cost: { enerji: 10 }, effect: { enerji: -10, para: 1 }, to: '@don' },
      ],
    },
    e_tren: {
      bg: 'tren_istasyon', hands: 'uzan',
      lines: [
        'İstasyona *buharlı* bir tren giriyor. İnsanlar camlardan sarkıyor.',
        'Bir köylü ilk kez trene *biniyor*. Korkuyla merak arasında.',
      ],
      choices: [
        { text: 'Onu vagona sen bindir', effect: { beden: 1 }, to: '@don' },
        { text: 'Lokomotifi makiniste sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_simit11: {
      bg: 'tren_istasyon', hands: 'sepet',
      lines: [
        'Peronda bir çocuk *simit* satıyor. Sesi trenin düdüğünü bastırıyor.',
        '"Bir simit, bir *gazoz*!"',
      ],
      choices: [
        { text: 'Bir simit al', cost: { para: 1 }, effect: { para: -1, enerji: 15 }, to: '@don' },
        { text: 'Çocuğa okula gidip gitmediğini sor', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_halay: {
      bg: 'lojman', hands: 'uzan',
      lines: [
        'Lojmanların önünde bir *düğün*. Davul zurna, halay.',
        'Gelin Kayseri\'den, damat Karabük\'ten. Fabrika *iki* kenti birleştirmiş.',
      ],
      choices: [
        { text: 'Halaya katıl', effect: { enerji: 15 }, to: '@don' },
        { text: 'Gelin ile damada bir hediye al', cost: { para: 1 }, effect: { para: -1, flags: ['comert'] }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'radyo', start: 'e_radyo', when: kayseri },
    { id: 'mektup', start: 'e_mektup', when: kayseri },
    { id: 'pastirma', start: 'e_pastirma', when: kayseri },
    { id: 'futbol', start: 'e_futbol', when: kayseri },
    { id: 'bisiklet', start: 'e_bisiklet', when: kayseri },
    { id: 'kok', start: 'e_kok', when: (st) => karabuk(st) || st.yer === 'Zonguldak' },
    { id: 'kar', start: 'e_kar', when: karabuk },
    { id: 'tren', start: 'e_tren', when: karabuk },
    { id: 'halay', start: 'e_halay', when: karabuk },
    { id: 'simit11', start: 'e_simit11', when: (st) => st.yer === 'Ankara' },
  ],
};

ERA11.hub = {
  intro: (st) => karabuk(st)
    ? ['Akşam. Şantiyenin projektörleri *yanıyor*.', 'Barakalarda sobalar *tütüyor*.', 'Uzaktan bir tren *düdüğü*.']
    : ['Akşam ezanı *okunuyor*. Erciyes kızıl.', 'Fabrikanın akşam *düdüğü* çalıyor.', 'Kahvehanede radyo *açık*.'],
  acts: [
    { id: 'okul', show: kayseri, text: 'Millet Mektebi\'nde akşam dersi', effect: { akil: 1, flags: ['millet_mektebi', 'yazi'] }, hands: 'kalem',
      res: [['Yeni harflerle bir *gazete* okuyorsun.', 'Haberler artık senin de.'], ['Hacer Hanım bir *kitap* veriyor.', '"Bitirince bir başkasına ver."']] },
    { id: 'tezgah', show: kayseri, text: 'Fabrikada fazla mesai', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'cekic',
      res: [['Gece vardiyası. Tezgâhlar *durmuyor*.', 'İki lira fazla.'], ['Ömer Usta seni *övüyor*.', '"Çalışkan adam."']] },
    { id: 'kayseri_carsi', show: kayseri, text: 'Kapalıçarşı\'da bakırcılara yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 },
      res: [['Bakır kazanlar *parlıyor*.', 'Usta sana bir lira veriyor.'], ['Çekiç sesleri çarşıyı *dolduruyor*.', 'Selçuklu\'dan beri aynı ses.']] },
    { id: 'kazi', show: karabuk, text: 'Gece vardiyasında temel dök', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'cekic',
      res: [['Beton mikserleri *dönüyor*.', 'Projektör ışığında çalışıyorsun.'], ['Sabaha karşı bir temel *bitti*.', 'İki lira kazandın.']] },
    { id: 'teknik', show: karabuk, text: 'Mühendislerin akşam kursuna katıl', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1 }, hands: 'kitap',
      res: [['Konu: *Yüksek fırının* kimyası.', 'Cevher, kok, kireçtaşı.'], ['Kursta İsmail de var. *Not* alıyor.', 'Köylü genç, teknisyen olacak.']] },
    { id: 'radyo_dinle', text: 'Radyoda türkü dinle', effect: { enerji: 10 },
      res: [['Bir uzun hava. *Bozlak*.', 'Gönlün yumuşuyor.'], ['Haberler. Dünya *hareketli*.', 'Ama sen yine buradasın.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda yeni *harfler* görüyorsun.', 'Dinlendin.']] },
  ],
};
