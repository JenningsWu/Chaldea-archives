const materialMap = {
  9000: {
    name: 'QP (量子)',
    type: 5,
    top: true,
    simple: true,
  },
  9001: {
    name: '同职介金狗粮',
    type: 5,
    top: true,
  },
  9002: {
    name: '圣杯',
    type: 5,
    top: true,
  },
  '0000': {
    name: '剑之辉石',
    type: 0,
  },
  '0001': {
    name: '弓之辉石',
    type: 0,
  },
  '0002': {
    name: '枪之辉石',
    type: 0,
  },
  '0003': {
    name: '骑之辉石',
    type: 0,
  },
  '0004': {
    name: '术之辉石',
    type: 0,
  },
  '0005': {
    name: '杀之辉石',
    type: 0,
  },
  '0006': {
    name: '狂之辉石',
    type: 0,
  },
  '0100': {
    name: '剑之魔石',
    type: 0,
  },
  '0101': {
    name: '弓之魔石',
    type: 0,
  },
  '0102': {
    name: '枪之魔石',
    type: 0,
  },
  '0103': {
    name: '骑之魔石',
    type: 0,
  },
  '0104': {
    name: '术之魔石',
    type: 0,
  },
  '0105': {
    name: '杀之魔石',
    type: 0,
  },
  '0106': {
    name: '狂之魔石',
    type: 0,
  },
  '0200': {
    name: '剑之秘石',
    type: 0,
  },
  '0201': {
    name: '弓之秘石',
    type: 0,
  },
  '0202': {
    name: '槍の秘石',
    type: 0,
  },
  '0203': {
    name: '騎の秘石',
    type: 0,
  },
  '0204': {
    name: '术之秘石',
    type: 0,
  },
  '0205': {
    name: '杀之秘石',
    type: 0,
  },
  '0206': {
    name: '狂之秘石',
    type: 0,
  },

  1000: {
    name: '英雄之证',
    type: 1,
  },
  1001: {
    name: '凶骨',
    type: 1,
  },
  1002: {
    name: '龙牙',
    type: 1,
  },
  1003: {
    name: '虚影之尘',
    type: 1,
  },
  1004: {
    name: '愚者の鎖',
    type: 1,
  },
  1005: {
    name: '万死の毒針',
    type: 1,
  },
  1006: {
    name: '魔術髄液',
    type: 1,
  },

  1100: {
    name: '世界树之种',
    type: 2,
  },
  1101: {
    name: '幽灵提灯',
    type: 2,
  },
  1102: {
    name: '八连双晶',
    type: 2,
  },
  1103: {
    name: '蛇之宝玉',
    type: 2,
  },
  1104: {
    name: '凤凰羽毛',
    type: 2,
  },
  1105: {
    name: '无间齿轮',
    type: 2,
  },
  1106: {
    name: '禁断之页',
    type: 2,
  },
  1107: {
    name: '人造人幼体',
    type: 2,
  },
  1108: {
    name: '陨蹄铁',
    type: 2,
  },
  1109: {
    name: '大騎士勲章',
    type: 2,
  },
  1110: {
    name: '追憶の貝殻',
    type: 2,
  },

  1200: {
    name: '混沌之爪',
    type: 3,
  },
  1201: {
    name: '蛮神心脏',
    type: 3,
  },
  1202: {
    name: '龙之逆鳞',
    type: 3,
  },
  1203: {
    name: '精灵根',
    type: 3,
  },
  1204: {
    name: '战马幼角',
    type: 3,
  },
  1205: {
    name: '血泪石',
    type: 3,
  },
  1206: {
    name: '黑兽脂',
    type: 3,
  },

  1207: {
    name: '原初の産毛',
    type: 3,
  },
  1208: {
    name: '呪獣胆石',
    type: 3,
  },
  1209: {
    name: '封魔のランプ',
    type: 3,
  },
  1210: {
    name: '智慧のスカラベ',
    type: 3,
  },
  1211: {
    name: '奇奇神酒',
    type: 3,
  },

  2000: {
    name: '传承结晶',
    type: 5,
  },

  3000: {
    name: '棒棒糖',
    type: 5,
  },
  3001: {
    name: '水晶球',
    type: 5,
  },
  3002: {
    name: '鈴鳴りの枝',
    type: 5,
  },
  3003: {
    name: '竜のオーブ',
    type: 5,
  },
  3004: {
    name: 'ジル・ド・レェ人形',
    type: 5,
  },
  3005: {
    name: '蘭奢待',
    type: 5,
  },
  3006: {
    name: '缎带',
    type: 5,
  },
  3007: {
    name: '黄金骷髅',
    type: 5,
  },
  3008: {
    name: '木桶火鸡',
    type: 5,
  },
  3009: {
    name: 'ゴールデンベアライター',
    type: 5,
  },
  3010: {
    name: 'ハートのブレスレット',
    type: 5,
  },
  3011: {
    name: '业物小刀',
    type: 5,
  },

  4000: {
    name: '银剑棋',
    type: 4,
  },
  4001: {
    name: '银弓棋',
    type: 4,
  },
  4002: {
    name: '银枪棋',
    type: 4,
  },
  4003: {
    name: '银色骑兵棋子',
    type: 4,
  },
  4004: {
    name: '银色法师棋子',
    type: 4,
  },
  4005: {
    name: '银色暗杀棋子',
    type: 4,
  },
  4006: {
    name: '银色狂战棋子',
    type: 4,
  },

  4100: {
    name: '金剑棋',
    type: 4,
  },
  4101: {
    name: '金弓棋',
    type: 4,
  },
  4102: {
    name: '金枪棋',
    type: 4,
  },
  4103: {
    name: '金色骑兵棋子',
    type: 4,
  },
  4104: {
    name: '金色法师棋子',
    type: 4,
  },
  4105: {
    name: '金色暗杀棋子',
    type: 4,
  },
  4106: {
    name: '金色狂战棋子',
    type: 4,
  },
}

export default materialMap
