/**
 * @flow
 */

import React, { Component } from 'react'
import {
  Text,
  Button,
  View,
} from 'react-native'

export default class EventTab extends Component {
  constructor() {
    super()
    this.state = {
      hello: "hello",
    }
  }

  state: {
    hello: string;
  }

  render() {
    return (
      <View>
        <Text>
          Hello world! {this.state.hello}
        </Text>
        <Button
          onPress={() => {
            this.setState({ hello: 'agian' })
          }}
          title="Jump"
        />
      </View>

    )
  }
}
