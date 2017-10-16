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

import materialImg from '../../assets/img/material'

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
    const {
      id,
      name,
      simple,
      needs,
      future,
      current,
      setMaterialNum,
      navigation,
      servantList,
      servantInfo,
    } = this.props
    const enough = needs <= future + current
    let textColor
    if (needs <= current) {
      textColor = '#5cb85c'
    } else if (enough) {
      textColor = '#f0ad4e'
    } else {
      textColor = '#d9534f'
    }
    return (
      simple ? (
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
                  { color: enough ? '#5cb85c' : '#d9534f' },
                  { width: '100%' },
                ]}
              >
                所需：{needs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
          }
          switchButton
          onSwitch={() => setMaterialNum(id, enough ? 0 : 999999999999)}
          switched={enough}
          hideChevron
          onPress={() => navigation.navigate('MaterialServant', { id, servantInfo, data: servantList, name })}

          // onPress={() => this.props.navigation.navigate('Item', { servant: item })}
          // underlayColor="#ddd"
          // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
        />
      ) : (
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
                  { color: textColor },
                ]}
              >
                所需：{needs}
              </Text>
              <Text style={styles.futureText}>活动：{future}</Text>
              <Text style={styles.storageText}>库存：</Text>
            </View>
          }
          rightTitle={`${current}`}
          textInput
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
          onPress={() => navigation.navigate('MaterialServant', { id, servantInfo, data: servantList, name })}

          // onPress={() => this.props.navigation.navigate('Item', { servant: item })}
          // underlayColor="#ddd"
          // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
        />
      )
    )
  }
}

export default class MaterialFlatList extends PureComponent {
  render() {
    const { data, extraData, setMaterialNum, navigation } = this.props
    return (
      <View style={{
        flex: 1,
      }}
      >
        <FlatList
          data={data}
          extraData={extraData}
          keyExtractor={({ id }) => id}
          renderItem={({ item: { id, name, simple = false } }) => (
            <MaterialItem
              id={id}
              name={name}
              simple={simple}
              needs={extraData.needsList[id]}
              future={extraData.futureList[id]}
              current={extraData.currList[id] || 0}
              servantList={extraData.materialToServant[id]}
              servantInfo={extraData.servantInfo}
              setMaterialNum={setMaterialNum}
              navigation={navigation}
            />
          )}
        />
      </View>
    )
  }
}
