// ==========================================
// MJ FOOTBALL EDITS - Players Database
// نسخه اصلاح‌شده
// ==========================================

const playerRows = [
  // بازیکنان ۱ تا ۲۰
  ["messi","لیونل مسی","Lionel Messi","آرژانتین 🇦🇷","اینتر میامی","مهاجم","۱۰"],
  ["ronaldo","کریستیانو رونالدو","Cristiano Ronaldo","پرتغال 🇵🇹","النصر","مهاجم","۷"],
  ["bellingham","جود بلینگام","Jude Bellingham","انگلیس 🏴","رئال مادرید","هافبک","۵"],
  ["mbappe","کیلیان امباپه","Kylian Mbappe","فرانسه 🇫🇷","رئال مادرید","مهاجم","۹"],
  ["neymar","نیمار","Neymar","برزیل 🇧🇷","سانتوس","مهاجم","۱۰"],
  ["haaland","ارلینگ هالند","Erling Haaland","نروژ 🇳🇴","منچسترسیتی","مهاجم","۹"],
  ["vinicius-jr","وینیسیوس جونیور","Vinicius Junior","برزیل 🇧🇷","رئال مادرید","وینگر","۷"],
  ["rodri","رودری","Rodri","اسپانیا 🇪🇸","منچسترسیتی","هافبک دفاعی","۱۶"],
  ["lamine-yamal","لامین یامال","Lamine Yamal","اسپانیا 🇪🇸","بارسلونا","وینگر","۱۰"],
  ["pedri","پدری","Pedri","اسپانیا 🇪🇸","بارسلونا","هافبک","۸"],
  ["gavi","گاوی","Gavi","اسپانیا 🇪🇸","بارسلونا","هافبک","۶"],
  ["raphinha","رافینیا","Raphinha","برزیل 🇧🇷","بارسلونا","وینگر","۱۱"],
  ["lewandowski","روبرت لواندوفسکی","Robert Lewandowski","لهستان 🇵🇱","بارسلونا","مهاجم","۹"],
  ["kane","هری کین","Harry Kane","انگلیس 🏴","بایرن مونیخ","مهاجم","۹"],
  ["musiala","جمال موسیالا","Jamal Musiala","آلمان 🇩🇪","بایرن مونیخ","هافبک هجومی","۴۲"],
  ["salah","محمد صلاح","Mohamed Salah","مصر 🇪🇬","لیورپول","وینگر","۱۱"],
  ["van-dijk","ویرژیل فن‌دایک","Virgil van Dijk","هلند 🇳🇱","لیورپول","مدافع","۴"],
  ["de-bruyne","کوین دی‌بروینه","Kevin De Bruyne","بلژیک 🇧🇪","منچسترسیتی","هافبک","۱۷"],
  ["foden","فیل فودن","Phil Foden","انگلیس 🏴","منچسترسیتی","هافبک هجومی","۴۷"],
  ["saka","بوکایو ساکا","Bukayo Saka","انگلیس 🏴","آرسنال","وینگر","۷"],

  // بازیکنان ۲۱ تا ۴۰
  ["odegaard","مارتین اودگارد","Martin Odegaard","نروژ 🇳🇴","آرسنال","هافبک","۸"],
  ["rice","دکلان رایس","Declan Rice","انگلیس 🏴","آرسنال","هافبک","۴۱"],
  ["saliba","ویلیام سالیبا","William Saliba","فرانسه 🇫🇷","آرسنال","مدافع","۲"],
  ["son","سون هیونگ مین","Son Heung-min","کره جنوبی 🇰🇷","لس‌آنجلس اف‌سی","مهاجم","۷"],
  ["modric","لوکا مودریچ","Luka Modric","کرواسی 🇭🇷","آث میلان","هافبک","۱۴"],
  ["kroos","تونی کروس","Toni Kroos","آلمان 🇩🇪","بازنشسته","هافبک","۸"],
  ["benzema","کریم بنزما","Karim Benzema","فرانسه 🇫🇷","الاتحاد","مهاجم","۹"],
  ["suarez","لوئیس سوارز","Luis Suarez","اروگوئه 🇺🇾","اینتر میامی","مهاجم","۹"],
  ["griezmann","آنتوان گریزمان","Antoine Griezmann","فرانسه 🇫🇷","اتلتیکو مادرید","مهاجم","۷"],
  ["julian-alvarez","خولیان آلوارز","Julian Alvarez","آرژانتین 🇦🇷","اتلتیکو مادرید","مهاجم","۱۹"],
  ["lautaro","لائوتارو مارتینز","Lautaro Martinez","آرژانتین 🇦🇷","اینتر میلان","مهاجم","۱۰"],
  ["barella","نیکولو بارلا","Nicolo Barella","ایتالیا 🇮🇹","اینتر میلان","هافبک","۲۳"],
  ["donnarumma","جان‌لوئیجی دوناروما","Gianluigi Donnarumma","ایتالیا 🇮🇹","پاری سن ژرمن","دروازه‌بان","۹۹"],
  ["hakimi","اشرف حکیمی","Achraf Hakimi","مراکش 🇲🇦","پاری سن ژرمن","مدافع راست","۲"],
  ["dembele","عثمان دمبله","Ousmane Dembele","فرانسه 🇫🇷","پاری سن ژرمن","وینگر","۱۰"],
  ["vitinha","ویتینیا","Vitinha","پرتغال 🇵🇹","پاری سن ژرمن","هافبک","۱۷"],
  ["joao-neves","ژوائو نوس","Joao Neves","پرتغال 🇵🇹","پاری سن ژرمن","هافبک","۸"],
  ["kvaratskhelia","خویچا کواراتسخلیا","Khvicha Kvaratskhelia","گرجستان 🇬🇪","پاری سن ژرمن","وینگر","۷"],
  ["courtois","تیبو کورتوا","Thibaut Courtois","بلژیک 🇧🇪","رئال مادرید","دروازه‌بان","۱"],
  ["valverde","فدریکو والورده","Federico Valverde","اروگوئه 🇺🇾","رئال مادرید","هافبک","۸"],

  // بازیکنان ۴۱ تا ۶۰
  ["tchouameni","اورلین شوامنی","Aurelien Tchouameni","فرانسه 🇫🇷","رئال مادرید","هافبک دفاعی","۱۴"],
  ["camavinga","ادواردو کاماوینگا","Eduardo Camavinga","فرانسه 🇫🇷","رئال مادرید","هافبک","۶"],
  ["araujo","رونالد آرائوخو","Ronald Araujo","اروگوئه 🇺🇾","بارسلونا","مدافع","۴"],
  ["ter-stegen","مارک آندره تراشتگن","Marc-Andre ter Stegen","آلمان 🇩🇪","بارسلونا","دروازه‌بان","۱"],
  ["cancelo","ژائو کانسلو","Joao Cancelo","پرتغال 🇵🇹","الهلال","مدافع راست","۲"],
  ["bruno-fernandes","برونو فرناندز","Bruno Fernandes","پرتغال 🇵🇹","منچستریونایتد","هافبک","۸"],
  ["rashford","مارکوس رشفورد","Marcus Rashford","انگلیس 🏴","بارسلونا","مهاجم","۱۰"],
  ["garnacho","الخاندرو گارناچو","Alejandro Garnacho","آرژانتین 🇦🇷","چلسی","وینگر","۱۷"],
  ["casemiro","کاسمیرو","Casemiro","برزیل 🇧🇷","منچستریونایتد","هافبک دفاعی","۱۸"],
  ["martinez","لیساندرو مارتینز","Lisandro Martinez","آرژانتین 🇦🇷","منچستریونایتد","مدافع","۶"],
  ["isak","الکساندر ایساک","Alexander Isak","سوئد 🇸🇪","نیوکاسل","مهاجم","۱۴"],
  ["gordon","آنتونی گوردون","Anthony Gordon","انگلیس 🏴","نیوکاسل","وینگر","۱۰"],
  ["tonali","ساندرو تونالی","Sandro Tonali","ایتالیا 🇮🇹","نیوکاسل","هافبک","۸"],
  ["palmer","کول پالمر","Cole Palmer","انگلیس 🏴","چلسی","هافبک هجومی","۲۰"],
  ["enzo","انزو فرناندز","Enzo Fernandez","آرژانتین 🇦🇷","چلسی","هافبک","۸"],
  ["caicedo","مویسس کایسدو","Moises Caicedo","اکوادور 🇪🇨","چلسی","هافبک دفاعی","۲۵"],
  ["reece-james","ریس جیمز","Reece James","انگلیس 🏴","چلسی","مدافع راست","۲۴"],
  ["joao-pedro","ژوائو پدرو","Joao Pedro","برزیل 🇧🇷","چلسی","مهاجم","۲۰"],
  ["watkins","اولی واتکینز","Ollie Watkins","انگلیس 🏴","استون ویلا","مهاجم","۱۱"],
  ["martinez-gk","امیلیانو مارتینز","Emiliano Martinez","آرژانتین 🇦🇷","استون ویلا","دروازه‌بان","۲۳"],

  // بازیکنان ۶۱ تا ۸۰
  ["lukaku","روملو لوکاکو","Romelu Lukaku","بلژیک 🇧🇪","ناپولی","مهاجم","۹"],
  ["osimhen","ویکتور اوسیمن","Victor Osimhen","نیجریه 🇳🇬","گالاتاسرای","مهاجم","۴۵"],
  ["dybala","پائولو دیبالا","Paulo Dybala","آرژانتین 🇦🇷","رم","مهاجم","۲۱"],
  ["dibu","آنخل دی‌ماریا","Angel Di Maria","آرژانتین 🇦🇷","بنفیکا","وینگر","۱۱"],
  ["mac-allister","الکسیس مک‌آلیستر","Alexis Mac Allister","آرژانتین 🇦🇷","لیورپول","هافبک","۱۰"],
  ["szoboszlai","دومینیک سوبوسلای","Dominik Szoboszlai","مجارستان 🇭🇺","لیورپول","هافبک","۸"],
  ["diaz","لوئیس دیاز","Luis Diaz","کلمبیا 🇨🇴","بایرن مونیخ","وینگر","۱۴"],
  ["nunez","داروین نونیز","Darwin Nunez","اروگوئه 🇺🇾","الهلال","مهاجم","۹"],
  ["alisson","آلیسون بکر","Alisson Becker","برزیل 🇧🇷","لیورپول","دروازه‌بان","۱"],
  ["trent","ترنت الکساندر آرنولد","Trent Alexander-Arnold","انگلیس 🏴","رئال مادرید","مدافع راست","۱۲"],
  ["kimmich","یوشوا کیمیش","Joshua Kimmich","آلمان 🇩🇪","بایرن مونیخ","هافبک","۶"],
  ["frenkie-de-jong","فرنکی دی‌یونگ","Frenkie de Jong","هلند 🇳🇱","بارسلونا","هافبک","۲۱"],
  ["ferran-torres","فران تورس","Ferran Torres","اسپانیا 🇪🇸","بارسلونا","مهاجم","۷"],
  ["olmo","دنی اولمو","Dani Olmo","اسپانیا 🇪🇸","بارسلونا","هافبک هجومی","۲۰"],
  ["nico-williams","نیکو ویلیامز","Nico Williams","اسپانیا 🇪🇸","اتلتیک بیلبائو","وینگر","۱۰"],
  ["morata","آلوارو موراتا","Alvaro Morata","اسپانیا 🇪🇸","کومو","مهاجم","۷"],
  ["rodrygo","رودریگو","Rodrygo","برزیل 🇧🇷","رئال مادرید","وینگر","۱۱"],
  ["militao","اِدر میلیتائو","Eder Militao","برزیل 🇧🇷","رئال مادرید","مدافع","۳"],
  ["rudiger","آنتونیو رودیگر","Antonio Rudiger","آلمان 🇩🇪","رئال مادرید","مدافع","۲۲"],
  ["mendy","فرلان مندی","Ferland Mendy","فرانسه 🇫🇷","رئال مادرید","مدافع چپ","۲۳"],

  // بازیکنان ۸۱ تا ۱۰۰
  ["gravenberch","رایان خرافنبرخ","Ryan Gravenberch","هلند 🇳🇱","لیورپول","هافبک","۳۸"],
  ["konate","ابراهیما کوناته","Ibrahima Konate","فرانسه 🇫🇷","لیورپول","مدافع","۵"],
  ["cucurella","مارک کوکوریا","Marc Cucurella","اسپانیا 🇪🇸","چلسی","مدافع چپ","۳"],
  ["madueke","نونی مادوئکه","Noni Madueke","انگلیس 🏴","آرسنال","وینگر","۲۰"],
  ["havertz","کای هاورتز","Kai Havertz","آلمان 🇩🇪","آرسنال","مهاجم","۲۹"],
  ["martinelli","گابریل مارتینلی","Gabriel Martinelli","برزیل 🇧🇷","آرسنال","وینگر","۱۱"],
  ["trossard","لئاندرو تروسار","Leandro Trossard","بلژیک 🇧🇪","آرسنال","وینگر","۱۹"],
  ["ederson","ادرسون","Ederson","برزیل 🇧🇷","منچسترسیتی","دروازه‌بان","۳۱"],
  ["gundogan","ایلکای گوندوغان","Ilkay Gundogan","آلمان 🇩🇪","منچسترسیتی","هافبک","۲۲"],
  ["bernardo-silva","برناردو سیلوا","Bernardo Silva","پرتغال 🇵🇹","منچسترسیتی","هافبک","۲۰"],
  ["savinho","ساوینیو","Savinho","برزیل 🇧🇷","منچسترسیتی","وینگر","۲۶"],
  ["doku","جرمی دوکو","Jeremy Doku","بلژیک 🇧🇪","منچسترسیتی","وینگر","۱۱"],
  ["kovacic","ماتئو کواچیچ","Mateo Kovacic","کرواسی 🇭🇷","منچسترسیتی","هافبک","۸"],
  ["wirtz","فلوریان ویرتز","Florian Wirtz","آلمان 🇩🇪","لیورپول","هافبک هجومی","۱۰"],
  ["frimpong","جرمی فریمپونگ","Jeremie Frimpong","هلند 🇳🇱","لیورپول","مدافع راست","۳۰"],
  ["boniface","ویکتور بونیفیس","Victor Boniface","نیجریه 🇳🇬","بایر لورکوزن","مهاجم","۲۲"],
  ["schlotterbeck","نیکو شلوتربک","Nico Schlotterbeck","آلمان 🇩🇪","دورتموند","مدافع","۴"],
  ["adeyemi","کریم آدیمی","Karim Adeyemi","آلمان 🇩🇪","دورتموند","وینگر","۲۷"],
  ["reus","مارکو رویس","Marco Reus","آلمان 🇩🇪","لس‌آنجلس گلکسی","هافبک هجومی","۱۱"],
  ["verratti","مارکو وراتی","Marco Verratti","ایتالیا 🇮🇹","الدوحیل","هافبک","۷"]
];

// ==========================================
// اطلاعات تکمیلی بازیکنان اصلی
// ==========================================

const extraInfo = {
  messi: {
    birth: "۲۴ ژوئن ۱۹۸۷",
    badge: "GOAT",
    description: "اسطوره فوتبال جهان",
    bio: "لیونل مسی از بهترین بازیکنان تاریخ فوتبال است؛ قهرمان جام جهانی ۲۰۲۲ و برنده هشت توپ طلا.",
    honours: ["۸ توپ طلا", "قهرمانی جام جهانی ۲۰۲۲", "قهرمانی کوپا آمریکا"],
    timeline: ["شروع حرفه‌ای در بارسلونا", "درخشش در بارسلونا", "قهرمانی جام جهانی"]
  },
  ronaldo: {
    birth: "۵ فوریه ۱۹۸۵",
    badge: "LEGEND",
    description: "یکی از گلزن‌ترین بازیکنان تاریخ",
    bio: "کریستیانو رونالدو به خاطر گلزنی، قدرت بدنی و استمرار در سطح بالای فوتبال شناخته می‌شود.",
    honours: ["۵ توپ طلا", "قهرمانی یورو ۲۰۱۶", "قهرمانی لیگ قهرمانان اروپا"],
    timeline: ["شروع در اسپورتینگ", "درخشش در منچستریونایتد", "دوران رئال مادرید"]
  },
  bellingham: {
    birth: "۲۹ ژوئن ۲۰۰۳",
    badge: "STAR",
    description: "ستاره خط میانی",
    bio: "جود بلینگام به خاطر تکنیک، قدرت بدنی و بازی‌سازی‌اش شناخته می‌شود.",
    honours: ["قهرمانی لیگ قهرمانان اروپا ۲۰۲۴"],
    timeline: ["شروع در بیرمنگام", "درخشش در دورتموند", "انتقال به رئال مادرید"]
  },
  mbappe: {
    birth: "۲۰ دسامبر ۱۹۹۸",
    badge: "SPEED",
    description: "ستاره سرعت و گلزنی",
    bio: "کیلیان امباپه به خاطر سرعت بالا، دریبل و تمام‌کنندگی معروف است.",
    honours: ["قهرمانی جام جهانی ۲۰۱۸", "نایب‌قهرمانی جام جهانی ۲۰۲۲"],
    timeline: ["درخشش در موناکو", "بازی در پاری‌سن‌ژرمن", "انتقال به رئال مادرید"]
  },
  neymar: {
    birth: "۵ فوریه ۱۹۹۲",
    badge: "SKILL",
    description: "ستاره تکنیک و دریبل",
    bio: "نیمار به خاطر دریبل‌ها، خلاقیت و مهارت‌های فردی‌اش شناخته می‌شود.",
    honours: ["قهرمانی لیگ قهرمانان اروپا ۲۰۱۵", "طلای المپیک ۲۰۱۶"],
    timeline: ["درخشش در سانتوس", "بازی در بارسلونا", "حضور در پاری‌سن‌ژرمن"]
  },
  haaland: {
    birth: "۲۱ ژوئیه ۲۰۰۰",
    badge: "GOAL MACHINE",
    description: "ماشین گلزنی فوتبال",
    bio: "ارلینگ هالند مهاجمی قدرتمند است که به خاطر سرعت، قدرت بدنی و گلزنی زیاد معروف است.",
    honours: ["قهرمانی لیگ قهرمانان اروپا ۲۰۲۳", "قهرمانی لیگ برتر انگلیس"],
    timeline: ["درخشش در دورتموند", "انتقال به منچسترسیتی"]
  }
};

// ==========================================
// عکس‌های محلی شش بازیکن اصلی
// ==========================================

const localImages = {
  messi: "./messi.jpg",
  ronaldo: "./ronaldo.jpg",
  bellingham: "./bellingham.jpg",
  mbappe: "./mbappe.jpg",
  neymar: "./neymar.jpg",
  haaland: "./haaland.jpg"
};

// ==========================================
// ساخت فهرست نهایی بازیکنان
// ==========================================

const players = playerRows.map((row, index) => {
  const [id, name, englishName, nationality, club, position, number] = row;
  const extra = extraInfo[id] || {};

  return {
    id,
    name,
    englishName,
    image: localImages[id] || "",
    nationality,
    birth: extra.birth || "اطلاعات تاریخ تولد در حال تکمیل است",
    position,
    club,
    number,
    badge: extra.badge || (index < 20 ? "STAR" : "PLAYER"),
    description: extra.description || `بازیکن فوتبال در پست ${position}`,
    bio: extra.bio ||
      `${name} بازیکن فوتبال ${nationality} است که در پست ${position} بازی می‌کند. این صفحه برای معرفی بازیکن و نمایش ادیت‌های فوتبالی او ساخته شده است.`,
    honours: extra.honours || ["اطلاعات افتخارات در حال تکمیل است"],
    timeline: extra.timeline || [
      `شروع فعالیت حرفه‌ای ${name}`,
      "حضور در فوتبال سطح بالا"
    ]
  };
});

// در دسترس قراردادن اطلاعات برای سایر فایل‌های سایت
window.MJ_PLAYERS = players;
window.players = players;

// ==========================================
// به‌روزرسانی عکس کارت بازیکن
// ==========================================

function updatePlayerImage(player) {
  if (!player || !player.image) return;

  // کارت بازیکنی را پیدا می‌کنیم که شناسه‌اش با بازیکن برابر باشد.
  const cards = document.querySelectorAll(".player-card");

  cards.forEach(card => {
    let cardId = "";

    try {
      const cardUrl = new URL(card.href, window.location.href);
      cardId = cardUrl.searchParams.get("id") || "";
    } catch (error) {
      return;
    }

    if (cardId !== player.id) return;

    let img = card.querySelector(".player-photo");

    // اگر عکس در کارت وجود ندارد، آن را می‌سازیم.
    if (!img) {
      img = document.createElement("img");
      img.className = "player-photo";
      img.loading = "eager";
      img.decoding = "async";
      img.alt = player.englishName || player.name || "Football player";
      img.dataset.playerId = player.id;

      card.insertBefore(img, card.firstChild);
    }

    if (img.getAttribute("src") !== player.image) {
      img.src = player.image;
    }
  });
}

// ==========================================
// دریافت عکس بازیکنان از ویکی‌پدیا
// ==========================================

async function loadWikipediaImages() {
  const needsImage = players.filter(player => !player.image);

  for (let i = 0; i < needsImage.length; i += 20) {
    const batch = needsImage.slice(i, i + 20);
    const titles = batch.map(player => player.englishName).join("|");

    try {
      const params = new URLSearchParams({
        action: "query",
        titles,
        prop: "pageimages",
        format: "json",
        pithumbsize: "600",
        redirects: "1",
        origin: "*"
      });

      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?${params.toString()}`
      );

      if (!response.ok) {
        console.warn("دریافت عکس این گروه ناموفق بود:", response.status);
        continue;
      }

      const data = await response.json();

      // ساخت نقشه برای تبدیل عنوان‌های تغییرکرده به عنوان نهایی
      const titleMap = {};

      (data.query?.normalized || []).forEach(item => {
        titleMap[item.from.toLowerCase()] = item.to;
      });

      (data.query?.redirects || []).forEach(item => {
        titleMap[item.from.toLowerCase()] = item.to;
      });

      // نگهداری عکس هر صفحه بر اساس عنوان آن
      const pageMap = {};

      Object.values(data.query?.pages || {}).forEach(page => {
        if (page.thumbnail?.source) {
          pageMap[page.title.toLowerCase()] = page.thumbnail.source;
        }
      });

      for (const player of batch) {
        let title = player.englishName;
        let attempts = 0;

        while (titleMap[title.toLowerCase()] && attempts < 5) {
          title = titleMap[title.toLowerCase()];
          attempts++;
        }

        const image = pageMap[title.toLowerCase()];

        if (image) {
          player.image = image;

          // عکس همان لحظه در کارت نمایش داده می‌شود؛
          // لازم نیست کاربر جست‌وجو کند.
          updatePlayerImage(player);
        }
      }

      // به صفحه اطلاع می‌دهیم که این گروه پردازش شده است.
      window.dispatchEvent(new CustomEvent("mjPlayersBatchReady", {
        detail: { players, start: i, count: batch.length }
      }));

    } catch (error) {
      console.warn("دریافت عکس بازیکنان با مشکل مواجه شد:", error);
    }
  }

  // اعلام پایان دریافت همه گروه‌ها
  window.dispatchEvent(new CustomEvent("mjPlayersReady", {
    detail: { players }
  }));
}

// شروع دریافت عکس‌ها
loadWikipediaImages();
