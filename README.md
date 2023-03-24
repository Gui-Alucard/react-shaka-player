<h2 align="center">
  <a href="https://www.sbt.com.br/" title="SBT Sistema Brasileiro de Televisão">
    <img
      src="https://raw.githubusercontent.com/sbt-lab/sbt-videos-web-player/main/public/assets/sbt-logo.png?token=GHSAT0AAAAAACAQFC7OLRD5B2TWETKEKADGZA5VEVA"
      style="display: block; margin-left: auto; margin-right: auto; width: 100px"
    />
  </a>
  <b>Sbt Videos Web Player</b>
</h2>

`Sbt Videos Web Player` é uma biblioteca privada em TypeScript para mídias adaptativas. Ela reproduz formatos de mídias adaptativas (como [DASH][] e [HLS][]) no browser, sem usar plugins ou Flash. Ao
invés, o `Sbt Videos Web Player` usa a biblioteca JavaScript de código-aberto [Shaka Player][].

Nosso principal objetivo é facilitar, na medida do possível, a transmissão de bitrate videos e audios adaptativos usando as melhores propriedades e métodos que a biblioteca [Shaka Player][] oferece.
Nos esforçamos para manter a biblioteca leve, simples e livre de outras dependencias. Tudo o que você precisa para construir seu código já está na fonte.

![npm](https://img.shields.io/npm/v/shaka-player?label=shaka-player)

[shaka player]: https://shaka-player-demo.appspot.com/demo/
[dash]: https://dashif.org/
[hls]: https://developer.apple.com/streaming/

## Installation

Use the package manager [npm](https://www.npmjs.com/) or via package.json to install `sbt-videos-web-player`.

🖥️ Install from the command line:

```bash
npm install @sbt-lab/sbt-videos-web-player@1.0.0
```

📝 Install via package.json

```json
"@sbt-lab/sbt-videos-web-player": "1.0.0"
```

## Usage

```javascript
// import the css. Now we have custom ui.css
// NextJs has this css import at the _app
import '@sbt-lab/sbt-videos-web-player/dist/ui.css';
import { ReactPlayer } from '@sbt-lab/sbt-videos-web-player';

function App() {
  return <ReactPlayer autoPlay={true} srcManifest={'https://yourvideohere.mpd'} />;
}
```

## Manual Handle Usage

```javascript
import '@sbt-lab/sbt-videos-web-player/dist/ui.css';
import { ReactPlayer } from '@sbt-lab/sbt-videos-web-player';

function App() {
  let [mainPlayer, setMainPlayer] = useState({});

  useEffect(() => {
    const { player, videoElement } = mainPlayer;

    if (player) {
      async function play() {
        await player.load('https://yourvideomaster.mpd');
        videoElement.play();
      }
      play();
    }
  }, [mainPlayer]);

  return (
    <div className="App">
      <div className="App-main">
        <ReactPlayer playerClassName="player-class-name" onLoad={(player) => setMainPlayer(player)} />
      </div>
    </div>
  );
}
```

---

## Library support matrix

|   Library    | DASH  |  HLS  | WORKING |
| :----------: | :---: | :---: | :-----: |
|    React     | **Y** | **Y** |    -    |
| React Native |   -   |   -   |  **Y**  |
|   Angular    |   -   |   -   |    -    |
|     Vue      |   -   |   -   |    -    |
|    Svelt     |   -   |   -   |    -    |

---

## Props

This is main props for the components:

| Props          | Optional | Description                                                                                                                                                                                                                       | Type                         |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| src            | No       | MPD or HLS to play                                                                                                                                                                                                                | string                       |
| className      | Yes      | string of ui overlay classname                                                                                                                                                                                                    | string                       |
| autoPlay       | Yes      | as it described                                                                                                                                                                                                                   | boolean                      |
| superConfig    | Yes      | The special configs for Streaming or VOD. Will add more `superConfig` soon.                                                                                                                                                       | string ("STREAMING" / "VOD") |
| config         | Yes      | Changes configuration settings on Shaka Player. Reference: [shaka.extern.PlayerConfiguration][]. This config will override `superConfig`.                                                                                         | object                       |
| uiConfig       | Yes      | Changes configuration settings for UI elements. Reference: [shaka.extern.UIConfiguration][]. This config will override `superConfig`.                                                                                             | object                       |
| onLoad         | Yes      | Catch `Shaka.Player`, `Shaka.ui.Overlay` and `HTMLVideoElement` for manual usages or improvement of configuration. see: [PlayerRefs][]                                                                                            | object: PlayerRefs => func   |
| onPlay         | Yes      | Catch when media is playing                                                                                                                                                                                                       | func                         |
| onPlause       | Yes      | Catch when media is paused                                                                                                                                                                                                        | func                         |
| onEnded        | Yes      | Catch when video is end                                                                                                                                                                                                           | func                         |
| onBuffering    | Yes      | Catch `onBuffering` status when playing                                                                                                                                                                                           | bool => func                 |
| onPlayerError  | Yes      | Catch `error` when playing. Reference: [Shaka.Player.ErrorEvent][]                                                                                                                                                                | {Shaka.extern.Error} => func |
| onStatsChanged | Yes      | Catch `stats` when playing video, including currentTime (current seek position), and currentEndTime (length of video duration if VOD) (in seconds) of media player element [`IStats`]. Reference: [IStats & Shaka.extern.Stats][] | {Shaka.extern.Stats} => func |

[shaka.extern.playerconfiguration]: https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.PlayerConfiguration
[shaka.extern.uiconfiguration]: https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.UIConfiguration
[playerrefs]: https://github.com/mkhuda/react-shaka-player/blob/c4459e31027a08165007d03c9a08ff8a3e5de3dc/src/types/index.ts#L3
[shaka.player.errorevent]: https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:ErrorEvent
[istats & shaka.extern.stats]: https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.Stats

<br>

---

## Documentation & Important Links

- [GitHub Repository](https://github.com/sbt-lab/sbt-videos-web-player)
- [Shaka Demo](https://shaka-player-demo.appspot.com)
- [Shaka API documentation](https://shaka-player-demo.appspot.com/docs/api/index.html)
- [Shaka Tutorials](https://shaka-player-demo.appspot.com/docs/api/tutorial-welcome.html)
- Problemas e Bugs [Issues](https://github.com/sbt-lab/sbt-videos-web-player/issues)

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

---

## License

[SBT](https://raw.githubusercontent.com/sbt-lab/sbt-videos-web-player/main/LICENSE?token=GHSAT0AAAAAACAQFC7PLM566LM44VBXB7BOZA5VFEQ)
