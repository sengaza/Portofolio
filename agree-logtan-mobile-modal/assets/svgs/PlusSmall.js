import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const SvgPlusSmall = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={12} fill="#5C94BC" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 11.143h-5.143V6h-1.714v5.143H6v1.714h5.143V18h1.714v-5.143H18v-1.714z"
      fill="#fff"
    />
  </Svg>
);

export default SvgPlusSmall;
