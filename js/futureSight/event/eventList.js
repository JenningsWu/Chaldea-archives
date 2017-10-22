/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'

import navigationOptions from '../navigationOptions'

import eventList from '../../assets/data/event.json'
import {
  setEvent as setEventAction,
  setEventPool as setEventPoolAction,
  finishEvent as finishEventAction,
} from '../../actions/event'

const styles = StyleSheet.create({
  subtitle: {
    color: '#86939e',
    fontSize: 12,
    marginTop: 1,
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
})

const initialEventItem = {
  active: false,
  pool: [],
  finish: false,
}

class EventItem extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {
      id,
      name,
      pool,
      event,
      setEvent,
      setEventPool,
      finishEvent,
    } = this.props
    return (
      <ListItem
        title={name}
        subtitle={
          pool && (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 10, marginTop: 5 }}>
              {
                pool.map(({ name }, idx) => (
                  <View key={name} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <TextInput
                      keyboardType="numeric"
                      returnKeyType="done"
                      style={{ width: 36, marginRight: 3, color: '#434343' }}
                      value={`${event.pool[idx] || 0}`}
                      onChangeText={text => setEventPool(id, idx, parseInt(text, 10) || 0)}
                      editable={event.active}
                    />
                    <Text style={{ color: '#434343' }}>{idx + 1 < pool.length ? `${name}, ` : name}</Text>
                  </View>
                ))
              }
            </View>
          )
        }
        hideChevron
        switchButton
        switchDisabled={event.finish}
        switched={event.active}
        onSwitch={() => {
          const { active } = event
          if (active) {
            Alert.alert(
              '活动毕业',
              '是否将活动素材全部加入库存？选择加入将毕业活动，以后无法重新开启。',
              [
                { text: '取消', onPress: () => setEvent(id, false), style: 'cancel' },
                {
                  text: '确定',
                  onPress: () => {
                    finishEvent(id, event.pool)
                    setEvent(id, false)
                  },
                },
              ],
            )
          } else {
            setEvent(id, true)
          }
        }}
        onPress={() => this.props.navigation.navigate('EventMaterial', { id })}

      />
    )
  }
}

class EventList extends PureComponent {
  static navigationOptions = () => ({
    title: '活动一览',
    ...navigationOptions,
  })

  constructor() {
    super()
    this.list = _.map(eventList, (obj, id) => (
      {
        id,
        ...obj,
      }
    ))
  }

  state: {
    list: Array<Object>;
  }

//
// const testStyle = {
//   flex: 1,
// }

  render() {
    const {
      data,
      setEvent,
      setEventPool,
      finishEvent,
    } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flex: 1,
        }}
        >
          <FlatList
            data={this.list}
            extraData={data}
            keyExtractor={(item: { id: string }) => item.id}
            renderItem={({ item }) => (
              <EventItem
                id={item.id}
                name={item.name}
                pool={item.pool}
                event={data[item.id] || initialEventItem}
                setEvent={setEvent}
                setEventPool={setEventPool}
                finishEvent={finishEvent}
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

export default connect(
  ({ account, accountData }) => ({ data: accountData[account].event }),
  dispatch => ({
    setEvent: (id, value) => dispatch(setEventAction(id, value)),
    setEventPool: (id, poolIdx, value) => dispatch(setEventPoolAction(id, poolIdx, value)),
    finishEvent: (id, pool) => dispatch(finishEventAction(id, pool)),
  }),
)(EventList)
