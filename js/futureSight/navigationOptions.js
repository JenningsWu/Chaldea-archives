import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

const TabBarIcon = ({ tintColor }) => (
  <Icon
    name="sticky-note"
    size={20}
    style={{ color: tintColor }}
  />
)

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}

const indexNavigationOptions = {
  tabBarLabel: '未来视',
  tabBarIcon: TabBarIcon,
}

export default indexNavigationOptions
