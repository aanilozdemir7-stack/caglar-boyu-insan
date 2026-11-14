// ÇAĞ 8 — Selçuklu ve Ahilik: Kayseri (1205) → Sultanhanı (1229) → Kösedağ (1243) → Kırşehir (1272)
// *kelime* = sarı vurgulanan anahtar kelime.
// Tarihsel dayanak:
// - Ahi Evran (Nasîrüddin Mahmud), Hoy'da doğdu; 1205 dolayında Kayseri'ye geldi. Debbağdı (deri işçisi).
//   Esnafı kardeşlik ve meslek kurallarıyla bir araya getiren Ahilik'in piri sayılır. Ömrünün sonunu Kırşehir'de
//   geçirdi, 1261'de öldü. Eşi Fatma Bacı'nın kadınları örgütlediği (Bacıyân-ı Rûm) anlatılır.
// - Ahi kuralları: dürüst üretim, cömertlik, misafirlik; çırak-kalfa-usta sırası; usta olana şed (kuşak) bağlanır.
//   "Eline, beline, diline sahip ol" sözü Ahilikle anılır. Kötü mal yapan ustanın pabucunun dama atıldığı anlatılır.
// - Gevher Nesibe Darüşşifası (Kayseri, 1205-06): Sultan I. Gıyaseddin Keyhüsrev'in kız kardeşinin vasiyetiyle
//   yapılan, hastane ile tıp medresesinin bitişik olduğu yapı. Anadolu'da bilinen en eski Selçuklu hastanelerinden.
// - Kayseri yakınındaki Yabanlu Pazarı, uzak ülkelerin tüccarlarının buluştuğu uluslararası bir panayırdı.
// - Sultanhanı (Aksaray, 1229) en büyük Selçuklu kervansaraylarındandır; avlusunun ortasında köşk mescit vardır.
//   Kervansaraylarda yolcular birkaç gün ücretsiz konaklar; devletin yolda soyulan tüccarın zararını karşıladığı anlatılır.
// - 1243 Kösedağ'da Selçuklu ordusu Moğollara yenildi; Anadolu Moğol vergisi altına girdi.
// - Kırşehir'de Caca Bey Medresesi (1272) gökbilimle anılır.
// Karakter adları (Yusuf, Halime, Mesud) kurgu.

const has = (f) => (st) => st.flags.includes(f);
const not = (f) => (st) => !st.flags.includes(f);
const ak = (st) => st.akil - (st.eraBase?.akil || 0);
const be = (st) => st.beden - (st.eraBase?.beden || 0);
const devam = (then, text = 'Devam et') => [{ text, to: '@olay', then }];
const aksam = (then, text = 'Akşamı karşıla') => [{ text, to: '@aksam', then }];
const yazar = (st) => st.flags.includes('yazi');
const kayseri = (st) => st.yer === 'Kayseri';
const yolda = (st) => st.yer === 'Sultanhanı' || st.yer === 'Kösedağ';
const kirsehir = (st) => st.yer === 'Kırşehir';

export const ERA8 = {
  id: 8,
  name: 'Selçuklu ve Ahilik',
  place: 'Kayseri',
  region: 'Kayseri, Aksaray, Kırşehir',
  year: '1205',
  currency: 'dirhem',
  start: 's1',
  next: { name: 'Osmanlı ve matbaa', place: 'İstanbul', year: '1727' },

  carry(st) {
    const eski = st.para;
    st.para = Math.max(3, Math.round(eski / 2));
    st.enerji = Math.max(st.enerji, 70);
    return `${eski} bronz follis, ${st.para} gümüş dirhem ediyor.`;
  },

  scenes: {
    // ---------- BÖLÜM 1: Kayseri ----------
    s1: {
      bg: 'kayseri_carsi', hands: 'uzan', day: 1, place: 'Kayseri', year: '1205',
      lines: [
        'Erciyes yine *karşında*. Ama eteğindeki kent bambaşka.',
        'Taş kapılarında oyma *yıldızlar*, minareler, kubbeli hamamlar.',
        'Çarşıda Türkçe, Farsça, Arapça, Rumca, Ermenice *karışıyor*.',
        { when: has('enlil'), text: 'Kültepe\'nin karumu biraz ötede, toprağın *altında*. Kimse bilmiyor.' },
        'Burası Selçuklu *Kayseri*\'si.',
      ],
      choices: [
        { text: 'Debbağlar çarşısına git', effect: { beden: 1 }, to: 's2a' },
        { text: 'İnşaatı süren büyük yapıyı sor', effect: { akil: 1 }, to: 's2b' },
        { text: 'Yabanlu Pazarı\'na giden kervana katıl', effect: { para: 1 }, to: 's2c' },
      ],
    },
    s2a: {
      bg: 'debbag', hands: 'uzan', day: 1,
      lines: [
        'Keskin bir *koku*. Kireç kuyuları, asılı deriler.',
        'Bir adam kollarını sıvamış, deriyi kazıyor. Gözleri sakin, sesi *yumuşak*.',
        '"Hoş geldin yolcu. Karnın *aç* mı? Önce ye, sonra konuşuruz."',
        'Adı *Ahi Evran*. Hoy\'dan gelmiş, bilgin bir adam. Ama ekmeğini *deriden* çıkarıyor.',
        { when: has('debbag'), text: 'Bergama\'da kireçli suda deri kazıdığın günler *aklına* geliyor.' },
      ],
      choices: [
        { text: 'Yanına otur, ye', effect: { enerji: 15, flags: ['evran'] }, to: 's3' },
        { text: '"Önce çalışayım"', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, flags: ['evran'] }, to: 's3' },
      ],
    },
    s2b: {
      bg: 'sifahane', hands: 'uzan', day: 1,
      lines: [
        'Yan yana iki yapı: Biri *hastane*, biri tıp medresesi.',
        'Sultanın kız kardeşi Gevher Nesibe genç yaşta *ölmüş*.',
        'Vasiyeti: "Kimse benim gibi çaresiz *ölmesin*. Bir şifahane yapın."',
        'Hekim *Mesud* taşları sayıyor: "Burada hekim de *yetiştireceğiz*."',
      ],
      choices: [
        { text: 'Şifahanede hasta bakıcı olmak iste', effect: { akil: 1, flags: ['sifa'] }, to: 's3' },
        { text: 'İnşaatta taş taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: 's3' },
      ],
    },
    s2c: {
      bg: 'bozkir_yol', hands: 'yular', day: 1,
      lines: [
        'Kentin dışında kocaman bir *panayır*: Yabanlu Pazarı.',
        'Kıpçak bozkırından kürk, Suriye\'den şeker, uzak doğudan *ipek*.',
        'Bir İtalyan tüccar kumaş ölçüyor. Bir Rus tüccar *bal* satıyor.',
        'Herkes Selçuklu *dirhemiyle* ödüyor.',
      ],
      choices: [{ text: 'Bir tüccara yardım et, kente dön', effect: { para: 1, flags: ['panayir'] }, to: 's3' }],
    },
    s3: {
      bg: 'debbag', hands: 'uzan', day: 1,
      lines: [
        'Akşam Ahi Evran\'ın *zaviyesine* yolun düşüyor. Kapısı herkese açık.',
        'Yer sofrasında çıraklar, ustalar, *yolcular*. Kimse kimseye kim olduğunu sormuyor.',
        { when: has('evran'), text: 'Ahi Evran seni yanına oturtuyor: "Bu sofrada *misafir* padişahtır."' },
        { when: not('evran'), text: 'Bir çırak sana yer açıyor: "Bu sofrada *misafir* padişahtır."' },
      ],
      choices: aksam('s4'),
    },
    s4: {
      bg: 'debbag', hands: 'cekic', day: 2,
      lines: [
        'Sabah. Debbağhanede iş *başlıyor*.',
        'Ham deri önce suya, sonra kirece, sonra *sepiye* giriyor. Haftalar sürüyor.',
        'Ahi Evran: "Deriyi aceleye getirirsen *çürür*. İnsanı da."',
        '"Burada ilk kural: Yaptığın işe *hile* katmayacaksın."',
      ],
      choices: [
        { text: 'Kazıma bıçağını al, çalış', cost: { enerji: 15 }, effect: { enerji: -15, beden: 2, flags: ['cirak'] }, to: 's5a' },
        { text: 'Sepilemede hangi bitki daha iyi, dene', effect: { akil: 2, flags: ['cirak', 'sepi'] }, to: 's5b' },
        { text: 'Şifahaneye geri dön', show: has('sifa'), effect: { akil: 1 }, to: 's5c' },
      ],
    },
    s5a: {
      bg: 'debbag', hands: 'cekic', day: 2,
      lines: [
        'Bıçak deriyi *pürüzsüz* bırakıyor. Kalfa başını sallıyor.',
        { when: has('debbag'), text: 'Elin bu işi *biliyor*. Kalfa şaşkın: "Kim öğretti sana?"' },
        'Ahi Evran: "Çırak, *usta* olmadan önce sabretmeyi öğrenir."',
      ],
      choices: devam('s6'),
    },
    s5b: {
      bg: 'debbag', hands: 'uzan', day: 2,
      lines: [
        'Meşe palamudu deriyi sert, *sumak* yumuşak yapıyor.',
        'Notlarını *anlatıyorsun*. Ahi Evran dikkatle dinliyor.',
        '"Bildiğini *saklama*. Ahilikte bilgi, sofradaki ekmek gibi paylaşılır."',
      ],
      choices: devam('s6'),
    },
    s5c: {
      bg: 'sifahane', hands: 'uzan', day: 2,
      lines: [
        'Şifahanede hastalar *yatakta*. Hekim Mesud bir öğrenciye nabız tutmayı gösteriyor.',
        'Avluda bir *çeşme* şırıldıyor. Bir köşede biri ney üflüyor.',
        '"Ses de *ilaçtır*," diyor Mesud. "Huzursuz hastayı sakinleştirir."',
        { when: has('galenos'), text: 'Mesud\'un okuduğu kitapta bir ad: *Calinus*. Galenos! Bin yıl sonra hâlâ okunuyor.' },
      ],
      choices: devam('s6'),
    },
    s6: {
      bg: 'ahi_zaviye', hands: 'uzan', day: 3,
      lines: [
        'Zaviyede bir *tören*. Bir kalfa usta olacak.',
        'Ahi Evran, kalfanın beline bir *kuşak* bağlıyor: Şed.',
        '"*Eline* sahip ol: Çalma. *Beline* sahip ol: Namusunu koru. *Diline* sahip ol: Yalan söyleme."',
        'Bütün esnaf ayağa kalkıp *dua* ediyor.',
      ],
      choices: [
        { text: 'Bu sözleri ezberle', effect: { akil: 1, flags: ['ahi_soz'] }, to: 's7' },
        { text: 'Yeni ustayı kutla, onun dükkânında çalışmak iste', effect: { beden: 1, para: 1 }, to: 's7' },
      ],
    },
    s7: {
      bg: 'kayseri_carsi', hands: 'uzan', day: 3,
      lines: [
        'Çarşıda bir *kargaşa*. Bir pabuççunun yaptığı ayakkabılar iki günde *dağılmış*.',
        'Esnaf heyeti toplanıyor. Ahi Evran ayakkabıları eline alıp *bakıyor*.',
        '"Bu mal *hileli*. Kalitesiz deri, çürük dikiş."',
      ],
      choices: [
        { text: '"Ona bir şans daha verin"', effect: { akil: 1, flags: ['sans'] }, to: '@olay', then: 's8' },
        { text: '"Kural kuraldır"', effect: { flags: ['kural'] }, to: '@olay', then: 's8' },
        { text: 'Pabuççuya iyi derinin nereden alınacağını göster', effect: { beden: 1, flags: ['ogretti'] }, to: '@olay', then: 's8' },
      ],
    },
    s8: {
      bg: 'kayseri_carsi', hands: 'uzan', day: 3,
      lines: [
        'Heyet karar veriyor: Pabuççunun bir ayakkabısı dükkânın *damına* fırlatılıyor.',
        'Herkes görecek. Utancı *herkesin* önünde.',
        { when: has('sans'), text: 'Ahi Evran sana dönüyor: "Haklısın. Kusur eden *düzelebilir*. Ama önce yüzleşmeli."' },
        { when: has('ogretti'), text: 'Pabuççu ertesi sabah senden aldığı deriyle *yeni* bir çift dikiyor.' },
        '"*Pabucu dama atılmak*," diyorsun içinden. Bu söz yüzyıllarca *yaşayacak*.',
      ],
      choices: aksam('k1'),
    },

    // ---------- BÖLÜM 2: Kervan ----------
    k1: {
      bg: 'bozkir_yol', hands: 'yular', day: 4, place: 'Sultanhanı', year: '1229',
      lines: [
        'Yıllar geçiyor. Ahi Evran Konya\'ya, sonra *Kırşehir*\'e gidiyor.',
        'Sen bir kervanla deri ve kumaş götürüyorsun. Develer, katırlar, *çanlar*.',
        'Yollar *güvenli*. Her bir günlük yolda bir kervansaray var.',
        { when: has('cirak'), text: 'Sırtındaki deri yükü *senin* elinden geçti.' },
      ],
      choices: [
        { text: 'Develerin yükünü dengele', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@olay', then: 'k2' },
        { text: 'Kervanbaşıyla yol hesabı yap', effect: { akil: 1 }, to: '@olay', then: 'k2' },
      ],
    },
    k2: {
      bg: 'kervansaray', hands: 'uzan', day: 4,
      lines: [
        'Bozkırın ortasında bir *kale* gibi yapı. Kapısının taş oymaları dantel gibi.',
        'Sultan *Alaeddin Keykubad* yaptırıyor. Adı: Sultanhanı. Yeni bitmiş.',
        'Kapıcı gülümsüyor: "Üç gün *kalın*. Yemek, yatak, at bakımı: Sultandan."',
      ],
      choices: [{ text: 'İçeri gir', to: 'k3' }],
    },
    k3: {
      bg: 'kervansaray_ic', hands: 'uzan', day: 4,
      lines: [
        'Avlunun ortasında, dört ayak üstünde küçük bir *mescit*.',
        'Etrafta odalar, ahırlar, bir *hamam*, bir nalbant, bir hekim.',
        'Yanında *Venedikli* bir tüccar, Suriyeli bir şekerci, Kıpçak bir kürkçü yatıyor.',
        'Hepsi aynı çatının altında. Bu yol bir *dünya* yolu.',
      ],
      choices: [
        { text: 'Tüccarlarla sohbet et, fiyat öğren', effect: { akil: 1, flags: ['fiyat8'] }, to: 'k4' },
        { text: 'Nalbanda yardım et', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: 'k4' },
        { text: 'Hamamda yıkan', effect: { enerji: 20 }, to: 'k4' },
      ],
    },
    k4: {
      bg: 'kervansaray_ic', hands: 'uzan', day: 4,
      lines: [
        'Gece. Bir tüccar ağlayarak *geliyor*.',
        '"Yolda soyuldum! Bütün *ipek* gitti!"',
        'Hancıbaşı defterini açıyor: "Sultanın yolunda soyuldun. Zararını *hazine* öder."',
        'Tüccar inanamıyor. Sen de *şaşırıyorsun*.',
      ],
      choices: [
        { text: 'Tüccarın kaybını deftere sen yaz', req: yazar, reqText: 'Yazı bilmiyorsun', effect: { akil: 2, flags: ['defterci'] }, to: 'k5' },
        { text: 'Soyguncuların izini sürmek için atlılara katıl', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['takip'] }, to: 'k5' },
        { text: 'Tüccara su ver, sakinleştir', effect: { beden: 1 }, to: 'k5' },
      ],
    },
    k5: {
      bg: 'bozkir_yol', hands: 'uzan', day: 5,
      lines: [
        { when: has('takip'), text: 'Soyguncular bir tepede *yakalanıyor*. İpekler geri geliyor.' },
        'Tüccar hayretle *söylüyor*: "Kendi ülkemde bile böyle bir şey yok."',
        'Yol güvenliyse tüccar gelir. Tüccar gelirse vergi gelir. *Hesap* basit.',
        { when: has('hesap'), text: 'Uluburun\'daki kâtibin sözleri aklına geliyor: Bir yükün kaybı, bir *krallığın* kaybı.' },
      ],
      choices: aksam('k6'),
    },
    k6: {
      bg: 'kayseri_carsi', hands: 'uzan', day: 6, place: 'Kayseri',
      lines: [
        'Kayseri\'ye *dönüyorsun*. Çarşı büyümüş, esnaf çoğalmış.',
        'Bir zaviyede kadınlar *dokuyor*, keçe basıyor. Başlarında Fatma Bacı.',
        '"Erkekler ahi ise biz de *bacıyız*," diyor gülerek. "Kadınların da loncası olur."',
      ],
      choices: [
        { text: 'Keçe basmalarına yardım et', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: 'k7' },
        { text: 'Dokumaları Yabanlu Pazarı\'nda satmayı öner', effect: { akil: 1, flags: ['baci_ticaret'] }, to: 'k7' },
        { text: 'Desenlerini sor', effect: { akil: 1 }, to: 'k7' },
      ],
    },
    k7: {
      bg: 'ahi_zaviye', hands: 'uzan', day: 6,
      lines: [
        'Zaviyede senin için de bir *tören* hazırlanıyor.',
        { when: has('cirak'), text: 'Yıllardır çıraklık, kalfalık *ettin*. Usta olmanın vakti geldi.' },
        'Yaşlı bir ahi soruyor: "Hangi *ustalığı* seçiyorsun?"',
      ],
      choices: [
        { text: 'Debbağlık: Deriyi ben bilirim', effect: { beden: 1, flags: ['usta_debbag'] }, to: 'k8' },
        { text: 'Hekimlik: Şifahanede yetiştim', show: has('sifa'), effect: { akil: 2, flags: ['usta_hekim'] }, to: 'k8' },
        { text: 'Kervancılık: Yollar benim işim', effect: { akil: 1, flags: ['usta_kervan'] }, to: 'k8' },
      ],
    },
    k8: {
      bg: 'ahi_zaviye', hands: 'uzan', day: 6,
      lines: [
        'Beline bir *şed* bağlanıyor.',
        { when: has('ahi_soz'), text: 'Ezberlediğin sözleri yüksek sesle *söylüyorsun*: "Eline, beline, diline..."' },
        'Bütün esnaf ayakta. Biri seni *kucaklıyor*: "Artık usta, artık kardeşsin."',
        'Ölümsüz biri için ne tuhaf: Bir *aileye* katılmak.',
      ],
      choices: [{ text: 'Teşekkür et', effect: { para: 2 }, to: '@aksam', then: 'm1' }],
    },

    // ---------- BÖLÜM 3: Kösedağ ----------
    m1: {
      bg: 'bozkir_yol', hands: 'uzan', day: 7, place: 'Kösedağ', year: '1243',
      lines: [
        'Doğudan *korkunç* haberler. Moğol ordusu Erzurum\'u yakmış.',
        'Selçuklu ordusu Sivas\'ın doğusunda, *Kösedağ*\'da onları bekliyor.',
        'Kervanını ordunun erzak *taşıyıcıları* arasına katmışlar.',
      ],
      choices: [
        { text: 'Erzak taşı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1 }, to: 'm2' },
        { text: 'Yaralılar için çadır kur', show: (st) => st.flags.includes('usta_hekim') || st.flags.includes('sifa'), effect: { akil: 1, flags: ['cadir'] }, to: 'm2' },
        { text: 'Gözcülerle tepeye çık', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1 }, to: 'm2' },
      ],
    },
    m2: {
      bg: 'kosedag', hands: 'yok', day: 7,
      lines: [
        'Sabah. Moğol atlıları ovaya *iniyor*. Çok hızlılar.',
        'Önce kaçıyormuş gibi *dönüyorlar*. Selçuklu öncüleri peşlerinden koşuyor.',
        'Sonra tepelerin arkasından ordunun *geri* kalanı çıkıyor.',
        'Ordu *dağılıyor*. Sultan kaçıyor.',
      ],
      choices: [
        { text: 'Yaralıları arabalara yükle, kaç', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['kurtardi8'] }, to: 'm3' },
        { text: 'Erzak arabasını terk et, canını kurtar', to: 'm3' },
      ],
    },
    m3: {
      bg: 'kayseri_carsi', hands: 'uzan', day: 8, place: 'Kayseri',
      lines: [
        'Kayseri kapılarında *panik*. Moğollar Sivas\'ı aldı, Kayseri\'ye geliyor.',
        'Sultan yok. Ordu yok. Kenti kim *savunacak*?',
        'Ahiler çarşıda *toplanıyor*. Dükkânlarını kapatıp kılıç kuşanıyorlar.',
        { when: has('cadir'), text: 'Kurduğun çadırdan kurtulan yaralılar şimdi *seninle* yürüyor.' },
      ],
      choices: [
        { text: 'Surlarda ahilerle dur', cost: { enerji: 20 }, effect: { enerji: -20, beden: 2, flags: ['sur'] }, to: 'm4' },
        { text: 'Kadınları, çocukları şifahaneye topla', effect: { akil: 1, flags: ['siginak'] }, to: 'm4' },
        { text: 'Moğollarla pazarlık için heyete katıl', effect: { akil: 2, flags: ['heyet'] }, to: 'm4' },
      ],
    },
    m4: {
      bg: 'kayseri_carsi', hands: 'yok', day: 8,
      lines: [
        'Kayseri günlerce *direniyor*. Ama düşüyor.',
        { when: has('heyet'), text: 'Heyetin pazarlığı kentin bir kısmını *kurtarıyor*. Ama ağır bir bedelle.' },
        { when: has('siginak'), text: 'Şifahanenin kalın taş duvarları içindekileri *koruyor*.' },
        'Anadolu artık Moğol *vergisi* altında.',
        'Ama çarşılar, loncalar, zaviyeler *ayakta*. Devlet zayıfladıkça ahiler güçleniyor.',
      ],
      choices: aksam('r1'),
    },

    // ---------- BÖLÜM 4: Kırşehir ----------
    r1: {
      bg: 'ahi_zaviye', hands: 'uzan', day: 9, place: 'Kırşehir', year: '1261',
      lines: [
        '*Kırşehir*. Ahi Evran\'ın zaviyesi burada. Artık çok yaşlı.',
        { when: has('evran'), text: 'Seni görünce gözleri *parlıyor*: "Sen... hiç değişmemişsin."' },
        { when: not('evran'), text: 'Seni görünce *gülümsüyor*: "Kayseri\'den bir yüz. Gel, otur."' },
        'Ülkede kargaşa var. Moğol valiler, isyancı beyler, birbirine giren *kentler*.',
      ],
      choices: [
        { text: 'Ona sırrını söyle', effect: { flags: ['evran_sir'] }, to: 'r2' },
        { text: 'Sadece yanında otur', effect: { enerji: 10 }, to: 'r2' },
      ],
    },
    r2: {
      bg: 'ahi_zaviye', hands: 'uzan', day: 9,
      lines: [
        { when: has('evran_sir'), text: 'Ahi Evran uzun süre *susuyor*. Sonra: "Öyleyse sen bu sofranın en eski misafirisin."' },
        '"Bir gün ben *olmayacağım*," diyor. "Ama kurallar kalacak. Dürüst iş, açık kapı, paylaşılan ekmek."',
        '"Kurallar insanlardan *uzun* yaşar. Senin gibi."',
      ],
      choices: [
        { text: '"Kuralları yazıya geçirelim"', effect: { akil: 1, flags: ['futuvvet'] }, to: 'r3' },
        { text: '"Kuralları çıraklara ben öğretirim"', effect: { beden: 1, flags: ['ogretmen'] }, to: 'r3' },
      ],
    },
    r3: {
      bg: 'kayseri_carsi', hands: 'yok', day: 10,
      lines: [
        'Bir sabah kentte *çatışma*. Moğol valisinin adamları ve beylerin adamları.',
        'Akşama doğru haber *geliyor*: Ahi Evran ölmüş.',
        'Seksen yılı aşkın bir ömür. Debbağ, bilgin, *usta*.',
      ],
      choices: [
        { text: 'Zaviyeyi ayakta tut', effect: { akil: 1, flags: ['zaviye'] }, to: '@aksam', then: 'r4' },
        { text: 'Cenazede tabutu taşı', effect: { beden: 1 }, to: '@aksam', then: 'r4' },
      ],
    },
    r4: {
      bg: 'cacabey', hands: 'uzan', day: 11, year: '1272',
      lines: [
        'Yıllar sonra Kırşehir\'de yeni bir *medrese*: Caca Bey.',
        'Kubbesinin ortasında açık bir *göz*. Altında bir havuz.',
        'Gece havuzun suyunda *yıldızlar* yansıyor. Öğrenciler gökyüzünü suda izliyor.',
        { when: has('thales'), text: 'Kızılırmak kıyısında Thales\'in sözleri: "Gök *düzenle* döner."' },
      ],
      choices: [
        { text: 'Bir yıldızın yolunu çiz', effect: { akil: 2 }, to: 'r5' },
        { text: 'Havuzun kenarına oturup sessizce izle', effect: { enerji: 15 }, to: 'r5' },
      ],
    },
    r5: {
      bg: 'cacabey', hands: 'uzan', day: 11,
      lines: [
        { when: has('futuvvet'), text: 'Yazıya geçirdiğin kurallar loncadan loncaya *kopyalanıyor*.' },
        { when: has('ogretmen'), text: 'Eğittiğin çıraklar şimdi kendi çıraklarını *eğitiyor*.' },
        { when: has('usta_hekim'), text: 'Şifahanede yetiştirdiğin öğrenciler başka kentlerde *hekim*.' },
        { when: (st) => ak(st) > be(st), text: 'Bu çağda çoğunlukla *aklını* kullandın.' },
        { when: (st) => be(st) > ak(st), text: 'Bu çağda çoğunlukla *bedenini* kullandın.' },
        { when: (st) => be(st) === ak(st), text: 'Bu çağda aklınla bedenin arasında *dengede* kaldın.' },
      ],
      choices: [{ text: 'Geleceğe bak', to: 'r6' }],
    },
    r6: {
      bg: 'cacabey', hands: 'dinlen', day: 11,
      lines: [
        'Ahilik yüzyıllarca yaşayacak. Esnaf odaları, çıraklık, *usta-çırak* ilişkisi.',
        'Selçuklu dağılacak. Batıda, Söğüt\'te küçük bir *beylik* büyümeye başlayacak.',
        'O beylik bir gün *İstanbul*\'u alacak.',
        'Ve o kentte bir gün, Bergama\'dan beri bildiğin şey *makineyle* yapılacak: Kitap.',
      ],
      choices: [{ text: 'Çağı tamamla', to: 'son' }],
    },
    son: { end: true },

    // ---------- OLAYLAR ----------
    e_misafir: {
      bg: 'ahi_zaviye', hands: 'sepet',
      lines: [
        'Zaviyenin kapısını yorgun bir *yolcu* çalıyor. Dili yabancı.',
        'Ahi kuralı: Misafir üç gün *sorgusuz* ağırlanır.',
      ],
      choices: [
        { text: 'Ona yemek ve yatak hazırla', cost: { enerji: 5 }, effect: { enerji: -5, flags: ['comert'] }, to: '@don' },
        { text: 'Dilini çözmeye çalış', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_cini: {
      bg: 'kayseri_carsi', hands: 'firca',
      lines: [
        'Bir çini ustası *firuze* renkli yıldızlar boyuyor.',
        '"Bu renk göğün *rengi*. Selçuklu bu renge âşık."',
      ],
      choices: [
        { text: 'Bir yıldızı sen boya', effect: { akil: 1 }, to: '@don' },
        { text: 'Çinileri fırına taşı', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_ney: {
      bg: 'sifahane', hands: 'uzan',
      lines: [
        'Şifahanenin avlusunda bir *neyzen* çalıyor.',
        'Bir hasta *ağlıyor*. Sonra yıllardır ilk kez uyuyor.',
      ],
      choices: [
        { text: 'Dinle', effect: { enerji: 15 }, to: '@don' },
        { text: 'Hangi ezginin hangi hastaya iyi geldiğini not et', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_deve: {
      bg: 'bozkir_yol', hands: 'yular',
      lines: [
        'Bir deve *kıpırdamıyor*. Yere çökmüş, kalkmıyor.',
        'Kervancı sopasını *kaldırıyor*.',
      ],
      choices: [
        { text: 'Sopayı tut, yükü hafiflet', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1 }, to: '@don' },
        { text: 'Devenin ayağındaki taşı fark et, çıkar', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_hirsiz: {
      bg: 'kervansaray_ic', hands: 'kese',
      lines: [
        'Gece kervansarayda bir *gölge* yüklerin arasında dolaşıyor.',
        'Kapılar kapalı. Hırsız *içeride*.',
      ],
      choices: [
        { text: 'Hancıbaşını uyandır', effect: { akil: 1 }, to: '@don' },
        { text: 'Hırsızı kendin yakala', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 1 }, to: '@don' },
      ],
    },
    e_venedik: {
      bg: 'kervansaray_ic', hands: 'para',
      lines: [
        'Venedikli tüccar sana bir *altın* gösteriyor. Üstünde bir aziz ve bir doç.',
        '"Selçuklu dirhemi de iyi. Ama bizim *duka* her limanda geçer."',
      ],
      choices: [
        { text: 'Bir dirhemi dukayla değiştir', cost: { para: 2 }, effect: { para: -2, flags: ['duka'] }, to: '@don' },
        { text: 'Kur farkını hesapla', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_kopek: {
      bg: 'bozkir_yol', hands: 'uzan',
      lines: [
        'Yol kenarında yaralı bir *çoban köpeği*. Sürüsünden kopmuş.',
      ],
      choices: [
        { text: 'Yarasını sar, yanına al', effect: { beden: 1, flags: ['kopek8'] }, to: '@don' },
        { text: 'Su bırak, yoluna devam et', to: '@don' },
      ],
    },
    e_mogol: {
      bg: 'kayseri_carsi', hands: 'kese',
      lines: [
        'Bir Moğol *vergi* memuru çarşıyı dolaşıyor. Her dükkândan pay istiyor.',
        'Esnaf öfkeli. Ama silah *yok*.',
      ],
      choices: [
        { text: 'Loncanın ortak kasasından öde, dükkânları kurtar', cost: { para: 2 }, effect: { para: -2, akil: 1 }, to: '@don' },
        { text: 'Memura tercümanlık et, pazarlık yap', effect: { akil: 1 }, to: '@don' },
      ],
    },
    e_ogrenci: {
      bg: 'cacabey', hands: 'kitap',
      lines: [
        'Bir medrese öğrencisi yıldız cetvellerini *karıştırmış*. Hocası kızacak.',
        'Gözleri yaşlı, *defterini* uzatıyor.',
      ],
      choices: [
        { text: 'Hesabını düzelt', effect: { akil: 1 }, to: '@don' },
        { text: 'Ona su ve ekmek ver, sakinleştir', effect: { enerji: -5 }, to: '@don' },
      ],
    },
  },

  events: [
    { id: 'misafir', start: 'e_misafir', when: (st) => kayseri(st) || kirsehir(st) },
    { id: 'cini', start: 'e_cini', when: kayseri },
    { id: 'ney', start: 'e_ney', when: kayseri },
    { id: 'deve', start: 'e_deve', when: yolda },
    { id: 'hirsiz', start: 'e_hirsiz', when: yolda },
    { id: 'venedik', start: 'e_venedik', when: yolda },
    { id: 'kopek', start: 'e_kopek', when: yolda },
    { id: 'mogol', start: 'e_mogol', when: (st) => kayseri(st) && st.flags.some((f) => ['sur', 'siginak', 'heyet'].includes(f)) },
    { id: 'ogrenci', start: 'e_ogrenci', when: kirsehir },
  ],
};

ERA8.hub = {
  intro: (st) => yolda(st)
    ? ['Gün batıyor. Kervansarayın kapısı *kapanıyor*.', 'Avluda develer *çöküyor*. Çanlar susuyor.', 'Bozkırın üstünde yıldızlar *beliriyor*.']
    : ['Akşam ezanı *okunuyor*. Çarşı kepenkleri iniyor.', 'Zaviyede sofra *kuruluyor*.', 'Erciyes\'in tepesi son ışıkla *pembeleşiyor*.'],
  acts: [
    { id: 'deri', show: (st) => !yolda(st), text: 'Debbağhanede deri kazı', cost: { enerji: 15 }, effect: { enerji: -15, beden: 1, para: 2 }, hands: 'cekic',
      res: [['Deri *inceliyor*, yumuşuyor.', 'Kalfa sana iki dirhem veriyor.'], ['Kollarında eski bir *ağrı*. Bergama\'dan kalma bir ağrı.', 'Ama iş bitti.']] },
    { id: 'sohbet', show: (st) => !yolda(st), text: 'Zaviyede ahi sohbetine katıl', effect: { akil: 1, enerji: 5 },
      res: [['Konu: Kazancın *helali*. Ölçü, tartı, hile.', 'Herkes bir şey *anlatıyor*.'], ['Yaşlı bir usta gençlik yıllarını *anlatıyor*.', 'Bu sofra kuşakları *birleştiriyor*.']] },
    { id: 'okuma', show: (st) => !yolda(st), text: 'Medresede Arap harflerini öğren', cost: { enerji: 5 }, effect: { enerji: -5, akil: 1, flags: ['yazi'] }, hands: 'kitap',
      res: [['Sağdan sola. Harfler birbirine *bağlanıyor*.', 'Yeni bir yazı, yeni bir *dünya*.'], ['Hoca Farsça bir şiir *okutuyor*.', 'Kelimeler *şarkı* gibi.']] },
    { id: 'sifahane', show: kayseri, text: 'Şifahanede gece nöbeti tut', cost: { enerji: 10 }, effect: { enerji: -10, akil: 1, flags: ['sifa'] },
      res: [['Ateşli bir çocuğun *alnını* soğutuyorsun.', 'Sabaha karşı ateşi düşüyor.'], ['Hekim Mesud sana bir ilacın *tarifini* veriyor.', '"Ezberle, yazma. Önce ezberle."']] },
    { id: 'kervan', show: yolda, text: 'Develerin bakımını yap', cost: { enerji: 10 }, effect: { enerji: -10, beden: 1, para: 1 }, hands: 'yular',
      res: [['Develerin ayaklarını *kontrol* ediyorsun.', 'Kervancı bir dirhem veriyor.'], ['Bir deve sana *homurdanıyor*.', 'Develer kin tutar derler. Umarım değil.']] },
    { id: 'hamam', show: yolda, text: 'Kervansarayın hamamında yıkan', effect: { enerji: 20 },
      res: [['Sıcak taş, *buhar*, temiz su.', 'Yolun tozu *akıyor*.'], ['Bir Kıpçak kürkçü sırtını *keseliyor*.', 'Dostluk hamamda başlar.']] },
    { id: 'dinlen', text: 'Erkenden uzan, dinlen', effect: { enerji: 25 }, hands: 'dinlen',
      res: [['Derin bir *uyku*.', 'Sabah güçlüsün.'], ['Rüyanda bir *kuşak* görüyorsun. Belinde.', 'Dinlendin.']] },
  ],
};
