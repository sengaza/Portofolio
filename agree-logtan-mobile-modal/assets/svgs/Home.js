import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_GREY } from '../../app/styles';
import { scale, verticalScale } from '../../app/utils/scaling';

/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgHome = props => {
  const color = props.active ? COLOR_BASE_PRIMARY_MAIN : COLOR_GREY;
  return (
    <Svg height={scale(32)} width={verticalScale(32)} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M16 7l-.589.487L7 16.807v6.907C7 24.424 7.576 25 8.286 25h3.857c.71 0 1.286-.576 1.286-1.286v-5.143c0-.71.576-1.285 1.285-1.285h2.572c.71 0 1.285.576 1.285 1.285v5.143c0 .71.576 1.286 1.286 1.286h3.857c.71 0 1.286-.576 1.286-1.286v-6.907l-8.411-9.32L16 7z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SvgHome;
