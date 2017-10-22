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
  npCondition,
  effectDesc,
  showedValue,
  probDesc,
  attackNp,
  npEffectType,
  npType,
} from '../../schema/Skill'

const NpEffect = ({
  id,
  value,
  duration,
  durationTime,
  effectiveTime,
  probability = [100, 0],
  type,
  isFirst,
  isGrouped,
}) => {
  const valueStr = showedValue(id, value)
  return (
    <View
      key={id}
      style={{
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <Divider style={{
        height: isFirst ? 0 : 1,
        backgroundColor: isGrouped ? '#ddd' : '#bbb',
      }}
      />
      <Text style={{ color: '#43484d', margin: 10 }}>
        {isGrouped ? '⤷' : ''}
        {`${npEffectType[type]}`}
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
            </View>
          </View>) : null
        }
    </View>
  )
}

class NP extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      curr: props.np.length - 1,
    }
  }
  render() {
    const num = this.props.np.length
    if (num === 0) {
      return null
    }
    const { curr } = this.state
    const skill = this.props.np[curr]
    const {
      name,
      lv,
      type,
      hits,
      condition,
      value,
      card,
      attackPhaseID,
      effect,
    } = skill

    const npColor = {
      0: 'blue',
      1: 'red',
      2: 'green',
    }[card] || '#43484d'
    let groupPhaseId = -1
    const preEffect = effect.filter(
      ({ phaseID }) => parseInt(phaseID, 10) <= parseInt(attackPhaseID, 10)).sort(
        (a, b) => parseInt(a.phaseID, 10) - parseInt(b.phaseID, 10))
    const postEffect = effect.filter(
      ({ phaseID }) => parseInt(phaseID, 10) > parseInt(attackPhaseID, 10)).sort(
        (a, b) => parseInt(a.phaseID, 10) - parseInt(b.phaseID, 10))
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
          <Text style={{ fontWeight: 'bold', textAlign: 'center', color: npColor }}>{`${name}${lv ? ` ${lv}` : ''}`}</Text>
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
              rightTitle={npCondition[condition]}
              hideChevron
            />
          )
        }
        {
          (groupPhaseId = attackPhaseID,
          type === 5 ? (
            <View
              style={{
                paddingTop: 3,
                paddingBottom: 3,
              }}
            >
              <Text style={{ color: '#43484d', margin: 10 }}>
                {`[lv]${npType[type]}`}
              </Text>
              {
                <View style={{ marginHorizontal: 10, marginBottom: 5, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#ccc' }}>
                  <View style={{ flexDirection: 'row' }}>
                    {
                      value.slice(0, 5).map((v, idx) => [`${v}%`, `${v}-${idx}`]).map(([v, key]) => (
                        <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                          <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                        </View>
                      ))
                    }
                  </View>
                </View>
              }
            </View>
          ) : null)
        }
        {
          hits > 0 ? (
            <ListItem
              title="Hit 数"
              rightTitle={`${hits}`}
              hideChevron
            />
          ) : null
        }
        {
          preEffect.map((e, effectIdx) => {
            const {
              id,
              duration,
              durationTime,
              effectiveTime,
              probability,
              phaseID,
            } = e
            const ret = (
              <NpEffect
                key={`${id}-${e.value[0]}-${e.value[1]}`}
                id={id}
                value={e.value}
                type={e.type}
                duration={duration}
                durationTime={durationTime}
                effectiveTime={effectiveTime}
                probability={probability}
                isFirst={effectIdx === 0}
                isGrouped={phaseID === groupPhaseId}
              />
            )
            groupPhaseId = phaseID
            return ret
          })
        }
        {
          type in attackNp ? (
            <View>
              <Divider style={{
                height: groupPhaseId === attackPhaseID ? 0 : 1,
                backgroundColor: '#bbb',
              }}
              />
              <Text style={{ color: '#43484d', margin: 10 }}>
                {attackPhaseID === groupPhaseId ? '⤷' : ''}
                {attackNp[type]}
              </Text><View style={{ marginHorizontal: 10, marginBottom: 5, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#ccc' }}>
                <View style={{ flexDirection: 'row' }}>
                  {
                    value.slice(0, 5).map((v, idx) => [v, `${v}-${idx}`]).map(([v, key]) => (
                      <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                        <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{`${v}%`}</Text>
                      </View>
                    ))
                  }
                </View>
              </View>
            </View>
          ) : null
        }
        {
          postEffect.map((e, effectIdx) => {
            if (parseInt(groupPhaseId, 10) < parseInt(attackPhaseID, 10)) {
              groupPhaseId = attackPhaseID
            }
            const {
              id,
              duration,
              durationTime,
              effectiveTime,
              probability,
              phaseID,
            } = e
            const ret = (
              <NpEffect
                key={`${id}-${e.value[0]}-${e.value[1]}`}
                id={id}
                value={e.value}
                type={e.type}
                duration={duration}
                durationTime={durationTime}
                effectiveTime={effectiveTime}
                probability={probability}
                isFirst={effectIdx === 0}
                isGrouped={phaseID === groupPhaseId}
              />
            )
            groupPhaseId = phaseID
            return ret
          })
        }
      </Card>
    )
  }
}

export default class ServantNpPage extends Component {
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
      np,
    } = servant
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ flex: 1 }}>
          <NP np={np} />
        </ScrollView>
      </View>
    )
  }
}
