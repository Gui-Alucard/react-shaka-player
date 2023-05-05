// @ts-ignore
import { Player as ShakaPlayer } from 'shaka-player/dist/shaka-player.ui';
import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ReactPlayer as Player } from '../src/components/player';
import { ButtonUnmute as Unmute } from '../src/components/unmute';
import { ButtonFoward as Foward } from '../src/components/foward';
import { ButtonRewind as Rewind } from '../src/components/rewind';

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

describe("Unmute Button", () => {
  it("Should render correctly", () => {
    const tree = renderer.create(<Unmute />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should renders label string correctly", () => {
    const props = { label: "Ativar som" };
    const tree = Enzyme.shallow(<Unmute {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should render the onclick function correctly", () => {
    const props = { onClick: () => true };
    const tree = Enzyme.shallow(<Unmute {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

jest.mock('shaka-player/dist/shaka-player.ui');

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

describe("Foward And Rewind Button", () => {
  const mockedReact = React as jest.Mocked<typeof React>;

  let player: ShakaPlayer;
  let myShakaPlayer = ShakaPlayer as jest.Mocked<typeof ShakaPlayer>;

  const videoRef = { current: { currentTime: 0 } as HTMLMediaElement };

  mockedReact.useRef.mockReturnValueOnce(videoRef);

  player = new myShakaPlayer(videoRef.current);

  it("Should renders Foward player prop string correctly", () => {
    const props = { player: player };
    const tree = Enzyme.shallow(<Foward {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Foward label string correctly", () => {
    const props = { props: { label: "foward" } };
    const tree = Enzyme.shallow(<Foward {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Foward onFoward prop correctly", () => {
    const props = { props: { onFoward: () => jest.fn() } };
    const tree = Enzyme.shallow(<Foward {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Rewind label string correctly", () => {
    const props = { props: { label: "rewind" } };
    const tree = Enzyme.shallow(<Rewind {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Rewind player prop string correctly", () => {
    const props = { player: player };
    const tree = Enzyme.shallow(<Rewind {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Rewind onRewind prop correctly", () => {
    const props = { props: { onRewind: () => jest.fn() } };
    const tree = Enzyme.shallow(<Rewind {...props} />);
    expect(tree).toMatchSnapshot();
  });
});