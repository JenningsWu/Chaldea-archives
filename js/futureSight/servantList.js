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
  SearchBar,
  Icon,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'

import navigationOptions from './navigationOptions'

import servants from '../assets/data/servants'
import { setServantInfo, removeServant } from '../actions/servant'

import ServantForm from './servantForm'
import ServantItem from './servantItem'


const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

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

class ServantListWithSearch extends PureComponent {
  static navigationOptions = () => ({
    title: '从者一览',
    ...navigationOptions,
  })

  constructor(props) {
    super()
    this.state = {
      keyword: '',
      up: true,
      list: props.data,
    }
  }

  state: {
    keyword: string;
    up: boolean;
    list: Array<Object>;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return
    }
    this.onSearchChange(this.state.keyword, nextProps.data)
  }
  //
  // componentDidMount() {
  //   this.props.navigation.navigate('FutureSight', { servant: servants[2] })
  // }

  onSearchChange = (keyword: string, candidate = this.props.data) => {
    this.setState({
      keyword,
      list: keyword === '' ? candidate : candidate.filter(({ id }) =>
        servants[parseInt(id, 10)].checkKeyWord(keyword)),
    })
  }

  servants: Array<Object>

//
// const testStyle = {
//   flex: 1,
// }
  render() {
    const { up } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // alignItems: 'center',
        }}
        >
          <SearchBar
            containerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', ...noBorderStyle }}
            onChangeText={keyword => this.onSearchChange(keyword)}
            textInputRef="textInput"
            placeholder="输入关键字"
            keyboardType="web-search"
            lightTheme
            clearIcon
          />
          <Icon
            name="settings"
            iconStyle={{ paddingLeft: 2, paddingRight: 5, fontSize: 24 }}
            onPress={() => this.setState({ keyword: '' })}
          />
          <Icon
            iconStyle={{ paddingLeft: 5, paddingRight: 10, fontSize: 32 }}
            name={this.state.up ? 'caret-up' : 'caret-down'}
            type="font-awesome"
            onPress={() => this.setState({ up: !up })}
          />
        </View>
        <View style={{
          flex: 1,
        }}
        >
          <FlatList
            data={this.state.list}
            keyExtractor={(item: { id: string }) => item.id}
            renderItem={({ item }) => (
              <ServantItem
                servant={servants[parseInt(item.id, 10)]}
                setServantInfo={this.props.setServantInfo}
                desc={
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.subtitle}>{`等级 ${item.level.curr} -> ${item.level.next}, 宝具 ${item.npLevel}`}</Text>
                    <Text style={styles.subtitle}>{`技能 ${item.skills[0].curr} -> ${item.skills[0].next}, ${item.skills[1].curr} -> ${item.skills[1].next}, ${item.skills[2].curr} -> ${item.skills[2].next}`}</Text>
                  </View>
                }
                bigAvatar
                servantForm={
                  <ServantForm
                    servant={servants[parseInt(item.id, 10)]}
                    data={item}
                    setServantInfo={this.props.setServantInfo}
                    removeServant={this.props.removeServant}
                    deleteButton
                    updateButton
                    cancelButton
                  />
                }
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
  ({ account, accountData }) => accountData[account].config.futureSightServantList,
  (servant, config) => (
    _.map(servant, (data, id) => ({
      id,
      ...data,
    })).filter(({ priority }) => _.get(config, ['priority', priority], true))
  ),
)

export default connect(
  state => ({ data: getServantList(state) }),
  dispatch => ({
    setServantInfo: (id, value) => {
      dispatch(setServantInfo(id, value))
    },
    removeServant: (id) => {
      dispatch(removeServant(id))
    },
  }),
)(ServantListWithSearch)
