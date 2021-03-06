## Skills

#### Condition（开放条件）

| code | 含义 |
| :--: | :--------: |
| -1   | 未定义      |
| 0    | 无／灵基突破 |
| 1    | 技能本      |

#### Requirement (发动条件)
| 0 & 1 | 2 & 3 & 4 |
| :-------: | :--: |
| 资源种类   | 数量 |

##### 资源种类
| code | 含义 |
| :--: | :--------: |
| 00    | 无        |
| 01    | 星星      |


#### 数据结构
```javascript
{
  name: string,
  condition: number,
  lv: string,
  requirement: string,
  effect: [
    {
      id: string, // effect key, see https://github.com/JenningsWu/Chaldea-archives/blob/master/documents/effect_list.md
      value: [float, ...], // 值
      duration: number,
      /****
      * 持续时间
      * 0     -
      * 1～   持续单／多回合
      * 99999 永续
      ****/
      durationTime: number,
      /****
      * 持续次数
      * 0     -
      * 1～   持续单／多次
      * 通常该属性与 duration 有且仅有一个不为 0
      * 全为 0 表明该效果为附属效果（例如宝具攻击的附属特攻）
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
  ],
  initialCD: number,
}
```
