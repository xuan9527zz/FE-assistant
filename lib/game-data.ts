export type RouteKey = "cai" | "dietrich" | "theodora" | "leda";

export type JoinStatus = "initial" | "auto" | "recruit" | "later" | "unavailable";

export type RouteCondition = {
  status: JoinStatus;
  renown?: number;
  support?: number;
  extra?: string;
  timing?: string;
};

export type Character = {
  id: string;
  name: string;
  ja: string;
  tier?: 1 | 2 | 3 | 4 | 5;
  role?: string;
  recommendedClass?: string;
  classPath?: string;
  gifts?: string[];
  likes?: string[];
  dislikes?: string[];
  routes: Record<RouteKey, RouteCondition>;
};

export type GiftDetails = {
  name: string;
  ja?: string;
  url?: string;
};

export const routes: Array<{ key: RouteKey; name: string; note: string }> = [
  { key: "cai", name: "凯伊线", note: "蓝狮鹫" },
  { key: "dietrich", name: "迪托利希线", note: "紫鸦" },
  { key: "theodora", name: "赛奥朵拉线", note: "金狮" },
  { key: "leda", name: "蕾达线", note: "绯蔷薇" },
];

export const routeColor: Record<RouteKey, string> = {
  cai: "var(--route-cai)",
  dietrich: "var(--route-dietrich)",
  theodora: "var(--route-theodora)",
  leda: "var(--route-leda)",
};

const initial = (): RouteCondition => ({ status: "initial" });
const auto = (timing?: string): RouteCondition => ({ status: "auto", timing });
const recruit = (renown: number, support: number, extra?: string, timing?: string): RouteCondition => ({
  status: "recruit",
  renown,
  support,
  extra,
  timing,
});
const unavailable = (): RouteCondition => ({ status: "unavailable" });
const later = (timing: string, extra?: string): RouteCondition => ({ status: "later", timing, extra });

const giftCatalog: Record<string, Omit<GiftDetails, "ja">> = {
  "薄いセルビ": { name: "淡味赛尔维", url: "https://gamewith.jp/fefw/578092" },
  "刺激的なゴーシュ": { name: "活力戈什", url: "https://gamewith.jp/fefw/578102" },
  "村の素朴な料理集": { name: "乡村食谱", url: "https://gamewith.jp/fefw/578114" },
  "大粒のテフ": { name: "精选咖啡", url: "https://gamewith.jp/fefw/578110" },
  "淡い色の画材": { name: "粉彩颜料套装", url: "https://gamewith.jp/fefw/578130" },
  "東方恋愛見聞録": { name: "东方爱情故事" },
  "東方の耳飾り": { name: "东方耳饰", url: "https://gamewith.jp/fefw/578153" },
  "東方の盤上遊戯": { name: "东方桌游", url: "https://gamewith.jp/fefw/578136" },
  "東方の最高級茶葉": { name: "东方茶叶" },
  "闘技場物語の写本": { name: "斗技场谭", url: "https://gamewith.jp/fefw/578156" },
  "鍛錬用の装飾腕輪": { name: "训练手环", url: "https://gamewith.jp/fefw/578145" },
  "盾たちの肖像画": { name: "盾之肖像画", url: "https://gamewith.jp/fefw/578161" },
  "二振りの魚包丁": { name: "双鱼刀", url: "https://gamewith.jp/fefw/578126" },
  "芳醇なソウシュ": { name: "芳香肖什", url: "https://gamewith.jp/fefw/578108" },
  "翡翠色のゴーシュ": { name: "翡翠戈什", url: "https://gamewith.jp/fefw/578100" },
  "風裂きの矢羽根": { name: "翼羽箭翎", url: "https://gamewith.jp/fefw/578127" },
  "蜂蜜入りの乳": { name: "蜂蜜奶", url: "https://gamewith.jp/fefw/578088" },
  "高級八卦占い道具": { name: "占卜八卦" },
  "関節保護用長手袋": { name: "护腕手套", url: "https://gamewith.jp/fefw/578164" },
  "海の向こうの古書": { name: "厚重异国典籍", url: "https://gamewith.jp/fefw/578159" },
  "黒檀の盤上遊戯": { name: "黑檀桌游", url: "https://gamewith.jp/fefw/578166" },
  "火の山のゴーシュ": { name: "火山戈什", url: "https://gamewith.jp/fefw/578144" },
  "家庭料理大全": { name: "家常菜谱", url: "https://gamewith.jp/fefw/578117" },
  "教職員事件簿": { name: "教职员事件簿" },
  "精霊の盤上遊戯": { name: "精灵桌游", url: "https://gamewith.jp/fefw/578129" },
  "巨大魚の目玉": { name: "巨型鱼眼", url: "https://gamewith.jp/fefw/578162" },
  "軍略書の写本": { name: "兵法手稿", url: "https://gamewith.jp/fefw/578125" },
  "旅の老師の口伝録": { name: "旅者导师口述录", url: "https://gamewith.jp/fefw/578152" },
  "馬のお手入れ道具": { name: "马匹护理套装", url: "https://gamewith.jp/fefw/578121" },
  "貿易取引入門": { name: "商人手册", url: "https://gamewith.jp/fefw/578155" },
  "美しい飾り矢": { name: "装饰箭", url: "https://gamewith.jp/fefw/578138" },
  "秘伝のゴーシュ": { name: "秘传戈什", url: "https://gamewith.jp/fefw/578150" },
  "南方の薫るテフ": { name: "南方咖啡", url: "https://gamewith.jp/fefw/578111" },
  "南方のゴーシュ": { name: "南方戈什", url: "https://gamewith.jp/fefw/578104" },
  "南洋冒険奇譚": { name: "冒险谭", url: "https://gamewith.jp/fefw/578151" },
  "濃厚なガルム": { name: "浓醇鱼酱", url: "https://gamewith.jp/fefw/578163" },
  "濃いセルビ": { name: "浓醇赛尔维", url: "https://gamewith.jp/fefw/578094" },
  "女騎士と求婚者": { name: "女骑士与求婚者", url: "https://gamewith.jp/fefw/578124" },
  "派手すぎる腕輪": { name: "华丽手镯", url: "https://gamewith.jp/fefw/578146" },
  "派手で美しい指輪": { name: "精美戒指", url: "https://gamewith.jp/fefw/578132" },
  "球根の酢漬け": { name: "腌球茎" },
  "栄養満点お菓子本": { name: "糕点食谱", url: "https://gamewith.jp/fefw/578113" },
  "鋭い釣り針": { name: "锋利鱼钩", url: "https://gamewith.jp/fefw/578120" },
  "鋭く小さな短剣": { name: "锋利小短剑", url: "https://gamewith.jp/fefw/578154" },
  "若いゴーシュ": { name: "新酿戈什", url: "https://gamewith.jp/fefw/578098" },
  "若いソウシュ": { name: "新酿肖什", url: "https://gamewith.jp/fefw/578105" },
  "少し甘い焼き菓子": { name: "醇香糕点", url: "https://gamewith.jp/fefw/578095" },
  "実験的な裁縫道具": { name: "实验性裁缝工具" },
  "実用的な裁縫道具": { name: "全套针线包", url: "https://gamewith.jp/fefw/578128" },
  "世界の名詩集": { name: "名家诗集", url: "https://gamewith.jp/fefw/578160" },
  "熟成干しセルビ": { name: "陈制赛尔维干", url: "https://gamewith.jp/fefw/578143" },
  "熟成ゴーシュ": { name: "陈酿戈什", url: "https://gamewith.jp/fefw/578099" },
  "熟成ソウシュ": { name: "陈酿肖什", url: "https://gamewith.jp/fefw/578107" },
  "庶民百景": { name: "日常风景" },
  "素朴な焼き菓子": { name: "朴素糕点", url: "https://gamewith.jp/fefw/578090" },
  "素朴なゴーシュ": { name: "乡野戈什", url: "https://gamewith.jp/fefw/578101" },
  "太陽のゴーシュ": { name: "阳光戈什", url: "https://gamewith.jp/fefw/578103" },
  "天露水": { name: "护肤香膏", url: "https://gamewith.jp/fefw/578131" },
  "味わい深い調味料": { name: "浓烈调味料", url: "https://gamewith.jp/fefw/578133" },
  "武術訓練用の重り": { name: "训练负重" },
  "香ばしい焼き菓子": { name: "芬芳糕点", url: "https://gamewith.jp/fefw/578148" },
  "小粒のテフ": { name: "普通咖啡", url: "https://gamewith.jp/fefw/578109" },
  "薬草料理大全": { name: "药膳食谱指南", url: "https://gamewith.jp/fefw/578134" },
  "野菜の鉢植え": { name: "盆栽蔬菜", url: "https://gamewith.jp/fefw/578112" },
  "野菜の酢漬け": { name: "醋渍蔬菜" },
  "野菜の瓶漬け": { name: "瓶装腌菜" },
  "野外調理道具": { name: "户外炊具套装", url: "https://gamewith.jp/fefw/578140" },
  "儀礼用の鋭い槍": { name: "仪式长枪", url: "https://gamewith.jp/fefw/578157" },
  "珍しい香辛料": { name: "珍稀香料", url: "https://gamewith.jp/fefw/578116" },
  "真紅のゴーシュ": { name: "绯红戈什", url: "https://gamewith.jp/fefw/578149" },
  "軽妙なソウシュ": { name: "淡爽肖什", url: "https://gamewith.jp/fefw/578106" },
  "髭飾り": { name: "鬃毛饰件" },
  "子猫の置物": { name: "小猫摆件" },
  "アレクトーガルム": { name: "阿勒克托鱼酱", url: "https://gamewith.jp/fefw/578167" },
  "オーガスのテフ": { name: "奥尔古斯咖啡" },
  "ガルム": { name: "鱼酱", url: "https://gamewith.jp/fefw/578096" },
  "ギンジ入りセルビ": { name: "银次赛尔维", url: "https://gamewith.jp/fefw/578093" },
  "サラミスの菓子": { name: "萨拉米斯甜点", url: "https://gamewith.jp/fefw/578137" },
  "しなやかな釣り竿": { name: "柔韧钓竿", url: "https://gamewith.jp/fefw/578119" },
  "ジャーメルの乳": { name: "贾梅尔奶", url: "https://gamewith.jp/fefw/578089" },
  "ダグザヒゲシバ": { name: "达格达须草", url: "https://gamewith.jp/fefw/578122" },
  "ダンテ戯曲全集": { name: "但丁作品集", url: "https://gamewith.jp/fefw/578123" },
  "テフ入り焼き菓子": { name: "咖啡糕点", url: "https://gamewith.jp/fefw/578142" },
  "ニーザ産ガルム": { name: "尼扎鱼酱", url: "https://gamewith.jp/fefw/578097" },
  "ペガサスの風景画": { name: "天马风景画", url: "https://gamewith.jp/fefw/578141" },
  "モルフィス歳時記": { name: "摩尔菲斯岁时记", url: "https://gamewith.jp/fefw/578158" },
  "モルフィスの紅茶": { name: "莫尔菲斯红茶", url: "https://gamewith.jp/fefw/578147" },
  "ヤクの乳": { name: "亚克奶", url: "https://gamewith.jp/fefw/578091" },
  "ユ・ファスの肖像": { name: "尤法斯肖像画" },
  "よく切れる彫刻刀": { name: "手工刻刀", url: "https://gamewith.jp/fefw/578135" },
};

const favoriteGiftsByCharacter: Record<string, string[]> = {
  cai: ["ダグザヒゲシバ", "馬のお手入れ道具", "髭飾り", "鍛錬用の装飾腕輪", "軍略書の写本", "儀礼用の鋭い槍"],
  tialla: ["ダンテ戯曲全集", "南洋冒険奇譚", "女騎士と求婚者", "貿易取引入門", "闘技場物語の写本", "海の向こうの古書", "ガルム", "東方の盤上遊戯", "黒檀の盤上遊戯", "精霊の盤上遊戯", "薄いセルビ", "濃いセルビ", "ギンジ入りセルビ", "熟成干しセルビ"],
  peter: ["少し甘い焼き菓子", "ギンジ入りセルビ", "サラミスの菓子", "栄養満点お菓子本", "香ばしい焼き菓子", "蜂蜜入りの乳", "薬草料理大全", "二振りの魚包丁", "ニーザ産ガルム", "アレクトーガルム", "ガルム", "濃厚なガルム", "南洋冒険奇譚"],
  ultand: ["ガルム", "濃厚なガルム", "ニーザ産ガルム", "二振りの魚包丁", "味わい深い調味料", "薬草料理大全", "家庭料理大全", "野外調理道具", "村の素朴な料理集", "南洋冒険奇譚", "女騎士と求婚者", "世界の名詩集"],
  goliath: ["若いゴーシュ", "太陽のゴーシュ", "熟成ゴーシュ", "刺激的なゴーシュ", "素朴なゴーシュ", "翡翠色のゴーシュ", "南方のゴーシュ", "火の山のゴーシュ", "精霊の盤上遊戯", "東方の盤上遊戯"],
  dante: ["小粒のテフ", "大粒のテフ", "南方の薫るテフ", "ダンテ戯曲全集", "女騎士と求婚者", "旅の老師の口伝録", "貿易取引入門"],
  dietrich: ["素朴な焼き菓子", "少し甘い焼き菓子", "香ばしい焼き菓子", "ギンジ入りセルビ", "ペガサスの風景画", "盾たちの肖像画", "テフ入り焼き菓子"],
  fabio: ["小粒のテフ", "大粒のテフ", "オーガスのテフ", "南方の薫るテフ", "テフ入り焼き菓子"],
  esmeralda: ["鋭い釣り針", "しなやかな釣り竿", "少し甘い焼き菓子", "素朴な焼き菓子", "香ばしい焼き菓子", "ギンジ入りセルビ", "巨大魚の目玉", "テフ入り焼き菓子"],
  mikaela: ["小粒のテフ", "大粒のテフ", "南方の薫るテフ", "軽妙なソウシュ", "テフ入り焼き菓子"],
  orchel: ["ダンテ戯曲全集"],
  loretta: ["少し甘い焼き菓子", "素朴な焼き菓子", "サラミスの菓子", "香ばしい焼き菓子", "テフ入り焼き菓子"],
  ninae: ["ユ・ファスの肖像"],
  theodora: ["ペガサスの風景画", "儀礼用の鋭い槍", "ユ・ファスの肖像"],
  bonaventure: ["旅の老師の口伝録", "南洋冒険奇譚", "モルフィス歳時記", "海の向こうの古書", "女騎士と求婚者", "世界の名詩集"],
  tobias: ["太陽のゴーシュ", "若いゴーシュ", "熟成ゴーシュ", "翡翠色のゴーシュ", "刺激的なゴーシュ", "素朴なゴーシュ", "秘伝のゴーシュ", "南方のゴーシュ", "火の山のゴーシュ", "真紅のゴーシュ", "若いソウシュ", "熟成ソウシュ", "軽妙なソウシュ", "芳醇なソウシュ", "旅の老師の口伝録"],
  lilian: ["東方の耳飾り", "派手すぎる腕輪", "天露水", "実験的な裁縫道具", "珍しい香辛料", "美しい飾り矢"],
  lysander: ["武術訓練用の重り", "鋭く小さな短剣", "儀礼用の鋭い槍"],
  talimun: ["小粒のテフ", "大粒のテフ", "オーガスのテフ", "芳醇なソウシュ", "軽妙なソウシュ", "熟成ソウシュ", "若いソウシュ", "秘伝のゴーシュ", "南方のゴーシュ", "火の山のゴーシュ", "翡翠色のゴーシュ", "素朴なゴーシュ", "刺激的なゴーシュ", "太陽のゴーシュ", "熟成ゴーシュ", "若いゴーシュ", "真紅のゴーシュ", "女騎士と求婚者", "南洋冒険奇譚", "東方の盤上遊戯", "精霊の盤上遊戯", "黒檀の盤上遊戯", "テフ入り焼き菓子"],
  ursula: ["小粒のテフ", "大粒のテフ", "南方の薫るテフ", "オーガスのテフ", "南洋冒険奇譚", "テフ入り焼き菓子", "東方の盤上遊戯"],
  ludia: ["小粒のテフ", "大粒のテフ", "南方の薫るテフ", "オーガスのテフ", "庶民百景", "ダンテ戯曲全集", "女騎士と求婚者", "貿易取引入門", "闘技場物語の写本", "よく切れる彫刻刀", "淡い色の画材"],
  fianna: ["小粒のテフ", "大粒のテフ", "南方の薫るテフ", "テフ入り焼き菓子", "旅の老師の口伝録", "モルフィスの紅茶", "東方の最高級茶葉"],
  leda: ["派手すぎる腕輪", "東方の耳飾り", "派手で美しい指輪", "天露水", "実用的な裁縫道具", "ユ・ファスの肖像"],
  buccar: ["若いゴーシュ", "熟成ゴーシュ", "太陽のゴーシュ", "翡翠色のゴーシュ", "鋭く小さな短剣", "儀礼用の鋭い槍"],
  sirocco: ["若いゴーシュ", "熟成ゴーシュ", "太陽のゴーシュ", "刺激的なゴーシュ", "素朴なゴーシュ", "翡翠色のゴーシュ", "南方のゴーシュ", "火の山のゴーシュ", "秘伝のゴーシュ", "真紅のゴーシュ", "若いソウシュ", "熟成ソウシュ", "軽妙なソウシュ", "芳醇なソウシュ", "ペガサスの風景画", "女騎士と求婚者", "南洋冒険奇譚", "ユ・ファスの肖像"],
  olympia: ["オーガスのテフ"],
  mu: ["小粒のテフ", "大粒のテフ", "南方の薫るテフ", "オーガスのテフ", "素朴な焼き菓子", "少し甘い焼き菓子", "サラミスの菓子", "香ばしい焼き菓子", "テフ入り焼き菓子"],
  anatolia: ["南洋冒険奇譚", "高級八卦占い道具", "儀礼用の鋭い槍"],
  nezha: ["野菜の鉢植え", "球根の酢漬け", "野菜の瓶漬け", "東方の盤上遊戯"],
  dadao: ["真紅のゴーシュ", "ヤクの乳", "蜂蜜入りの乳", "ジャーメルの乳", "薄いセルビ", "濃いセルビ", "熟成干しセルビ", "ギンジ入りセルビ", "素朴な焼き菓子"],
  halvin: ["ガルム", "ニーザ産ガルム", "野菜の鉢植え", "野菜の酢漬け"],
  guzran: ["若いゴーシュ", "熟成ゴーシュ", "太陽のゴーシュ", "刺激的なゴーシュ", "素朴なゴーシュ", "翡翠色のゴーシュ", "南方のゴーシュ", "火の山のゴーシュ", "若いソウシュ", "熟成ソウシュ", "芳醇なソウシュ"],
  io: ["馬のお手入れ道具", "ダグザヒゲシバ", "髭飾り"],
  peppe: ["小粒のテフ", "大粒のテフ", "南方の薫るテフ", "オーガスのテフ", "南洋冒険奇譚", "教職員事件簿", "闘技場物語の写本", "貿易取引入門", "女騎士と求婚者", "庶民百景", "テフ入り焼き菓子", "栄養満点お菓子本", "薬草料理大全", "ユ・ファスの肖像", "盾たちの肖像画", "ペガサスの風景画"],
  noctula: ["鍛錬用の装飾腕輪", "武術訓練用の重り", "軍略書の写本", "儀礼用の鋭い槍", "鋭く小さな短剣"],
  sofia: ["ニーザ産ガルム", "ガルム", "濃厚なガルム", "アレクトーガルム", "薬草料理大全", "二振りの魚包丁", "味わい深い調味料", "野外調理道具", "村の素朴な料理集", "ジャーメルの乳", "ヤクの乳", "濃いセルビ", "薄いセルビ", "熟成干しセルビ", "蜂蜜入りの乳", "ギンジ入りセルビ", "少し甘い焼き菓子", "素朴な焼き菓子", "香ばしい焼き菓子", "サラミスの菓子", "栄養満点お菓子本", "南方の薫るテフ", "大粒のテフ", "小粒のテフ", "オーガスのテフ", "テフ入り焼き菓子", "珍しい香辛料"],
  catania: ["小粒のテフ", "大粒のテフ", "オーガスのテフ", "盾たちの肖像画", "ペガサスの風景画", "よく切れる彫刻刀", "ユ・ファスの肖像"],
  nydine: ["風裂きの矢羽根"],
  majide: ["若いゴーシュ", "熟成ゴーシュ", "太陽のゴーシュ", "刺激的なゴーシュ", "素朴なゴーシュ", "翡翠色のゴーシュ", "南方のゴーシュ", "火の山のゴーシュ", "真紅のゴーシュ", "若いソウシュ", "熟成ソウシュ", "軽妙なソウシュ", "芳醇なソウシュ"],
  benditz: ["精霊の盤上遊戯", "東方の盤上遊戯", "軍略書の写本", "南洋冒険奇譚", "儀礼用の鋭い槍"],
  inyoni: ["美しい飾り矢", "関節保護用長手袋", "風裂きの矢羽根", "しなやかな釣り竿", "鋭い釣り針"],
  alexandra: ["馬のお手入れ道具", "髭飾り", "ダグザヒゲシバ", "ペガサスの風景画"],
  nuzzuo: ["ガルム"],
  honghua: ["小粒のテフ", "大粒のテフ"],
  troy: ["子猫の置物"],
};

export function getGiftDetails(gift: string): GiftDetails {
  const details = giftCatalog[gift];
  return details ? { ...details, ja: gift } : { name: gift };
}

const baseCharacters: Character[] = [
  {
    id: "cai", name: "凯伊", ja: "カイ", tier: 1, role: "近战主力",
    gifts: ["马具类礼物", "锻炼类礼物", "仪式用锋利长枪"],
    likes: ["活动身体", "捕捉动物"],
    routes: { cai: initial(), dietrich: unavailable(), theodora: unavailable(), leda: unavailable() },
  },
  {
    id: "tialla", name: "媞雅拉", ja: "ティアラ", tier: 3, role: "魔法输出",
    gifts: ["书籍类礼物", "料理类礼物", "东方盘上游戏", "黑檀盘上游戏", "精灵盘上游戏"],
    likes: ["书库", "传闻", "恋爱话题", "独处时间"],
    routes: {
      cai: initial(),
      dietrich: recruit(9, 3, "完成凯伊外传、3000G"),
      theodora: recruit(10, 3, "完成凯伊外传、3000G"),
      leda: recruit(8, 3, "完成凯伊外传、3000G"),
    },
  },
  {
    id: "peter", name: "皮特鲁", ja: "ピーテル", tier: 2, role: "远程输出",
    gifts: ["微甜烘焙点心"], likes: ["母亲的手料理", "金吉果"],
    routes: { cai: initial(), dietrich: recruit(8, 3, "完成任务"), theodora: recruit(7, 3, "完成任务"), leda: recruit(10, 3, "完成任务") },
  },
  {
    id: "ultand", name: "乌尔坦德", ja: "ウルタンド", tier: 3, role: "前排支援",
    gifts: ["料理类礼物", "《南洋冒险奇谭》", "《女骑士与求婚者》", "《世界名诗集》"],
    likes: ["照顾别人", "家人", "家务", "恋爱故事"],
    routes: { cai: auto("第6章"), dietrich: recruit(5, 3, "完成任务"), theodora: recruit(6, 3, "完成任务"), leda: recruit(8, 3, "完成任务") },
  },
  {
    id: "gaitz", name: "盖兹", ja: "ガイツ", tier: 3,
    routes: { cai: unavailable(), dietrich: recruit(10, 3, "完成贝特朗外传，并等待其队伍出局", "约第12章"), theodora: unavailable(), leda: unavailable() },
  },
  {
    id: "jester", name: "杰斯塔", ja: "ジェスター", tier: 4,
    routes: { cai: recruit(10, 3, "完成3个任务"), dietrich: recruit(6, 3, "完成3个任务"), theodora: recruit(9, 3, "完成3个任务"), leda: recruit(10, 3, "完成3个任务") },
  },
  {
    id: "goliath", name: "哥莱亚斯", ja: "ゴライアス", tier: 2, role: "重装前排",
    gifts: ["发酵饮料类礼物", "精灵盘上游戏", "东方盘上游戏"],
    likes: ["大闹一场", "吃东西", "动物", "制作熏肉"],
    routes: { cai: recruit(7, 3, "巨人肉 ×3"), dietrich: recruit(6, 3, "巨人肉 ×3"), theodora: recruit(9, 3, "巨人肉 ×3"), leda: recruit(10, 3, "巨人肉 ×3") },
  },
  {
    id: "dante", name: "丹提", ja: "ダンテ", tier: 3,
    gifts: ["苔麸类礼物", "书籍类礼物"], likes: ["自己", "写作", "寻找戏剧性主题"],
    routes: { cai: recruit(10, 3, "8000G"), dietrich: recruit(8, 2, "8000G"), theodora: recruit(6, 3, "8000G"), leda: recruit(10, 3, "8000G") },
  },
  {
    id: "dietrich", name: "迪托利希", ja: "ディートリヒ", tier: 1, role: "高速剑士",
    gifts: ["甜食类礼物", "绘画类礼物", "苔麸烘焙点心"],
    likes: ["美丽之物", "猫等可爱事物", "甜食", "妹妹"],
    routes: { cai: unavailable(), dietrich: initial(), theodora: unavailable(), leda: unavailable() },
  },
  {
    id: "fabio", name: "法毕欧", ja: "ファビオ", tier: 3,
    gifts: ["苔麸类礼物", "苔麸烘焙点心"], likes: ["各种痛苦", "遗忘的感情", "解剖美丽之物"],
    routes: { cai: unavailable(), dietrich: initial(), theodora: unavailable(), leda: recruit(9, 3, "完成迪托利希外传、等待其队伍出局，并交付合适道具", "约第12章") },
  },
  {
    id: "esmeralda", name: "艾丝梅拉尔达", ja: "エスメラルダ", tier: 2, role: "耐久前排",
    gifts: ["钓鱼类礼物", "甜食类礼物", "巨鱼眼球", "苔麸烘焙点心"],
    likes: ["长得好看的男人", "鱼叉捕鱼", "保养渔具"],
    routes: { cai: recruit(7, 3, "完成任务"), dietrich: initial(), theodora: recruit(9, 3, "完成任务"), leda: recruit(6, 3, "完成任务") },
  },
  {
    id: "mikaela", name: "米迦艾拉", ja: "ミカエラ", tier: 3, role: "近战前排",
    gifts: ["苔麸类礼物", "轻妙的索乌舒", "苔麸烘焙点心"], likes: ["活动身体", "照顾别人"],
    routes: { cai: recruit(5, 3, "3000G"), dietrich: initial(), theodora: recruit(8, 3, "3000G"), leda: recruit(6, 3, "3000G") },
  },
  {
    id: "orchel", name: "欧露赫露", ja: "オルヘル", tier: 1, role: "剧情加入",
    gifts: ["《丹提戏曲全集》"], likes: ["与动物相处", "听歌", "打扫", "洗衣", "料理"],
    routes: { cai: later("第三部·救世篇第1区分", "建议第一部完成其外传"), dietrich: later("第三部·救世篇第1区分", "建议第一部完成其外传"), theodora: later("第三部·救世篇第1区分", "建议第一部完成其外传"), leda: later("第三部·救世篇第1区分", "建议第一部完成其外传") },
  },
  {
    id: "diego", name: "迪雅各", ja: "ディエゴ", tier: 2,
    likes: ["在森林中散步", "采药", "欧露赫露"],
    routes: { cai: recruit(10, 3, "完成欧露赫露外传"), dietrich: recruit(9, 3, "完成欧露赫露外传"), theodora: recruit(8, 2, "完成欧露赫露外传"), leda: recruit(8, 3, "完成欧露赫露外传") },
  },
  {
    id: "loretta", name: "罗蕾塔", ja: "ロレッタ", tier: 2, role: "机动前排",
    gifts: ["甜食类礼物", "苔麸烘焙点心"], likes: ["可靠的人", "甜食", "朋友"],
    routes: { cai: recruit(7, 3, "铁剑 ×3"), dietrich: recruit(9, 3, "铁剑 ×3"), theodora: recruit(5, 3, "铁剑 ×3"), leda: recruit(5, 3, "铁剑 ×3") },
  },
  {
    id: "seteth", name: "西提司", ja: "セテス", tier: 4,
    likes: ["赛罗斯教义", "钓鱼", "自己的女儿", "勤勉之人"],
    routes: { cai: recruit(6, 3, "完成任务"), dietrich: unavailable(), theodora: recruit(6, 3, "完成任务"), leda: recruit(10, 3, "完成任务") },
  },
  {
    id: "ninae", name: "妮涅", ja: "ニネ", tier: 3,
    gifts: ["尤·法斯肖像"], likes: ["可怜的人", "与精灵对话", "遗物项链", "仰望天空"],
    routes: { cai: recruit(6, 3, "天堂鱼 ×1"), dietrich: recruit(8, 3, "天堂鱼 ×1"), theodora: recruit(6, 3, "天堂鱼 ×1"), leda: recruit(6, 3, "天堂鱼 ×1") },
  },
  {
    id: "theodora", name: "赛奥朵拉", ja: "セオドラ", tier: 1, role: "力量前排",
    gifts: ["绘画类礼物", "武器类礼物", "尤·法斯肖像"], likes: ["斗争", "尤·法斯", "萨拉米斯人民的幸福"],
    routes: { cai: unavailable(), dietrich: unavailable(), theodora: initial(), leda: unavailable() },
  },
  {
    id: "bonaventure", name: "波拿帕尔特", ja: "ボナパルテ", tier: 3,
    gifts: ["书籍类礼物"], likes: ["记忆知识", "与贤者问答", "学习他国历史与军略"],
    routes: { cai: unavailable(), dietrich: unavailable(), theodora: initial(), leda: unavailable() },
  },
  {
    id: "tobias", name: "托比亚斯", ja: "トビヤス", tier: 3,
    gifts: ["发酵饮料类礼物", "《旅之老师口传录》"], likes: ["酒", "斗争", "歌", "与人交往"],
    routes: { cai: unavailable(), dietrich: unavailable(), theodora: initial(), leda: unavailable() },
  },
  {
    id: "lilian", name: "莉利安", ja: "リリアン", tier: 3,
    gifts: ["装饰类礼物", "稀有香辛料", "美丽装饰箭"], likes: ["金币", "宝石", "年长男性"],
    routes: { cai: recruit(8, 2, "5000G"), dietrich: recruit(8, 2, "5000G"), theodora: initial(), leda: recruit(7, 2, "5000G") },
  },
  {
    id: "lysander", name: "莱桑达", ja: "ライサンダー", tier: 3,
    gifts: ["锻炼类礼物", "锋利小短剑", "仪式用锋利长枪"], likes: ["仰望天空", "与女性用餐"],
    routes: { cai: recruit(8, 3, "铁枪 ×5"), dietrich: recruit(6, 3, "铁枪 ×5"), theodora: initial(), leda: recruit(7, 3, "铁枪 ×5") },
  },
  {
    id: "talimun", name: "谭利穆恩", ja: "タリムーン", tier: 2, role: "剧情加入",
    gifts: ["苔麸类礼物", "发酵饮料类礼物", "书籍类礼物", "盘上游戏类礼物", "苔麸烘焙点心"],
    likes: ["金钱", "冒险", "肉桂", "追求女性", "遵从内心"],
    routes: { cai: later("第三部·救世篇第1区分", "建议第一部完成其外传"), dietrich: later("第三部·救世篇第1区分", "建议第一部完成其外传"), theodora: later("第三部·救世篇第1区分", "建议第一部完成其外传"), leda: later("第三部·救世篇第1区分", "建议第一部完成其外传") },
  },
  {
    id: "ursula", name: "乌修拉", ja: "ウーシュラ", tier: 4,
    gifts: ["苔麸类礼物", "书籍类礼物", "苔麸烘焙点心", "东方盘上游戏"],
    likes: ["喜爱的诗集", "动物", "阴影处开放的花", "算账"],
    routes: { cai: recruit(10, 3, "完成谭利穆恩外传，并连续回答“是”3次"), dietrich: recruit(7, 3, "完成谭利穆恩外传，并连续回答“是”3次"), theodora: recruit(9, 3, "完成谭利穆恩外传，并连续回答“是”3次"), leda: unavailable() },
  },
  {
    id: "ludia", name: "露露蒂雅", ja: "ルルディヤー", tier: 2,
    gifts: ["苔麸类礼物", "书籍类礼物", "艺术类礼物"], likes: ["写故事", "欣赏美术品", "恋爱话题"],
    routes: { cai: recruit(9, 3, "完成任务"), dietrich: recruit(9, 3, "完成任务"), theodora: recruit(7, 3, "完成任务"), leda: recruit(7, 3, "完成任务") },
  },
  {
    id: "simon", name: "希蒙", ja: "シモン", tier: 4,
    likes: ["以命相搏", "故乡料理", "与女性玩乐"],
    routes: { cai: recruit(8, 3, "抛硬币选择反面"), dietrich: recruit(7, 3, "抛硬币选择反面"), theodora: recruit(7, 3, "抛硬币选择反面"), leda: recruit(6, 3, "抛硬币选择反面") },
  },
  {
    id: "fianna", name: "绯亚娜", ja: "フィアナ", tier: 4, role: "辅助输出",
    gifts: ["苔麸类礼物", "苔麸烘焙点心", "《旅之老师口传录》", "摩尔菲斯红茶", "东方最高级茶叶"],
    likes: ["诗集", "辛辣食物", "苔麸", "值得信赖的人"],
    routes: { cai: recruit(8, 3, "3000G"), dietrich: recruit(7, 3, "3000G"), theodora: recruit(9, 3, "3000G"), leda: recruit(5, 3, "3000G") },
  },
  {
    id: "leda", name: "蕾达", ja: "レダ", tier: 1, role: "机动支援",
    gifts: ["装饰类礼物", "尤·法斯肖像"], likes: ["父母的回忆", "演奏故乡歌曲", "可爱的女孩", "宝石", "喝彩"],
    routes: { cai: unavailable(), dietrich: unavailable(), theodora: unavailable(), leda: initial() },
  },
  {
    id: "buccar", name: "巴卡尼亚", ja: "バッカニア", tier: 3,
    gifts: ["发酵饮料类礼物", "锋利小短剑", "仪式用锋利长枪"], likes: ["忠义", "锻炼", "酒", "幻想蕾达的幸福"],
    routes: { cai: unavailable(), dietrich: recruit(8, 3, "完成蕾达外传"), theodora: recruit(8, 3, "完成蕾达外传"), leda: initial() },
  },
  {
    id: "sirocco", name: "西洛可", ja: "シロッコ", tier: 2, role: "泛用输出",
    gifts: ["发酵饮料类礼物", "绘画类礼物", "书籍类礼物", "尤·法斯肖像"],
    likes: ["女神卡拉", "所有女性", "作诗"],
    routes: { cai: recruit(9, 3, "完成任务"), dietrich: recruit(9, 3, "完成任务"), theodora: recruit(5, 1, "完成任务"), leda: initial() },
  },
  {
    id: "olympia", name: "奥琳琵娅", ja: "オリンピア", tier: 2,
    gifts: ["奥格斯苔麸"], likes: ["唱歌", "舞蹈", "演奏乐器", "作诗", "受到关注"],
    routes: { cai: recruit(8, 3, "完成3个任务"), dietrich: recruit(6, 3, "完成3个任务"), theodora: recruit(9, 3, "完成3个任务"), leda: initial() },
  },
  {
    id: "mu", name: "穆", ja: "ムウ", tier: 2, role: "近战输出",
    gifts: ["苔麸类礼物", "甜食类礼物", "苔麸烘焙点心"], likes: ["调配新药", "父亲", "母亲", "吃甜点"],
    routes: { cai: recruit(9, 3, "格鲁玛奥萨 ×3"), dietrich: recruit(7, 3, "格鲁玛奥萨 ×3"), theodora: recruit(9, 3, "格鲁玛奥萨 ×3"), leda: initial() },
  },
  {
    id: "anatolia", name: "爱娜特莉亚", ja: "アナトリア", tier: 1, role: "剧情加入",
    gifts: ["《南洋冒险奇谭》", "高级八卦占卜工具", "仪式用锋利长枪"], likes: ["易经占卜", "圆形物品"],
    routes: { cai: later("第三部·救世篇第1区分", "建议第一部完成其外传"), dietrich: later("第三部·救世篇第1区分", "建议第一部完成其外传"), theodora: later("第三部·救世篇第1区分", "建议第一部完成其外传"), leda: later("第三部·救世篇第1区分", "建议第一部完成其外传") },
  },
  {
    id: "nezha", name: "哪吒", ja: "ナジャ", tier: 3,
    gifts: ["蔬菜类礼物", "东方盘上游戏"], likes: ["活动身体", "正义", "打架", "美味饭菜"],
    routes: { cai: recruit(6, 3, "沙虫肉 ×3"), dietrich: recruit(10, 3, "沙虫肉 ×3"), theodora: recruit(6, 2, "沙虫肉 ×3"), leda: recruit(9, 3, "沙虫肉 ×3") },
  },
  {
    id: "shalan", name: "沙兰", ja: "サラン", tier: 4,
    routes: { cai: unavailable(), dietrich: recruit(10, 3, "完成爱娜特莉亚外传，并正确回答问题"), theodora: unavailable(), leda: recruit(8, 3, "完成爱娜特莉亚外传，并正确回答问题") },
  },
  {
    id: "dadao", name: "大刀", ja: "ダイトウ", tier: 4,
    gifts: ["真红高舒", "牦牛乳", "蜂蜜乳", "加梅尔乳", "塞尔比类食物", "朴素烘焙点心"],
    likes: ["女性（尤其爱娜特莉亚）", "操作机械", "美味饭菜", "打架"],
    routes: { cai: recruit(7, 3, "科萨尔兽肉 ×2"), dietrich: recruit(10, 3, "科萨尔兽肉 ×2"), theodora: recruit(5, 2, "科萨尔兽肉 ×2"), leda: recruit(5, 2, "科萨尔兽肉 ×2") },
  },
  {
    id: "halvin", name: "哈尔温", ja: "ハルヴィン", tier: 4,
    gifts: ["料理类礼物", "蔬菜盆栽", "醋渍蔬菜"], likes: ["街头表演", "种菜", "观众的笑容", "购物"],
    routes: { cai: recruit(9, 3, "椰枣 ×10"), dietrich: recruit(9, 3, "椰枣 ×10"), theodora: recruit(7, 3, "椰枣 ×10"), leda: recruit(7, 3, "椰枣 ×10") },
  },
  {
    id: "guzran", name: "古扎岚", ja: "グザラン", tier: 2, role: "近战输出",
    gifts: ["发酵饮料类礼物"], likes: ["酒", "女性", "有趣的人", "青涩的年轻人"],
    routes: { cai: auto("招募教学"), dietrich: recruit(8, 3), theodora: recruit(8, 3), leda: recruit(3, 1) },
  },
  {
    id: "yangjie", name: "杨界", ja: "ヤン・ジェ", role: "治疗支援",
    routes: { cai: recruit(3, 2, "正确回答问题"), dietrich: auto("招募教学"), theodora: recruit(9, 3, "正确回答问题"), leda: recruit(8, 3, "正确回答问题") },
  },
  {
    id: "io", name: "伊欧", ja: "イオ", tier: 4, role: "骑兵",
    gifts: ["马具类礼物"], likes: ["骑士道", "自律", "爱马罗西南"],
    routes: { cai: recruit(10, 3, "4000G"), dietrich: recruit(3, 2, "800G"), theodora: recruit(10, 3, "4000G"), leda: recruit(6, 1, "1500G") },
  },
  {
    id: "peppe", name: "佩佩", ja: "ペペ", tier: 4,
    likes: ["精灵们", "布里吉特人民", "太阳", "故乡"],
    routes: { cai: recruit(9, 1, "完成贝特朗外传"), dietrich: recruit(8, 3, "完成贝特朗外传"), theodora: recruit(7, 2, "完成贝特朗外传"), leda: unavailable() },
  },
  {
    id: "noctula", name: "诺克裘拉", ja: "ノクチュラ", tier: 3, role: "近战压制",
    gifts: ["锻炼类礼物", "武器类礼物"], likes: ["都市生活", "都市人", "拳头互殴"],
    routes: { cai: recruit(4, 1), dietrich: recruit(6, 1), theodora: recruit(3, 1), leda: recruit(8, 3) },
  },
  {
    id: "sofia", name: "索绯雅", ja: "ソフィア", tier: 2, role: "治疗支援",
    gifts: ["料理类礼物", "乳制品类礼物", "甜食类礼物", "苔麸类礼物", "苔麸烘焙点心", "稀有香辛料"],
    likes: ["美味食物", "饭菜摆满桌面的瞬间"],
    routes: { cai: recruit(9, 3), dietrich: recruit(9, 3), theodora: auto("招募教学"), leda: recruit(7, 3) },
  },
  {
    id: "catania", name: "卡塔妮雅", ja: "カターニャ", tier: 2, role: "高速飞行物理",
    recommendedClass: "圣天翼兵", classPath: "猎兵 → 剑士 → シドー → 圣天翼兵",
    gifts: ["小粒苔麸", "大粒苔麸", "奥格斯苔麸", "盾之肖像画", "天马风景画", "锋利雕刻刀", "尤·法斯肖像"],
    likes: ["一流的物品", "一流的人物", "一流的料理"], dislikes: ["粗俗之人", "卑贱之徒", "贫穷生活"],
    routes: { cai: recruit(10, 3), dietrich: recruit(8, 1), theodora: recruit(7, 3), leda: auto("招募教学") },
  },
  {
    id: "nydine", name: "努蒂奴", ja: "ヌディーヌ", tier: 4,
    gifts: ["裂风箭羽"], likes: ["重视义气", "照顾飞驼"],
    routes: { cai: recruit(6, 1, "青铜斧 ×2"), dietrich: recruit(5, 2, "青铜斧 ×2"), theodora: recruit(5, 3, "铁弓 ×3"), leda: recruit(10, 3, "铁弓 ×3") },
  },
  {
    id: "zarcone", name: "札可捏", ja: "ザーコネ", tier: 5,
    likes: ["金钱", "暴力", "好女人", "蔬菜", "与投缘伙伴喝酒"],
    routes: { cai: recruit(8, 3, "交涉，可压价至10G"), dietrich: recruit(7, 3, "交涉，可压价至10G"), theodora: recruit(4, 1, "交涉，可压价至10G"), leda: recruit(5, 2, "交涉，可压价至10G") },
  },
  {
    id: "majide", name: "马吉迪", ja: "マジーデ", tier: 5,
    gifts: ["发酵饮料类礼物"], likes: ["酒", "女性", "打架", "充沛体力"],
    routes: { cai: recruit(5, 2, "回答问题3次"), dietrich: recruit(8, 3, "回答问题3次"), theodora: recruit(8, 3, "回答问题3次"), leda: recruit(9, 3, "回答问题3次") },
  },
  {
    id: "benditz", name: "班迪兹", ja: "ベンディッツ", tier: 4,
    gifts: ["盘上游戏类礼物", "军略书抄本", "《南洋冒险奇谭》", "仪式用锋利长枪"], likes: ["大奥古斯特战术", "有前途的年轻人"],
    routes: { cai: recruit(9, 3, undefined, "约4月11日起出现"), dietrich: recruit(7, 2, undefined, "约4月11日起出现"), theodora: recruit(8, 1, undefined, "约4月11日起出现"), leda: recruit(7, 3, undefined, "约4月11日起出现") },
  },
  {
    id: "inyoni", name: "易尼奥尼", ja: "イニオニ", tier: 3,
    gifts: ["弓具类礼物", "钓鱼类礼物"], likes: ["家人", "故乡", "狩猎", "农活", "保养弓"],
    routes: { cai: recruit(8, 3, "6000G", "约7月10日起出现"), dietrich: recruit(8, 3, "6000G", "约7月10日起出现"), theodora: recruit(9, 1, "4000G", "约7月10日起出现"), leda: recruit(7, 1, "3000G", "约7月10日起出现") },
  },
  {
    id: "jasmine", name: "贾斯敏", ja: "ジャスミン", tier: 3,
    likes: ["伴侣的回忆", "佣兵团伙伴", "赚钱机会"],
    routes: { cai: recruit(8, 1, "2000G", "约5月8日起出现"), dietrich: recruit(9, 3, "5000G", "约5月8日起出现"), theodora: recruit(8, 3, "5000G", "约5月8日起出现"), leda: recruit(4, 2, "500G", "约5月8日起出现") },
  },
  {
    id: "alexandra", name: "亚历珊德拉", ja: "アレキサンドラ", tier: 3,
    gifts: ["马具类礼物", "天马风景画"], likes: ["父母", "布凯帕拉斯", "优秀的男性", "恋爱话题"],
    routes: { cai: recruit(7, 2, undefined, "约5月29日起出现"), dietrich: recruit(8, 3, undefined, "约5月29日起出现"), theodora: recruit(6, 1, undefined, "约5月29日起出现"), leda: recruit(10, 3, undefined, "约5月29日起出现") },
  },
  {
    id: "nuzzuo", name: "努佐", ja: "ヌッツォ", tier: 2, role: "远程输出",
    gifts: ["加鲁姆"], likes: ["传统", "骄傲", "巨大的力量"],
    routes: { cai: recruit(6, 2, "铁弓 ×3", "约7月1日起出现"), dietrich: recruit(9, 1, "铁弓 ×2", "约7月1日起出现"), theodora: recruit(6, 1, "铁弓 ×3", "约7月1日起出现"), leda: recruit(9, 3, "铁弓 ×3", "约7月1日起出现") },
  },
  {
    id: "kiroc", name: "基洛克", ja: "キリーク", tier: 2, role: "远程输出",
    routes: { cai: recruit(8, 3, "纯净之水 ×8", "约5月4日起出现"), dietrich: recruit(4, 1, "纯净之水 ×3", "约5月4日起出现"), theodora: recruit(10, 3, "纯净之水 ×8", "约5月4日起出现"), leda: recruit(4, 1, "纯净之水 ×3", "约5月4日起出现") },
  },
  {
    id: "bertrand", name: "贝特朗", ja: "ベルトラン", tier: 1, role: "剧情加入",
    likes: ["锻炼", "盐渍肉", "加鲁姆", "做工精良的武器"],
    routes: { cai: later("第二部作为客军，第三部正式加入", "建议第一部完成其外传"), dietrich: later("第二部作为客军，第三部正式加入", "建议第一部完成其外传"), theodora: later("第二部作为客军，第三部正式加入", "建议第一部完成其外传"), leda: later("第二部作为客军，第三部正式加入", "建议第一部完成其外传") },
  },
  {
    id: "creek", name: "克里克", ja: "クリーク", role: "后期加入",
    routes: { cai: later("第二部·战争篇第2章", "第一部须完成支线“亡妹的装身具”，战场击败后加入"), dietrich: later("第二部·战争篇第2章", "第一部须完成支线“亡妹的装身具”，战场击败后加入"), theodora: later("第二部·战争篇第2章", "第一部须完成支线“亡妹的装身具”，战场击败后加入"), leda: later("第二部·战争篇第2章", "第一部须完成支线“亡妹的装身具”，战场击败后加入") },
  },
  {
    id: "nathan", name: "内森", ja: "ネイサン", tier: 4, role: "后期加入",
    routes: { cai: later("第二部·战争篇第3章", "让克里克完成最后一击"), dietrich: later("第二部·战争篇第3章", "让克里克完成最后一击"), theodora: later("第二部·战争篇第3章", "让克里克完成最后一击"), leda: later("第二部·战争篇第3章", "让克里克完成最后一击") },
  },
  {
    id: "centurio", name: "盛托利翁", ja: "セントリオン", tier: 3, role: "后期加入",
    likes: ["在奥罗拉神殿的职务", "巡视"],
    routes: { cai: later("第三部·救世篇第2区分", "完成营救盛托利翁任务"), dietrich: later("第三部·救世篇第2区分", "完成营救盛托利翁任务"), theodora: later("第三部·救世篇第2区分", "完成营救盛托利翁任务"), leda: later("第三部·救世篇第2区分", "完成营救盛托利翁任务") },
  },
  {
    id: "honghua", name: "红花", ja: "コウカ", tier: 3, role: "剧情加入",
    gifts: ["小粒苔麸", "大粒苔麸"], likes: ["幸福时期的回忆"],
    routes: { cai: later("序章及第三部自动加入"), dietrich: later("序章及第三部自动加入"), theodora: later("序章及第三部自动加入"), leda: later("序章及第三部自动加入") },
  },
  {
    id: "troy", name: "特洛伊", ja: "トロイア", tier: 2, role: "剧情加入",
    gifts: ["小猫摆件"], likes: ["同胞", "丰饶自然"],
    routes: { cai: later("序章及第三部自动加入"), dietrich: later("序章及第三部自动加入"), theodora: later("序章及第三部自动加入"), leda: later("序章及第三部自动加入") },
  },
  {
    id: "aswan", name: "阿斯旺", ja: "アスワン", tier: 2, role: "后期加入",
    likes: ["丹提的戏剧", "盘上游戏", "裁缝", "美丽风景"],
    routes: { cai: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡"), dietrich: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡"), theodora: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡"), leda: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡") },
  },
  {
    id: "tahonia", name: "塔霍妮娅", ja: "タホウニア", tier: 4, role: "后期加入",
    likes: ["读书", "裁缝", "锻炼"],
    routes: { cai: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡"), dietrich: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡"), theodora: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡"), leda: later("第三部·救世篇第5区分", "第二部第3章作为客军时不能阵亡") },
  },
  {
    id: "klapka", name: "克拉普卡", ja: "クラプカ", tier: 4, role: "后期加入",
    likes: ["莫扎的骄傲", "最爱的妻子", "英雄传说"],
    routes: { cai: later("第三部·救世篇第6区分", "第5区分作为客军时不能阵亡"), dietrich: later("第三部·救世篇第6区分", "第5区分作为客军时不能阵亡"), theodora: later("第三部·救世篇第6区分", "第5区分作为客军时不能阵亡"), leda: later("第三部·救世篇第6区分", "第5区分作为客军时不能阵亡") },
  },
];

export const characters: Character[] = baseCharacters.map((character) => ({
  ...character,
  gifts: favoriteGiftsByCharacter[character.id] ?? character.gifts,
}));

export const sources = {
  official: "https://www.nintendo.com/tw/topics/article/3feXfpwDoBpKurVdEuTygE",
  tiers: "https://gamewith.jp/fefw/575250",
  gifts: "https://gamewith.jp/fefw/577115",
  recruitment: "https://www.rpgsite.net/guide/21391-fire-emblem-fortunes-weave-recruitment-guide-all-characters-in-game-how-to-recruit-them",
  chineseNames: "https://www.gamersky.com/handbook/202609/2211429.shtml",
};

export function conditionLabel(condition: RouteCondition) {
  if (condition.status === "initial") return "初始成员";
  if (condition.status === "auto") return condition.timing ? `自动加入 · ${condition.timing}` : "自动加入";
  if (condition.status === "later") return condition.timing ?? "后期加入";
  if (condition.status === "unavailable") return "本线不可招募";
  return `名声 Lv.${condition.renown} · 支援 Lv.${condition.support}`;
}

export function conditionScore(condition: RouteCondition) {
  if (condition.status === "initial") return 0;
  if (condition.status === "auto") return 1;
  if (condition.status === "recruit") return condition.renown ?? 50;
  if (condition.status === "later") return 90;
  return 99;
}

export function isFastestRoute(character: Character, route: RouteKey) {
  const current = character.routes[route];
  if (current.status === "unavailable" || current.status === "later") return false;
  const comparable = Object.values(character.routes).filter(
    (condition) => condition.status !== "unavailable" && condition.status !== "later",
  );
  return conditionScore(current) === Math.min(...comparable.map(conditionScore));
}
