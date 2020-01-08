import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_WHITE } from '../../app/styles';

const SvgTick = props => {
  const color = props.main ? COLOR_BASE_PRIMARY_MAIN : COLOR_WHITE;
  return (
    <Svg width={13} height={10} viewBox="0 0 13 10" fill="none" {...props}>
      <Path
        d="M10.913 2L5.22 8.104 2.333 5.46"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SvgTick;
