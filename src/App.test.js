import React from 'react';
import ReactDOM from 'react-dom';
import App, { Link } from './App';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<App /> shallow rendering', () => {
  const wrapper = shallow(<App />);
  it('should match one of the css selectors', () => {
    // Various ways to target an element vis css selector
    // Target via element
    expect(wrapper.find('h1').text()).toBe('Welcome to React');
    // Target via class
    expect(wrapper.find('.App-intro').text()).toContain('Hello World');
    // Target via id
    expect(wrapper.find('#WelcomeGreeting').text()).toBe('Welcome to React');
    // Target via attribute
    expect(wrapper.find('[alt="logo"]').exists()).toBe(true);
    // Target via combo of element and attribute
    expect(wrapper.find('img[alt="logo"]').exists()).toEqual(true);
    // Target via child selector
    expect(wrapper.find('.App > .App-intro').text()).toEqual('Hello World');
    // Target via adjacent selector
    expect(wrapper.find('img + h1').text()).toContain('Welcome');
    // Target via general sibling selector
    expect(wrapper.find('img ~ .App-title').text()).toContain('Welcome');
    // Target via descendant selector
    expect(wrapper.find('.App .App-intro').text()).toEqual('Hello World');
    // Target via component prop
    expect(wrapper.find('[className="App-intro"]').text()).toBe('Hello World');
    // Target via object that matches properties of an element
    expect(wrapper.find({ alt: 'logo' }).exists()).toBe(true);
  });
  it('matches the snapshot', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('on button click changes p text', () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find('button');
    expect(wrapper.find('.button-state').text()).toBe('No!');
    button.simulate('click');
    expect(wrapper.find('.button-state').text()).toBe('Yes!');
  });
  it('on input change, title changes text', () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find('input');
    expect(wrapper.find('h2').text()).toBe('');
    input.simulate('change', { currentTarget: { value: 'Jason' } });
    expect(wrapper.find('h2').text()).toBe('Jason');
  });
});

describe('<App /> mount rendering', () => {
  const wrapper = mount(<App />);
  it('should match one of the css selectors', () => {
    // Various ways to target an element vis css selector
    // Target via element
    expect(wrapper.find('h1').text()).toBe('Welcome to React');
    // wrapper.unmount();
  });
  it('matches the snapshot', () => {
    const tree = mount(<App />);
    expect(toJson(tree)).toMatchSnapshot();
    // tree.unmount();
  });
});

describe('<Link />', () => {
  it('link component accepts address prop', () => {
    const wrapper = shallow(<Link address="www.google.com" />);
    expect(wrapper.instance().props.address).toBe('www.google.com');
  });

  it('a tag node renders href correctly', () => {
    const wrapper = shallow(<Link address="www.google.com" />);
    expect(wrapper.props().href).toBe('www.google.com');
  });

  it('returns null with true hide prop', () => {
    const wrapper = shallow(<Link address="www.google.com" />);
    expect(wrapper.find('a').length).toBe(1);
    wrapper.setProps({ hide: true });
    expect(wrapper.get(0)).toBeNull();
  });
});
