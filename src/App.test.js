import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const wrapper = shallow(<App />);
  it('should contain h1 with the text `Welcome to React`', () => {
    // expect(wrapper.find('ul').children().length).toBe(3);
    expect(wrapper.find('h1').text()).toBe('Welcome to React');
  });
});
