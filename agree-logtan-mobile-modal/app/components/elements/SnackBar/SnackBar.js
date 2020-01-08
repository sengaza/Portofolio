import React, { Component } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { noop } from '../../../utils';
import styles from './styles';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_WHITE } from '../../../styles';
import SvgWrong from '../../../../assets/svgs/Wrong';
import SvgClose from '../../../../assets/svgs/Close';
// import Alert from '../../../../assets/svgs/AlertWhite';
// import Close from '../../../../assets/svgs/CloseWhite';

const easingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1)
};

const durationValues = {
  entry: 225,
  exit: 195
};

class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(0),
      hideDistance: 9999
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.state.translateValue.setValue(1);
    } else {
      this.state.translateValue.setValue(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      Animated.timing(this.state.translateValue, {
        duration: durationValues.entry,
        toValue: 1,
        easing: easingValues.entry
      }).start();
      if (nextProps.autoHidingTime) {
        const hideFunc = this.hideSnackbar.bind(this);
        setTimeout(hideFunc, nextProps.autoHidingTime);
      }
    } else if (!nextProps.visible && this.props.visible) {
      this.hideSnackbar();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.visible !== this.props.visible || nextState.hideDistance !== this.state.hideDistance) {
      if (nextProps.visible) {
        this.props.distanceCallback(nextState.hideDistance + this.props.bottom);
      } else {
        this.props.distanceCallback(this.props.bottom);
      }
    }
  }

  /**
   * Starting te animation to hide the snack bar.
   * @return {null} No return.
   */
  hideSnackbar() {
    Animated.timing(this.state.translateValue, {
      duration: durationValues.exit,
      toValue: 0,
      easing: easingValues.exit
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.limitContainer,
          {
            height: this.state.translateValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, this.state.hideDistance]
            }),
            backgroundColor: this.props.backgroundColor
          },
          this.props.position === 'bottom' ? { bottom: this.props.bottom } : { top: this.props.bottom }
        ]}
      >
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: this.props.backgroundColor,
              left: this.props.left,
              right: this.props.right
            },
            this.props.position === 'bottom'
              ? {
                  bottom: this.state.translateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.state.hideDistance * -1, 0]
                  })
                }
              : {
                  top: this.state.translateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.state.hideDistance * -1, 0]
                  })
                }
          ]}
          onLayout={event => {
            this.setState({ hideDistance: event.nativeEvent.layout.height });
          }}
        >
          <View style={styles.imageWarning}>
            <SvgWrong />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.titleMsg, { color: this.props.messageColor }]}>
              {this.props.titleMessage}
            </Text>
            <Text style={[styles.textMsg, { color: this.props.messageColor }]}>{this.props.textMessage}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onPressClose}
            style={styles.imageCloseContainer}
          >
            <View style={styles.imageClose}>
              <SvgClose />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

SnackBar.propTypes = {
  visible: PropTypes.bool,
  autoHidingTime: PropTypes.number,
  distanceCallback: PropTypes.func,
  bottom: PropTypes.number,
  backgroundColor: PropTypes.string,
  position: PropTypes.string,
  left: PropTypes.number,
  right: PropTypes.number,
  messageColor: PropTypes.string,
  titleMessage: PropTypes.string,
  textMessage: PropTypes.string,
  onPressClose: PropTypes.func
};

SnackBar.defaultProps = {
  titleMessage: 'Title',
  textMessage: 'Text',
  onPressClose: noop,
  visible: false,
  messageColor: COLOR_WHITE,
  backgroundColor: COLOR_BASE_PRIMARY_MAIN,
  distanceCallback: noop,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'bottom',
  autoHidingTime: 0 // Default value will not auto hide the snack bar as the old version.
};

export default SnackBar;
