import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ReactPlayer as Player } from '../src/components/player';
import { UnmuteButton as Unmute } from '../src/components/unmute';
import { FowardButton as Foward } from '../src/components/foward';
import { RewindButton as Rewind } from '../src/components/rewind';

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

describe("Buttons", () => {
  it("Should render correctly", () => {
    const tree = renderer.create(<><Unmute /><Foward /><Rewind /></>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Unmute label correctly", () => {
    const props = { label: "Ativar som" };
    const tree = Enzyme.shallow(<Unmute {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Foward label correctly", () => {
    const props = { label: "Avançar" };
    const tree = Enzyme.shallow(<Foward {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Rewind label correctly", () => {
    const props = { label: "Retroceder" };
    const tree = Enzyme.shallow(<Rewind {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render Unmute onclick function correctly", () => {
    const props = { onClick: () => true };
    const tree = Enzyme.shallow(<Unmute {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render Foward onclick function correctly", () => {
    const props = { onClick: () => true };
    const tree = Enzyme.shallow(<Foward {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render Rewind onclick function correctly", () => {
    const props = { onClick: () => true };
    const tree = Enzyme.shallow(<Rewind {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
