/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
} from 'react-native'
import {
  SearchBar,
  Icon,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import _ from 'lodash'

import MaterialFlatList from './materialFlatList'
import indexNavigationOptions from './navigationOptions'

import servantMap from '../assets/data/servants'
import materialList from '../assets/data/materialList'
import events from '../assets/data/event'
import { setMaterialNum as setMaterialNumAction } from '../actions/material'
import { rarityAscensionLevel } from '../schema/Servant'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

const getRenderedList = createSelector(
  ({ keyword }) => keyword,
  ({ data }) => data,
  (keyword, data) => (
    keyword === '' ? data : data.filter(({ name }) =>
      name.indexOf(keyword) >= 0)),
)

class ServantListWithSearch extends PureComponent {

  static navigationOptions = () => ({
    title: '素材规划',
    ...indexNavigationOptions,
  })

  constructor() {
    super()
    this.state = {
      keyword: '',
    }
  }

  state: {
    keyword: string;
    // up: boolean;
    list: Array<Object>;
  }


  // componentDidMount() {
  //   this.props.navigation.navigate('FutureSight', { servant: servants[2] })
  // }

  onSearchChange = (keyword: string) => {
    this.setState({
      keyword,
      list: keyword === '' ? this.materialList : this.materialList.filter(({ name }) =>
        name.indexOf(keyword) >= 0),
    })
  }

  materialList: Array<Object>

//
// const testStyle = {
//   flex: 1,
// }
  render() {
    const {
      data,
      extraData,
      setMaterialNum,
    } = this.props
    const {
      keyword,
    } = this.state
    const list = getRenderedList({ keyword, data })
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
            onChangeText={key => this.setState({ keyword: key })}
            textInputRef="textInput"
            placeholder="输入关键字"
            lightTheme
            clearIcon
            keyboardType="web-search"
          />
        </View>
        <MaterialFlatList
          data={list}
          extraData={extraData}
          setMaterialNum={setMaterialNum}
        />
      </View>
    )
  }
}

const materialNeedsCalculator = createSelector(
  ({ account, accountData }) => accountData[account].servant,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'priority'], {}),
  (servantList, config) => {
    const ret = _.mapValues(materialList, () => 0)
    Object.keys(servantList).forEach((id) => {
      const {
        level,
        skills,
        priority,
      } = servantList[id]
      if (!_.get(config, [priority], true)) {
        return
      }
      const servant = servantMap[id]
      servant.calculateMaterailNums(level, skills).forEach((num, materialId) => {
        ret[materialId] += num
      })
    })
    return ret
  },
)

const materialFutureCalculator = createSelector(
  ({ account, accountData }) => accountData[account].event,
  (event) => {
    const ret = _.mapValues(materialList, () => 0)
    _.forEach(event, ({ active, pool }, id) => {
      if (active) {
        _.forEach(events[id].material, (num, materialId) => {
          ret[materialId] += num
        })
        pool.forEach((pnum, idx) => {
          _.forEach(events[id].pool[idx].material, (num, materialId) => {
            ret[materialId] += pnum * num
          })
        })
      }
    })
    return ret
  },
)

const extractCurrentList = createSelector(
  ({ account, accountData }) => accountData[account].material,
  list => _.mapValues(list, ({ current }) => current),
)

const materialCalculator = createStructuredSelector({
  currList: extractCurrentList,
  needsList: materialNeedsCalculator,
  futureList: materialFutureCalculator,
})

const getMaterialList = createSelector(
  () => materialList,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'type'], {}),
  (data, config) => {
    const ret = _.map(data, (val, id) => ({
      ...val,
      id,
    })).filter(({ type }) => _.get(config, [type], true))
    const top = ret.filter(m => m.top)
    top.push(...ret.filter(m => !m.top))
    return top
  },
)

const getFutureInsightViewConfig = ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureInsightView'], false)

const getNeedsMaterial = createSelector(
  ({ data }) => data,
  ({ extraData }) => extraData,
  (data, { needsList, currList, futureList }) => data.filter(({ id }) => (
    needsList[id] > currList[id] + futureList[id]
  )),
)

export default connect(
  state => ({
    data: getMaterialList(state),
    extraData: materialCalculator(state),
    futureInsightView: getFutureInsightViewConfig(state),
  }),
  dispatch => ({
    setMaterialNum: (id, num) => {
      dispatch(setMaterialNumAction(id, num))
    },
  }),
  ({ data, extraData, futureInsightView }, dispatch, ownProps) => ({
    ...ownProps,
    ...dispatch,
    data: futureInsightView ? getNeedsMaterial({ data, extraData }) : data,
    extraData,
  }),
)(ServantListWithSearch)
