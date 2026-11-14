// ÇAĞ 2 — Yerleşik hayat, Çatalhöyük (MÖ 7400)
// Yazım kuralları: tasarım belgesindeki "Ajanın uyacağı yazım kuralları".
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak: sokaksız, damdan girilen bitişik evler; sıvalı duvarlar ve platformlar;
// boğa başı düzenlemeleri, duvar resimleri; ölülerin ev tabanına gömülmesi; obsidyen aynalar;
// tahıl ambarında bulunan "Oturan Kadın" heykelciği; eşit büyüklükte evler (eşitlikçi toplum);
// en erken çanak çömlek; deniz kabuğu takası; nüfus artınca yeni köylere dağılma.

const has = (f) => (st) => st.flags.includes(f);
const akil = (st) => st.akil - (st.eraBase?.akil || 0);
const beden = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];

export const ERA2 = {
  id: 2,
  name: 'Yerleşik hayat',
  place: 'Çatalhöyük',
  region: 'Konya',
  year: 'MÖ 7400',
  currency: 'buğday',
  start: 'c1',
  next: { name: 'Yazının gelişi', place: 'Kültepe', year: 'MÖ 1900' },

  // Çağ geçişi: önceki çağdan kalanlar yeni çağa nasıl taşınır.
  carry(st) {
    const eski = st.para;
    st.para = Math.max(2, eski * 2);
    st.enerji = Math.max(st.enerji, 70);
    const obs = st.flags.includes('obsidyen') ? ' Obsidyenin hâlâ yanında.' : '';
    return `${eski} çakmaktaşın takasla ${st.para} ölçek buğdaya dönüştü.${obs}`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Varış ----------
    c1: {
      bg: 'catal_damlar', hands: 'uzan', day: 1,
      lines: [
        'Gözlerini açtığında yüzlerce yıl *geçmiş*. Sen aynı sensin, dünya değil.',
        'Konya Ovası. Yüzlerce kerpiç ev birbirine *yapışık*.',
        'Sokak yok. İnsanlar damların üstünde yürüyor, evlere *merdivenle* iniyor.',
        { when: has('kopek'), text: 'Damlarda köpekler dolaşıyor. Kurt yavrusunu *hatırlıyorsun*.' },
        'Yaşlı bir kadın yanına geliyor: *Ece Nine*. "Yabancı, nerede uyuyacaksın?"',
      ],
      choices: [
        { text: 'Kendi evini yap', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['kendi_evi'] }, to: 'c2a' },
        { text: 'Ece Nine\'ye yardım et, karşılığında yer iste', effect: { akil: 1, flags: ['nine_evi'] }, to: 'c2b' },
      ],
    },
    c2a: {
      bg: 'catal_damlar', hands: 'kerpic', day: 1,
      lines: [
        'Çamuru samanla karıp tahta kalıplara *döküyorsun*.',
        'Güneş tuğlaları kurutuyor. Sırtın da kuruyor.',
        'Üç gün sonra dört duvarın var. Komşular damını örtmene *yardım* ediyor.',
        'Evin kapısı yok. Girişi *damdan*, bir merdivenle.',
      ],
      choices: [{ text: 'Evine in', to: 'c2c' }],
    },
    c2b: {
      bg: 'ev_ici', hands: 'uzan', day: 1,
      lines: [
        'Ece Nine\'nin evi küçük ama *sıcak*.',
        'Duvarda boğa boynuzları, kırmızı *resimler*. Duvarlar bembeyaz sıvalı.',
        '"Kal," diyor. "Ama karşılığında tarlada *çalışacaksın*."',
      ],
      choices: [{ text: 'Yerleş', to: 'c2c' }],
    },
    c2c: {
      bg: 'ev_ici', hands: 'dinlen', day: 1,
      lines: [
        'İlk gece. Damdaki delikten yıldızlar *görünüyor*.',
        'Duvardaki boğa başları karanlıkta seni *izliyor* gibi.',
        'Bu köyde bütün evler aşağı yukarı *aynı* büyüklükte. Kimse kimseden üstün değil.',
      ],
      choices: [
        { text: 'Komşuları tek tek ziyaret et', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['komsu'] }, to: '@aksam', then: 'c3' },
        { text: 'Erkenden uyu', effect: { enerji: 15 }, to: '@aksam', then: 'c3' },
      ],
    },

    // ---------- BÖLÜM 2: Hasat ve ambar ----------
    c3: {
      bg: 'tarla', hands: 'orak', day: 2,
      lines: [
        'Hasat zamanı. Buğday başakları *altın* gibi.',
        'Herkesin elinde bir orak. Ağzına keskin taşlar dizilmiş.',
        { when: has('tohum_sakla'), text: 'Bu başaklar Karacadağ\'dakilerden *farklı*: taneleri dökülmüyor. Bir zamanlar senin seçtiğin gibi.' },
        { when: (st) => st.akil > st.beden, text: 'Çayın suyu tarlaya bu kadar yakınken neden *taşıyorlar*, diye düşünüyorsun.' },
        'Akşama kadar ne yapacağına sen karar ver.',
      ],
      choices: [
        { text: 'Gün boyu durmadan biç', cost: { enerji: 25 }, effect: { enerji: -25, beden: 1, para: 3 }, to: 'c4a' },
        { text: 'Çaydan tarlaya bir kanal açmayı öner', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['kanal'] }, to: 'c4b' },
        { text: 'Gölgede dinlenip başkalarını izle', effect: { enerji: 10 }, to: 'c4c' },
      ],
    },
    c4a: {
      bg: 'tarla', hands: 'sepet', day: 2,
      lines: [
        'Güneş batarken kolların *titriyor*.',
        'Ama sepetin dolu. Ambarına üç ölçek buğday giriyor.',
      ],
      choices: [{ text: 'Ambara git', to: 'h1' }],
    },
    c4b: {
      bg: 'tarla', hands: 'uzan', day: 2,
      lines: [
        'Önce sana gülüyorlar. Sonra kazmaya *başlıyorlar*.',
        'Su tarlaya akınca kimse gülmüyor.',
        'Gelecek yıl hasat belki iki *katı* olacak.',
      ],
      choices: [{ text: 'Ambara git', effect: { para: 1 }, to: 'h1' }],
    },
    c4c: {
      bg: 'tarla', hands: 'dinlen', day: 2,
      lines: [
        'Herkes çalışırken sen dinleniyorsun. Herkes bunu *görüyor*.',
        'Akşam ambarın boş. Ece Nine başını iki yana *sallıyor*.',
      ],
      choices: [{ text: 'Ambara git', effect: { flags: ['tembel'] }, to: 'h1' }],
    },
    h1: {
      bg: 'ev_ici', hands: 'sepet', day: 2,
      lines: [
        'Buğday evin arka odasındaki ambara *dökülüyor*.',
        'Ece Nine ambarın içine kilden küçük bir *kadın heykeli* koyuyor.',
        'Heykeldeki kadın iri ve oturuyor. İki yanında birer *leopar*.',
        '"Ambar boş kalmasın diye," diyor.',
      ],
      choices: [
        { text: 'Sen de kilden bir heykel yap', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1, flags: ['heykel'] }, to: 'h1a' },
        { text: 'Ne anlama geldiğini sor', to: 'h1b' },
      ],
    },
    h1a: {
      bg: 'ev_ici', hands: 'uzan', day: 2,
      lines: [
        'Parmakların kili yoğuruyor. Ortaya tuhaf bir şey *çıkıyor*.',
        'Ece Nine kahkahayı basıyor: "Bu kadın mı, keçi mi?"',
        'Ama heykelini ambarın öbür köşesine *koyuyor*.',
      ],
      choices: [{ text: 'Ocağın başına geç', to: 'h2' }],
    },
    h1b: {
      bg: 'ev_ici', hands: 'uzan', day: 2,
      lines: [
        'Ece Nine omuz silkiyor: "Annem de koyardı. Onun annesi de."',
        'Bazı soruların cevabı bir *alışkanlıktır*.',
        'Binlerce yıl sonra bu heykel bir müzede *sergilenecek*.',
      ],
      choices: [{ text: 'Ocağın başına geç', to: 'h2' }],
    },
    h2: {
      bg: 'ev_ici', hands: 'uzan', day: 2,
      lines: [
        'Ocak başında kadınlar kilden *kaplar* yapıyor.',
        'Kil kuruyunca çatlıyor. Ama ateşte pişince *taşlaşıyor*.',
        'Bu, dünyanın en eski çömleklerinden *bazıları*.',
      ],
      choices: [
        { text: 'Kabı ateşin içinde uzun süre pişir', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['comlek'] }, to: 'h3a' },
        { text: 'Güneşte kurut, yeter', to: 'h3b' },
      ],
    },
    h3a: {
      bg: 'ev_ici', hands: 'uzan', day: 2,
      lines: [
        'Kap kızıl renge dönüyor. Parmağınla vurunca *çınlıyor*.',
        'Artık içinde su tutabilir. Komşular aynısından *istiyor*.',
      ],
      choices: [{ text: 'Devam et', effect: { para: 1 }, to: '@aksam', then: 'c5' }],
    },
    h3b: {
      bg: 'ev_ici', hands: 'uzan', day: 2,
      lines: [
        'Kap güneşte *çatlıyor*.',
        'İçine koyduğun su yere *akıyor*. Ece Nine gülümsüyor.',
      ],
      choices: aksam('c5'),
    },

    // ---------- BÖLÜM 3: Obsidyen ----------
    c5: {
      bg: 'catal_damlar', hands: 'sepet', day: 3,
      lines: [
        'Dağdan bir kervan geldi. Sırtlarında *obsidyen* var.',
        'Hasan Dağı\'nın kara camı. Burada her şeyden değerli.',
        { when: has('obsidyen'), text: 'Seninkini görünce gözleri parlıyor. "Bu çok eski bir *işçilik*."' },
        '"Üç ölçek buğdaya bir parça," diyorlar.',
      ],
      choices: [
        { text: '3 buğday ver, obsidyen al', cost: { para: 3 }, effect: { para: -3, flags: ['obsidyen'] }, to: '@aksam', then: 'k1', show: (st) => !st.flags.includes('obsidyen') },
        { text: 'Eski obsidyeninden bıçak yapıp sat', req: has('obsidyen'), reqText: 'Obsidyenin yok', cost: { enerji: 10 }, effect: { enerji: -10, para: 5, akil: 1, flags: ['bicakci'] }, to: '@aksam', then: 'k1' },
        { text: 'Kervanla dağa git, obsidyeni yerinde gör', cost: { enerji: 20 }, effect: { enerji: -20, flags: ['dag'] }, to: 'o1' },
        { text: 'Takasa girme, buğdayını sakla', to: '@aksam', then: 'k1' },
      ],
    },
    o1: {
      bg: 'obsidyen_dag', hands: 'yok', day: 3,
      lines: [
        'Günlerce yürüyorsunuz. Karşında iki tepeli *Hasan Dağı*.',
        'Yamaçlarda kapkara camdan kayalar *parlıyor*.',
        'Kervancı: "Ne kadar taşırsan o kadar *zenginsin*."',
      ],
      choices: [
        { text: 'Sırtına sığdığı kadar yükle', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 4 }, to: 'o2a' },
        { text: 'Az ama kusursuz, düz bir parça ara', effect: { akil: 1, flags: ['ayna_tasi'] }, to: 'o2b' },
      ],
    },
    o2a: {
      bg: 'obsidyen_dag', hands: 'uzan', day: 3,
      lines: [
        'Sırtın eğiliyor ama yük *değerli*.',
        'Dönüş yolunda her adım bir *işkence*.',
        'Köye varınca obsidyeni buğdayla takas ediyorsun.',
      ],
      choices: aksam('k1', 'Köye dön'),
    },
    o2b: {
      bg: 'obsidyen_dag', hands: 'uzan', day: 3,
      lines: [
        'Saatlerce arıyorsun. Sonunda pürüzsüz, düz bir parça *buluyorsun*.',
        'Bunu parlatırsan bir *ayna* olur.',
      ],
      choices: [{ text: 'Köye dön ve parlat', to: 'o3' }],
    },
    o3: {
      bg: 'ayna', hands: 'yok', day: 3, textTop: true,
      lines: [
        'Taşı önce kumla, sonra deriyle günlerce *parlatıyorsun*.',
        'Sonunda kara camda bir yüz *beliriyor*.',
        '*Senin* yüzün. Yüzyıllar geçmiş ama hiç değişmemiş.',
      ],
      choices: [
        { text: 'Aynayı sakla', effect: { flags: ['ayna'] }, to: '@aksam', then: 'k1' },
        { text: 'Aynayı takas et', effect: { para: 5 }, to: '@aksam', then: 'k1' },
      ],
    },

    // ---------- BÖLÜM 3b: Kıtlık kışı ----------
    k1: {
      bg: 'kis', hands: 'yok', day: 4,
      lines: [
        'Kış bu yıl çok sert *geldi*. Ova bembeyaz.',
        'Ambarlar hızla *boşalıyor*. Bazı evlerde ekmek kalmadı.',
        'Herkes birbirinin ambarına *bakıyor*.',
      ],
      choices: [
        { text: 'Ambarını komşularla paylaş', cost: { para: 2 }, effect: { para: -2, flags: ['kis_paylasti'] }, to: 'k2' },
        { text: 'Ambarını kapat, kendine sakla', effect: { flags: ['kis_sakladi'] }, to: 'k2' },
        { text: 'Avcılarla karda av aramaya çık', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, para: 1 }, to: 'k2' },
      ],
    },
    k2: {
      bg: 'kis', hands: 'uzan', day: 4,
      lines: [
        { when: has('kis_paylasti'), text: 'Komşular kapını *çalıyor*. Ellerinde boş kaplar, gözlerinde utanç.' },
        { when: has('kis_paylasti'), text: 'Payını veriyorsun. Kimse kimseye *borçlu* hissetmiyor; burada herkes eşit.' },
        { when: has('kis_sakladi'), text: 'Ambarın dolu. Ama damda yürürken kimse sana *selam* vermiyor.' },
        { when: (st) => !st.flags.includes('kis_paylasti') && !st.flags.includes('kis_sakladi'), text: 'Karda bir geyik izi *buluyorsunuz*. Avcılarla et bölüşülüyor.' },
        'Kış daha *bitmedi*.',
      ],
      choices: [{ text: 'Devam et', to: 'k3' }],
    },
    k3: {
      bg: 'ev_ici', hands: 'yok', day: 4,
      lines: [
        'Komşunun küçük oğlu *hasta*. Ateşler içinde yanıyor.',
        'Annesi çaresiz. Yaşlılar *kuru otları* ezip kaynatıyor.',
      ],
      choices: [
        { text: 'Bütün gece başında bekle, alnını serinlet', cost: { enerji: 15 }, effect: { enerji: -15, flags: ['cocuk_bakti'] }, to: 'k4' },
        { text: 'Otları yaşlılarla birlikte hazırla', effect: { akil: 1 }, to: 'k4' },
        { text: 'Hastalık bulaşmasın diye uzak dur', to: 'k4' },
      ],
    },
    k4: {
      bg: 'ev_ici', hands: 'dinlen', day: 4,
      lines: [
        { when: has('cocuk_bakti'), text: 'Şafakta ateş *düşüyor*. Çocuk gözlerini açıp sana bakıyor.' },
        { when: (st) => !st.flags.includes('cocuk_bakti'), text: 'Günler sonra çocuk *iyileşiyor*. Ama çok zayıf.' },
        'Kış bazen bir *öğretmendir*: Kimin yanında olduğunu gösterir.',
      ],
      choices: [{ text: 'Baharı bekle', to: 'k5' }],
    },
    k5: {
      bg: 'ev_ici', hands: 'uzan', day: 5,
      lines: [
        'Kış sonu. Köy, atalarını *anmak* için toplanıyor.',
        'Burada atalar ölünce de aileden kopmaz. Evin tabanında, ailenin *altında* yatarlar.',
        'Bazen en saygın atanın kafatası çıkarılır, *sıvayla* yeniden yüz verilir.',
      ],
      choices: [
        { text: 'Törene katıl, sıvayı sen hazırla', effect: { akil: 1, flags: ['tore'] }, to: 'k6' },
        { text: 'Saygıyla uzaktan izle', to: 'k6' },
      ],
    },
    k6: {
      bg: 'kis', hands: 'uzan', day: 5,
      lines: [
        'Karlar eriyor. Damlarda ilk *güneş*.',
        { when: has('tore'), text: 'Sıvadan yüze bakarken düşünüyorsun: Bir gün *seni* de böyle mi anacaklar?' },
        { when: has('kis_paylasti'), text: 'Paylaştığın buğday geri *dönüyor*: Komşular tarlana tohum getiriyor.' },
        { when: has('kis_sakladi'), text: 'Ambarın hâlâ dolu. Ama ilk tarla imecesine *çağrılmıyorsun*.' },
      ],
      choices: [{ text: 'Bahara hazırlan', effect: { enerji: 20 }, to: 'c6' }],
    },

    // ---------- BÖLÜM 4: Duvar resmi ve av ----------
    c6: {
      bg: 'ev_ici', hands: 'firca', day: 4,
      lines: [
        'Ece Nine duvarı yeniden *sıvıyor*. Bembeyaz.',
        'Elinde kırmızı aşı boyası var. Fırçayı sana uzatıyor.',
        '"Ne çizersen, bu ev onu *hatırlar*."',
      ],
      choices: [
        { text: 'Av sahnesi: geyik ve boğa', effect: { beden: 1, flags: ['resim_av'] }, to: 'c7' },
        { text: 'Ova ve yanardağ: köyün haritası', effect: { akil: 1, flags: ['resim_harita'] }, to: 'c7' },
        { text: 'İki leopar: güç ve korku', effect: { flags: ['resim_leopar'] }, to: 'c7' },
      ],
    },
    c7: {
      bg: 'ev_ici', hands: 'firca', day: 4,
      lines: [
        { when: has('resim_av'), text: 'Duvarda koşan geyikler, *öfkeli* bir boğa.' },
        { when: has('resim_harita'), text: 'Duvarda yan yana evler ve arkada iki tepeli bir *yanardağ*.' },
        { when: has('resim_leopar'), text: 'Duvarda birbirine bakan iki *leopar*.' },
        'Binlerce yıl sonra biri bu duvarı *kazıyla* bulacak.',
        { when: has('resim_harita'), text: 'Bu resmin, dünyanın bilinen en eski *haritalarından* biri olabileceği düşünülecek.' },
      ],
      choices: [{ text: 'Uyumaya git', to: 'r1' }],
    },
    r1: {
      bg: 'ev_ici', hands: 'uzan', day: 4,
      lines: [
        'Bu evlerin duvarları her yıl yeniden *sıvanır*.',
        'Kazıp baksan, yüzlerce ince sıva katı *görürsün*. Her biri bir yıl.',
        'Resimler de katların arasında *saklanır*.',
      ],
      choices: [
        { text: 'Gelecek yıl resmin üstünü örtüp yenisini çizeceğim', effect: { flags: ['resim_ortu'] }, to: 'c8' },
        { text: 'Resmi koru, çevresini sıva', effect: { akil: 1 }, to: 'c8' },
      ],
    },
    c8: {
      bg: 'yaban_sigiri', hands: 'mizrak', day: 5,
      lines: [
        'Ovada dev bir *yaban sığırı* görüldü.',
        'Boynuzları evlerin duvarına asılacak. Eti bütün köyü doyuracak.',
        { when: has('cesur'), text: 'Yüzyıllar önce kurtların karşısında da *korkmamıştın*.' },
        'Avcılar seni bekliyor.',
      ],
      choices: [
        { text: 'Ava katıl', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['boga_avi'] }, to: 'c9a' },
        { text: 'Bir buzağı yakala, ağılda büyüt', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['buzagi'] }, to: 'c9b' },
        { text: 'Köyde kal, ambarı koru', to: 'c9c' },
      ],
    },
    c9a: {
      bg: 'yaban_sigiri', hands: 'mizrak', day: 5,
      lines: [
        'Sığır üstüne koşuyor. Yer *sarsılıyor*.',
        'Mızraklar bir bir saplanıyor. Dev hayvan dizlerinin üstüne çöküyor.',
        'O gece boynuzlar senin evinin duvarına *asılıyor*.',
      ],
      choices: [{ text: 'Bahara kadar bekle', effect: { para: 2 }, to: '@aksam', then: 'c10' }],
    },
    c9b: {
      bg: 'yaban_sigiri', hands: 'uzan', day: 5,
      lines: [
        'Koyunlar, keçiler zaten evcil. Ya sığırlar da *evcilleşirse*?',
        'Annesinden ayrılmış bir buzağıyı ağıla götürüyorsun.',
        'Herkes "deli" diyor. Sen sabırla *bekliyorsun*.',
      ],
      choices: aksam('c10', 'Bahara kadar bekle'),
    },
    c9c: {
      bg: 'gece_dam_kisi', hands: 'mesale', day: 5,
      lines: [
        'Gece ambarda bir *hışırtı*.',
        'Meşaleyi kaldırıyorsun: komşunun oğlu, elinde senin buğdayın.',
      ],
      choices: [
        { text: 'Affet, buğdayın bir kısmını ver', cost: { para: 1 }, effect: { para: -1, flags: ['affetti'] }, to: '@aksam', then: 'c10' },
        { text: 'Herkese söyle', effect: { flags: ['ihbar'] }, to: '@aksam', then: 'c10' },
      ],
    },

    // ---------- BÖLÜM 5: Sel, göç ve veda ----------
    c10: {
      bg: 'nehir_tasma', hands: 'yok', day: 6,
      lines: [
        'Bahar. Günlerdir yağmur *yağıyor*.',
        'Çarşamba Çayı taştı. Su, tarlalara ve en alttaki evlere doğru geliyor.',
        { when: has('kanal'), text: 'Açtığın kanal suyun bir kısmını *ovaya* taşıyor. Ama yetmiyor.' },
        'Bir şey yapmalısın. *Hemen*.',
      ],
      choices: [
        { text: 'Herkesle birlikte toprak set çek', cost: { enerji: 25 }, effect: { enerji: -25, beden: 1, flags: ['set'] }, to: 'c11' },
        { text: 'Ambardaki buğdayı damlara taşı', cost: { enerji: 15 }, effect: { enerji: -15, akil: 1, flags: ['ambar_kurtardi'] }, to: 'c11' },
        { text: 'Kanalı genişlet, suyu ovaya ver', req: has('kanal'), reqText: 'Kanal açmadın', cost: { enerji: 15 }, effect: { enerji: -15, akil: 2, flags: ['kanal_kurtardi'] }, to: 'c11' },
        { text: 'Dama çık, suyun çekilmesini bekle', effect: { para: -2, flags: ['bekledi'] }, to: 'c11' },
      ],
    },
    c11: {
      bg: 'catal_damlar', hands: 'uzan', day: 7,
      lines: [
        { when: has('kanal_kurtardi'), text: 'Su ovaya yayılıyor, evlere *ulaşamıyor*. Köy seni konuşuyor.' },
        { when: has('set'), text: 'Set tutuyor. Çamura bulanmış onlarca kişi aynı anda *gülüyor*.' },
        { when: (st) => st.flags.includes('ambar_kurtardi') && !st.flags.includes('kanal_kurtardi'), text: 'Alt evler su aldı. Ama buğday *kurtuldu*. Kış aç geçmeyecek.' },
        { when: has('bekledi'), text: 'Alt evler su aldı. Ambarındaki buğdayın bir kısmı *çürüdü*.' },
        { when: has('ihbar'), text: 'Komşunun oğlu sana bakmıyor. Bazı yaralar suyla *gitmiyor*.' },
        { when: has('affetti'), text: 'Komşunun oğlu en önde çamur taşıyor. Sana *borcunu* böyle ödüyor.' },
        'Sular çekiliyor. Hayat *devam* ediyor.',
      ],
      choices: [{ text: 'Köyü dolaş', effect: { enerji: 20 }, to: 'g1' }],
    },
    g1: {
      bg: 'catal_damlar', hands: 'uzan', day: 7,
      lines: [
        'Köy artık çok *kalabalık*. Evler üst üste, insanlar iç içe.',
        'Selden sonra bir *hastalık* kol geziyor.',
        'Bazı aileler ovanın başka yerlerinde yeni köyler *kurmaya* karar veriyor.',
      ],
      choices: [
        { text: 'Hastalara bakmaya yardım et', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, flags: ['hasta_bakti'] }, to: 'g2' },
        { text: 'Göç edecek ailelere yeni yer seçmede yardım et', effect: { akil: 1, flags: ['goce_yardim'] }, to: 'g2' },
        { text: 'Kendi işine bak', to: 'g2' },
      ],
    },
    g2: {
      bg: 'catal_damlar', hands: 'uzan', day: 7,
      lines: [
        { when: has('hasta_bakti'), text: 'Günlerce su ve lapa taşıyorsun. Çoğu hasta *iyileşiyor*.' },
        { when: has('goce_yardim'), text: 'Suya yakın, selden uzak bir yer *gösteriyorsun*. Aileler minnetle yola çıkıyor.' },
        { when: (st) => !st.flags.includes('hasta_bakti') && !st.flags.includes('goce_yardim'), text: 'Kapını kapatıp bekliyorsun. Hastalık *geçiyor*. Ama bazı yüzler artık yok.' },
        'Ece Nine çok yorgun *görünüyor*.',
      ],
      choices: aksam('c12', 'Ece Nine\'nin yanına git'),
    },
    c12: {
      bg: 'gece_dam', hands: 'dinlen', day: 8,
      lines: [
        'Ece Nine o gece *gözlerini* kapıyor. Bir daha açmıyor.',
        'Burada ölüler uzağa gitmez. Evin tabanının altına, *ailenin* yanına gömülür.',
        { when: has('nine_evi'), text: '"Ev senin," demişti son günlerinde. "Ne yapacağını sen *bilirsin*."' },
        { when: has('kendi_evi'), text: 'Nine\'nin evi boş kaldı. Köy, kimin olacağını sana *soruyor*.' },
      ],
      choices: [
        { text: 'Evi gelenekle yık, üstüne yenisini yap', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, flags: ['yeniden_yapti'] }, to: 'c13' },
        { text: 'Evi olduğu gibi koru', effect: { flags: ['ev_korundu'] }, to: 'c13' },
        { text: 'Evi göçmen bir aileye ver', effect: { akil: 1, flags: ['evi_verdi'] }, to: 'c13' },
      ],
    },
    c13: {
      bg: 'catal_damlar', hands: 'uzan', day: 9,
      lines: [
        { when: has('yeniden_yapti'), text: 'Yeni ev eskisinin *üstünde* yükseliyor. Çatalhöyük böyle büyür: kat kat.' },
        { when: has('ev_korundu'), text: 'Nine\'nin evi duruyor. İçindeki resimler hâlâ *canlı*.' },
        { when: has('evi_verdi'), text: 'Göçmen aile ilk gece ateş yakıyor. Damdan yükselen duman *senin* hediyen.' },
        { when: has('buzagi'), text: 'Ağıldaki buzağı büyüdü. Artık senin peşinden *yürüyor*.' },
        { when: (st) => akil(st) > beden(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => beden(st) > akil(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => beden(st) === akil(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
        'Uzaklarda, dağların ardında insanlar *bakırı* eritmeye başladı bile.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAY HAVUZU ----------
    e_fare: {
      bg: 'ev_ici', hands: 'sepet',
      lines: [
        'Ambarda *fareler*! Buğdayın bir kısmı kemirilmiş.',
        'Pislikleri her yerde. Ambar *kokuyor*.',
      ],
      choices: [
        { text: 'Ambarı baştan sıvayla tamamen kapat', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 'e_fare2' },
        { text: 'Gece nöbet tut, tek tek yakala', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1, para: -1 }, to: 'e_fare2' },
      ],
    },
    e_fare2: {
      bg: 'ev_ici', hands: 'uzan',
      lines: [
        'Fareler bir süre *uzak* duruyor.',
        'Yerleşik hayatın bir bedeli var: Biriktirdiğin her şeyi *korumak* zorundasın.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_dogum: {
      bg: 'ev_ici', hands: 'yok',
      lines: [
        'Komşu kadının *doğumu* başladı. Kadınların çoğu tarlada.',
        'Yanında sadece sen *varsın*.',
      ],
      choices: [
        { text: 'Sıcak su ve temiz deri getir, yanında kal', cost: { enerji: 15 }, effect: { enerji: -15, flags: ['ebe'] }, to: 'e_dogum2' },
        { text: 'Tarlaya koş, yardım çağır', cost: { enerji: 10 }, effect: { enerji: -10 }, to: 'e_dogum2' },
      ],
    },
    e_dogum2: {
      bg: 'ev_ici', hands: 'uzan',
      lines: [
        'Saatler sonra küçük bir ses: Sağlıklı bir *kız*.',
        { when: has('ebe'), text: 'Annesi bebeğe ne ad vereceğini *sana* soruyor.' },
        'Ev, bir kişi daha *kalabalık*.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_kavga: {
      bg: 'catal_damlar', hands: 'yok',
      lines: [
        'İki komşu *ortak duvar* için kavga ediyor.',
        'Biri duvarı yükseltmek istiyor. Öbürünün damına güneş *girmeyecek*.',
      ],
      choices: [
        { text: 'İkisi birlikte yükseltsin, damı paylaşsınlar', effect: { akil: 1, flags: ['arabulucu'] }, to: 'e_kavga2' },
        { text: 'Kim güçlüyse o haklı, karışma', effect: { beden: 1 }, to: 'e_kavga2' },
      ],
    },
    e_kavga2: {
      bg: 'catal_damlar', hands: 'uzan',
      lines: [
        { when: has('arabulucu'), text: 'Uzun bir sessizlik. Sonra ikisi de *gülüyor*. Damda bir sofra kuruluyor.' },
        { when: (st) => !st.flags.includes('arabulucu'), text: 'Kavga büyüyor. Duvar yükseliyor, *dostluk* alçalıyor.' },
        'Bitişik evlerde yaşamak, bitişik *sorunlar* demek.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_kabuk: {
      bg: 'catal_damlar', hands: 'uzan',
      lines: [
        'Güneyden, denizden gelen bir tüccar var. Sırtında *deniz kabukları*.',
        '"Bunlardan boncuk yapılır," diyor. "Gelinler *bayılır*."',
      ],
      choices: [
        { text: 'Obsidyenle takas et', req: has('obsidyen'), reqText: 'Obsidyenin yok', effect: { flags: ['kabuk'], akil: 1 }, to: 'e_kabuk2' },
        { text: '2 buğdayla bir dizi al', cost: { para: 2 }, effect: { para: -2, flags: ['kabuk'] }, to: 'e_kabuk2' },
        { text: 'Sadece denizi anlatmasını iste', to: 'e_kabuk2' },
      ],
    },
    e_kabuk2: {
      bg: 'catal_damlar', hands: 'uzan',
      lines: [
        'Tüccar dalgaları, tuzlu rüzgârı *anlatıyor*.',
        'Obsidyen dağdan denize, kabuk denizden dağa *yolculuk* ediyor.',
        'Dünya sandığından daha *bağlı*.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_yangin: {
      bg: 'gece_dam_kisi', hands: 'yok',
      lines: [
        'Gece bir damdan *alev* yükseliyor!',
        'Evler bitişik. Ateş yayılırsa bütün mahalle *yanar*.',
      ],
      choices: [
        { text: 'Yanan damın kenarını yık, ateşi böl', cost: { enerji: 20 }, effect: { enerji: -20, akil: 1 }, to: 'e_yangin2' },
        { text: 'Kaplarla su taşı', cost: { enerji: 25 }, effect: { enerji: -25, beden: 1 }, to: 'e_yangin2' },
      ],
    },
    e_yangin2: {
      bg: 'gece_dam', hands: 'dinlen',
      lines: [
        'Şafakta ateş sönmüş. Bir ev *kül* oldu, ötekiler ayakta.',
        'Ev sahipleri sana tek kelime etmiyor. Sadece *sarılıyorlar*.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_keci: {
      bg: 'tarla', hands: 'yok',
      lines: [
        'Bir *keçi* sürüden kaçıp tarlaya daldı.',
        'Başakları yiyip *ezerek* ilerliyor.',
      ],
      choices: [
        { text: 'Elinde bir avuç tuzla yavaşça yaklaş', effect: { akil: 1 }, to: 'e_keci2' },
        { text: 'Arkasından koşup yakala', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'e_keci2' },
      ],
    },
    e_keci2: {
      bg: 'tarla', hands: 'uzan',
      lines: [
        'Sonunda keçi ipin *ucunda*.',
        'Sahibi sana bir kap süt *getiriyor*.',
      ],
      choices: [{ text: 'Devam et', effect: { enerji: 10 }, to: '@don' }],
    },
    e_muhur: {
      bg: 'ev_ici', hands: 'uzan',
      lines: [
        'Komşu kilden küçük *damgalar* yapıyor. Altında desenler var.',
        'Ekmeğe, deriye, kumaşa *basılıyor*. "Bu benim" demenin bir yolu.',
      ],
      choices: [
        { text: 'Kendi desenini yap', effect: { akil: 1, flags: ['damga'] }, to: 'e_muhur2' },
        { text: 'Komşunun desenini beğen, geç', to: '@don' },
      ],
    },
    e_muhur2: {
      bg: 'ev_ici', hands: 'uzan',
      lines: [
        'Kilde bir *sarmal* çiziyorsun. Pişince taş gibi sertleşiyor.',
        'Artık senin de bir *işaretin* var.',
        'Binlerce yıl sonra bu fikir *yazıya* dönüşecek.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_dugun: {
      bg: 'gece_dam', hands: 'uzan',
      lines: [
        'Komşunun kızı *evleniyor*. Bütün damlar şenlik.',
        'Davul sesleri, kızarmış et kokusu, *kahkahalar*.',
      ],
      choices: [
        { text: 'Hediye olarak buğday ver', cost: { para: 2 }, effect: { para: -2, flags: ['dugun'] }, to: 'e_dugun2' },
        { text: 'Sabaha kadar dans et', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'e_dugun2' },
      ],
    },
    e_dugun2: {
      bg: 'gece_dam', hands: 'dinlen',
      lines: [
        'Gelin, damdan dama *taşınıyor*. Herkes alkışlıyor.',
        'Yerleşik hayat sadece iş değil. Aynı zamanda *birlikte* olmak.',
      ],
      choices: [{ text: 'Devam et', to: '@don' }],
    },
    e_kopek: {
      bg: 'catal_damlar', hands: 'uzan',
      lines: [
        'Bir damın köşesinde titreyen bir köpek *yavrusu*.',
        'Sana bakıyor. Gözleri bir zamanlar tanıdığın bir kurdun gözlerine *benziyor*.',
      ],
      choices: [
        { text: 'Yavruyu sahiplen', effect: { flags: ['kopek2'] }, to: '@don' },
        { text: 'Bir parça ekmek ver, yoluna devam et', to: '@don' },
      ],
    },
  },

  events: [
    { id: 'fare', start: 'e_fare' },
    { id: 'dogum', start: 'e_dogum' },
    { id: 'kavga', start: 'e_kavga' },
    { id: 'kabuk', start: 'e_kabuk' },
    { id: 'yangin', start: 'e_yangin' },
    { id: 'keci', start: 'e_keci' },
    { id: 'muhur', start: 'e_muhur' },
    { id: 'dugun', start: 'e_dugun' },
    { id: 'kopek', start: 'e_kopek' },
  ],
};

// Akşam düzeni
ERA2.hub = {
  bg: 'gece_dam',
  intro: ['Akşam. Damlarda ocak dumanları *yükseliyor*.', 'Güneş Hasan Dağı\'nın ardına *iniyor*.', 'Köy yavaş yavaş *sessizleşiyor*.'],
  acts: [
    { id: 'dokuma', text: 'Yün eğir, kumaş doku', cost: { enerji: 10 }, effect: { enerji: -10, para: 1 },
      res: [['İğ dönüyor, yün *incelerek* ipliğe dönüşüyor.', 'Bir parça kumaş, bir ölçek *buğday* eder.'], ['Tezgâhta desen yavaş yavaş *beliriyor*.', 'Komşular kumaşına *imreniyor*.']] },
    { id: 'siva', text: 'Evin duvarlarını yeniden sıva', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 },
      res: [['Beyaz kili duvara *sürüyorsun*.', 'Ev, yeni bir yıl gibi *parlıyor*.'], ['Eski sıvanın altından bir resim *görünüyor*.', 'Üstünü özenle *kapatıyorsun*.']] },
    { id: 'takas', text: 'Damda komşularla takas yap', effect: { para: 1 },
      res: [['Bir kap süte bir avuç *mercimek*.', 'Takas, köyün *dili*.'], ['Pazarlık uzun sürüyor ama *kazançlı* çıkıyorsun.', 'Bir ölçek buğday daha.']] },
    { id: 'dinlen', text: 'Platformda uzanıp dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Ocağın sıcaklığı evi *dolduruyor*.', 'Derin bir uykuya *dalıyorsun*.'], ['Damdan yıldızlar *görünüyor*.', 'Dinlendin.']] },
    { id: 'masal', text: 'Çocuklara Göbeklitepe\'yi anlat', effect: { akil: 1 },
      res: [['"Taş sütunlar mı? Dev tilkiler mi?" Çocuklar *inanmıyor*.', 'Senin anıların, onların *masalı*.'], ['Anlattıkça kendin de *hatırlıyorsun*.', 'Bazı şeyler sadece sende *yaşıyor*.']] },
    { id: 'su', text: 'Çaydan tarlaya su taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, hands: 'sepet',
      res: [['Kaplar ağır, yol uzun.', 'Ama tarla *yeşeriyor*.'], ['Çayın kıyısında kurbağalar *ötüyor*.', 'Son kabı da tarlaya *döküyorsun*.']] },
    { id: 'tohum', text: 'Gelecek yılın tohumlarını ayır', effect: { akil: 1 }, hands: 'sepet',
      res: [['En dolgun taneleri ayrı bir *sepete* koyuyorsun.', 'Gelecek yılın hasadı *bugünden* başlar.'], ['Küflü taneleri *ayıklıyorsun*.', 'Sabır, tarlanın *gübresi*.']] },
  ],
};
