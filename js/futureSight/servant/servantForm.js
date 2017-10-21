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
import Slider from '../../lib/slider'

import { rarityAscensionLevel, rarityPalingenesisLevel } from '../../schema/Servant'

import materials from '../../assets/data/materialList'

import FouImage from '../../assets/img/Fou_Riyo.png'

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

  setSingleNum = (name, value) => {
    const num = (parseInt(value, 10) || 0) % 10
    this.setState({ [name]: constrainInt(num, 1, 5) })
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

  handleSkillChange = (index, curr, next) => {
    const skill = {
      ...this.state.skills[index],
      curr: constrainInt(curr, 1, 10),
      next: constrainInt(next, 1, 10),
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
    const { fouMode } = this.props
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
                  style={{ flex: 1, textAlign: 'center', marginTop: 2, padding: 0 }}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={`${level.curr}`}
                  selectTextOnFocus
                  onChangeText={text => this.handleLevelChange(CURR, text)}
                  onBlur={this.limitLevel}
                  underlineColorAndroid="transparent"
                />
                <CheckBox
                  center
                  style={{ flex: 1, marginTop: 4 }}
                  title={level.curr < (rarityPalingenesisLevel[rarity][0] || 101) ? '已灵基突破' : '已喂圣杯'}
                  checked={level.currAscension}
                  onPress={() => this.handleLevelChange(CURR_ASCENSION, !level.currAscension)}
                />
              </View>
              <Text> ⟶ </Text>
              <View style={{ flexDirection: 'column', flex: 1 }} >
                <TextInput
                  style={{ flex: 1, textAlign: 'center', marginTop: 2, padding: 0 }}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={`${level.next}`}
                  selectTextOnFocus
                  onChangeText={text => this.handleLevelChange(NEXT, text)}
                  onBlur={this.limitLevel}
                  underlineColorAndroid="transparent"
                />
                <CheckBox
                  center
                  style={{ flex: 1, marginTop: 4 }}
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
              title={`${key}: ${skills[idx].curr} -> ${skills[idx].next}`}
              subtitle={
                <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
                  <Slider
                    minimumValue={1}
                    maximumValue={10}
                    leftValue={skills[idx].curr}
                    rightValue={skills[idx].next}
                    multiSlider
                    step={1}
                    style={{ flex: 1 }}
                    onValueChange={(left, right) => {
                      this.handleSkillChange(idx, left, right)
                    }}
                    trackStyle={{
                      height: 4,
                      borderRadius: 2,
                    }}
                    thumbStyle={[{
                      width: 30,
                      height: 30,
                      backgroundColor: 'white',
                      borderRadius: 30 / 2,
                      borderColor: '#30a935',
                      borderWidth: 2,
                    }, fouMode ? {
                      marginTop: -6,
                      borderWidth: 0,
                      backgroundColor: 'transparent',
                    } : {}]}
                    thumbImage={fouMode ? FouImage : null}
                    trackHighlightColor="#30a935"
                  />
                </View>
              }
              hideChevron
            />
          ))
        }

        <ListItem
          title={`优先级: ${priority}`}
          subtitle={
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
              <Slider
                minimumValue={1}
                maximumValue={5}
                value={priority}
                step={1}
                style={{ flex: 1 }}
                onValueChange={value => this.setSingleNum('priority', value)}
                trackStyle={{
                  height: 4,
                  borderRadius: 2,
                }}
                thumbStyle={[{
                  width: 30,
                  height: 30,
                  backgroundColor: 'white',
                  borderRadius: 30 / 2,
                  borderColor: '#30a935',
                  borderWidth: 2,
                }, fouMode ? {
                  marginTop: -6,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                } : {}]}
                thumbImage={fouMode ? FouImage : null}
                minimumTrackTintColor="#30a935"
              />
            </View>
          }
          hideChevron
        />

        <ListItem
          title={`宝具等级: ${npLevel}`}
          subtitle={
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
              <Slider
                minimumValue={1}
                maximumValue={5}
                value={npLevel}
                step={1}
                style={{ flex: 1 }}
                onValueChange={value => this.setSingleNum('npLevel', value)}
                trackStyle={{
                  height: 4,
                  borderRadius: 2,
                }}
                thumbStyle={[{
                  width: 30,
                  height: 30,
                  backgroundColor: 'white',
                  borderRadius: 30 / 2,
                  borderColor: '#30a935',
                  borderWidth: 2,
                }, fouMode ? {
                  marginTop: -6,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                } : {}]}
                thumbImage={fouMode ? FouImage : null}
                minimumTrackTintColor="#30a935"
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
