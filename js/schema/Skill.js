const target = {
  '00': '自身',
  '01': '我方指定一人',
  '02': '我方全部',
  '03': '我方全部（含候补）',
  '04': '我方自己除外',
  '05': '我方自己除外（含候补）',
  11: '敌方指定一人',
  12: '敌方全部',
  // '01001 - 01999':'我方持有某特性指定从者 - 见特性列表',
  // '02001 - 02999':'我方持有某特性全部从者 - 见特性列表',
  // '04001 - 04999':'我方持有某特性的全部从者（自己除外）',
  // '05001 - 05999':'我方持有某特性的全部从者（自己除外，含候补）',
  // 11001 - 11999:'敌方持有某特性的指定从者 - 见特性列表',
  // 12001 - 12999:'敌方持有某特性的全部从者 - 见特性列表',
}

const place = {
  '00': '全部',
  '01': '阳光直射',
  '02': '水边',
  '03': '森林',
  '04': 'NP 100%',
  '05': '星星 10 颗',
}

const skillRequirement = {
  '00000': '无',
  '01010': '10 颗星星',
  '02100': 'NP 100%',
}

const skillRequirementType = {
  '00': '无',
  '01': '星星',
  '02': 'NP',
}

const skillRequirementNum = {
  '000': '无',
  '010': '10',
}

const buffOrDebuff = {
  0: 'Buff (百分比)',
  1: 'Buff (固定值)',
  2: 'Debuff (百分比)',
  3: 'Debuff (固定值)',
}

export const detail = {
  '0000': '对魔力',
  '0001': '弱体耐性',
  '0002': '攻击弱体',
  '0003': '防御弱体',
  '0004': '精神弱体',
  '0005': '魅惑耐性',
  '0006': '毒耐性',
  '0007': '赋予毒状态',
  '0008': '赋予诅咒状态',
  '0009': '赋予灼烧状态',
  '0010': '赋予石化状态',
  '0011': '赋予行动不能状态',
  '0012': '赋予眩晕状态',
  '0013': '赋予拘束状态',
  '0014': '赋予恐怖状态',
  '0015': '赋予技能封印状态',
  '0016': '赋予宝具封印状态',
  '0017': '出星率',
  '0018': '赋予强化无效状态',
  '0019': '赋予混乱状态状态',
  '0020': '强化成功率',
  '0021': '弱体成功率',
  '0022': '精神异常弱体赋予成功率',
  '0023': '眩晕赋予成功率',
  '0024': '从女性魅惑耐性',
  '0025': '攻击强化成功率',
  1000: '攻击力',
  1001: '红卡性能',
  1002: '蓝卡性能',
  1003: '绿卡性能',
  1004: '暴击威力',
  1005: '宝具威力',
  2000: '防御力',
  3000: '魅惑率',
  4000: 'NP 量',
  4001: 'NP 获取量',
  4002: 'NP 获得状态',
  4003: '收到伤害时获得的 NP 量',
  4004: '目标集中',
  4005: '星星数量',
  4006: '赋予星星获得状态',
  4007: '星星集中',
  4008: 'HP 量',
  4009: 'HP 回复效果',
  4010: '最大 HP',
  4011: '赋予 HP 获得状态',
  4012: '即死',
  4013: '即死耐性',
  4014: '即死成功率',
  4015: '加倍返还该回合所受伤害',
  4016: '自身给予回复效果',
  5000: '赋予无敌状态',
  5001: '赋予闪避状态',
  5002: '赋予战续状态',
  5003: '赋予必中状态',
  5004: '赋予无敌贯通状态',
  5005: '赋予无视防御力状态',
  5006: '赋予待机状态',
  5007: '赋予弱体无效状态',
  5008: '弱体解除',
  5009: '强化解除',
  5010: '精神异常解除',
  5011: '回避状态解除',
  5012: 'Hit 数',
  5013: 'Hit 威力',
  5014: '赋予攻击即死效果',
  5015: '赋予根据自身 HP 减少程度提升暴击威力的状态',
  5016: '技能 CD',
  5017: '宝具蓄力阶段',
  5018: 'HP 回复满',
  5019: '以某概率赋予某状态',
  5020: '赋予根据自身 HP 减少程度提升攻击的特攻状态',
  5021: '毒状态解除',
  5022: '对（Saber）攻击时自身出星率',
  5023: '针对自身的攻击以概率回避',
  5024: '来自女性的魅惑耐性',
  5025: '赋予精神异常无敌状态',
  5026: '每回合概率获得星星',
  5027: '绿卡性能缓慢提升',
  5028: '赋予无法战斗状态',
  5029: '随机在同阶段效果中选一',
  5030: 'Hit 数 2 倍，每 hit 初始伤害减半（总伤害随技能等级提升）',
  5031: '即死无效',
  5032: '防御力每回合改变 ※第1回合改变值10%',
  5033: '无敌解除',
  7: '特攻',
  8: '特防',
  9: '特性赋予',
}

// description used when target is enemy
export const detailForEnemy = {
  4005: '暴击率',
}

// description used when buffOrDebuff is 1 or 3
export const detailForConstant = {
  1000: '伤害',
}

export const detailSp = {
  5019: '以某概率赋予某状态',
  5015: '赋予根据自身 HP 减少程度提升暴击威力的状态',
  5020: '赋予根据自身 HP 减少程度提升攻击的特攻状态',
  5029: '随机在同阶段效果中选一',
  5032: '防御力每回合改变 ※第1回合改变值10%',
}


export const detailSpSuffixAtkHp = {
  '0007': '赋予毒状态',
  '0008': '赋予诅咒状态',
  '0009': '赋予灼烧状态',
  '0010': '赋予石化状态',
  '0011': '赋予行动不能状态',
  '0012': '赋予眩晕状态',
  '0013': '赋予拘束状态',
  '0014': '赋予恐怖状态',
  '0015': '赋予技能封印状态',
  '0016': '赋予宝具封印状态',
  '0018': '赋予强化无效状态',
  '0019': '赋予混乱状态状态',
  5028: '赋予无法战斗状态',
  5000: '赋予无敌状态',
  5001: '赋予闪避状态',
  5003: '赋予必中状态',
  5004: '赋予无敌贯通状态',
  5005: '赋予无视防御力状态',
  5006: '赋予待机状态',
  5007: '赋予弱体无效状态',
}

export const detailSpSuffixEveryTurn = {
  4006: '赋予星星获得状态',
  4011: '赋予 HP 获得状态',
  5026: '每回合概率获得星星',
}

export const detailSpSuffixRevive = {
  5002: '赋予战续状态',
}

export const detailSpSuffixProb = {
  5014: '赋予攻击即死效果',
  5023: '针对自身的攻击以概率回避',
}


const traitList = {
  '000': '-',
  '001': 'Saber 职介',
  '002': 'Archer 职介',
  '003': 'Lancer 职介',
  '004': 'Rider 职介',
  '005': 'Caster 职介',
  '006': 'Assassin 职介',
  '007': 'Berserker 职介',
  '008': 'Ruler 职介',
  '009': 'Avenger 职介',
  '010': '从者',
  '011': '男性',
  '012': '女性',
  '013': '秩序',
  '014': '混沌',
  '015': '中立',
  '016': '善',
  '017': '恶',
  '018': '中庸',
  '019': '人类',
  '020': '死灵',
  '021': '恶魔',
  '022': '神性',
  '023': '人型',
  '024': '龙',
  '025': '罗马',
  '026': '猛兽',
  '027': 'saber 脸',
  '028': '持有天/地之力的从者, 特斯拉特攻',
  '029': '持有天/地之力的从者（拟似从者、半从者除外）, 被神秘殺し所',
  '030': '持有天/地之力的从者（持有特殊星之力除外）, 闪闪特攻',
  '031': '骑乘',
  '032': '亚瑟',
  '033': '布姐所爱之人',
  '034': '魔性',
  '035': '王',
  '036': '希腊神话系男性',
  '037': '毒',
  '038': '超巨大',
  300: '神性、恶魔、死灵',
  301: '死灵、恶魔',
  302: '异性',
  303: '女性（含无性别 servant）',
}

export const detailProb = {
  5019: '以某概率赋予某状态',
  5023: '针对自身的攻击以概率回避',
  5026: '每回合概率获得星星',
  5028: '赋予无法战斗状态',
}

export const skillCondition = {
  [-1]: '未定义',
  0: '无／灵基突破',
  1: '技能本',
  2: '强化本',
  3: '主线',
}

export const skillDuration = {
  0: '-',
  1: '一回合',
  2: '两回合',
  3: '三回合',
  4: '四回合',
  5: '五回合',
  6: '六回合',
  10: '十回合',
  99999: '永续',
}

export const skillDurationTime = {
  0: '-',
  1: '一次',
  2: '两次',
  3: '三次',
  4: '四次',
  5: '五次',
}

export const skillEffectiveTime = {
  [-2]: '死亡后',
  [-1]: '当即生效',
  0: '回合结束',
  1: '一回合后',
  5: '五回合后',
}

export const npEffectType = {
  0: '固定值',
  1: '宝具升级效果提升',
  2: '超蓄力效果提升',
}

export const npCondition = {
  [-1]: '未定义',
  0: '无',
  1: '宝具本',
  2: '强化本',
  3: '主线',
}

export const npType = {
  0: '非攻击（辅助类）',
  1: '全体攻击',
  2: '单体攻击',
  3: '全体攻击（无视防御）',
  4: '单体攻击（无视防御）',
  5: '概率赋予状态',
  6: '变身海德',
}

export const npCardType = {
  0: '蓝卡',
  1: '红卡',
  2: '绿卡',
}


export function targetWithTrait(targetId, traitId) {
  if ([
    '013', '014', '015', '016', '017', '018', '022',
    '024', '025', '026', '031', '034',
  ].includes(traitId)) {
    return {
      '01': `我方持有【${traitList[traitId]}】特性的指定从者`,
      '02': `我方持有【${traitList[traitId]}】特性的全部从者`,
      '04': `我方持有【${traitList[traitId]}】特性的全部从者（自身除外）`,
      '05': `我方持有【${traitList[traitId]}】特性的全部从者（含候补，自身除外）`,
      11: `敌方持有【${traitList[traitId]}】特性的指定单位`,
      12: `敌方持有【${traitList[traitId]}】特性的全部单位`,
    }[targetId]
  }
  return {
    '01': `我方指定【${traitList[traitId]}】`,
    '02': `我方全部【${traitList[traitId]}】`,
    '04': `我方全部【${traitList[traitId]}】（自身除外）`,
    '05': `我方全部【${traitList[traitId]}】（含候补，自身除外）`,
    11: `敌方指定【${traitList[traitId]}】`,
    12: `敌方全部【${traitList[traitId]}】`,
  }[targetId]
}

function descSimpleSuffix(buffFlag, value) {
  if (value[0] === 0) return ''
  if (buffFlag === '0' || buffFlag === '1') return ' · 提升：'
  return ' · 减少：'
}

function descSuffix(buffFlag, detailId, value) {
  if (value[0] === 0) return ''
  let twoType = ['提升', '减少']
  if (detailId in detailSpSuffixAtkHp) {
    twoType = ['每回合固定伤害', '每回合血量回复']
  } else if (detailId in detailSpSuffixEveryTurn) {
    twoType = ['每回合获得', '每回合减少']
  } else if (detailId in detailSpSuffixRevive) {
    twoType = ['复活时 HP', '复活时 HP']
  } else if (detailId in detailSpSuffixProb) {
    twoType = ['概率', '概率']
  }
  if (buffFlag === '0' || buffFlag === '1') return ` · ${twoType[0]}：`
  return ` · ${twoType[1]}：`
}

export function showedValue(id, value) {
  const buffFlag = id.substring(7, 8)
  return buffFlag === '0' || buffFlag === '2' ?
    value.map(n => `${n}%`) :
    value.map(n => `${n}`)
}

export function probDesc(id) {
  const detailId = id.substring(8, 12)

  return (detailId in detailProb) ?
      '概率' :
      '成功率'
}

export function effectDesc(id, value, probability) {
  let desc = ''
  const targetId = id.substring(0, 2)
  const targetIdSp = id.substring(2, 5)

  if (targetIdSp === '000') {
    desc = `${target[targetId]}`
  } else {
    desc = `${targetWithTrait(targetId, targetIdSp)}`
  }

  const placeId = id.substring(5, 7)
  if (placeId !== '00') {
    desc = `${desc} · 条件：${place[placeId]}`
  }

  const buffFlag = id.substring(7, 8)
  const detailId = id.substring(8, 12)

  if (probability[0] !== 100 &&
      (probability[1] === 0 || probability[0] === probability[1])) {
    desc = `${desc} · ${probDesc(id)}：${probability[0]}%`
  }

  // use different description style
  if (detailId[0] === '7') {
    desc = `${desc} · 对【${traitList[detailId.substring(1)]}】特攻${descSimpleSuffix(buffFlag, value)}`
  } else if (detailId[0] === '8') {
    desc = `${desc} · 对【${traitList[detailId.substring(1)]}】特防${descSimpleSuffix(buffFlag, value)}`
  } else if (detailId[0] === '9') {
    desc = `${desc} · 赋予特性【${traitList[detailId.substring(1)]}】`
  } else if (targetId[0] === '1' && detailId in detailForEnemy) {
    desc = `${desc} · ${detailForEnemy[detailId]}${descSimpleSuffix(buffFlag, value)}`
  } else if ((buffFlag === '1' || buffFlag === '3') && detailId in detailForConstant) {
    desc = `${desc} · ${detailForEnemy[detailId]}${descSimpleSuffix(buffFlag, value)}`
  } else if (detailId in detailSp) {
    desc = `${desc} · 【未处理】`
  } else {
    desc = `${desc} · ${detail[detailId]}${descSuffix(buffFlag, detailId, value)}`
  }
  return desc
}
