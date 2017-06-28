## Servant Data Format
```javascript
{
    id: string,   // '000' - '???'
    name: string,
    fuzzyKeywords: Array<string>,  //搜索关键字；模糊搜索
    exactKeywords: Array<string>,  //搜索关键字；精准匹配
    rarity: number | Array<number>,
    /****
    * 稀有度
    * -1: 未定义
    * 0 ~ 5: 零至五星
    * [number, number]: 可变稀有度
    ****/

    startATK: number,        //初始 ATK
    endATK: number,          //满级（未喂圣杯）ATK
    startHP: number,         //初始 HP
    endHP: number,           //满级（未喂圣杯）HP
    grailATK: number,        //100 级 ATK
    grailHP: number,         //100 级 HP
    illustrator: string,     //画师
    cv: string,              //配音声优
    attribute: number,
    /****
    * 属性
    * 0: 人
    * 1: 天
    * 2: 地
    * 3: 星
    * 4: 兽
    ****/

    alignment: string,    //阵营
    cards: [number, number, number],     //指令卡牌数
    hits: [number, number, number， number],                 //指令 hit 数
    charge: [number, number, number， number],               //指令 NP 率
    starAbsorption: number,                //暴击权重
    starGeneration: number,   //出星率
    npChargeATK: number,      //宝具 NP 率
    npChargeDEF: number,      //受击 NP 率
    traits: [number],         //特性
}
```
