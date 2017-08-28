/**
 * @flow
 */

import React from 'react'
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
import { connect } from 'react-redux'

import materialList from '../assets/data/materialList'
import materialImg from '../assets/img/material'
import { setMaterialNum } from '../actions/material'

function MaterialFlatList({ data, setMaterialNum }) {
  const styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      // paddingLeft: 10,
      paddingTop: 5,
    },
    needsText: {
      paddingLeft: 10,
      color: 'grey',
    },
    futureText: {
      paddingLeft: 10,
      color: 'grey',
    },
    storageText: {
      paddingLeft: 20,
      color: '#444444',
    },
  })
  return (
    <View style={{
      flex: 1,
    }}
    >
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, name, current, needs, future } }) => (
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
            textInput
            textInputValue={`${current}`}
            textInputKeyboardType="numeric"
            textInputSelectTextOnFocus
            textInputStyle={{ color: '#444444' }}
            textInputOnChangeText={(num) => {
              setMaterialNum(id, parseInt(num, 10) || 0)
            }}
            hideChevron
            // onPress={() => this.props.navigation.navigate('Item', { servant: item })}
            // underlayColor="#ddd"
            // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
          />
        )}
      />
    </View>
  )
}

function materialToList(data) {
  return Object.keys(data).map(id => (
    {
      id,
      ...data[id],
      ...materialList[id],
    }
  ))
}

export default connect(
  ({ account, accountData }) => ({ data: materialToList(accountData[account].material) }),
  dispatch => ({
    setMaterialNum: (id, num) => {
      dispatch(setMaterialNum(id, num))
    },
  }),
)(MaterialFlatList)
