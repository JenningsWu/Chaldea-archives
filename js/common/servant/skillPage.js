/**
 * @flow
 */

import React, { PureComponent, Component } from 'react'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import {
  Card,
  ListItem,
  Divider,
  Icon,
} from 'react-native-elements'

import servantMap from '../../assets/export/data/servants'

import {
  skillCondition,
  effectDesc,
  showedValue,
  probDesc,
  detailNeedGroup,
  skillRequirement,
} from '../../schema/Skill'

class Skills extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      curr: props.skill.length - 1,
    }
  }
  render() {
    const num = this.props.skill.length
    if (num === 0) {
      return null
    }
    const { curr } = this.state
    const skill = this.props.skill[curr]
    const {
      name,
      lv,
      initialCD,
      condition,
      effect,
      requirement = '00000',
    } = skill
    let groupPhaseId = -1
    return (
      <Card containerStyle={{ margin: 0 }} title={null}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15 }}>
          <Icon
            name="keyboard-arrow-left"
            color={curr === 0 ? 'white' : 'black'}
            onPress={() => {
              if (curr > 0) {
                this.setState({ curr: curr - 1 })
              }
            }}
          />
          <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#43484d' }}>{`${name}${lv ? ` ${lv}` : ''}`}</Text>
          <Icon
            name="keyboard-arrow-right"
            color={curr === num - 1 ? 'white' : 'black'}
            onPress={() => {
              if (curr < num - 1) {
                this.setState({ curr: curr + 1 })
              }
            }}
          />
        </View>
        <Divider style={{ backgroundColor: '#e1e8ee' }} />
        {
          condition < 1 ? null : (
            <ListItem
              title="开放条件"
              rightTitle={skillCondition[condition]}
              hideChevron
            />
          )
        }
        <ListItem
          title="初始 CD"
          rightTitle={`${initialCD}`}
          hideChevron
        />
        {
          requirement === '00000' ? null : (
            <ListItem
              title="使用条件"
              rightTitle={skillRequirement[requirement]}
              hideChevron
            />
          )
        }
        {
          effect.map(({
            id,
            value,
            duration,
            durationTime,
            effectiveTime,
            probability = [100, 0],
            phaseID,
          }, effectIdx) => {
            const valueStr = showedValue(id, value)
            if (detailNeedGroup(id)) {
              groupPhaseId = phaseID
            }
            // (value.length <= 11 || value[1] === 0 || value[1] === value[0]) ? (
              // <ListItem
              //   key={id}
              //   title=
              //   // rightTitle={`${value[0]}`}
              //   hideChevron
              // />
            return (
              <View
                key={`${id}-${value[0]}-${value[1]}`}
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                }}
              >
                <Divider style={{
                  height: effectIdx > 0 ? 1 : 0,
                  backgroundColor: groupPhaseId === phaseID ? '#ddd' : '#bbb',
                }}
                />
                <Text style={{ color: '#43484d', margin: 10 }}>
                  {!detailNeedGroup(id) && groupPhaseId === phaseID ? '⤷' : ''}
                  {effectDesc(id, value, probability, duration, durationTime, effectiveTime)}
                  {value[0] !== 0 && (value[1] === 0 || value[1] === value[0]) ? `${valueStr[0]}` : ''}
                </Text>
                {
                  value[0] !== value[1] && value[1] !== 0 ? (
                    <View style={{ marginHorizontal: 10, marginBottom: 5, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#ccc' }}>
                      <View style={{ flexDirection: 'row' }}>
                        {
                          valueStr.slice(0, 5).map((v, idx) => [v, `${v}-${idx}`]).map(([v, key]) => (
                            <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                              <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                            </View>
                          ))
                        }
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        {
                          valueStr.slice(5, 10).map((v, idx) => [v, `${v}-${idx}`]).map(([v, key]) => (
                            <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                              <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                            </View>
                          ))
                        }
                      </View>
                    </View>
                  ) : null
                }
                {
                  probability[0] !== probability[1] && probability[1] !== 0 ? (
                    <View>
                      <Text style={{ color: '#43484d', margin: 10 }}>
                        {probDesc(id)}
                      </Text>
                      <View style={{ marginHorizontal: 10, marginBottom: 5, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#ccc' }}>
                        <View style={{ flexDirection: 'row' }}>
                          {
                            probability.slice(0, 5).map((v, idx) => [`${v}%`, `${v}-${idx}`]).map(([v, key]) => (
                              <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                              </View>
                            ))
                          }
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          {
                            probability.slice(5, 10).map((v, idx) => [`${v}%`, `${v}-${idx}`]).map(([v, key]) => (
                              <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                              </View>
                            ))
                          }
                        </View>
                      </View>
                    </View>
                  ) : null
                }
              </View>
            )
          })
        }
      </Card>
    )
  }
}

export default class ServantSkillPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: servantMap[navigation.state.params.id].name,
  })

  shouldComponentUpdate({ navigation }) {
    return navigation.state.params.id !== this.props.navigation.state.params.id
  }

  render() {
    const { id } = this.props.navigation.state.params
    const servant = servantMap[id]
    const {
      skill1,
      skill2,
      skill3,
    } = servant
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ flex: 1 }}>
          <Skills skill={skill1} />
          <Skills skill={skill2} />
          <Skills skill={skill3} />
        </ScrollView>
      </View>
    )
  }
}
