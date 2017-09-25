/**
 * @flow
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'
import {
  View,
  Text,
  Alert,
  TextInput,
} from 'react-native'
import {
  ListItem,
  Button,
  List,
  CheckBox,
} from 'react-native-elements'
import { rarityAscensionLevel, rarityPalingenesisLevel } from '../../schema/Servant'

import materials from '../../assets/data/materialList'

const CURR = 'next'
const NEXT = 'level_next'
const CURR_ASCENSION = 'curr_ascension'
const NEXT_ASCENSION = 'next_ascension'

function constrainInt(value, min, max) {
  const ret = parseInt(value, 10) || 0
  return Math.min(Math.max(ret, min), max)
}

function statusToStr(shortage) {
  return shortage.map(({ id, need, current, future }) => (
    `${materials[id].name}: 库存缺口 ${need - current}, 活动可提供 ${future}`
  )).join('\n')
}

function materialObjToStr(obj) {
  return _.map(obj, (num, id) => (
    `${materials[id].name}: ${num}`
  )).join('\n')
}

export default class ServantForm extends PureComponent {
  constructor(props) {
    super()
    this.state = props.data ? props.data : {
      level: {
        curr: 1,
        next: 1,
        currAscension: false,
        nextAscension: false,
      },
      skills: [
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
      ],
      npLevel: 1,
      priority: 1,
    }
  }

  handleLevelChange = (type, value) => {
    const level = {
      ...this.state.level,
    }
    const { rarity } = this.props.servant

    switch (type) {
      case CURR:
        level.curr = constrainInt(value, 1, 100)
        break
      case NEXT:
        level.next = constrainInt(value, 1, 100)
        break
      case CURR_ASCENSION:
        level.currAscension = value
        break
      case NEXT_ASCENSION:
        level.nextAscension = value
        break
      default:
    }

    if (level.next === level.curr) {
      level.nextAscension = level.nextAscension || level.currAscension
    }

    if (
      !rarityAscensionLevel[rarity].includes(level.curr) &&
      !rarityPalingenesisLevel[rarity].includes(level.curr)
    ) {
      level.currAscension = false
    }
    if (
      !rarityAscensionLevel[rarity].includes(level.next) &&
      !rarityPalingenesisLevel[rarity].includes(level.next)
    ) {
      level.nextAscension = false
    }

    if (!_.isEqual(level, this.state.level)) {
      this.setState({ level })
    }
  }

  limitLevel = () => {
    const next = Math.max(this.state.level.next, this.state.level.curr)
    if (next !== this.state.level.next) {
      this.setState({
        level: {
          ...this.state.level,
          next,
        },
      })
    }
  }

  setSingleNum = (name, value) => {
    const num = (parseInt(value, 10) || 0) % 10
    this.setState({ [name]: constrainInt(num, 1, 5) })
  }

  handleSkillChange = (index, type, value) => {
    const skill = {
      ...this.state.skills[index],
    }

    switch (type) {
      case CURR:
        skill.curr = constrainInt(value, 1, 10)
        break
      case NEXT:
        skill.next = constrainInt(value, 1, 10)
        break
      default:
    }

    skill.next = Math.max(skill.next, skill.curr)

    if (!_.isEqual(skill, this.state.skills[index])) {
      this.setState({
        skills: [
          ...this.state.skills.slice(0, index),
          skill,
          ...this.state.skills.slice(index + 1),
        ],
      })
    }
  }

  render() {
    const {
      level,
      skills,
      npLevel,
      priority,
    } = this.state
    const { rarity } = this.props.servant
    return (
      <List containerStyle={{
        marginTop: 20,
        borderTopWidth: 0,
        borderBottomWidth: 0,
      }}
      >
        <ListItem
          title="级别"
          subtitle={
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
              <View style={{ flexDirection: 'column', flex: 1 }} >
                <TextInput
                  style={{ height: 20, flex: 1, textAlign: 'center', marginTop: 2 }}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={`${level.curr}`}
                  selectTextOnFocus
                  onChangeText={text => this.handleLevelChange(CURR, text)}
                  onBlur={this.limitLevel}
                />
                <CheckBox
                  center
                  style={{ height: 20, flex: 1, marginTop: 4 }}
                  title={level.curr < (rarityPalingenesisLevel[rarity][0] || 101) ? '已灵基突破' : '已喂圣杯'}
                  checked={level.currAscension}
                  onPress={() => this.handleLevelChange(CURR_ASCENSION, !level.currAscension)}
                />
              </View>
              <Text> ⟶ </Text>
              <View style={{ flexDirection: 'column', flex: 1 }} >
                <TextInput
                  style={{ height: 20, flex: 1, textAlign: 'center', marginTop: 2 }}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={`${level.next}`}
                  selectTextOnFocus
                  onChangeText={text => this.handleLevelChange(NEXT, text)}
                  onBlur={this.limitLevel}
                />
                <CheckBox
                  center
                  style={{ height: 20, flex: 1, marginTop: 4 }}
                  title={level.next < (rarityPalingenesisLevel[rarity][0] || 101) ? '已灵基突破' : '已喂圣杯'}
                  checked={level.nextAscension}
                  onPress={() => this.handleLevelChange(NEXT_ASCENSION, !level.nextAscension)}
                />
              </View>
            </View>
          }
          hideChevron
        />
        {
          ['一技能', '二技能', '三技能'].map((key, idx) => (
            <ListItem
              key={key}
              title={key}
              subtitle={
                <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
                  <TextInput
                    style={{ height: 20, flex: 1, textAlign: 'center' }}
                    value={`${skills[idx].curr}`}
                    selectTextOnFocus
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChangeText={text => this.handleSkillChange(idx, CURR, text)}
                  />
                  <Text> ⟶ </Text>
                  <TextInput
                    style={{ height: 20, flex: 1, textAlign: 'center' }}
                    value={`${skills[idx].next}`}
                    selectTextOnFocus
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChangeText={text => this.handleSkillChange(idx, NEXT, text)}
                  />
                </View>
              }
              hideChevron
            />
          ))
        }

        <ListItem
          title="优先级"
          subtitle={
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
              <TextInput
                style={{ height: 20, flex: 1, textAlign: 'center' }}
                selectTextOnFocus
                value={`${priority}`}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={text => this.setSingleNum('priority', text)}
              />
            </View>
          }
          hideChevron
        />

        <ListItem
          title="宝具等级"
          subtitle={
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
              <TextInput
                style={{ height: 20, flex: 1, textAlign: 'center' }}
                selectTextOnFocus
                value={`${npLevel}`}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={text => this.setSingleNum('npLevel', text)}
              />
            </View>
          }
          hideChevron
        />

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 10,
          // flex: 1,
        }}
        >
          {this.props.deleteButton && <Button
            backgroundColor="#d9534f"
            buttonStyle={{
              paddingTop: 6,
              paddingBottom: 6,
            }}
            title="删除"
            onPress={() => {
              Alert.alert(
                '删除',
                '确定要从持有从者中移除该从者吗？',
                [
                  {
                    text: '取消',
                    onPress: this.props.collapse(),
                  },
                  {
                    text: '确定',
                    onPress: () => this.props.removeServant(
                      this.props.servant.id,
                    ),
                  },
                ],
              )
            }}
          />}
          {this.props.cancelButton && <Button
            backgroundColor="#46b8da"
            buttonStyle={{
              paddingTop: 6,
              paddingBottom: 6,
            }}
            title="取消"
            onPress={this.props.collapse}
          />}
          {(this.props.addButton || this.props.updateButton) && <Button
            backgroundColor="#5cb85c"
            buttonStyle={{
              paddingTop: 6,
              paddingBottom: 6,
            }}
            title="确定"
            onPress={() => {
              this.props.setServantInfo(
                this.props.servant.id,
                this.state,
              )
              Alert.alert(
                this.props.addButton ? '已添加' : '已更新',
                this.props.addButton ? '已添加' : '已更新',
                [
                  {
                    text: '确定',
                    onPress: () => {
                      if (this.props.updateButton) {
                        this.props.collapse()
                      }
                    },
                  },
                ],
              )
            }}
          />}
          {this.props.finishButton && <Button
            backgroundColor="#969899"
            buttonStyle={{
              paddingTop: 6,
              paddingBottom: 6,
            }}
            title="完成"
            onPress={() => {
              this.props.setServantInfo(
                this.props.servant.id,
                this.state,
              )
              const {
                needs,
                shortage,
              } = this.props.checkServant(this.props.servant.id, this.state)
              Alert.alert(
                '完成',
                `将从库存素材中扣除如下消耗素材：\n${materialObjToStr(needs)}`,
                [
                  {
                    text: '取消',
                    style: 'cancel',
                  },
                  {
                    text: '确定',
                    onPress: () => {
                      if (shortage.length === 0) {
                        this.props.finishServant(this.props.servant.id, needs)
                        this.props.collapse()
                      } else {
                        Alert.alert(
                          '素材不足',
                          `库存资源不足！尚缺以下素材：\n${statusToStr(shortage)}`,
                          [
                            {
                              text: '确定',
                            },
                          ],
                        )
                      }
                    },
                  },
                ],
              )
            }}
          />}
        </View>
      </List>
    )
  }
}
