/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'

import materialImg from '../assets/img/material'

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    // paddingLeft: 10,
    paddingTop: 5,
  },
  needsText: {
    paddingLeft: 10,
    color: 'grey',
    width: 80,
  },
  futureText: {
    paddingLeft: 10,
    color: 'grey',
    width: 80,
  },
  storageText: {
    paddingLeft: 20,
    color: '#444444',
    width: 78,
  },
})

class MaterialItem extends PureComponent {
  constructor() {
    super()
    this.state = {
      showInput: false,
    }
  }

  render() {
    const { id, name, needs, future, current, setMaterialNum } = this.props
    return (
      <ListItem
        title={name}
        avatar={
          <Image
            resizeMode="stretch"
            source={materialImg[id]}
            style={{ height: '100%', aspectRatio: 1 }}
          />}
        subtitle={
          <View style={styles.subtitleView}>
            <Text
              style={[
                styles.needsText,
                { color: needs > future + current ? 'red' : 'green' },
              ]}
            >
              所需：{needs}
            </Text>
            <Text style={styles.futureText}>活动：{future}</Text>
            <Text style={styles.storageText}>库存：</Text>
          </View>
        }
        rightTitle={`${current}`}
        onPress={() => { this.setState({ showInput: true }) }}
        textInput={this.state.showInput}
        textInputAutoFocus
        textInputOnBlur={() => { this.setState({ showInput: false }) }}
        textInputValue={`${current}`}
        textInputKeyboardType="numeric"
        textInputReturnKeyType="done"
        textInputSelectTextOnFocus
        textInputStyle={{ color: '#444444', width: '100%', flex: 1, textAlignVertical: 'bottom', paddingTop: 10 }}
        rightTitleStyle={{ color: '#444444' }}
        textInputOnChangeText={(num) => {
          setMaterialNum(id, parseInt(num, 10) || 0)
        }}
        hideChevron
        // onPress={() => this.props.navigation.navigate('Item', { servant: item })}
        // underlayColor="#ddd"
        // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
      />
    )
  }
}

export default class MaterialFlatList extends PureComponent {
  render() {
    const { data, extraData, setMaterialNum } = this.props
    return (
      <View style={{
        flex: 1,
      }}
      >
        <FlatList
          data={data}
          extraData={extraData}
          keyExtractor={({ id }) => id}
          renderItem={({ item: { id, name } }) => (
            <MaterialItem
              id={id}
              name={name}
              needs={extraData.needsList[id]}
              future={extraData.futureList[id]}
              current={extraData.currList[id]}
              setMaterialNum={setMaterialNum}
            />
          )}
        />
      </View>
    )
  }
}
