import React from "react";
import Svg, { Path } from "react-native-svg";
import { COLOR_BASE_PRIMARY_MAIN } from "../../app/styles";

const SvgCheckList = props => (
  <Svg {...props} width="18" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M16.645 1.14a1.077 1.077 0 0 1 .215 1.505l-9 12a1.071 1.071 0 0 1-.784.428L7 15.075 16.645 1.14zm0 0a1.074 1.074 0 0 0-.379-.181m.379.18l-.379-.18m0 0a1.076 1.076 0 0 0-.419-.023m.42.023l-.42-.023m0 0c-.14.02-.274.067-.395.14m.395-.14l-.395.14m0 0a1.07 1.07 0 0 0-.312.28m.312-.28l-.312.28m0 0L6.883 12.363 2.76 8.24l-.053.052M15.14 1.355L6.588 14.993c.13.054.27.082.412.082V15a1 1 0 0 1-.707-.293M2.707 8.293a.996.996 0 0 0-1.414 0m1.414 0l4.131 4.131-4.13-4.13zm-1.414 0L1.24 8.24l.053.053zm0 0a1 1 0 0 0 0 1.414l5 5m0 0l-.053.053.053-.053z"
      fill={COLOR_BASE_PRIMARY_MAIN}
      stroke="#5C94BC"
      stroke-width=".15"
    />
  </Svg>
);

export default SvgCheckList;
