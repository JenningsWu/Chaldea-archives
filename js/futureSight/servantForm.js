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

const CURR = 'next'
const NEXT = 'level_next'
const CURR_ASCENSION = 'curr_ascension'
const NEXT_ASCENSION = 'next_ascension'

const rarityAscensionLevel = {
  [-1]: [],
  0: [25, 35, 45, 55],
  1: [20, 30, 40, 50],
  2: [25, 35, 45, 55],
  3: [30, 40, 50, 60],
  4: [40, 50, 60, 70],
  5: [50, 60, 70, 80],
}

function constrainInt(value, min, max) {
  const ret = parseInt(value, 10) || 0
  return Math.min(Math.max(ret, min), max)
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

    if (!rarityAscensionLevel[rarity].includes(level.curr)) {
      level.currAscension = false
    }
    if (!rarityAscensionLevel[rarity].includes(level.next)) {
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
    } = this.state
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
                  style={{ height: 20, flex: 1, textAlign: 'center', marginTop: 2, borderWidth: 1, borderColor: "red" }}
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
                  title="已灵基突破"
                  checked={level.currAscension}
                  onPress={() => this.handleLevelChange(CURR_ASCENSION, !level.currAscension)}
                />
              </View>
              <Text> -&gt; </Text>
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
                  title="已灵基突破"
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
                  <Text> -&gt; </Text>
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
          title="宝具等级"
          subtitle={
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5 }}>
              <TextInput
                style={{ height: 20, flex: 1, textAlign: 'center' }}
                selectTextOnFocus
                value={`${npLevel}`}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={text => this.setState({ npLevel: constrainInt(text, 1, 5) })}
              />
            </View>
          }
          hideChevron
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
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
        </View>
      </List>
    )
  }
}
