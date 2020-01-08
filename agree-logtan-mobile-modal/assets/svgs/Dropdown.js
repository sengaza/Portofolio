import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgDropdown = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path fillRule="evenodd" clipRule="evenodd" d="M12 14L6 10L18 10L12 14Z" fill="#666" />
  </Svg>
);

export default SvgDropdown;
