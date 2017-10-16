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

const palingenesisQP = {
  [-1]: [],
  0: [],
  1: [400000, 600000, 800000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000],
  2: [600000, 800000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000],
  3: [1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000],
  4: [4000000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000],
  5: [9000000, 10000000, 11000000, 12000000, 13000000],
}

const ascensionQP = {
  [-1]: [],
  0: [15000, 45000, 150000, 450000],
  1: [10000, 30000, 90000, 300000],
  2: [15000, 45000, 150000, 450000],
  3: [30000, 100000, 300000, 900000],
  4: [50000, 150000, 500000, 1500000],
  5: [100000, 300000, 1000000, 3000000],
}

const skillQP = {
  [-1]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  0: [20000, 40000, 120000, 160000, 400000, 500000, 1000000, 1200000, 2000000],
  1: [10000, 20000, 60000, 80000, 200000, 250000, 500000, 600000, 1000000],
  2: [20000, 40000, 120000, 160000, 400000, 500000, 1000000, 1200000, 2000000],
  3: [50000, 100000, 300000, 400000, 1000000, 1250000, 2500000, 3000000, 5000000],
  4: [100000, 200000, 600000, 800000, 2000000, 2500000, 5000000, 6000000, 10000000],
  5: [200000, 400000, 1200000, 1600000, 4000000, 5000000, 10000000, 12000000, 20000000],
}

const expTable = _.range(100).map(l => 50 * l * (l + 1))

const rarityToStr = {
  [-1]: '未定义',
  0: '零星',
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
  4: '⭐⭐⭐⭐',
  5: '⭐⭐⭐⭐⭐',
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

function getQPOnLevel(rarity, level) {
  switch (rarity) {
    case 0:
    case 2:
      return 150 + ((level - 1) * 45)
    case 1:
      return 100 + ((level - 1) * 30)
    case 3:
      return 200 + ((level - 1) * 60)
    case 4:
      return 400 + ((level - 1) * 120)
    case 5:
      return 600 + ((level - 1) * 180)
    default:
      return 0
  }
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
    this.deathResist = obj.deathResist
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

  get isShipped() {
    return this.skillResource.length > 0 || this.ascensionResource.length > 0
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

  calculateMaterailNums(level, skills) {
    if (level == null) {
      level = {
        curr: 1,
        next: 1,
        currAscension: false,
        nextAscension: false,
      }
    }
    if (skills == null) {
      skills = [
        {
          curr: 1,
          next: 1,
        },
        {
          curr: 1,
          next: 1,
        },
        {
          curr: 1,
          next: 1,
        },
      ]
    }

    const ret = new Map([
      ['9000', 0],
      ['9001', 0],
      ['9002', 0],
    ])
    // skill
    skills.forEach((skill) => {
      for (let i = skill.curr; i < skill.next; i += 1) {
        if (this.skillResource[i - 1] != null) {
          this.skillResource[i - 1].forEach((cost) => {
            ret.set(cost.id, (ret.get(cost.id) || 0) + cost.num)
          })
          // qp
          ret.set('9000', ret.get('9000') + skillQP[this.rarity][i - 1])
        }
      }
    })

    // ascension
    rarityAscensionLevel[this.rarity].forEach((checkLevel, index) => {
      if ((level.curr < checkLevel && checkLevel < level.next) ||
          ((level.curr === checkLevel && !level.currAscension) &&
            (level.next > checkLevel || level.nextAscension)) ||
          ((level.next === checkLevel && level.currAscension) &&
            (level.curr < checkLevel || !level.currAscension))) {
        if (this.ascensionResource[index] != null) {
          this.ascensionResource[index].forEach((cost) => {
            // ignore event-sp material
            if (cost.id[0] === '3') {
              return
            }
            ret.set(cost.id, (ret.get(cost.id) || 0) + cost.num)
          })
          // qp
          ret.set('9000', ret.get('9000') + ascensionQP[this.rarity][index])
        }
      }
    })

    // Palingenesis
    rarityPalingenesisLevel[this.rarity].forEach((checkLevel, index) => {
      if ((level.curr < checkLevel && checkLevel < level.next) ||
          (level.curr === checkLevel && !level.currAscension) ||
          (level.next === checkLevel && level.currAscension)) {
        ret.set('9002', ret.get('9002') + 1)
        // qp
        ret.set('9000', ret.get('9000') + palingenesisQP[this.rarity][index])
      }
    })

    // level - qp
    let curr = level.curr
    let expPool = 0
    const next = [
      ...rarityAscensionLevel[this.rarity],
      ...rarityPalingenesisLevel[this.rarity],
    ].filter(l => l > curr && l < level.next)
    next.push(level.next)
    let idx = 0
    let num = 0
    let preLevel = curr
    while (idx < next.length) {
      if (curr === next[idx] || expPool < expTable[curr]) {
        ret.set('9000', ret.get('9000') + (getQPOnLevel(this.rarity, preLevel) * num))
        preLevel = curr
        num = 0
        if (curr !== next[idx]) {
          num = 20
          expPool += 20 * 32400
        }
        if (curr === next[idx]) {
          idx += 1
        }
      } else if (curr < next[idx]) {
        expPool -= expTable[curr]
        curr += 1
      }
      if (curr === next[idx]) {
        num -= Math.floor(expPool / 32400)
        expPool = 0
      }
    }

    // Blaze of Wisdom
    // Use Math.pow instead of '**' ES7 operator or Building will fail
    /*eslint-disable */
    const exp = (50 * (
      ((Math.pow(level.next, 3)) - level.next) -
      ((Math.pow(level.curr, 3)) - level.curr)
    )) / 3
    /*eslint-enable */
    ret.set('9001', ret.get('9001') + Math.ceil(exp / 32400))
    return ret
  }

  calculateFullMaterailNums(calculateAscension, calculateSkill) {
    return this.calculateMaterailNums(
      calculateAscension ? {
        curr: 1,
        next: rarityPalingenesisLevel[this.rarity].length > 0 ? (
          rarityPalingenesisLevel[this.rarity][0]
        ) : 1,
        currAscension: false,
        nextAscension: false,
      } : null,
      calculateSkill ? [
        {
          curr: 1,
          next: 9,
        },
        {
          curr: 1,
          next: 9,
        },
        {
          curr: 1,
          next: 9,
        },
      ] : null,
    )
  }
}

export { rarityAscensionLevel, rarityPalingenesisLevel }
