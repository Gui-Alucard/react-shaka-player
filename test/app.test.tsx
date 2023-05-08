// @ts-ignore
import { Player as ShakaPlayer } from 'shaka-player/dist/shaka-player.ui';
import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ReactPlayer as Player } from '../src/components/player';
import { ButtonUnmute as Unmute } from '../src/components/unmute';
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

  let videoElement: HTMLVideoElement;
  // let myShakaPlayer = ShakaPlayer as jest.Mocked<typeof ShakaPlayer>;

  const buttonRef = { current: {} as HTMLButtonElement };

  mockedReact.useRef.mockReturnValueOnce(buttonRef);

  // player = new myShakaPlayer(videoRef.current);

  it("Should renders Button correctly", () => {
    const props = { videoElement: videoElement };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Button ref correctly", () => {
    const props = { videoElement: videoElement };
    const tree = Enzyme.shallow(<Button {...props} buttonRef={buttonRef} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Button OnClick correctly", () => {
    const props = { props: { onClick: jest.fn() } };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Button Foward correctly", () => {
    const props = { videoElement: videoElement, props: { label: "foward" } };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("Should renders Button Rewind correctly", () => {
    const props = { videoElement: videoElement, props: { label: "rewind" } };
    const tree = Enzyme.shallow(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });
});