## Noble Phantasm

#### Condition（开放条件）

| code | 含义 |
| :--: | :--------: |
| -1   | 未定义      |
| 0    | 无         |
| 1    | 宝具本      |
| 2    | 强化本      |

#### Type

| code | 含义 |
| :--: | :----------: |
| 0   | 非攻击（辅助类）|
| 1   | 全体攻击       |
| 2   | 单体攻击       |
| 3   | 全体攻击（无视防御）|
| 4   | 单体攻击（无视防御）|
| 5   | 概率赋予状态      |
| 6   |  变身海德       |

#### 数据结构
```javascript
{
  name: string,
  lv: string,
  condition: number,
  type: number,
  value: [number],
  card: number,
  /****
  * 卡色
  * 0  蓝
  * 1  红
  * 2  绿
  ****/
  attackPhaseID: number,
  hits: number,
  effect: [
    {
      id: string, // effect key, see https://github.com/JenningsWu/Chaldea-archives/blob/master/documents/effect_list.md
      type: number,
      /****
      * 效果类型
      * 0     固定值
      * 1     宝具升级效果提升
      * 2     超蓄力效果提升
      ****/
      value: [float, ...], // 值
      duration: number,
      /****
      * 持续时间
      * 0     -
      * 1～   持续单／多回合
      ****/
      durationTime: number,
      /****
      * 持续次数
      * 0     -
      * 1～   持续单／多次
      * 通常该属性与 duration 有且仅有一个不为 0
      ****/

      effectiveTime: number,
      /****
      * 生效时间
      * -2    死亡后
      * -1    当即生效
      * 0     回合结束
      * 1     一回合后
      ****/
      phaseID: number, // 用于区分同技能多个效果的先后生效顺序
      probability: [float],

    },
    ...
  ]
}
```
