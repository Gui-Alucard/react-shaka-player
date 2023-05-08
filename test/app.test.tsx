import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ReactPlayer as Player } from '../src/components/player';
import { Button as Button } from '../src/components/button';

Enzyme.configure({ adapter: new Adapter() });

describe("Player", () => {
  it("Should render correctly", () => {
    const tree = renderer.create(<Player />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should renders source[manifest] string correctly", () => {
    const props = { src: "this is sample source" };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render className container correctly", () => {
    const props = { className: "sbt-theme" };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render playerClassName container correctly", () => {
    const props = { playerClassName: "player-class-name" };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render container className and playerClassName container correctly", () => {
    const props = {
      className: "sbt-theme",
      playerClassName: "player-class-name",
    };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("Should render correctly", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Button Unmute correctly", () => {
    const props = { label: "unmute" };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Button Foward correctly", () => {
    const props = { label: "foward" };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Button Rewind correctly", () => {
    const props = { label: "rewind" };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render the onclick function correctly", () => {
    const props = { onClick: () => true };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
