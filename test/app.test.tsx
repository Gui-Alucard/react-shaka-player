import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ReactShakaPlayer as Player } from '../src/components/player';

afterEach(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

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

  it("Should renders the player muted correctly", () => {
    const props = { muted: true };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders unmute button correctly", () => {
    const props = { unmute: { p: 'ativar som', onUnmute: jest.fn() } };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders foward button correctly", () => {
    const props = { onFoward: jest.fn() };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders rewind button correctly", () => {
    const props = { onRewind: jest.fn() };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render className container correctly", () => {
    const props = { className: "default-theme" };
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
      className: "default-theme",
      playerClassName: "player-class-name",
    };
    const tree = Enzyme.shallow(<Player {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
