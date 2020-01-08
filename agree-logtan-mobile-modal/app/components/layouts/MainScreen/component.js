import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import StatusBar from '../../elements/StatusBar';
import Loading from '../../elements/Loading';
import Toast from '../../elements/Toast';
import errors from '../../../utils/errors';

export default class Component extends React.Component {
  state = {
    visible: false
  };

  componentDidMount() {
    errors.subscribe(this.notification);
  }

  notification = (errorHeader = '', message = '') => {
    const errorBody = {
      errorHeader,
      message
    };

    setTimeout(
      () =>
        this.setState({
          visible: true,
          errorBody
        }),
      0
    );
    setTimeout(
      () =>
        this.setState({
          visible: false
        }),
      5000
    );
  };

  render() {
    const { children, loading, error, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <StatusBar />
        {loading && <Loading />}
        <Toast
          visible={this.state.visible}
          position={50}
          shadow={false}
          animation
          hideOnPress
          delay={500}
          errorBody={this.state.errorBody}
        />
        {!error && children}
      </View>
    );
  }
}

Component.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.any]).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

Component.defaultProps = {
  loading: false,
  error: false,
  style: {}
};
