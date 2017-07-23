## Servant Data Format
```javascript
{
    id: string,   // '000' - '???'
    name: string,
    nameJP: string,
    nameEN: string,
    fuzzyKeywords: Array<string>,  //搜索关键字；模糊搜索
    exactKeywords: Array<string>,  //搜索关键字；精准匹配
    rarity: number | Array<number>,
    /****
    * 稀有度
    * -1: 未定义
    * 0 ~ 5: 零至五星
    * [number, number]: 可变稀有度
    ****/

    class: number,
    /****
    * 职介
    * -1: 未定义
    * 0: Shielder
    * 1: Saber
    * 2: Archer
    * 3: Lancer
    * 4: Rider
    * 5: Caster
    * 6: Assassin
    * 7: Berserker
    * 8: Ruler
    * 9: Avenger
    * 10: Alterego
    * 11: Moon Cancer
    * 12: BeastI
    * 13: BeastⅡ
    * 14: BeastⅢ
    * 15: Grand Caster
    ****/

    startATK: number,        //初始 ATK
    endATK: number,          //满级（未喂圣杯）ATK
    startHP: number,         //初始 HP
    endHP: number,           //满级（未喂圣杯）HP
    grailATK: number,        //100 级 ATK
    grailHP: number,         //100 级 HP
    illustrator: string,     //画师
    cv: string,              //配音声优
    gender: number,
    /****
    * 性别
    * -1: ？
    * 0: 男
    * 1: 女
    * 2: 依赖个体而不同
    * 3: -
    * 4: 无
    * 5: 男・女
    ****/

    attribute: number,
    /****
    * 属性
    * 0: 人
    * 1: 天
    * 2: 地
    * 3: 星
    * 4: 兽
    ****/

    alignment: string,
    /****
    * 阵营
    * -1: 未定义
    * 0?: 秩序
    * 1?: 中立
    * 2?: 混沌
    * ?0: 善
    * ?1: 中庸
    * ?2: 恶
    * ?3: 狂
    * ?4: 花嫁
    * ?5: 夏
    * [number, number]: 可变稀有度
    ****/
    cards: [number, number, number],     //指令卡牌数
    hits: [number, number, number, number],                 //指令 hit 数
    charge: [float, float, float, float],               //指令 NP 率
    starAbsorption: number,                //暴击权重
    starGeneration: float,   //出星率
    npChargeATK: float,      //宝具 NP 率
    npChargeDEF: float,      //受击 NP 率
    traits: [number],         //特性
}
```
