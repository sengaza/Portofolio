import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgCheck = props => {
  const color = props.color || "#1E2025";
  return(
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M10.643 13.357l4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657a1 1 0 0 1-1.414 0L7.107 12.65a1 1 0 1 1 1.414-1.414l2.122 2.12z"
      fill={color}
    />
  </Svg>
);
}

export default SvgCheck;
