const CLICK_CONFIG = 'click_config'
const SET_VIEW_FILTER = 'set_view_filter'
const SET_SEARCHBAR_OPTION = 'set_serchbar_option'

function clickConfig(parentName, name, key, value) {
  return {
    type: CLICK_CONFIG,
    parentName,
    name,
    key,
    value,
  }
}

function setTopValueConfig(name, value) {
  return {
    type: SET_VIEW_FILTER,
    name,
    value,
  }
}

function switchFutureInsightView(value) {
  return setTopValueConfig('futureInsightView', value)
}

function switchMaterilServantView(value) {
  return setTopValueConfig('materialServantSimpleView', value)
}

function setSearchbarOption(name, value) {
  return {
    type: SET_SEARCHBAR_OPTION,
    name,
    value,
  }
}

export {
  CLICK_CONFIG,
  clickConfig,
  SET_VIEW_FILTER,
  switchFutureInsightView,
  switchMaterilServantView,
  SET_SEARCHBAR_OPTION,
  setSearchbarOption,
}
