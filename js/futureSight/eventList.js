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
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'

import navigationOptions from './navigationOptions'

import servantMap from '../assets/data/servants'
import eventList from '../assets/data/event.json'

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

class EventItem extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {
      name,
    } = this.props
    return (
      <ListItem
        title={name}
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
    keyword: string;
    up: boolean;
    list: Array<Object>;
  }

  //
  // componentDidMount() {
  //   this.props.navigation.navigate('FutureSight', { servant: servants[2] })
  // }

  onSearchChange = (keyword: string, candidate = this.props.data) => {
    this.setState({
      keyword,
      list: keyword === '' ? candidate : candidate.filter(({ id }) =>
        servantMap[id].checkKeyWord(keyword)),
    })
  }

  servants: Array<Object>

//
// const testStyle = {
//   flex: 1,
// }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flex: 1,
        }}
        >
          <FlatList
            data={this.list}
            keyExtractor={(item: { id: string }) => item.id}
            renderItem={({ item }) => (
              <EventItem
                name={item.name}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

const getServantList = createSelector(
  ({ account, accountData }) => accountData[account].servant,
  ({ account, accountData }) => accountData[account].config.viewFilter.futureSightServantList,
  (servant, config) => (
    _.map(servant, (data, id) => ({
      id,
      ...data,
    })).filter(({ priority }) => _.get(config, ['priority', priority], true))
  ),
)

export default connect(
  state => ({ data: getServantList(state) }),
  dispatch => ({}),
)(EventList)
