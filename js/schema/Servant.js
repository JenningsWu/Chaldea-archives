import _ from 'lodash'

const rarityAscensionLevel = {
  [-1]: [],
  0: [25, 35, 45, 55],
  1: [20, 30, 40, 50],
  2: [25, 35, 45, 55],
  3: [30, 40, 50, 60],
  4: [40, 50, 60, 70],
  5: [50, 60, 70, 80],
}

const rarityPalingenesisLevel = {
  [-1]: [],
  0: [65, 70, 75, 80, 85, 90, 92, 94, 96, 98],
  1: [60, 70, 75, 80, 85, 90, 92, 94, 96, 98],
  2: [65, 70, 75, 80, 85, 90, 92, 94, 96, 98],
  3: [70, 75, 80, 85, 90, 92, 94, 96, 98],
  4: [80, 85, 90, 92, 94, 96, 98],
  5: [90, 92, 94, 96, 98],
}


const rarityToStr = {
  [-1]: '未定义',
  0: '零星',
  1: '🌟',
  2: '🌟🌟',
  3: '🌟🌟🌟',
  4: '🌟🌟🌟🌟',
  5: '🌟🌟🌟🌟🌟',
}

const classToStr = {
  0: 'Shielder',
  1: 'Saber',
  2: 'Archer',
  3: 'Lancer',
  4: 'Rider',
  5: 'Caster',
  6: 'Assassin',
  7: 'Berserker',
  8: 'Ruler',
  9: 'Avenger',
  10: 'Alterego',
  11: 'Moon Cancer',
  12: 'BeastI',
  13: 'BeastⅡ',
  14: 'BeastⅢ',
  15: 'Grand Caster',
}

const classToClass = {
  0: 'sp',
  1: 'saber',
  2: 'archer',
  3: 'lancer',
  4: 'rider',
  5: 'caster',
  6: 'assassin',
  7: 'berserker',
  8: 'sp',
  9: 'sp',
  10: 'sp',
  11: 'sp',
  12: 'sp',
  13: 'sp',
  14: 'sp',
  15: 'sp',
}

const genderToStr = {
  [-1]: '？',
  0: '男',
  1: '女',
  2: '依据个体而不同',
  3: '－',
  4: '无',
  5: '男・女',
}

const attributeToStr = {
  0: '人',
  1: '天',
  2: '地',
  3: '星',
  4: '兽',
}

const alignmentToStr0 = {
  0: '秩序',
  1: '中立',
  2: '混乱',
}

const alignmentToStr1 = {
  0: '善',
  1: '中庸',
  2: '恶',
  3: '狂',
  4: '花嫁',
  5: '夏',
}

export default class ClassName {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.nameJP = obj.nameJP
    this.nameEN = obj.nameEN
    this.fuzzyKeywords = obj.fuzzyKeywords
    this.exactKeywords = obj.exactKeywords
    this.rarity = obj.rarity
    this.class = obj.class
    this.startATK = obj.startATK
    this.endATK = obj.endATK
    this.startHP = obj.startHP
    this.endHP = obj.endHP
    this.grailATK = obj.grailATK
    this.grailHP = obj.grailHP
    this.illustrator = obj.illustrator
    this.cv = obj.cv
    this.gender = obj.gender
    this.attribute = obj.attribute
    this.alignment = obj.alignment
    this.cards = obj.cards
    this.hits = obj.hits
    this.charge = obj.charge
    this.starAbsorption = obj.starAbsorption
    this.starGeneration = obj.starGeneration
    this.npChargeATK = obj.npChargeATK
    this.npChargeDEF = obj.npChargeDEF
    this.traits = obj.traits

    // advance
    this.skill1 = obj.skill1
    this.skill2 = obj.skill2
    this.skill3 = obj.skill3
    this.np = obj.np
    this.classSkill = obj.classSkill

    // resource
    this.skillResource = obj.skillResource
    this.ascensionResource = obj.ascensionResource
  }

  get rarityDesc() {
    return rarityToStr[this.rarity]
  }

  get classDesc() {
    return classToStr[this.class]
  }

  get genderDesc() {
    return genderToStr[this.gender]
  }

  get attributeDesc() {
    return attributeToStr[this.attribute]
  }

  get alignmentDesc() {
    return this.alignment.split(',').map(id =>
      (id !== '' ? `${alignmentToStr0[id[0]]}・${alignmentToStr1[id[1]]}` : ''))
      .join(' & ')
  }

  checkKeyWord(key) {
    return this.fuzzyKeywords.some(str => str.indexOf(key) >= 0) || this.exactKeywords.includes(key)
  }

  filter(option) {
    return (
      _.get(option, ['rarityOption', this.rarity], true) &&
      _.get(option, ['classOption', classToClass[this.class]], true)
    )
  }

}

export { rarityAscensionLevel, rarityPalingenesisLevel }
