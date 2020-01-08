import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_GREY } from '../../app/styles';
import { scale, verticalScale } from '../../app/utils/scaling';

const SvgInbox = props => {
  const color = props.active ? COLOR_BASE_PRIMARY_MAIN : COLOR_GREY;
  return (
    <Svg width={verticalScale(32)} height={scale(32)} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M25.47 7.926h0L7.53 7.925c-.89 0-1.605.732-1.605 1.633v12.884c0 .9.72 1.633 1.609 1.633h17.948c.881 0 1.593-.725 1.593-1.615V9.558c0-.9-.716-1.632-1.605-1.632zm-8.44 9.394h0l8.145-5.893v10.72H7.825v-10.72l8.154 5.893a.894.894 0 0 0 .536.178.835.835 0 0 0 .514-.178zM8.807 9.854h15.384l-7.692 5.54-7.692-5.54z"
        fill={color}
        stroke="#BDBDBD"
        strokeWidth={0.15}
      />
    </Svg>
  );
};

export default SvgInbox;
