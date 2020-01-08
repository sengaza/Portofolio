import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgCloseBlack = props => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7 14 1.4z"
      fill="#424242"
    />
  </Svg>
);

export default SvgCloseBlack;
