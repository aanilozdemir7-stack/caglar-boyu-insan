// ÇAĞ 1 — Taş Devri, Göbeklitepe (MÖ 9600)
// Yazım kuralları: tasarım belgesindeki "Ajanın uyacağı yazım kuralları".
// *kelime* = sarı vurgulanan anahtar kelime.
// Satır, koşullu olabilir: { when: (st) => ..., text: '...' }
// Seçim: { text, cost: {enerji, para}, effect: {enerji, para, akil, beden, flags: []}, to }

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
    s1: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Bugünkü *Şanlıurfa* yakınları. Bir tepenin üstü.',
        'Kabilen, dev taş *sütunların* arasında toplanmış.',
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
      choices: [{ text: 'Sabahı bekle', to: 's3' }],
    },
    s2a_mesale: {
      bg: 'karanlik', hands: 'mesale', day: 1,
      lines: [
        'Alev karanlığı yarıyor. Gözler geri *çekiliyor*.',
        'Dalları toplayıp tepeye dönüyorsun.',
        'Ateş yeniden harlanınca biri omzuna *dokunuyor*.',
      ],
      choices: [{ text: 'Sabahı bekle', to: 's3' }],
    },
    s2b: {
      bg: 'gece_ates', hands: 'uzan', day: 1,
      lines: [
        'Taşlar ısıyı tutuyor. Ateş *yavaş* yanıyor ama sönmüyor.',
        'Yaşlı Ana uzun uzun taşlarına bakıyor.',
        '"Bunu kimden öğrendin?" diyor. *Cevap* beklemiyor.',
      ],
      choices: [{ text: 'Sabahı bekle', effect: { flags: ['ana_fark_etti'] }, to: 's3' }],
    },
    s3: {
      bg: 'sutun_gunduz', hands: 'yok', day: 2,
      lines: [
        'Sabah. Taş ustası *Kaya*, dev bir sütuna tilki kazıyor.',
        'Çakmaktaşı kalemi kırılmış. Söylenip duruyor.',
        '"Ya bir kalem bul ya da şu taşı kaldırmama yardım et."',
      ],
      choices: [
        { text: 'Yeni bir kalem yont', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 's4a' },
        { text: 'Sütunu kaldırmaya yardım et', cost: { enerji: 25 }, effect: { enerji: -25, beden: 2 }, to: 's4b' },
        { text: 'Kaya\'yı bırak, avcılara katıl', to: 's5' },
      ],
    },
    s4a: {
      bg: 'sutun_gunduz', hands: 'kalem', day: 2,
      lines: [
        'Çakmaktaşını taşla vura vura *inceltiyorsun*.',
        'Kaya kalemi eline alıp çeviriyor. Sonra gülüyor.',
        'Sana iki parça *çakmaktaşı* uzatıyor. "Al, hak ettin."',
      ],
      choices: [{ text: 'Avcıların yanına git', effect: { para: 2, flags: ['kaya_dost'] }, to: 's5' }],
    },
    s4b: {
      bg: 'sutun_gunduz', hands: 'uzan', day: 2,
      lines: [
        'Altı kişi ipleri çekiyor. Sen en *öndesin*.',
        'Taş gıcırdayarak yerine oturuyor. Kolların titriyor.',
        'Kaya başını sallıyor: "Gücün var. *Aklın* da olsa..."',
      ],
      choices: [{ text: 'Avcıların yanına git', to: 's5' }],
    },
    s5: {
      bg: 'av_safak', hands: 'mizrak', day: 3,
      lines: [
        'Şafak. Avcılar bir *ceylan* sürüsünü izliyor.',
        'Avcıbaşı *Kartal* eline bir mızrak tutuşturuyor.',
        { when: (st) => st.flags.includes('cesur'), text: '"Kurtları kovan sendin, değil mi?" diye *fısıldıyor*.' },
        { when: (st) => st.flags.includes('kurttan_kacti'), text: '"Bu sefer *kaçma*," diye fısıldıyor.' },
        'Sürü rüzgâra karşı otluyor. Bir *karar* vermelisin.',
      ],
      choices: [
        { text: 'Sürüye dümdüz saldır', cost: { enerji: 20 }, effect: { enerji: -20, beden: 1 }, to: 's6a' },
        { text: 'Sürüyü vadinin dar yerine sür', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 's6b' },
        { text: 'Geride kal, avcıları izle', to: 's6c' },
      ],
    },
    s6a: {
      bg: 'av_safak', hands: 'mizrak', day: 3,
      lines: [
        'Koşuyorsun. Ceylanlar senden çok daha *hızlı*.',
        'Sürü bir anda dağılıyor. Mızrak boşa düşüyor.',
        'Kartal iç çekiyor. O gün kabile *aç* yatacak.',
      ],
      choices: [{ text: 'Dereye inip soluklan', effect: { enerji: -5 }, to: 's7' }],
    },
    s6b: {
      bg: 'av_safak', hands: 'mizrak', day: 3,
      lines: [
        'Avcıları iki yana diziyorsun. Sürü vadiye *giriyor*.',
        'Vadi daralıyor. Kaçacak yer kalmıyor.',
        'O akşam kabile *bolca* et yiyecek. Payına iki çakmaktaşı düşüyor.',
      ],
      choices: [{ text: 'Dereye inip soluklan', effect: { para: 2, flags: ['av_basarili'] }, to: 's7' }],
    },
    s6c: {
      bg: 'av_safak', hands: 'mizrak', day: 3,
      lines: [
        'Uzaktan izliyorsun. Avcılar sürüyü *kuşatıyor*.',
        'Bir ceylan düşüyor. Ama senin payın *yok*.',
        'Kartal sana bakmıyor bile.',
      ],
      choices: [{ text: 'Dereye inip soluklan', to: 's7' }],
    },
    s7: {
      bg: 'dere', hands: 'dinlen', day: 3, textTop: true,
      lines: [
        'Dere kenarına diz çöküyorsun. Su *serin*.',
        'Suyun yüzeyinde kendi *yüzünü* görüyorsun.',
        { when: (st) => st.enerji < 35, text: 'Çok *yorgunsun*. Gözlerin kapanıyor.' },
        { when: (st) => st.enerji >= 35, text: 'Yorgunsun ama hâlâ *dimdik* duruyorsun.' },
      ],
      choices: [
        { text: 'Gölgede biraz uyu', effect: { enerji: 30 }, to: 's8' },
        { text: 'Uyumadan tepeye dön', cost: { enerji: 5 }, effect: { enerji: -5, flags: ['erken_dondu'] }, to: 's8' },
      ],
    },
    s8: {
      bg: 'toplanma', hands: 'yok', day: 4,
      lines: [
        'Tepeye *yabancı* bir kabile gelmiş.',
        { when: (st) => st.flags.includes('erken_dondu'), text: 'Erken döndüğün için onları ilk *sen* karşılıyorsun.' },
        'Ellerinde kapkara, cam gibi parlayan taşlar var: *obsidyen*.',
        '"Üç çakmaktaşına bir obsidyen," diyor içlerinden biri.',
      ],
      choices: [
        { text: '3 çakmaktaşı ver, obsidyeni al', cost: { para: 3 }, effect: { para: -3, akil: 1, flags: ['obsidyen'] }, to: 's9a' },
        { text: 'Takası reddet', effect: { flags: ['takas_red'] }, to: 's9b' },
        { text: 'Onları akşamki ziyafete davet et', cost: { enerji: 10 }, effect: { enerji: -10, flags: ['yabanci_dost'] }, to: 's9c' },
      ],
    },
    s9a: {
      bg: 'toplanma', hands: 'uzan', day: 4,
      lines: [
        'Obsidyen avucunda soğuk ve *keskin*.',
        'Bununla yapılacak bir bıçak, çakmaktaşının yapamadığını yapar.',
        'Yabancılar memnun. *Güven* böyle başlar.',
      ],
      choices: [{ text: 'Ziyafete hazırlan', to: 's10' }],
    },
    s9b: {
      bg: 'toplanma', hands: 'yok', day: 4,
      lines: [
        'Yabancılar *homurdanıyor*.',
        'Biri yere tükürüp arkasını dönüyor.',
        'Gidiyorlar. Bir daha *gelirler* mi, bilinmez.',
      ],
      choices: [{ text: 'Ziyafete hazırlan', to: 's10' }],
    },
    s9c: {
      bg: 'toplanma', hands: 'uzan', day: 4,
      lines: [
        'Yabancılar birbirine bakıyor. Sonra *gülümsüyorlar*.',
        '"Ateşini paylaşanla taşını da paylaşırız," diyorlar.',
        'Bir parça obsidyeni sana *hediye* ediyorlar.',
      ],
      choices: [{ text: 'Ziyafete hazırlan', effect: { flags: ['obsidyen'] }, to: 's10' }],
    },
    s10: {
      bg: 'ziyafet', hands: 'uzan', day: 4,
      lines: [
        'Gece. Tepede *ziyafet* var.',
        { when: (st) => st.flags.includes('yabanci_dost'), text: 'Yabancı kabile de burada. Ateşler birbirine *karışmış*.' },
        { when: (st) => st.flags.includes('av_basarili'), text: 'Ceylan eti dönüyor. Herkes senin *planını* anlatıyor.' },
        'Yaşlı Ana elini kaldırıyor. Herkes *susuyor*.',
        '"Yeni sütuna ne *kazınacak*? Bunu sen seçeceksin."',
      ],
      choices: [
        { text: 'Tilki: kurnazlık', effect: { akil: 1, flags: ['simge_tilki'] }, to: 's11' },
        { text: 'Yaban domuzu: güç', effect: { beden: 1, flags: ['simge_domuz'] }, to: 's11' },
        { text: 'Akbaba: ölüm ve yeniden doğuş', effect: { flags: ['simge_akbaba'] }, to: 's11' },
      ],
    },
    s11: {
      bg: 'sutun_gunduz', hands: 'kalem', day: 5,
      lines: [
        'Günler geçiyor. Seçtiğin hayvan taşa *işleniyor*.',
        'Binlerce yıl sonra biri bu taşı bulacak ve *merak* edecek.',
        { when: (st) => st.akil > st.beden, text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => st.beden > st.akil, text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => st.beden === st.akil, text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },
  },
};
