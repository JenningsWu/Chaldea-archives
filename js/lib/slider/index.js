// This is a forked implementation of react-native-elements
// (https://github.com/react-native-training/react-native-elements)'s Slider,
// which is originally forked from react-native-slider (https://github.com/jeanregisser/react-native-slider)

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet, Animated, Easing, PanResponder, ViewPropTypes, Image } from 'react-native'

import { getBugsnagClient } from '../bugsnag'

// import shallowCompare from 'react-addons-shallow-compare'
// import styleEqual from 'style-equal'

const TRACK_SIZE = 4
const THUMB_SIZE = 20
const SENSITIVE = 5

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
  },
}

function Rect(x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}

Rect.prototype.containsPoint = function containsPoint(x, y) {
  return (
    x >= this.x &&
    y >= this.y &&
    x <= this.x + this.width &&
    y <= this.y + this.height
  )
}

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containerSize: { width: 0, height: 0 },
      trackSize: { width: 0, height: 0 },
      thumbSize: { width: 0, height: 0 },
      allMeasured: false,
      value: props.multiSlider ? {
        left: new Animated.Value(props.leftValue),
        right: new Animated.Value(props.rightValue),
      } : new Animated.Value(props.value),
    }
    this.active = {
      left: false,
      right: false,
    }
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminationRequest: this.handlePanResponderRequestEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.multiSlider && !nextProps.multiSlider) {
      const newValue = nextProps.value
      if (this.props.value !== newValue) {
        if (this.props.animateTransitions) {
          this.setCurrentValueAnimated(this.state.value, newValue)
        } else {
          this.setCurrentValue(this.state.value, newValue)
        }
      }
    }

    if (this.props.multiSlider && nextProps.multiSlider) {
      ['left', 'right'].forEach((tag) => {
        const newValue = nextProps[`${tag}Value`]
        if (this.props.value[tag] !== newValue) {
          if (this.props.animateTransitions) {
            this.setCurrentValueAnimated(this.state.value[tag], newValue)
          } else {
            this.setCurrentValue(this.state.value[tag], newValue)
          }
        }
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // We don't want to re-render in the following cases:
  //   // - when only the 'value' prop changes as it's already handled with the Animated.Value
  //   // - when the event handlers change (rendering doesn't depend on them)
  //   // - when the style props haven't actually change
  //
  //   return shallowCompare(
  //     { props: this._getPropsForComponentUpdate(this.props), state: this.state },
  //     this._getPropsForComponentUpdate(nextProps),
  //     nextState
  //   ) || !styleEqual(this.props.style, nextProps.style)
  //     || !styleEqual(this.props.trackStyle, nextProps.trackStyle)
  //     || !styleEqual(this.props.thumbStyle, nextProps.thumbStyle)
  // }
  //
  // _getPropsForComponentUpdate(props) {
  //   var {
  //     value,
  //     onValueChange,
  //     onSlidingStart,
  //     onSlidingComplete,
  //     style,
  //     trackStyle,
  //     thumbStyle,
  //     ...otherProps,
  //   } = props
  //
  //   return otherProps
  // }

  setCurrentValue(obj, value) {
    obj.setValue(value)
  }

  setCurrentValueAnimated(obj, value) {
    const animationType = this.props.animationType
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS[animationType],
      this.props.animationConfig,
      {
        toValue: value,
      },
    )

    Animated[animationType](obj, animationConfig).start()
  }

  handleMoveShouldSetPanResponder = (/* e: Object, gestureState: Object */) => {
    // Should we become active when the user moves a touch over the thumb?
    return false
  }

  handlePanResponderGrant = (e: Object, gestureState: Object) => {
    if (this.props.multiSlider) {
      this._previousLeft = {
        left: this.getThumbLeft(this.getCurrentValue('left')),
        right: this.getThumbLeft(this.getCurrentValue('right')),
      }
    } else {
      this._previousLeft = this.getThumbLeft(this.getCurrentValue())
    }
    this.fireChangeEvent('onSlidingStart')
  }

  handleValueChange = (gestureState) => {
    if (this.props.multiSlider) {
      if (this.active.left && this.active.right) {
        if (Math.abs(gestureState.dx) < (Math.max(
          SENSITIVE,
          ((this.state.containerSize.width - this.state.thumbSize.width) / (
            this.props.maximumValue - this.props.minimumValue
          )) * (this.props.step || 0),
        ))) {
          return
        } else if (gestureState.dx < 0) {
          this.active.right = false
        } else if (gestureState.dx > 0) {
          this.active.left = false
        }
      }
      if (this.active.left) {
        const newValue = this.getValue(gestureState, 'left')
        this.setCurrentValue(this.state.value.left, newValue)
        if (newValue > this.getCurrentValue('right')) {
          this.setCurrentValue(this.state.value.right, newValue)
        }
      } else if (this.active.right) {
        const newValue = this.getValue(gestureState, 'right')
        this.setCurrentValue(this.state.value.right, newValue)
        if (newValue < this.getCurrentValue('left')) {
          this.setCurrentValue(this.state.value.left, newValue)
        }
      } else {
        const client = getBugsnagClient()
        if (client) {
          client.notify(
            new Error('handleStartShouldSetPanResponder does not work as expected.'),
            (report) => {
              report.metadata = {
                PanResponder: {
                  start: this._previousLeft,
                  value: {
                    left: this.getCurrentValue('left'),
                    right: this.getCurrentValue('right'),
                  },
                  current: {
                    container: this.state.containerSize,
                    thumb: this.state.thumbSize,
                    props: {
                      minimumValue: this.props.minimumValue,
                      maximumValue: this.props.maximumValue,
                      step: this.props.step,
                    },
                    dx: gestureState.dx,
                  },
                }
              }
            }
          )
          console.log('handleStartShouldSetPanResponder does not work as expected.', client)
        }
      }
    } else {
      this.setCurrentValue(this.state.value, this.getValue(gestureState))
    }
  }
  handlePanResponderMove = (e, gestureState) => {
    if (this.props.disabled) {
      return
    }

    this.handleValueChange(gestureState)
    this.fireChangeEvent('onValueChange')
  }

  handlePanResponderRequestEnd = () => {
    // Should we allow another component to take over this pan?
    return false
  }

  handlePanResponderEnd = (e, gestureState) => {
    if (!this.props.disabled) {
      this.handleValueChange(gestureState)
      this.fireChangeEvent('onSlidingComplete')
    }
    this.active.left = false
    this.active.right = false
  }

  thumbHitTest(e) {
    const nativeEvent = e.nativeEvent
    if (this.props.multiSlider) {
      let hit = false;
      ['left', 'right'].forEach((tag) => {
        const thumbTouchRect = this.getThumbTouchRect(tag)
        if (thumbTouchRect.containsPoint(
          nativeEvent.locationX,
          nativeEvent.locationY,
        )) {
          hit = true
          this.active[tag] = true
        }
      })
      return hit
    }

    const thumbTouchRect = this.getThumbTouchRect()
    return thumbTouchRect.containsPoint(
      nativeEvent.locationX,
      nativeEvent.locationY,
    )
  }

  handleStartShouldSetPanResponder = (e /* gestureState: Object */) => {
    // Should we become active when the user presses down on the thumb?
    return this.thumbHitTest(e)
  }

  fireChangeEvent(event) {
    if (this.props[event]) {
      if (this.props.multiSlider) {
        this.props[event](this.getCurrentValue('left'), this.getCurrentValue('right'))
      } else {
        this.props[event](this.getCurrentValue())
      }
    }
  }

  getTouchOverflowSize() {
    const state = this.state
    const props = this.props

    const size = {}
    if (state.allMeasured === true) {
      size.width = Math.max(
        0,
        props.thumbTouchSize.width - state.thumbSize.width,
      )
      size.height = Math.max(
        0,
        props.thumbTouchSize.height - state.containerSize.height,
      )
    }

    return size
  }

  getTouchOverflowStyle() {
    const { width, height } = this.getTouchOverflowSize()

    const touchOverflowStyle = {}
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2
      touchOverflowStyle.marginTop = verticalMargin
      touchOverflowStyle.marginBottom = verticalMargin

      const horizontalMargin = -width / 2
      touchOverflowStyle.marginLeft = horizontalMargin
      touchOverflowStyle.marginRight = horizontalMargin
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange'
      touchOverflowStyle.opacity = 0.5
    }

    return touchOverflowStyle
  }

  handleMeasure(name, x) {
    const { width, height } = x.nativeEvent.layout
    const size = { width, height }

    const storeName = `_${name}`
    const currentSize = this[storeName]
    if (
      currentSize &&
      width === currentSize.width &&
      height === currentSize.height
    ) {
      return
    }
    this[storeName] = size

    if (this._containerSize && this._trackSize && this._thumbSize) {
      this.setState({
        containerSize: this._containerSize,
        trackSize: this._trackSize,
        thumbSize: this._thumbSize,
        allMeasured: true,
      })
    }
  }

  measureContainer = (x) => {
    this.handleMeasure('containerSize', x)
  }

  measureTrack = (x) => {
    this.handleMeasure('trackSize', x)
  }

  measureThumb = (x) => {
    this.handleMeasure('thumbSize', x)
  }

  getValue(gestureState, tag = '') {
    const length = this.state.containerSize.width - this.state.thumbSize.width
    const thumbLeft = (tag === '' ? this._previousLeft : this._previousLeft[tag]) + gestureState.dx

    const ratio = thumbLeft / length

    if (this.props.step) {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          this.props.minimumValue +
            Math.round(
              ratio *
                (this.props.maximumValue - this.props.minimumValue) /
                this.props.step
            ) *
              this.props.step
        )
      )
    }
    return Math.max(
      this.props.minimumValue,
      Math.min(
        this.props.maximumValue,
        (ratio * (this.props.maximumValue - this.props.minimumValue)) +
          this.props.minimumValue,
      ),
    )
  }

  getCurrentValue(tag = '') {
    if (tag !== '') {
      return this.state.value[tag].__getValue()
    }
    return this.state.value.__getValue()
  }

  getRatio(value) {
    return (
      (value - this.props.minimumValue) /
      (this.props.maximumValue - this.props.minimumValue)
    )
  }

  getThumbLeft(value) {
    const ratio = this.getRatio(value)
    return (
      ratio * (this.state.containerSize.width - this.state.thumbSize.width)
    )
  }

  getThumbTouchRect(tag = '') {
    const state = this.state
    const props = this.props
    const touchOverflowSize = this.getTouchOverflowSize()

    return new Rect(
      touchOverflowSize.width / 2 +
        this.getThumbLeft(this.getCurrentValue(tag)) +
        (state.thumbSize.width - props.thumbTouchSize.width) / 2,
      touchOverflowSize.height / 2 +
        (state.containerSize.height - props.thumbTouchSize.height) / 2,
      props.thumbTouchSize.width,
      props.thumbTouchSize.height
    )
  }

  renderDebugThumbTouchRect(thumbLeft, tag = '') {
    const thumbTouchRect = this.getThumbTouchRect(tag)
    const positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height,
    }
    return <Animated.View style={positionStyle} pointerEvents="none" />
  }

  render() {
    const {
      multiSlider,
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      trackColor,
      trackHighlightColor,
      thumbTintColor,
      containerStyle,
      style,
      trackStyle,
      thumbStyle,
      thumbImage,
      debugTouchArea,
      ...other
    } = this.props

    const {
      value,
      containerSize,
      trackSize,
      thumbSize,
      allMeasured,
    } = this.state

    const mainStyles = containerStyle || styles
    const thumbLeft = multiSlider ? {
      left: value.left.interpolate({
        inputRange: [minimumValue, maximumValue],
        outputRange: [0, containerSize.width - thumbSize.width],
        // extrapolate: 'clamp',
      }),
      right: value.right.interpolate({
        inputRange: [minimumValue, maximumValue],
        outputRange: [0, containerSize.width - thumbSize.width],
        // extrapolate: 'clamp',
      }),
    } : value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - thumbSize.width],
      // extrapolate: 'clamp',
    })

    const valueVisibleStyle = {}
    if (!allMeasured) {
      valueVisibleStyle.opacity = 0
    }

    if (!multiSlider) {
      const minimumTrackStyle = {
        position: 'absolute',
        width: Animated.add(thumbLeft, thumbSize.width / 2),
        marginTop: -trackSize.height,
        backgroundColor: minimumTrackTintColor,
        ...valueVisibleStyle,
      }

      const touchOverflowStyle = this.getTouchOverflowStyle()
      return (
        <View
          {...other}
          style={[mainStyles.container, style]}
          onLayout={this.measureContainer}
        >
          <View
            style={[
              { backgroundColor: maximumTrackTintColor },
              mainStyles.track,
              trackStyle,
            ]}
            onLayout={this.measureTrack}
          />
          <Animated.View
            style={[mainStyles.track, trackStyle, minimumTrackStyle]}
          />
          <Animated.View
            onLayout={this.measureThumb}
            style={[
              { backgroundColor: thumbTintColor },
              mainStyles.thumb,
              thumbStyle,
              {
                transform: [
                  { translateX: thumbLeft },
                  { translateY: -(trackSize.height + thumbSize.height) / 2 },
                ],
                ...valueVisibleStyle,
              },
            ]}
          >{
            thumbImage && <Image source={thumbImage} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
          }</Animated.View>
          <View
            style={[styles.touchArea, touchOverflowStyle]}
            {...this.panResponder.panHandlers}
          >
            {debugTouchArea === true && this.renderDebugThumbTouchRect(thumbLeft)}
          </View>
        </View>
      )
    }

    const trackDefaultStyle = {
      position: 'absolute',
      width: Animated.add(thumbLeft.left, thumbSize.width / 2),
      marginTop: -trackSize.height,
      left: 0,
      backgroundColor: trackColor,
      ...valueVisibleStyle,
    }

    const trackHightlightStyle = {
      position: 'absolute',
      width: Animated.add(thumbLeft.right, thumbSize.width / 2),
      marginTop: -trackSize.height,
      backgroundColor: trackHighlightColor,
      ...valueVisibleStyle,
    }

    const touchOverflowStyle = this.getTouchOverflowStyle()
    return (
      <View
        {...other}
        style={[mainStyles.container, style]}
        onLayout={this.measureContainer}
      >
        <View
          style={[
            { backgroundColor: trackColor },
            mainStyles.track,
            trackStyle,
          ]}
          onLayout={this.measureTrack}
        />
        <Animated.View
          style={[mainStyles.track, trackStyle, trackHightlightStyle]}
        />
        <Animated.View
          style={[mainStyles.track, trackStyle, trackDefaultStyle]}
        />
        <Animated.View
          onLayout={this.measureThumb}
          style={[
            { backgroundColor: thumbTintColor },
            mainStyles.thumb,
            thumbStyle,
            {
              transform: [
                { translateX: thumbLeft.left },
                { translateY: -(trackSize.height + thumbSize.height) / 2 },
              ],
              ...valueVisibleStyle,
            },
          ]}
        >{
          thumbImage && <Image source={thumbImage} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
        }</Animated.View>
        <Animated.View
          onLayout={this.measureThumb}
          style={[
            { backgroundColor: thumbTintColor },
            mainStyles.thumb,
            thumbStyle,
            {
              transform: [
                { translateX: thumbLeft.right },
                { translateY: -(trackSize.height + thumbSize.height) / 2 },
              ],
              ...valueVisibleStyle,
            },
          ]}
        >{
          thumbImage && <Image source={thumbImage} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
        }</Animated.View>
        <View
          style={[styles.touchArea, touchOverflowStyle]}
          {...this.panResponder.panHandlers}
        >
          {debugTouchArea === true && this.renderDebugThumbTouchRect(thumbLeft.left, 'left')}
          {debugTouchArea === true && this.renderDebugThumbTouchRect(thumbLeft.right, 'right')}
        </View>
      </View>
    )
  }
}

Slider.propTypes = {
  /**
   * If true it is a multi-slider
   * Default value is false.
   */
  multiSlider: PropTypes.bool,

  /**
   * Initial value of the single slider. The value should be between minimumValue
   * and maximumValue, which default to 0 and 1 respectively.
   * Default value is 0.
   *
   * Only works when multiSlider is set to false
   *
   * *This is not a controlled component*, e.g. if you don't update
   * the value, the component won't be reset to its inital value.
   */
  value: PropTypes.number,

  /**
   * Initial value of the left thumb. The value should be between minimumValue
   * and maximumValue, which default to 0 and 1 respectively.
   * Default value is 0.
   *
   * Only works when multiSlider is set to true
   *
   * *This is not a controlled component*, e.g. if you don't update
   * the value, the component won't be reset to its inital value.
   */
  leftValue: PropTypes.number,

  /**
   * Initial value of the left thumb. The value should be between minimumValue
   * and maximumValue, which default to 0 and 1 respectively.
   * Default value is 0.
   *
   * Only works when multiSlider is set to true
   *
   * *This is not a controlled component*, e.g. if you don't update
   * the value, the component won't be reset to its inital value.
   */
  rightValue: PropTypes.number,

  /**
   * If true the user won't be able to move the slider.
   * Default value is false.
   */
  disabled: PropTypes.bool,

  /**
   * Initial minimum value of the slider. Default value is 0.
   */
  minimumValue: PropTypes.number,

  /**
   * Initial maximum value of the slider. Default value is 1.
   */
  maximumValue: PropTypes.number,

  /**
   * Step value of the slider. The value should be between 0 and
   * (maximumValue - minimumValue). Default value is 0.
   */
  step: PropTypes.number,

  /**
   * The color used for the track to the left of the button. Overrides the
   * default blue gradient image.
   *
   * Only works when multiSlider is set to false
   */
  minimumTrackTintColor: PropTypes.string,

  /**
   * The color used for the track to the right of the button. Overrides the
   * default blue gradient image.
   *
   * Only works when multiSlider is set to false
   */
  maximumTrackTintColor: PropTypes.string,

  /**
   * The color used for the highlight track. Overrides the
   * default blue gradient image.
   *
   * Only works when multiSlider is set to true
   */
  trackHighlightColor: PropTypes.string,

  /**
   * The color used for the normal track. Overrides the
   * default blue gradient image.
   *
   * Only works when multiSlider is set to true
   */
  trackColor: PropTypes.string,

  /**
   * The color used for the thumb.
   */
  thumbTintColor: PropTypes.string,

  /**
  * Sets an image for the thumb.
  */
  thumbImage: Image.propTypes.source,

  /**
   * The size of the touch area that allows moving the thumb.
   * The touch area has the same center has the visible thumb.
   * This allows to have a visually small thumb while still allowing the user
   * to move it easily.
   * The default is {width: 40, height: 40}.
   */
  thumbTouchSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),

  /**
   * Callback continuously called while the user is dragging the slider.
   */
  onValueChange: PropTypes.func,

  /**
   * Callback called when the user starts changing the value (e.g. when
   * the slider is pressed).
   */
  onSlidingStart: PropTypes.func,

  /**
   * Callback called when the user finishes changing the value (e.g. when
   * the slider is released).
   */
  onSlidingComplete: PropTypes.func,

  /**
   * The style applied to the slider container.
   */
  style: ViewPropTypes.style,

  /**
   * The style applied to the track.
   */
  trackStyle: ViewPropTypes.style,

  /**
   * The style applied to the thumb.
   */
  thumbStyle: ViewPropTypes.style,

  /**
   * Set this to true to visually see the thumb touch rect in green.
   */
  debugTouchArea: PropTypes.bool,

  /**
  * Set to true to animate values with default 'timing' animation type
  */
  animateTransitions: PropTypes.bool,

  /**
  * Custom Animation type. 'spring' or 'timing'.
  */
  animationType: PropTypes.oneOf(['spring', 'timing']),

  /**
  * Used to configure the animation parameters.  These are the same parameters in the Animated library.
  */
  animationConfig: PropTypes.object,
  containerStyle: ViewPropTypes.style,
}

Slider.defaultProps = {
  value: 0,
  multiSlider: false,
  leftValue: 0,
  rightValue: 0,
  minimumValue: 0,
  maximumValue: 1,
  step: 0,
  minimumTrackTintColor: '#3f3f3f',
  maximumTrackTintColor: '#b3b3b3',
  trackHighlightColor: '#3f3f3f',
  trackColor: '#b3b3b3',
  thumbTintColor: 'red',
  thumbTouchSize: { width: 40, height: 40 },
  debugTouchArea: false,
  animationType: 'timing',
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    top: 22,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
})
