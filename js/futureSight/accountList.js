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
  Clipboard,
  Modal,
} from 'react-native'
import {
  ListItem,
  Icon,
  Card,
  Button,
} from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'

import navigationOptions from './navigationOptions'
import materialMap from '../assets/data/materialList'
import servantMap from '../assets/data/servants'
import eventMap from '../assets/data/event.json'

import {
  setAccountName as setAccountNameAction,
  switchAccount as switchAccountAction,
  deleteAccount as deleteAccountAction,
  importData as importDataAction,
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

function getDataFromText(text) {
  const data = JSON.parse(text)
  const material = _.mapValues(data.material, ({ current }) => (
    {
      current: parseInt(current, 10) || 0,
    }
  ))
  const servant = _.mapValues(data.servant, ({ level, skills, npLevel, priority }) => (
    {
      level: {
        curr: parseInt(level.curr, 10) || 0,
        next: parseInt(level.next, 10) || 0,
        currAscension: !!level.currAscension,
        nextAscension: !!level.nextAscension,
      },
      skills: skills.map(skill => ({
        curr: parseInt(skill.curr, 10) || 0,
        next: parseInt(skill.next, 10) || 0,
      })).filter((v, i) => i < 3),
      npLevel: parseInt(npLevel, 10) || 0,
      priority: parseInt(priority, 10) || 0,
    }
  ))
  const event = _.mapValues(data.event, ({ active, pool, finish }) => (
    {
      active: !!active,
      finish: !!finish,
      pool: pool.map(i => parseInt(i, 10) || 0),
    }
  ))

  return {
    material: _.pickBy(material, (v, id) => id in materialMap),
    servant: _.pickBy(servant, (v, id) => id in servantMap),
    event: _.pickBy(event, (v, id) => id in eventMap),
  }
}

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
    return editing ? (
      <ListItem
        title={
          <TextInput
            value={`${name}`}
            onChangeText={text => this.setState({ name: text })}
            onBlur={() => setAccountName(id, name)}
            style={{ color: '#333333' }}
          />
        }
        subtitle={using ? '当前' : undefined}
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
    ) : (
      <ListItem
        title={name}
        subtitle={using ? '当前' : undefined}
        onPress={() => {
          if (!using) {
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
        rightIcon={
          using ? (
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name="file-upload"
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
                onPress={() => {
                  const material = _.pickBy(this.props.data.material, ({ current }) => (
                    current > 0
                  ))
                  Clipboard.setString(JSON.stringify({
                    material,
                    servant: this.props.data.servant,
                    event: this.props.data.event,
                  }))
                  Alert.alert(
                    '数据导出',
                    '已将数据复制到剪贴板！',
                    [
                      { text: '确定' },
                    ],
                  )
                }}
              />
              <Icon
                name="file-download"
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
                onPress={() => this.props.importData()}
              />
            </View>
          ) : undefined
        }
      />
    )
  }
}

class AccountList extends Component {
  static navigationOptions = () => ({
    title: '账号管理',
    ...navigationOptions,
  })

  constructor() {
    super()
    this.state = {
      showImportModal: false,
      importData: '',
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
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
          <Modal
            animationType="fade"
            transparent
            visible={this.state.showImportModal}
          >
            <View style={{ marginTop: 22 }}>
              <Card
                title="数据导入"
              >
                <TextInput
                  value={`${this.state.importData}`}
                  onChangeText={text => this.setState({ importData: text })}
                  blurOnSubmit
                  multiline
                  returnKeyType="done"
                  autoFocus
                  placeholder="粘贴数据到这里"
                  style={{ maxHeight: 100 }}
                />
                <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Button
                    backgroundColor="#46b8da"
                    buttonStyle={{
                      paddingTop: 6,
                      paddingBottom: 6,
                      flex: 1,
                      height: 30,
                    }}
                    title="取消"
                    style={{ height: 30, width: '100%' }}
                    onPress={() => this.setState({ showImportModal: false })}
                  />
                  <Button
                    backgroundColor="#5cb85c"
                    buttonStyle={{
                      paddingTop: 6,
                      paddingBottom: 6,
                      flex: 1,
                      height: 30,
                    }}
                    title="确定"
                    style={{ height: 30 }}
                    onPress={() => {
                      try {
                        const data = getDataFromText(this.state.importData)
                        this.props.importData(data)
                        Alert.alert(
                          '数据倒入',
                          '导入数据成功！',
                          [
                            {
                              text: '确定',
                              onPress: () => this.setState({ showImportModal: false }),
                            },
                          ],
                        )
                        // const servant =
                      } catch (e) {
                        Alert.alert(
                          '数据倒入',
                          '导入数据存在错误！',
                          [
                            { text: '确定' },
                          ],
                        )
                      }
                    }}
                  />
                </View>
              </Card>
            </View>
          </Modal>
          <FlatList
            data={this.props.list}
            extraData={this.props.data}
            keyExtractor={({ id }) => id}
            renderItem={({ item: { id, name } }) => (
              <Item
                id={id}
                name={name}
                using={id === this.props.current}
                data={id === this.props.current ? this.props.data : null}
                setAccountName={this.props.setAccountName}
                deleteAccount={this.props.deleteAccount}
                switchAccount={this.props.switchAccount}
                editing={this.props.editing}
                importData={() => {
                  this.setState({ showImportModal: true })
                }}
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
    data: {
      material: accountData[account].material,
      servant: accountData[account].servant,
      event: accountData[account].event,
    },
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
    importData: (data) => {
      dispatch(importDataAction(data))
    },
  }),
)(AccountList)
