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

import materialImg from '../assets/img/material'

function MaterialFlatList({ data }) {
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
        keyExtractor={({ key }) => key}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            avatar={
              <Image
                resizeMode="stretch"
                source={materialImg[item.key]}
                style={{ height: '100%', aspectRatio: 1 }}
              />}
            subtitle={
              <View style={styles.subtitleView}>
                <Text style={styles.needsText}>所需：412</Text>
                <Text style={styles.futureText}>活动：325</Text>
                <Text style={styles.storageText}>库存：</Text>
              </View>
            }
            textInput
            textInputValue={'0'}
            textInputKeyboardType="numeric"
            textInputSelectTextOnFocus
            textInputStyle={{ color: '#444444' }}
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

export default MaterialFlatList
