/**
 * @providesModule config-styles
 */

import { gray, black, white, slate, yellow, magenta } from './colors';

export const COLOR_BASE_PRIMARY_DARK = slate.slate_70;
export const COLOR_BASE_PRIMARY_MAIN = slate.slate_50;
export const COLOR_BASE_PRIMARY_LIGHT = slate.slate_40;

export const COLOR_PROGRESS_YELLOW = yellow.yellow_50;

export const COLOR_BASE_SECONDARY_DARK = '#ba000d';
export const COLOR_BASE_SECONDARY_MAIN = '#f44336';
export const COLOR_BASE_SECONDARY_LIGHT = '#ff7961';

export const COLOR_BASE_TERTIARY_DARK = '#666666';
export const COLOR_BASE_TERTIARY_MAIN = '#bdbdbd';
export const COLOR_BASE_TERTIARY_LIGHT = '#e4e7eb';

export const COLOR_FONT_PRIMARY_DARK = '#8c8c8c';
export const COLOR_FONT_PRIMARY_LIGHT = '#bdbdbd';

export const COLOR_FONT_SECONDARY_DARK = '#00E676';
export const COLOR_FONT_SECONDARY_LIGHT = '#00E676';

export const COLOR_EVENT_SUCCESS = '#58cd85';
export const COLOR_EVENT_ERROR = magenta.magenta_70;
export const COLOR_EVENT_INFORMATION = '#47acf7';
export const COLOR_EVENT_WARNING = '#f8e71c';
export const COLOR_EVENT_INACTIVE = gray.gray_30;
export const COLOR_GREY_90 = '#424242';
export const COLOR_GREY_60 = '#9E9E9E';
export const COLOR_GREY_40 = '#E0E0E0';
export const COLOR_ICON_DISABLED = '#BDBDBD';
export const COLOR_FONT_DISABLED = COLOR_GREY_60;
export const COLOR_EVENT_DISABLED = COLOR_GREY_40;

export const COLOR_WHITE = white;
export const COLOR_WHITE_OPACITY50 = 'rgba(255,255,255,0.5)';
export const COLOR_GREY = gray.gray_50;
export const COLOR_GREY_DARK = gray.gray_70;
export const COLOR_BLACK = black;
export const COLOR_BLACK_OPACITY50 = 'rgba(0,0,0,0.5)';
export const COLOR_TRANSPARENT = 'rgba(0,0,0,0)';
export const COLOR_PAGE_BACKGROUND = '#FAFAFA';

const FONT_PRIMARY_REGULAR = 'Montserrat-Regular';
const FONT_PRIMARY_BOLD = 'Montserrat-Bold';

const FONT_SIZE_HEADLINE1 = 60;
const FONT_SIZE_HEADLINE2 = 48;
const FONT_SIZE_HEADLINE3 = 34;
const FONT_SIZE_HEADLINE4 = 24;
const FONT_SIZE_HEADLINE5 = 20;
const FONT_SIZE_HEADLINE6 = 20;
const FONT_SIZE_SUBTITLE1 = 16;
const FONT_SIZE_PLACEHOLDER1 = 16;
const FONT_SIZE_BODY1 = 16;
const FONT_SIZE_BODY2 = 14;
const FONT_SIZE_BODY3 = 12;
const FONT_SIZE_BUTTON = 14;
const FONT_SIZE_LABEL1 = 14;
const FONT_SIZE_LABEL2 = 12;
const FONT_SIZE_OVERLINE1 = 10;
const FONT_SIZE_OVERLINE2 = 12;

export const FONT_HEADLINE1 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_HEADLINE1,
  lineHeight: 23
};

export const FONT_HEADLINE2 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_HEADLINE2,
  lineHeight: 59
};

export const FONT_HEADLINE3 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_HEADLINE3,
  lineHeight: 41
};

export const FONT_HEADLINE4 = {
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: FONT_SIZE_HEADLINE4,
  lineHeight: 29
};

export const FONT_HEADLINE5 = {
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: FONT_SIZE_HEADLINE5,
  lineHeight: 25
};

export const FONT_HEADLINE6 = {
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: FONT_SIZE_HEADLINE6,
  lineHeight: 36
};

export const FONT_SUBTITLE1 = {
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: FONT_SIZE_SUBTITLE1,
  lineHeight: 20
};

export const FONT_PLACEHOLDER1 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_PLACEHOLDER1,
  lineHeight: 20
};

export const FONT_BODY1 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_BODY1,
  lineHeight: 18
};

export const FONT_BODY2 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_BODY2,
  lineHeight: 18
};

export const FONT_BODY3 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_BODY3,
  lineHeight: 14
};

export const FONT_BUTTON = {
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: FONT_SIZE_BUTTON,
  lineHeight: 18
};

export const FONT_LABEL1 = {
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: FONT_SIZE_LABEL1,
  lineHeight: 16
};

export const FONT_LABEL2 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_LABEL2,
  lineHeight: 14
};

export const FONT_OVERLINE1 = {
  fontFamily: FONT_PRIMARY_REGULAR,
  fontSize: FONT_SIZE_OVERLINE1,
  lineHeight: 12
};

export const FONT_OVERLINE2 = {
  fontFamily: FONT_PRIMARY_BOLD,
  fontSize: FONT_SIZE_OVERLINE2,
  lineHeight: 12
};
