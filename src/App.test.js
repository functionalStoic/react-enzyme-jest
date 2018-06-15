import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const wrapper = shallow(<App />);
  it('should contain match one of the css selectors', () => {
    // Various ways to target an element vis css selector
    // Target via element
    expect(wrapper.find('h1').text()).toBe('Welcome to React');
    // Target via class
    expect(wrapper.find('.App-intro').text()).toContain('To get started');
    // Target via id
    expect(wrapper.find('#TitleComponent').text()).toBe('<Title />');
    // Target via attribute
    expect(wrapper.find('[alt="logo"]').exists()).toBe(true);
    // Target via combo of element and attribute
    expect(wrapper.find('img[alt="logo"]').exists()).toEqual(true);
    // Target via child selector
    expect(wrapper.find('.App > .App-intro').text()).toContain('To get');
    // Target via adjacent selector
    expect(wrapper.find('img + h1').text()).toContain('Welcome');
    // Target via general sibling selector
    expect(wrapper.find('img ~ .App-title').text()).toContain('Welcome');
    // Target via descendant selector
    expect(wrapper.find('.App .App-intro').text()).toContain('To get');
    // Target via component prop
    expect(wrapper.find('[text="Some title"]').text()).toBe('<Title />');
    // Target via object that matches properties of an element
    expect(wrapper.find({ alt: 'logo' }).exists()).toBe(true);
  });
});
