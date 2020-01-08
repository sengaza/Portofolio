import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_GREY } from '../../app/styles';
import { scale, verticalScale } from '../../app/utils/scaling';

const SvgSetting = props => {
  const color = props.active ? COLOR_BASE_PRIMARY_MAIN : COLOR_GREY;
  return (
    <Svg width={verticalScale(32)} height={scale(32)} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M14.61 8l-.104.524-.4 1.918a6.72 6.72 0 0 0-1.74.988l-1.953-.645-.525-.161-.272.463-1.344 2.22-.272.464.398.344 1.51 1.27c-.054.332-.124.66-.124 1.01 0 .349.07.677.125 1.01l-1.51 1.27-.399.343.272.463 1.344 2.221.272.464.525-.162 1.952-.645a6.722 6.722 0 0 0 1.742.988l.4 1.918.104.524h3.777l.106-.524.398-1.918a6.721 6.721 0 0 0 1.741-.988l1.953.645.525.162.273-.464 1.343-2.22.273-.464-.4-.344-1.51-1.27c.056-.332.125-.66.125-1.01 0-.348-.07-.677-.125-1.01l1.51-1.27.4-.343-.273-.463-1.343-2.221-.273-.463-.525.16-1.953.646a6.719 6.719 0 0 0-1.74-.988l-.4-1.918L18.389 8h-3.777z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M18.928 16.395c0 1.323-1.088 2.398-2.428 2.398-1.34 0-2.429-1.075-2.429-2.398 0-1.324 1.088-2.399 2.429-2.399 1.34 0 2.428 1.075 2.428 2.399z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SvgSetting;
