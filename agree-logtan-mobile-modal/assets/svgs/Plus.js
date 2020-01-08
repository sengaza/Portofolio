import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLOR_WHITE, COLOR_FONT_DISABLED } from '../../app/styles';

const SvgPlus = props => {
  const color = props.disabled ? COLOR_FONT_DISABLED : COLOR_WHITE;
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 7.143H8.857V2H7.143v5.143H2v1.714h5.143V14h1.714V8.857H14V7.143z"
        fill={color}
      />
    </Svg>
  );
};
export default SvgPlus;
