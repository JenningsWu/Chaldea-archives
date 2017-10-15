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
import indexNavigationOptions from '../navigationOptions'

import servantMap from '../../assets/data/servants'
import materialList from '../../assets/data/materialList'
import { setMaterialNum as setMaterialNumAction } from '../../actions/material'
import { materialFutureCalculator, materialCurrentCalculator } from '../../utils/selectors'

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
      materialToServant,
      navigation,
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
          materialToServant={materialToServant}
          navigation={navigation}
        />
      </View>
    )
  }
}

const servantMatarialCalculator = createSelector(
  ({ account, accountData }) => accountData[account].servant,
  servantList => (
    _.map(servantList, (info, id) => {
      const { level, skills } = info
      const servant = servantMap[id]
      return {
        id,
        info,
        needs: Array.from(servant.calculateMaterailNums(level, skills)).map(
          ([materialId, num]) => (
            {
              id: materialId,
              num,
            }
          ),
        ).filter(({ num }) => num > 0),
      }
    })
  ),
)

const materialNeedsCalculator = createSelector(
  servantMatarialCalculator,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'priority'], {}),
  (servantList, config) => {
    const ret = _.mapValues(materialList, () => 0)
    servantList.forEach(({ info, needs }) => {
      const {
        priority,
      } = info
      if (!_.get(config, [priority], true)) {
        return
      }
      needs.forEach(({ id, num }) => {
        ret[id] += num
      })
    })
    return ret
  },
)

const materialToServantCalculator = createSelector(
  servantMatarialCalculator,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'priority'], {}),
  (servantList, config) => {
    const ret = _.mapValues(materialList, () => [])
    servantList.forEach(({ info, needs }) => {
      const {
        priority,
        id,
      } = info
      if (!_.get(config, [priority], true)) {
        return
      }
      needs.forEach((material) => {
        ret[material.id].push({ id, num: material.num })
      })
    })
    return ret
  },
)

const materialCalculator = createStructuredSelector({
  currList: materialCurrentCalculator,
  needsList: materialNeedsCalculator,
  futureList: materialFutureCalculator,
  materialToServant: materialToServantCalculator,
  servantInfo: ({ account, accountData }) => accountData[account].servant,
})

const getMaterialList = createSelector(
  () => materialList,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'type'], {}),
  (data, config) => {
    const ret = _.map(data, (val, id) => ({
      ...val,
      id,
    })).filter(({ id, type }) => id[0] !== '3' && _.get(config, [type], true))
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
