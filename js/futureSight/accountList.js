/**
 * @flow
 */

import React, { Component, PureComponent } from 'react'
import {
  View,
  FlatList,
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

import navigationOptions from './navigationOptions'

import {
  setAccountName as setAccountNameAction,
  switchAccount as switchAccountAction,
  deleteAccount as deleteAccountAction,
} from '../actions/account'

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

class Item extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      name: props.name || `未命名 ${props.id}`,
    }
  }

  render() {
    const {
      id,
      using,
      editing,
      setAccountName,
      switchAccount,
      deleteAccount,
    } = this.props
    const { name } = this.state
    return (
      <ListItem
        title={editing ? (
          <TextInput
            value={`${name}`}
            onChangeText={text => this.setState({ name: text })}
            onBlur={() => setAccountName(id, name)}
            style={{ color: '#333333' }}
          />
        ) : name}
        subtitle={using ? '当前' : undefined}
        onPress={() => {
          if (!editing && !using) {
            Alert.alert(
              '切换账号',
              `确定切换到账号${name}吗？`,
              [
                { text: '取消', style: 'cancel' },
                { text: '确定', onPress: () => switchAccount(id) },
              ],
            )
          }
        }}
        hideChevron={!editing}
        rightIcon={{ name: 'delete-forever', style: { color: '#f84444' } }}
        onPressRightIcon={() => {
          if (using) {
            Alert.alert(
              '删除账号',
              `该账号${name}正在使用，无法删除！`,
              [
                { text: '取消', style: 'cancel' },
              ],
            )
          } else {
            Alert.alert(
              '删除账号',
              `确定删除账号${name}吗？`,
              [
                { text: '取消', style: 'cancel' },
                { text: '确定', onPress: () => deleteAccount(id) },
              ],
            )
          }
        }}
      />
    )
  }
}

class AccountList extends Component {
  static navigationOptions = () => ({
    title: '账号管理',
    ...navigationOptions,
  })

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props)
  }

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
            data={this.props.list}
            keyExtractor={({ id }) => id}
            renderItem={({ item: { id, name } }) => (
              <Item
                id={id}
                name={name}
                using={id === this.props.current}
                setAccountName={this.props.setAccountName}
                deleteAccount={this.props.deleteAccount}
                switchAccount={this.props.switchAccount}
                editing={this.props.editing}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

export default connect(
  ({ account, accountData }) => ({
    list: _.map(accountData, ({ name }, id) => ({
      id,
      name,
    })),
    current: account,
    editing: _.get(accountData, [account, 'config', 'account', 'editing'], false),
  }),
  dispatch => ({
    setAccountName: (id, name) => {
      dispatch(setAccountNameAction(id, name))
    },
    switchAccount: (to) => {
      dispatch(switchAccountAction(to))
    },
    deleteAccount: (id) => {
      dispatch(deleteAccountAction(id))
    },
  }),
)(AccountList)
