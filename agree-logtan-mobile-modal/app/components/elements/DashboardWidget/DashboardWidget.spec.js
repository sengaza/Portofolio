import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import LinearGradient from 'react-native-linear-gradient';
import DashboardWidget from './DashboardWidget';
import Images from '../../../configs/images';
import I18n from '../../../i18n';

jest.mock('./DashboardWidget.styles.js', () => 'styles');

const configs = {
  props: {
    navigation: {
      goBack: jest.fn(),
      navigate: jest.fn()
    },
    navigate: jest.fn(),
    buttonAction: jest.fn(),
    cardHeader: {
      title: I18n.t('totalFarmer'),
      value: 20,
      icon: Images.farmer
    },
    displayingData: {
      assignedToLandCount: 15,
      inprogressLoanCount: 10,
      approvedLoanCount: 2
    },
    gradient: {
      start: { x: 0.0, y: 0 },
      end: { x: 0.2, y: 1.0 },
      location: [0, 0.6, 1],
      colors: ['#4c669f', '#3b5998', '#192f6a']
    }
  }
};

describe('DashboardWidgetComponent rendered properly', () => {
  it('Should have matched snapshot', () => {
    const renderedComponent = renderer.create(<DashboardWidget {...configs.props} />).toJSON();
    expect(renderedComponent).toBeTruthy();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Should render childs with content', () => {
    const wrapper = shallow(<DashboardWidget {...configs.props} />);
    const checkingElements = ['.header-title', '.header-button', '.header-icon', LinearGradient];

    checkingElements.map(element => {
      const currentElement = wrapper.find(element);
      expect(currentElement).toHaveLength(1);
      return expect(currentElement.tap(thisElement => thisElement)).toBeDefined();
    });
  });
});

describe('DashboardWidgetComponent methods works properly', () => {
  beforeEach(() => {
    this.props = {
      navigation: {
        goBack: jest.fn(),
        navigate: jest.fn()
      },
      navigate: jest.fn(),
      buttonAction: jest.fn(),
      cardHeader: {
        title: I18n.t('totalFarmer'),
        value: 20,
        icon: Images.farmer
      },
      displayingData: {
        assignedToLandCount: 15,
        inprogressLoanCount: 10,
        approvedLoanCount: 2
      },
      gradient: {
        start: { x: 0.0, y: 0 },
        end: { x: 0.2, y: 1.0 },
        location: [0, 0.6, 1],
        colors: ['#4c669f', '#3b5998', '#192f6a']
      }
    };
  });

  afterEach(() => {
    this.props = null;
    jest.clearAllMocks();
  });

  it('Should navigate when clicked', async () => {
    const wrapper = shallow(<DashboardWidget {...this.props} />);
    wrapper.find('.header-button').simulate('click');
  });
});
