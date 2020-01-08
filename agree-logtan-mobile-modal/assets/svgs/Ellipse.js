import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import PropTypes from 'prop-types';

const SvgEllipse = props => {
  let color = '#FFFFFF';
  switch (props.type) {
    case 'ACCEPTED':
      color = '#3BA064';
      break;
    case 'APPROVED':
      color = '#3BA064';
      break;
    case 'PRESCREENING_PASSED':
      color = '#3BA064';
      break;
    case 'ONPROCESS':
      color = '#FAB005';
      break;
    case 'PRESCREENING':
      color = '#FAB005';
      break;
    case 'SUBMISSION':
      color = '#FAB005';
      break;
    case 'CONFIRMATION':
      color = '#FAB005';
      break;
    case 'VALIDATION':
      color = '#FAB005';
      break;
    case 'PRESCREENING_DENIED':
      color = '#AF1254';
      break;
    case 'FUND':
      color = '#FAB005';
      break;
    case 'REFUND':
      color = '#FAB005';
      break;
    case 'REJECTED':
      color = '#AF1254';
      break;
    case 'PENDING':
      color = '#E0E0E0';
      break;
    case 'PAID':
      color = '#5C94BC';
      break;
    default:
  }
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none" {...props}>
      <Circle cx={5} cy={5} r={5} fill={color} />
    </Svg>
  );
};

export default SvgEllipse;

SvgEllipse.propTypes = {
  type: PropTypes.string
};

SvgEllipse.defaultProps = {
  type: '#E0E0E0'
};
