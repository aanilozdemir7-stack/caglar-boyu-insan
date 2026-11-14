// ÇAĞ 2 — Yerleşik hayat, Çatalhöyük (MÖ 7400)
// Yazım kuralları: tasarım belgesindeki "Ajanın uyacağı yazım kuralları".
// *kelime* = sarı vurgulanan anahtar kelime.
// Seçim alanları: text, cost, effect, to, req (koşul), reqText (kilit nedeni), show (koşul sağlanmazsa hiç gösterme)

const has = (f) => (st) => st.flags.includes(f);
const akil = (st) => st.akil - (st.eraBase?.akil || 0);
const beden = (st) => st.beden - (st.eraBase?.beden || 0);

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
    c1: {
      bg: 'catal_damlar', hands: 'uzan', day: 1,
      lines: [
        'Gözlerini açtığında yüzlerce yıl *geçmiş*. Sen aynı sensin, dünya değil.',
        'Konya Ovası. Yüzlerce kerpiç ev birbirine *yapışık*.',
        'Sokak yok. İnsanlar damların üstünde yürüyor, evlere *merdivenle* iniyor.',
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
      ],
      choices: [{ text: 'Hasada katıl', to: 'c3' }],
    },
    c2b: {
      bg: 'ev_ici', hands: 'uzan', day: 1,
      lines: [
        'Ece Nine\'nin evi küçük ama *sıcak*.',
        'Duvarda boğa boynuzları, kırmızı *resimler*.',
        '"Kal," diyor. "Ama karşılığında tarlada *çalışacaksın*."',
      ],
      choices: [{ text: 'Hasada katıl', to: 'c3' }],
    },
    c3: {
      bg: 'tarla', hands: 'orak', day: 2,
      lines: [
        'Hasat zamanı. Buğday başakları *altın* gibi.',
        'Herkesin elinde bir orak. Ağzına keskin taşlar dizilmiş.',
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
      choices: [{ text: 'Eve dön', to: 'c5' }],
    },
    c4b: {
      bg: 'tarla', hands: 'uzan', day: 2,
      lines: [
        'Önce sana gülüyorlar. Sonra kazmaya *başlıyorlar*.',
        'Su tarlaya akınca kimse gülmüyor.',
        'Gelecek yıl hasat belki iki *katı* olacak.',
      ],
      choices: [{ text: 'Eve dön', effect: { para: 1 }, to: 'c5' }],
    },
    c4c: {
      bg: 'tarla', hands: 'dinlen', day: 2,
      lines: [
        'Herkes çalışırken sen dinleniyorsun. Herkes bunu *görüyor*.',
        'Akşam ambarın boş. Ece Nine başını iki yana *sallıyor*.',
      ],
      choices: [{ text: 'Eve dön', effect: { flags: ['tembel'] }, to: 'c5' }],
    },
    c5: {
      bg: 'catal_damlar', hands: 'sepet', day: 3,
      lines: [
        'Dağdan bir kervan geldi. Sırtlarında *obsidyen* var.',
        'Hasan Dağı\'nın kara camı. Burada her şeyden değerli.',
        { when: has('obsidyen'), text: 'Seninkini görünce gözleri parlıyor. "Bu çok eski bir *işçilik*."' },
        '"Üç ölçek buğdaya bir parça," diyorlar.',
      ],
      choices: [
        { text: '3 buğday ver, obsidyen al', cost: { para: 3 }, effect: { para: -3, flags: ['obsidyen'] }, to: 'c6', show: (st) => !st.flags.includes('obsidyen') },
        { text: 'Eski obsidyeninden bıçak yapıp sat', req: has('obsidyen'), reqText: 'Obsidyenin yok', cost: { enerji: 10 }, effect: { enerji: -10, para: 5, akil: 1, flags: ['bicakci'] }, to: 'c6' },
        { text: 'Takasa girme, buğdayını sakla', to: 'c6' },
      ],
    },
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
      choices: [{ text: 'Uyumaya git', to: 'c8' }],
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
      choices: [{ text: 'Bahara kadar bekle', effect: { para: 2 }, to: 'c10' }],
    },
    c9b: {
      bg: 'yaban_sigiri', hands: 'uzan', day: 5,
      lines: [
        'Koyunlar, keçiler zaten evcil. Ya sığırlar da *evcilleşirse*?',
        'Annesinden ayrılmış bir buzağıyı ağıla götürüyorsun.',
        'Herkes "deli" diyor. Sen sabırla *bekliyorsun*.',
      ],
      choices: [{ text: 'Bahara kadar bekle', to: 'c10' }],
    },
    c9c: {
      bg: 'gece_dam_kisi', hands: 'mesale', day: 5,
      lines: [
        'Gece ambarda bir *hışırtı*.',
        'Meşaleyi kaldırıyorsun: komşunun oğlu, elinde senin buğdayın.',
      ],
      choices: [
        { text: 'Affet, buğdayın bir kısmını ver', cost: { para: 1 }, effect: { para: -1, flags: ['affetti'] }, to: 'c10' },
        { text: 'Herkese söyle', effect: { flags: ['ihbar'] }, to: 'c10' },
      ],
    },
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
      choices: [{ text: 'Ece Nine\'nin yanına git', effect: { enerji: 20 }, to: 'c12' }],
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
  },
};
