// ÇAĞ 12 — Kalkınma yılları: Eskişehir (1961) → Ankara (1968) → İstanbul (1969-1973)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - 1961'de Cumhurbaşkanı Cemal Gürsel'in talimatıyla Eskişehir Demiryolu Fabrikası'nda mühendisler 129 günde
//   tamamen yerli tasarım "Devrim" otomobillerini yaptı. Trenle Ankara'ya taşınırken güvenlik için depoları
//   boşaltıldı; 29 Ekim 1961'de Gürsel'in bindiği siyah Devrim'in benzini bitti, yaklaşık yüz metre gidip durdu.
//   Gürsel diğer Devrim'e geçti. "Batı kafasıyla otomobil yaptınız ama Doğu kafasıyla benzin koymayı unuttunuz"
//   sözü anlatılır. Devrim seri üretime geçmedi; bir örneği Eskişehir'de sergilenir.
// - 1961'de Almanya ile işgücü anlaşması; binlerce işçi Almanya'ya gitti.
// - 31 Ocak 1968: TRT'nin Ankara'dan ilk televizyon yayını; ilk anonsu spiker Nuran Devres yaptı.
//   Kısa sürede çatılar antenlerle doldu.
// - Köyden kente göç, büyük kentlerin çevresinde gecekondular.
// - 30 Ekim 1973: Cumhuriyet'in 50. yılında Boğaziçi Köprüsü açıldı; Asya ile Avrupa ilk kez köprüyle bağlandı.
// Karakter adları (Rıfat Bey, Nermin, Hasan, Gülizar) kurgu.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const istanbulda = (st) => st.yer === 'İstanbul';

export const ERA12 = {
  id: 12,
  name: 'Kalkınma yılları',
  place: 'Eskişehir',
  region: 'Eskişehir, Ankara ve İstanbul',
  year: '1961',
  currency: 'lira',
  start: 'd1',
  next: { name: 'Bilgi çağı', place: 'Ankara', year: '1993' },

  carry(st) {
    st.para = Math.min(30, Math.max(5, st.para * 2));
    st.enerji = Math.max(st.enerji, 70);
    const soyad = st.flags.includes('soyad_caglar') ? 'Çağlar' : st.flags.includes('soyad_tasci') ? 'Taşçı' : st.flags.includes('soyad_olmez') ? 'Ölmez' : st.flags.includes('soyad_yazici') ? 'Yazıcı' : '';
    return `Kesende ${st.para} lira var.${soyad ? ` Kimliğinde hâlâ aynı soyadı: ${soyad}.` : ''}`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Devrim ----------
    d1: {
      bg: 'devrim_atolye', hands: 'uzan', day: 1, place: 'Eskişehir', year: '1961',
      lines: [
        'Yirmi iki yıl geçti. Eskişehir\'de demiryolu *fabrikası*. Lokomotif tamir edilen dev salonlar.',
        'Ama bu yaz salonun bir köşesinde başka bir şey *yapılıyor*: Bir otomobil.',
        'Cumhurbaşkanı istemiş: "Kendi otomobilimizi *yapın*." Süre: Cumhuriyet Bayramı\'na kadar.',
        'Yüz yirmi dokuz *gün*.',
      ],
      choices: [
        { text: 'Motor ekibine katıl', req: (st) => st.akil >= st.beden || st.flags.includes('bakimci') || st.flags.includes('muhendis'), reqText: 'Motor bilgisi gerekli', effect: { akil: 1, flags: ['motor'] }, to: 'd2a' },
        { text: 'Kaporta ekibine katıl: sacı elle döv', effect: { beden: 1, flags: ['kaporta'] }, to: 'd2b' },
        { text: 'Gece bekçiliği yap, ustaları izle', effect: { para: 1 }, to: 'd2c' },
      ],
    },
    d2a: {
      bg: 'devrim_atolye', hands: 'kalem', day: 1,
      lines: [
        'Masada bir *motor* çizimi. Dört silindir. Her parça burada dökülecek, tornalanacak.',
        'Mühendis *Rıfat Bey*: "Hazır parça yok. Krank milini bile *biz* yapacağız."',
        { when: has('muhendis'), text: 'Zeytinburnu\'ndaki çizim masası. Yüz on yıl sonra yine *dişliler*.' },
        { when: has('cevirmen11'), text: 'Kayseri\'de çevirdiğin kılavuzlar gibi, yabancı kitaplar masada *açık*.' },
      ],
      choices: devam('d3'),
    },
    d2b: {
      bg: 'devrim_atolye', hands: 'cekic', day: 1,
      lines: [
        'Kalıp yok. Kaporta *tahta* kalıplar üstünde elle dövülüyor.',
        'Çekiç, örs, sabır. Her *çukur* düzeltiliyor.',
        { when: has('kaporta') , text: 'Kolların bu ritmi *biliyor*. Hattuşa\'da, Urartu\'da, Zeytinburnu\'nda.' },
      ],
      choices: devam('d3'),
    },
    d2c: {
      bg: 'devrim_atolye', hands: 'fener', day: 1,
      lines: [
        'Gece salonda *ışıklar* sönmüyor. Mühendisler eve gitmiyor.',
        'Biri tezgâhın başında *uyuyakalmış*. Elinde bir somun anahtarı.',
      ],
      choices: [
        { text: 'Üstüne bir battaniye ört', effect: { flags: ['battaniye'] }, to: 'd3' },
        { text: 'Çay demle, herkese dağıt', effect: { beden: 1 }, to: 'd3' },
      ],
    },
    d3: {
      bg: 'devrim_atolye', hands: 'uzan', day: 2,
      lines: [
        'Gazetelerde *alay* eden yazılar: "Bu ülke otomobil yapamaz."',
        'Salonda öfke. Bir usta gazeteyi *buruşturuyor*.',
        'Rıfat Bey: "Lafla değil, *motorla* cevap vereceğiz."',
      ],
      choices: [
        { text: 'Gazeteyi panoya as: "Hatırlayın"', effect: { akil: 1, flags: ['pano'] }, to: '@olay', then: 'd4' },
        { text: 'Gece vardiyasına gönüllü ol', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: '@olay', then: 'd4' },
      ],
    },
    d4: {
      bg: 'devrim_atolye', hands: 'uzan', day: 3,
      lines: [
        'Ekim. Motor *çalıştırılıyor*. Bir öksürük, bir tıkırtı...',
        'Ve bir *gürleme*. Salonda alkış kıyamet.',
        { when: has('motor'), text: 'Ayarını senin yaptığın karbüratör *düzgün* çalışıyor.' },
        'İki otomobil hazır: Biri *siyah*, biri bej. Adları: Devrim.',
      ],
      choices: aksam('d5'),
    },
    d5: {
      bg: 'tren_istasyon', hands: 'uzan', day: 4,
      lines: [
        'Arabalar trene yükleniyor. *Ankara*\'ya gidecekler.',
        'Bir görevli: "Güvenlik için *depoları* boşaltın. Yolda yangın çıkmasın."',
        'Benzin *boşaltılıyor*.',
      ],
      choices: [
        { text: '"Ankara\'da doldurmayı unutmayın!" diye bir not yaz', effect: { akil: 1, flags: ['not_benzin'] }, to: 'd6' },
        { text: 'Bir bidon benzini yanına al', cost: { para: 1 }, effect: { para: -1, flags: ['bidon'] }, to: 'd6' },
        { text: 'Bağları kontrol et, arabaları sabitle', effect: { beden: 1 }, to: 'd6' },
      ],
    },
    d6: {
      bg: 'toren', hands: 'uzan', day: 4, place: 'Ankara',
      lines: [
        '29 Ekim. Ankara\'da *bayram*. Meclisin önünde kalabalık.',
        'Cumhurbaşkanı *siyah* Devrim\'e biniyor. Motor çalışıyor. Araba hareket ediyor.',
        'On metre. Elli metre. Yüz metre...',
        'Ve araba *duruyor*.',
      ],
      choices: [
        { text: 'Bej Devrim\'in deposuna bidonu boşalt', show: has('bidon'), effect: { beden: 1, flags: ['bej_doldu'] }, to: 'd7' },
        { text: 'Kalabalıkta donup kal', to: 'd7' },
        { text: 'Mühendislerin yanına koş', effect: { beden: 1 }, to: 'd7' },
      ],
    },
    d7: {
      bg: 'toren', hands: 'uzan', day: 4,
      lines: [
        '"Ne oldu?" Direksiyondaki mühendis: "*Benzin* bitti, paşam."',
        { when: has('not_benzin'), text: 'Yazdığın not bir çantanın içinde, *okunmadan* kalmış. Telaşta kimse bakmamış.' },
        { when: has('bej_doldu'), text: 'Bej Devrim\'in deposu dolu. Cumhurbaşkanı ona *geçiyor*, araba yoluna devam ediyor.' },
        { when: not('bej_doldu'), text: 'Mühendisler bej Devrim\'e benzin bulup koyuyor. Cumhurbaşkanı ona *geçiyor*.' },
        'Ertesi gün gazeteler sadece duran arabayı *yazıyor*.',
      ],
      choices: [
        { text: '"Ama ikinci araba gitti!" diye bir gazeteye mektup yaz', effect: { akil: 1, flags: ['mektup_gazete'] }, to: 'd8' },
        { text: 'Mühendislerin yanında otur, sus', effect: { enerji: 5 }, to: 'd8' },
      ],
    },
    d8: {
      bg: 'devrim_atolye', hands: 'uzan', day: 5, place: 'Eskişehir',
      lines: [
        'Eskişehir\'e *dönüş*. Salon sessiz.',
        'Devrim *seri üretime* geçmeyecek. Ne para var, ne karar.',
        'Rıfat Bey arabanın kaputunu *okşuyor*: "Yaptık ama. Yaptığımızı kimse silemez."',
        { when: has('battaniye'), text: 'O gece battaniye örttüğün genç mühendis yanına geliyor: "Bir gün *yine* yapacağız."' },
      ],
      choices: aksam('a1'),
    },

    // ---------- BÖLÜM 2: Ekran ----------
    a1: {
      bg: 'kahve_tv', hands: 'uzan', day: 6, place: 'Ankara', year: '1968',
      lines: [
        'Yıllar geçiyor. Ankara\'da bir *kahvehane*. Duvarda tahta kasalı, yeni bir kutu.',
        'Ocak ayının son günü. Bütün mahalle *toplanmış*. Kapının önünde bile insanlar.',
        'Ekranda önce bir *test* görüntüsü. Sonra bir kadın yüzü, siyah beyaz.',
        '"Burası Ankara *Televizyonu*..."',
      ],
      choices: [
        { text: 'Yaşlılara ön sırada yer aç', effect: { beden: 1 }, to: 'a2' },
        { text: 'Görüntünün nasıl geldiğini düşün', effect: { akil: 1, flags: ['tv_merak'] }, to: 'a2' },
        { text: 'Kalabalığın yüzlerine bak', effect: { akil: 1 }, to: 'a2' },
      ],
    },
    a2: {
      bg: 'kahve_tv', hands: 'uzan', day: 6,
      lines: [
        'Görüntü bir an *karlanıyor*. Ekranda "Lütfen bekleyiniz" yazısı.',
        'Biri kalkıp kutuya *vuruyor*. Görüntü geri geliyor. Herkes gülüyor.',
        { when: has('tv_merak'), text: 'Telgrafın teli söz taşıyordu. Bu, *görüntü* taşıyor. Hem de telsiz.' },
        { when: has('mors_izle'), text: 'Galata\'daki telgrafhanede tıkırdayan makine aklına geliyor. Yüz on üç yıl.' },
        'Bu kutu bir gün her evde olacak. *Herkes* aynı anda aynı şeyi görecek.',
      ],
      choices: [
        { text: 'Kahveciye anten kurmayı öner', effect: { akil: 1, para: 1, flags: ['anten'] }, to: '@olay', then: 'a3' },
        { text: 'Programın sonuna kadar izle', effect: { enerji: 10 }, to: '@olay', then: 'a3' },
      ],
    },
    a3: {
      bg: 'gecekondu', hands: 'uzan', day: 7,
      lines: [
        'Birkaç ay sonra çatılar *antenlerle* dolu. Herkes çatıya çıkıp anten çeviriyor.',
        '"Biraz sola! Tamam, *geldi*!"',
        { when: has('anten'), text: 'Mahallede antenleri sen *kuruyorsun*. Sana "Antenci" diyorlar.' },
        'Ama Ankara\'nın kenarlarındaki *gecekondularda* televizyon yok. Elektrik bile yok.',
      ],
      choices: devam('g1'),
    },

    // ---------- BÖLÜM 3: Göç ----------
    g1: {
      bg: 'gecekondu', hands: 'uzan', day: 8, place: 'İstanbul', year: '1969',
      lines: [
        'İstanbul. Kentin kenarında bir *yamaç*. Tek katlı, aceleyle yapılmış evler.',
        'Anadolu\'nun her yerinden *gelmişler*: Sivas, Kastamonu, Erzurum, Giresun.',
        'Bir aile otobüsten iniyor. Baba *Hasan*, anne *Gülizar*, üç çocuk ve bir yorgan bohçası.',
        '"Burada *iş* var dediler. Fabrikalar var."',
      ],
      choices: [
        { text: 'Onlara mahalleyi göster', effect: { beden: 1, flags: ['hasan'] }, to: '@olay', then: 'g2' },
        { text: 'Hasan\'a fabrikada iş bulmayı öner', effect: { akil: 1, flags: ['hasan', 'is_buldu'] }, to: '@olay', then: 'g2' },
      ],
    },
    g2: {
      bg: 'gecekondu', hands: 'uzan', day: 8,
      lines: [
        'Hasan fısıldıyor: "Bir gecede *dam* atarsak yıkamazlar diyorlar."',
        'Bir *gelenek*: Çatısı sabaha kadar kapanan ev, kolay kolay yıkılmaz.',
        'Bütün mahalle *gece* toplanıyor. Tuğla, kiremit, tahta.',
      ],
      choices: [
        { text: 'Gece boyunca duvar ör', cost: { enerji: 25 }, effect: { enerji: -25, beden: 2, flags: ['dam'] }, to: 'g3' },
        { text: 'Çatı için ölçü al, kesimi planla', effect: { akil: 2, flags: ['dam'] }, to: 'g3' },
        { text: 'Komşulara çay ve ekmek dağıt', effect: { beden: 1 }, to: 'g3' },
      ],
    },
    g3: {
      bg: 'gecekondu', hands: 'uzan', day: 9,
      lines: [
        'Sabah ezanında son kiremit *yerine* konuyor.',
        'Gülizar ağlıyor. Çocuklar *yeni* evin içinde koşuyor.',
        { when: has('dam'), text: 'Ellerin yine *toz* içinde. Çatalhöyük\'teki kerpiç evler aklına geliyor.' },
        'Mahalleye su yok, yol yok, okul yok. Ama *umut* var.',
      ],
      choices: aksam('g4'),
    },
    g4: {
      bg: 'fabrika70', hands: 'uzan', day: 10,
      lines: [
        'Kentin sanayi bölgesinde *fabrikalar*: Buzdolabı, çamaşır makinesi, otomobil.',
        { when: has('is_buldu'), text: 'Hasan bir buzdolabı fabrikasında *bantta* çalışıyor. İlk kez sigortası var.' },
        'Bir otomobil fabrikası: Burada yerli markalı arabalar *yapılıyor*.',
        { when: (st) => st.flags.includes('motor') || st.flags.includes('kaporta'), text: 'Devrim\'in yolda kalmasından birkaç yıl sonra bu topraklarda *otomobil* üretimi başladı.' },
      ],
      choices: [
        { text: 'Montaj bandında çalış', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, para: 2, flags: ['bant'] }, to: 'g5' },
        { text: 'Kalite kontrolde çalış', req: (st) => st.akil >= st.beden || st.flags.includes('motor'), reqText: 'Teknik bilgin yetmiyor', effect: { akil: 1, para: 2, flags: ['kalite'] }, to: 'g5' },
      ],
    },
    g5: {
      bg: 'fabrika70', hands: 'cekic', day: 10,
      lines: [
        { when: has('bant'), text: 'Bant *durmuyor*. Bir somun, bir somun, bir somun. Sekiz saat.' },
        { when: has('kalite'), text: 'Her araba senin önünden *geçiyor*. Bir kapı aralığı, bir boya akıntısı.' },
        'Öğle arasında işçiler yemekhanede. Biri *Almanya*\'dan gelen kardeşinin mektubunu okuyor.',
        '"Orada maaşlar *üç* katı. Ama gurbet ağır."',
      ],
      choices: [
        { text: '"Burada kalıp burayı kuralım"', effect: { akil: 1 }, to: '@olay', then: 'g6' },
        { text: '"Git, kazan, dön"', effect: { beden: 1 }, to: '@olay', then: 'g6' },
      ],
    },
    g6: {
      bg: 'gecekondu', hands: 'uzan', day: 11, year: '1972',
      lines: [
        'Mahalle *değişiyor*. Elektrik geldi, su geldi. Bir ilkokul açıldı.',
        'Hasan\'ın büyük kızı *Nermin* liseyi bitirdi. Üniversiteye girmek istiyor.',
        '"Mühendis olacağım," diyor. "*Köprü* yapacağım."',
      ],
      choices: [
        { text: 'Nermin\'e matematik çalıştır', effect: { akil: 2, flags: ['nermin'] }, to: 'g7' },
        { text: 'Kayıt parası için katkıda bulun', cost: { para: 3 }, effect: { para: -3, flags: ['nermin', 'comert'] }, to: 'g7' },
        { text: 'Hasan\'ı ikna et: "Kızı okusun"', effect: { akil: 1, flags: ['nermin'] }, to: 'g7' },
      ],
    },
    g7: {
      bg: 'gecekondu', hands: 'kitap', day: 11,
      lines: [
        { when: has('nermin'), text: 'Nermin sınavı *kazanıyor*. Teknik üniversite. İnşaat mühendisliği.' },
        'Gülizar elleriyle *yufka* açıyor, komşulara dağıtıyor.',
        'Bir gecede çatısı atılan ev, şimdi bir *mühendis* yetiştiriyor.',
      ],
      choices: aksam('b1'),
    },

    // ---------- BÖLÜM 4: Köprü ----------
    b1: {
      bg: 'bogaz_kopru', hands: 'uzan', day: 12, year: '1973',
      lines: [
        'Boğaz\'ın iki yakasının arasına *halatlar* gerildi. Çelik tellerle örülmüş dev kablolar.',
        'Cumhuriyet\'in elli yaşına *bir* köprü.',
        { when: has('nermin'), text: 'Nermin staj için şantiyede. Baretiyle sana el *sallıyor*.' },
        'Asya ile Avrupa, binlerce yıl sonra *ilk* kez bir köprüyle birleşecek.',
      ],
      choices: [
        { text: 'Son kaynak işlerine gönüllü ol', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2 }, to: 'b2' },
        { text: 'Rüzgâr yükü hesaplarını Nermin\'le kontrol et', show: has('nermin'), effect: { akil: 2, flags: ['hesap_kopru'] }, to: 'b2' },
        { text: 'Kıyıdan izle', effect: { enerji: 10 }, to: 'b2' },
      ],
    },
    b2: {
      bg: 'bogaz_kopru', hands: 'uzan', day: 12,
      lines: [
        { when: has('pompa'), text: 'Lale Devri\'nde bu kıyılarda tulumbayla yangın söndürmüştün. *Kayıklar* vardı, köprü yoktu.' },
        { when: (st) => st.flags.includes('kayikci') || st.flags.includes('kayik'), text: 'Vapurlar kayıkçıların işini almıştı. Şimdi köprü *vapurların* bir kısmını alacak.' },
        'Konstantinopolis, İstanbul, iki kıta. Hep *suyla* ayrıldı.',
        'Yarın açılış.',
      ],
      choices: aksam('b3'),
    },
    b3: {
      bg: 'bogaz_kopru', hands: 'uzan', day: 13,
      lines: [
        '30 Ekim. Köprü *açıldı*. İlk gün insanlar yaya geçiyor.',
        'Yüz binlerce kişi. *Ortasında* duruyorsun. Altında Boğaz, gemiler, akıntı.',
        'Bir yanda *Asya*, öbür yanda Avrupa. Sen bir adımda ikisinin arasındasın.',
      ],
      choices: [
        { text: 'Hasan\'ın ailesiyle birlikte yürü', show: has('hasan'), effect: { beden: 1 }, to: 'b4' },
        { text: 'Korkuluğa yaslan, Boğaz\'a bak', effect: { enerji: 15 }, to: 'b4' },
        { text: 'Adımlarını say: Kaç adımda bir kıta?', effect: { akil: 1 }, to: 'b4' },
      ],
    },
    b4: {
      bg: 'bogaz_kopru', hands: 'uzan', day: 13,
      lines: [
        { when: has('nermin'), text: 'Nermin yanına geliyor: "Bir gün ben de bir köprü *çizeceğim*."' },
        { when: has('mektup_gazete'), text: 'Devrim için yazdığın mektup hiç yayımlanmadı. Ama köprünün açılışı her gazetede *manşet*.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'b5' }],
    },
    b5: {
      bg: 'bogaz_kopru', hands: 'dinlen', day: 13,
      lines: [
        'Bir gün bu Boğaz\'ın üstünde başka köprüler, altında bir *tünel* olacak.',
        'Bir gün bu topraklarda yerli *otomobiller* yeniden yapılacak. Devrim\'in mühendislerinin torunları.',
        'Ama önce başka bir şey *gelecek*: Teller değil, ekranlar değil...',
        'Herkesi herkese bağlayan, görünmeyen bir *ağ*.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_almanya: {
      bg: 'tren_istasyon', hands: 'uzan',
      lines: [
        'İstasyonda *Almanya*\'ya giden işçiler. Ellerinde karton bavullar.',
        'Bir anne oğluna *sarılmış*, bırakmıyor.',
      ],
      choices: [
        { text: 'Bavulunu vagona taşı', effect: { beden: 1 }, to: '@don' },
        { text: 'Anneye bir mektup adresi bırakmasını söyle', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_lokomotif: {
      bg: 'devrim_atolye', hands: 'cekic',
      lines: [
        'Salonun öbür ucunda yaşlı bir buharlı *lokomotif* bakımda. Kazanında çatlak var.',
        'Usta: "Bunlar *emekli* olacak. Yerlerine dizel geliyor."',
      ],
      choices: [
        { text: 'Kazanın kaynağına yardım et', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: '@don' },
        { text: 'Dizel motorun şemasını incele', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_lule: {
      bg: 'kasaba_meydan', hands: 'uzan',
      lines: [
        'Eskişehir çarşısında bir usta beyaz, yumuşak bir taşı *oyuyor*: Lületaşı.',
        'Taşın içinden bir pipo, bir sultan başı, bir *aslan* çıkıyor.',
      ],
      choices: [
        { text: 'Ustadan bir oyma dersi al', effect: { akil: 1 }, to: '@don' },
        { text: 'Küçük bir aslan figürü satın al', cost: { para: 1 }, effect: { para: -1, flags: ['lule_aslan'] }, to: '@don' },
      ],
    },
    e_antenci: {
      bg: 'kahve_tv', hands: 'uzan',
      lines: [
        'Komşunun televizyonunda görüntü *karlı*. Çatıya çıkmaya korkuyor.',
        '"Biraz döndürsek gelir mi?"',
      ],
      choices: [
        { text: 'Çatıya çık, anteni çevir', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Vericinin yönünü hesapla, tarif et', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_dolmus: {
      bg: 'gecekondu', hands: 'uzan',
      lines: [
        'Bir *dolmuş* tıklım tıklım. Şoför: "Bir kişi daha *alırız*!"',
        'İçerideki herkes *iç çekiyor*.',
      ],
      choices: [
        { text: 'Bin, sıkış', cost: { para: 1 }, effect: { para: -1, enerji: -5 }, to: '@don' },
        { text: 'Yürü', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
      ],
    },
    e_plak: {
      bg: 'kahve_tv', hands: 'uzan',
      lines: [
        'Bir dükkânda yeni çıkan bir *plak* çalıyor. Elektro bağlama, Anadolu ezgisi.',
        'Gençler kapının önünde *ritim* tutuyor.',
      ],
      choices: [
        { text: 'Plağı satın al', cost: { para: 1 }, effect: { para: -1, enerji: 10 }, to: '@don' },
        { text: 'Bu ezgiyi tanı: Bin yıllık bir türkü', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_bakkal: {
      bg: 'gecekondu', hands: 'kitap',
      lines: [
        'Mahalle bakkalının *veresiye* defteri dolmuş. Ay sonu gelmiş, kimse ödeyemiyor.',
        'Bakkal *Kâzım Amca* kalemini çiğniyor.',
      ],
      choices: [
        { text: 'Defteri düzenle, ödeme planı yap', effect: { akil: 1 }, to: '@don' },
        { text: 'Bir komşunun borcunu sen kapat', cost: { para: 2 }, effect: { para: -2, flags: ['comert'] }, to: '@don' },
      ],
    },
    e_sinema: {
      bg: 'kahve_tv', hands: 'uzan',
      lines: [
        'Yazlık *sinemada* bir aile filmi. Çekirdek sesleri, gazoz kapakları.',
        'Film kopuyor. Bütün bahçe *ıslık* çalıyor.',
      ],
      choices: [
        { text: 'Makiniste filmi yapıştırmasında yardım et', effect: { akil: 1 }, to: '@don' },
        { text: 'Gülerek çekirdek çitle', effect: { enerji: 10 }, to: '@don' },
      ],
    },
    e_su: {
      bg: 'gecekondu', hands: 'sepet',
      lines: [
        'Mahallenin tek *çeşmesinde* kuyruk. Bidonlar, kovalar, çocuklar.',
        'Yaşlı bir kadın bidonunu *taşıyamıyor*.',
      ],
      choices: [
        { text: 'Bidonu evine taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Belediyeye dilekçe yazmayı öner', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_mac: {
      bg: 'kahve_tv', hands: 'uzan',
      lines: [
        'Kahvehanede *radyodan* maç anlatılıyor. Spiker bağırıyor: "Gooool!"',
        'Bütün kahve *ayakta*.',
      ],
      choices: [
        { text: 'Sen de bağır', effect: { enerji: 10 }, to: '@don' },
        { text: 'Tavla oyna', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_simit12: {
      bg: 'bogaz_kopru', hands: 'sepet',
      lines: [
        'Vapurda martılara *simit* atan çocuklar.',
        'Bir martı simidi havada *kapıyor*. Herkes alkışlıyor.',
      ],
      choices: [
        { text: 'Sen de at', cost: { para: 1 }, effect: { para: -1, enerji: 10 }, to: '@don' },
        { text: 'Vapurun çay ocağına yardım et', effect: { beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_ogrenci: {
      bg: 'gecekondu', hands: 'kitap',
      lines: [
        'Mahallenin çocukları *ödev* yapamıyor. Evlerde masa yok, ışık az.',
        'Kahvehanenin arka odası *boş*.',
      ],
      choices: [
        { text: 'Arka odayı etüt odası yap', effect: { akil: 1, flags: ['etut'] }, to: '@don' },
        { text: 'Masa yapmak için tahta topla', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'almanya', start: 'e_almanya', when: (st) => !istanbulda(st) },
    { id: 'plak', start: 'e_plak' },
    { id: 'lokomotif', start: 'e_lokomotif', when: (st) => st.yer === 'Eskişehir' },
    { id: 'lule', start: 'e_lule', when: (st) => st.yer === 'Eskişehir' },
    { id: 'antenci', start: 'e_antenci', when: (st) => st.yer === 'Ankara' },
    { id: 'mac', start: 'e_mac' },
    { id: 'sinema', start: 'e_sinema' },
    { id: 'dolmus', start: 'e_dolmus', when: istanbulda },
    { id: 'bakkal', start: 'e_bakkal', when: istanbulda },
    { id: 'su', start: 'e_su', when: istanbulda },
    { id: 'ogrenci', start: 'e_ogrenci', when: istanbulda },
    { id: 'simit12', start: 'e_simit12', when: istanbulda },
  ],
};

ERA12.hub = {
  intro: (st) => istanbulda(st)
    ? ['Akşam. Gecekonduların camlarında gaz lambaları, sonra *ampuller*.', 'Boğaz\'da vapur düdükleri.', 'Radyoda bir türkü, komşudan *yemek* kokusu.']
    : ['Akşam. Fabrikanın lambaları *yanıyor*.', 'Kahvehanede tavla *şakırtısı*.', 'Uzaktan bir tren *geçiyor*.'],
  acts: [
    { id: 'atolye', show: (st) => !istanbulda(st), text: 'Atölyede gece mesaisi', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'cekic',
      res: [['Torna tezgâhı *dönüyor*.', 'İki lira fazla.'], ['Bir parça *tam* ölçüsünde.', 'Usta başını sallıyor.']] },
    { id: 'kitap', show: (st) => !istanbulda(st), text: 'Teknik kitap oku', effect: { akil: 1 }, hands: 'kitap',
      res: [['Motor, *şanzıman*, diferansiyel.', 'Bir otomobilin içini öğreniyorsun.'], ['Kitabın kenarlarına *notlar* alıyorsun.', 'Gece geç oluyor.']] },
    { id: 'insaat', show: istanbulda, text: 'İnşaatta yevmiyeli çalış', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'kerpic',
      res: [['Tuğla, harç, *iskele*.', 'Kent büyüyor, sen de büyütüyorsun.'], ['Gün sonunda yevmiye *elinde*.', 'İki lira.']] },
    { id: 'dershane', show: istanbulda, text: 'Mahalle çocuklarına ders ver', effect: { akil: 1 }, hands: 'kitap',
      res: [['Kesirler, *paydalar*.', 'Bir çocuk birden anlıyor. Yüzü aydınlanıyor.'], ['Türkçe kompozisyon: "*Köyüm*."', 'Hepsi bir yerden gelmiş.']] },
    { id: 'tv', text: 'Kahvede televizyon izle', cost: { para: 1 }, effect: { para: -1, enerji: 10 },
      res: [['Siyah beyaz bir *dizi*. Herkes sessiz.', 'Ekran bir ocak başı gibi.'], ['Haberler. Ay\'a *insan* gitmiş!', 'Kahvede kimse inanamıyor.']] },
    { id: 'tavla', text: 'Tavla oyna', effect: { akil: 1, enerji: 5 },
      res: [['Altı-beş! *Kazandın*.', 'Rakibin söyleniyor.'], ['Pul *kırıldı*. Kaybettin.', 'Bir dahaki sefere.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda bir *köprü* görüyorsun. Ucu görünmüyor.', 'Dinlendin.']] },
  ],
};
