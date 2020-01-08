import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { COLOR_GREY_40 } from '../../../styles';
import { noop } from '../../../utils';

export default class BasicTitle extends React.Component {
  render() {
    const {
      image,
      label,
      editable,
      errorMessage,
      customContainer,
      customError,
      customLabel,
      customTextInput,
      onPressTextInput,
      onPressShowPass,
      onPressHiddenPass,
      keyboardType,
      counter
    } = this.props;
    return (
      <View style={[styles.container, customContainer]}>
        <Text style={[styles.labelText, customLabel]}>{label}</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={onPressTextInput}>
          <TextInput
            style={[editable ? styles.textInput : styles.textInputInactive, customTextInput]}
            underlineColorAndroid={COLOR_GREY_40}
            placeholderTextColor={COLOR_GREY_40}
            pointerEvents="none"
            keyboardType={keyboardType}
            {...this.props}
          />
          {counter ? (
            <Text style={styles.counterText}>
              {counter}/{this.props.maxLength}
            </Text>
          ) : (
            <Text />
          )}
          <TouchableOpacity
            style={styles.showPass}
            onPressIn={onPressShowPass}
            onPressOut={onPressHiddenPass}
          >
            {image !== null && <Image source={image} resizeMode="contain" style={styles.image} />}
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={[styles.errorText, customError]}>{errorMessage}</Text>
      </View>
    );
  }
}

BasicTitle.propTypes = {
  customContainer: PropTypes.number,
  customError: PropTypes.object,
  customLabel: PropTypes.object,
  customTextInput: PropTypes.object,
  onPressTextInput: PropTypes.func,
  label: PropTypes.string,
  editable: PropTypes.bool,
  errorMessage: PropTypes.string,
  image: PropTypes.number,
  onPressShowPass: PropTypes.func,
  onPressHiddenPass: PropTypes.func,
  keyboardType: PropTypes.string
};

BasicTitle.defaultProps = {
  customContainer: null,
  customError: null,
  customLabel: null,
  customTextInput: null,
  onPressTextInput: noop,
  label: 'Field Title',
  editable: true,
  errorMessage: null,
  image: null,
  onPressShowPass: noop,
  onPressHiddenPass: noop,
  keyboardType: 'default'
};
