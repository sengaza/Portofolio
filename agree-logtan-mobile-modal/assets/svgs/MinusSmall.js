import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const SvgMinusSmall = props => {
  const { removeDisabled } = props;
  let circleColor = '#5C94BC';
  let lineColor = '#fff';

  if (removeDisabled === true) {
    circleColor = '#E0E0E0';
    lineColor = '#9E9E9E';
  }
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={12} fill={circleColor} />
      <Path fill={lineColor} d="M6 11h12v2.3H6z" />
    </Svg>
  );
};
export default SvgMinusSmall;
