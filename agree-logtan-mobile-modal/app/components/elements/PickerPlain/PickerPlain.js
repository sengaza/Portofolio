import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import styles from './PickerPlain.styles';
import { COLOR_BASE_TERTIARY_MAIN, COLOR_GREY_40 } from '../../../styles';
import { scale, verticalScale } from '../../../utils/scaling';
import SvgDropdown from '../../../../assets/svgs/Dropdown';
import I18n from '../../../i18n';

export default class PickerPlain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  _dropdownShow = () => {
    this.setState({ open: true });
  };

  _dropdownHide = () => {
    this.setState({ open: false });
  };

  renderRow(option) {
    return (
      <TouchableOpacity style={{ height: 35, paddingLeft: 18, justifyContent: 'center' }}>
        <Text style={styles.textStyle2}>{option.name}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View />;
  }

  render() {
    const {
      options,
      placeholder,
      selected,
      customPickerPlainStyle,
      customTextStyle,
      customDropdownStyle,
      customContainer
    } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { open } = this.state;
    return (
      <View style={customContainer}>
        <ModalDropdown
          {...this.props}
          options={options}
          style={[styles.PickerPlainContainer, customPickerPlainStyle]}
          dropdownStyle={[
            {
              borderColor: COLOR_BASE_TERTIARY_MAIN,
              borderWidth: 1,
              height: (35 + StyleSheet.hairlineWidth) * (options.length < 6 ? options.length : 5),
              marginBottom: 5,
              marginLeft: scale(-14),
              marginTop: verticalScale(10),
              width: scale(295)
            },
            customDropdownStyle
          ]}
          dropdownTextStyle={styles.textStyle2}
          dropdownTextHighlightStyle={styles.textStyle}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          onDropdownWillShow={this._dropdownShow}
          onDropdownWillHide={this._dropdownHide}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: COLOR_GREY_40,
              paddingBottom: 5
            }}
          >
            {selected < 0 ? (
              <Text style={[styles.placeholderStyle, customTextStyle]}>{placeholder}</Text>
            ) : (
              <Text style={[styles.textStyle, customTextStyle]}>{options[selected].name}</Text>
            )}
            {/* <Image
              source={open ? IMAGES.dropdownClose : IMAGES.dropdownOpen}
              style={styles.image}
              resizeMode="contain"
            /> */}
            <View style={styles.image}>
              <SvgDropdown />
            </View>
          </View>
        </ModalDropdown>
      </View>
    );
  }
}

PickerPlain.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.number,
  placeholder: PropTypes.string,
  customPickerPlainStyle: PropTypes.number,
  customDropdownStyle: PropTypes.number,
  customTextStyle: PropTypes.number,
  customContainer: PropTypes.object
};

PickerPlain.defaultProps = {
  options: [{ name: 'Option1', id: '12' }, { name: 'Option2', id: '11' }],
  selected: 12,
  placeholder: I18n.t('chooseItem'),
  customPickerPlainStyle: null,
  customTextStyle: null,
  customDropdownStyle: null,
  customContainer: null
};
