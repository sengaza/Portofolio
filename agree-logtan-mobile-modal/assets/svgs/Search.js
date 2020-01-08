import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgSearch = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 10.5C17 14.0904 14.0892 17 10.5 17C6.91082 17 4 14.0904 4 10.5C4 6.90964 6.91082 4 10.5 4C14.0892 4 17 6.90964 17 10.5Z"
      stroke="#424242"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M20 20L15 15" stroke="#424242" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default SvgSearch;
