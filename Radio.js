import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native'

class Radio extends Component {
  state = {
    hoverAnimated: new Animated.Value(0),
    radioInsideAnimated: new Animated.Value(0),
    outlineAnimated: new Animated.Value(0),
    isActiveRadio: false,
  }

  animatedRadioState = (type = 'in') => {
    Animated.parallel([
      Animated.timing(this.state.radioInsideAnimated, {
        toValue: type === 'in' ? 1 : 0,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        duration: 100,
      }),
      Animated.timing(this.state.outlineAnimated, {
        toValue: type === 'in' ? 1 : 0,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        duration: 240,
      }),
    ]).start()
  }

  animatedHover = (type = 'in') => {
    Animated.timing(this.state.hoverAnimated, {
      toValue: type === 'in' ? 1 : 0,
      easing:
        type === 'in'
          ? Easing.bezier(0.0, 0.0, 0.2, 1)
          : Easing.bezier(0.4, 0.0, 1, 1),
      duration: type === 'in' ? 100 : 50,
    }).start()
  }

  onPress = () => {
    this.setState(
      ({ isActiveRadio }) => ({ isActiveRadio: !isActiveRadio }),
      () => {
        if (this.state.isActiveRadio) {
          this.animatedRadioState('in')
        } else {
          this.animatedRadioState('out')
        }
      }
    )
  }

  onPressIn = () => {
    this.animatedHover('in')
  }

  onPressOut = () => {
    this.animatedHover('out')
  }

  render() {
    const { hoverAnimated, radioInsideAnimated, outlineAnimated } = this.state
    const radioBodyScale = radioInsideAnimated.interpolate({
      inputRange: [0, 0.75, 1],
      outputRange: [0, 18, 13],
    })
    const outlineColor = outlineAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(153,153,153)', 'rgb(86,187,170)'],
    })

    const radioOutlineBorderStyle = { borderColor: outlineColor }
    const radioBodyStyle = { width: radioBodyScale, height: radioBodyScale }
    const radioHoverStyle = {
      transform: [{ scaleX: hoverAnimated }, { scaleY: hoverAnimated }],
    }
    return (
      <TouchableHighlight
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        activeOpacity={1}
        underlayColor="#99999900"
        style={styles.radioToucharea}>
        <View style={styles.radioContainer}>
          <Animated.View style={[styles.radioOutline, radioOutlineBorderStyle]}>
            <Animated.View style={[styles.radioBody, radioBodyStyle]} />
          </Animated.View>
          <Animated.View style={[styles.radioHoverAnimated, radioHoverStyle]} />
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  radioToucharea: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioContainer: {
    width: 24,
    height: 24,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOutline: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#56bbaa',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  radioBody: {
    width: 13,
    height: 13,
    backgroundColor: '#56bbaa',
    borderRadius: 50,
  },
  radioHoverAnimated: {
    backgroundColor: '#eee',
    zIndex: 1,
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 50,
  },
})

export default Radio
