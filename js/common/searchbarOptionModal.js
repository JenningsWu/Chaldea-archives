/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  Modal,
} from 'react-native'
import {
  Card,
  Button,
  Divider,
} from 'react-native-elements'
import _ from 'lodash'

const initialOption = {
  rarityOption: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  },
  classOption: {
    saber: true,
    archer: true,
    lancer: true,
    berserker: true,
    rider: true,
    caster: true,
    assassin: true,
    sp: true,
  },
}

export default class SearchbarOptionModal extends PureComponent {
  constructor(props) {
    super()
    this.state = props.state || initialOption
  }

  setAll = (value) => {
    const {
      rarityOption,
      classOption,
    } = this.state
    this.setState({
      rarityOption: _.mapValues(rarityOption, () => value),
      classOption: _.mapValues(classOption, () => value),
    })
  }

  close = () => {
    if (this.props.close) {
      this.props.close(this.state)
    }
  }

  render() {
    const {
      rarityOption,
      classOption,
    } = this.state
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible}
        onRequestClose={this.close}
      >
        <View style={{ marginTop: 22 }}>
          <Card
            title="筛选条件"
          >
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {
                  ['一星', '二星', '三星', '四星', '五星'].map((label, idx) => {
                    const enable = rarityOption[idx + 1]
                    return (
                      <Button
                        key={label}
                        title={label}
                        raised={enable}
                        backgroundColor={enable ? '#03a9f4' : '#868e96'}
                        containerViewStyle={{
                          flex: 1,
                          marginLeft: 5,
                          marginRight: 5,
                          backgroundColor: 'white',
                        }}
                        onPress={() => {
                          this.setState({
                            rarityOption: {
                              ...rarityOption,
                              [idx + 1]: !enable,
                            },
                          })
                        }}
                        // disabled
                      />
                    )
                  })
                }
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {
                  [
                    {
                      label: '剑',
                      attr: 'saber',
                    },
                    {
                      label: '弓',
                      attr: 'archer',
                    },
                    {
                      label: '枪',
                      attr: 'lancer',
                    },
                    {
                      label: '狂',
                      attr: 'berserker',
                    },
                  ].map(({ label, attr }) => {
                    const enable = classOption[attr]
                    return (
                      <Button
                        key={label}
                        title={label}
                        raised={enable}
                        backgroundColor={enable ? '#03a9f4' : '#868e96'}
                        buttonStyle={{
                          flex: 1,
                        }}
                        containerViewStyle={{
                          flex: 1,
                          marginLeft: 5,
                          marginRight: 5,
                          backgroundColor: 'white',
                        }}
                        onPress={() => {
                          this.setState({
                            classOption: {
                              ...classOption,
                              [attr]: !enable,
                            },
                          })
                        }}
                        // disabled
                      />
                    )
                  })
                }
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {
                  [
                    {
                      label: '骑',
                      attr: 'rider',
                    },
                    {
                      label: '术',
                      attr: 'caster',
                    },
                    {
                      label: '杀',
                      attr: 'assassin',
                    },
                    {
                      label: 'SP',
                      attr: 'sp',
                    },
                  ].map(({ label, attr }) => {
                    const enable = classOption[attr]
                    return (
                      <Button
                        key={label}
                        title={label}
                        raised={enable}
                        backgroundColor={enable ? '#03a9f4' : '#868e96'}
                        buttonStyle={{
                          flex: 1,
                        }}
                        containerViewStyle={{
                          flex: 1,
                          marginLeft: 5,
                          marginRight: 5,
                          backgroundColor: 'white',
                        }}
                        onPress={() => {
                          this.setState({
                            classOption: {
                              ...classOption,
                              [attr]: !enable,
                            },
                          })
                        }}
                        // disabled
                      />
                    )
                  })
                }
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  backgroundColor="#03a9f4"
                  buttonStyle={{
                    flex: 1,
                  }}
                  containerViewStyle={{
                    flex: 1,
                  }}
                  title="重置"
                  onPress={() => this.setAll(true)}
                />
                <Button
                  backgroundColor="#03a9f4"
                  buttonStyle={{
                    flex: 1,
                  }}
                  containerViewStyle={{
                    flex: 1,
                  }}
                  title="清空"
                  onPress={() => this.setAll(false)}
                />
              </View>
              <Divider style={{ marginTop: 10 }} />
              <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Button
                  backgroundColor="#5cb85c"
                  buttonStyle={{
                    flex: 1,
                    width: '100%',
                  }}
                  title="确定"
                  onPress={this.close}
                />
              </View>
            </View>
          </Card>
        </View>
      </Modal>
    )
  }
}

export { initialOption }
