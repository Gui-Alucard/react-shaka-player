<h2 align="center">
  <a href="https://www.sbt.com.br/" title="SBT Sistema Brasileiro de Televisão">
    <img
      src="https://www.sbt.com.br/assets/images/logo-sbt.webp"
      style="display: block; margin-left: auto; margin-right: auto; width: 80px"
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

## Instalação

Para a instalação ser permitida, crie um arquivo `.npmrc` na raiz do projeto.

📝 Arquivo .npmrc:

```properties
//npm.pkg.github.com/:_authToken=SEU_TOKEN_PESSOAL
@sbt-lab:registry=https://npm.pkg.github.com
```

Em seguida, use o gerenciador de pacotes [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/) ou via package.json para instalar o `sbt-videos-web-player`.

🖥️ Instalação a partir de linha de comando:

```bash
yarn add @sbt-lab/sbt-videos-web-player@x.x.x

ou

npm install @sbt-lab/sbt-videos-web-player@x.x.x
```

📝 Instalação via package.json

```json
"@sbt-lab/sbt-videos-web-player": "x.x.x"
```

## Modo de uso básico

```js
// import do css. Agora temos a estilização customizada do ui.css
// NextJs tem esse import de css no _app
import React, { useState, useEffect } from 'react';
import '@sbt-lab/sbt-videos-web-player/dist/ui.css';
import { ReactPlayer } from '@sbt-lab/sbt-videos-web-player';

function App() {
  const [mainPlayer, setMainPlayer] = useState(undefined);
  const [adsRequest, setAdsRequest] = useState(undefined);
  const [adBlock, setAdBlock] = useState(false);

  useEffect(() => {
    if (window.google) {
      const ADS_CLASS = new google.ima.AdsRequest();
      // Acesse o link para mais infos sobre o IMA SDK
      // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest?hl=pt-br
      setAdsRequest(ADS_CLASS);
      setAdBlock(false);
      return;
    }
    return setAdBlock(true);
  }, []);

  return !adsRequest || adBlock ? (
    <Loader />
  ) : (
    <ReactPlayer adsRequest={adsRequest} adsTagUrl={'https://vid.ads.com/vmap'} superConfig="STREAMING" onLoad={(player) => setMainPlayer(player)} src={'https://yourvideo.mpd'} />
  );
}
```

## Modo de uso avançado

```js
// import do css. Agora temos a estilização customizada do ui.css
// NextJs tem esse import de css no _app
import React, { useState, useEffect, useCallback } from 'react';
import '@sbt-lab/sbt-videos-web-player/dist/ui.css';
import { ReactPlayer, UnmuteButton } from '@sbt-lab/sbt-videos-web-player';

function App() {
  const [mainPlayer, setMainPlayer] = useState(undefined);
  const [adsRequest, setAdsRequest] = useState(undefined);
  const [adBlock, setAdBlock] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true);
  const [adsControls, setAdsControls] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (window.google) {
      const ADS_CLASS = new google.ima.AdsRequest();
      // Acesse o link para mais infos sobre o IMA SDK
      // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest?hl=pt-br
      setAdsRequest(ADS_CLASS);
      setAdBlock(false);
      return;
    }
    return setAdBlock(true);
  }, []);

    useEffect(() => {
    let time
    if (!adsRequest) {
      setIsLoading(true)
      time = setInterval(() => {
        setIsLoading(false)
      }, 4000)
      return () => clearInterval(time)
    }
    return setIsLoading(false)
  }, [adsRequest])

  const handleShakaControls = () => {
    const element = document.getElementsByClassName('shaka-controls-container');
    const controls = element?.item(0)?.hasAttribute('shown');
    const adsControls = element?.item(0)?.hasAttribute('ad-active');
    setShowControls(controls);
    setAdsControls(adsControls);
  };

  const handleUnmute = useCallback(() => {
    setMuted(false);
    if (mainPlayer.videoElement) {
      mainPlayer.videoElement.muted = false;
    }
  }, [mainPlayer]);

  const handleFowardRewind = (label) => {
    if (mainPlayer.videoElement && label === 'foward') {
      mainPlayer.videoElement.currentTime = Math.floor(mainPlayer.videoElement.currentTime) + 10;
    } else if (mainPlayer.videoElement && label === 'rewind') {
      mainPlayer.videoElement.currentTime = Math.floor(mainPlayer.videoElement.currentTime) - 10;
    }
  };

  return isLoading ? (
    <PageLoader />
  ) : (
    <div className="App">
      <div className="App-main">
        {!adsRequest || adBlock ? (
          <CardContainer>
            <CardTitleError>ops!</CardTitleError>
            <CardDescriptionError>Desative seu bloqueador de anúncios para assistir aos canais.</CardDescriptionError>
            <ButtonReload onClick={() => window.location.reload()}>
              <Icon mt={6} color="neutral.n400" variant="reload" width={24} height={24} />
              <span>tentar novamente</span>
            </ButtonReload>
          </CardContainer>
        ) : (
          <ReactPlayer
            adsRequest={adsRequest}
            adsTagUrl={'https://vid.ads.com/vast'}
            superConfig="VOD"
            src={'https://yourvideo.mpd'}
            onTimeUpdate={handleShakaControls}
            startTime={stopped_at ? stopped_at : 0}
            onLoad={(player) => setMainPlayer(player)}
            onFoward={!adsControls && showControls ? () => handleFowardRewind('foward') : null}
            onRewind={!adsControls && showControls ? () => handleFowardRewind('rewind') : null}
            unmute={muted ? { p: 'ativar som', onUnmute: () => handleUnmute() } : null}
            autoPlay={true}
            muted={true}
          >
            <ChildrenToIncludeIntoFullscreen>
          </ReactPlayer>
        )}
      </div>
    </div>
  )
}
```

### Modo de uso complexo - visite [@sbt-lab/sbt-videos-frontend][]

[@sbt-lab/sbt-videos-frontend]: https://github.com/sbt-lab/sbt-videos-frontend

---

## Suporte matrix do pacote

|   Library    | DASH  |  HLS  | WORKING |
| :----------: | :---: | :---: | :-----: |
|    React     | **Y** | **Y** |    -    |
| React Native |   -   |   -   |  **Y**  |

---

## Props

Essas são as props principais do componente:

| Props           | Optional | Description                                                                                                                                                                                                                                        | Type                               |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| src             | Não      | MPD ou HLS para reprodução.                                                                                                                                                                                                                        | string                             |
| adsRequest      | Sim      | Responsável por receber AdsRequest do `Google IMA SDK`. Referência: [Google IMA SDK][].                                                                                                                                                            | {google.ima.AdsRequest} => func    |
| adsTagUrl       | Sim      | Responsável por receber o assetUri com o conteúdo do Advertisement a ser reproduzido pelo adsRequest.                                                                                                                                              | string                             |
| className       | Sim      | string do nome de classe de sobreposição da interface do usuário.                                                                                                                                                                                  | string                             |
| children        | Sim      | Qualquer item ou componente - comumente usado para controles externos aparecerem durante o fullscreen.                                                                                                                                             | any                                |
| startTime       | Sim      | Define onde o conteúdo deve começar a ser reproduzido.                                                                                                                                                                                             | number                             |
| label           | Sim      | Define o espaço reservado para botões personalizados.                                                                                                                                                                                              | boolean                            |
| autoplay        | Sim      | Define se o conteúdo iniciará automaticamente.                                                                                                                                                                                                     | boolean                            |
| muted           | Sim      | Define se o conteúdo iniciará com ou sem audio.                                                                                                                                                                                                    | boolean                            |
| superConfig     | Sim      | As configurações especiais para Streaming ou VOD. Iremos adicionar mais `superConfig` em breve.                                                                                                                                                    | string ("STREAMING" / "VOD")       |
| config          | Sim      | Altera as configurações do Shaka Player. Referência: [shaka.extern.PlayerConfiguration][]. Esta configuração substituirá `superConfig`.                                                                                                            | object: superConfig.player         |
| uiConfig        | Sim      | Altera as definições de configuração dos elementos da interface do usuário. Referência: [shaka.extern.UIConfiguration][]. Esta configuração substituirá `superConfig`.                                                                             | object: superConfig.ui             |
| onLoad          | Sim      | Captura `Shaka.Player`, `Shaka.ui.Overlay` e `HTMLVideoElement` para o uso manual ou melhoria da configuração. Ver: [PlayerRefs][].                                                                                                                | object: PlayerRefs => func         |
| onClick         | Sim      | Captura clique em `Events` para os botões Ativar som, Avançar e Retroceder. Referência: [OnClick Events][].                                                                                                                                        | Event => func                      |
| onBuffering     | Sim      | Captura o status `onBuffering` durante a reprodução.                                                                                                                                                                                               | bool => func                       |
| onPlayerError   | Sim      | Captura `error` durante a reprodução. Referência: [Shaka.Player.ErrorEvent][].                                                                                                                                                                     | {Shaka.extern.Error} => func       |
| onStatsChanged  | Sim      | Captura `stats` durante a reprodução do vídeo, incluindo currentTime (posição de busca atual) e currentEndTime (duração do vídeo se VOD) (em segundos) do elemento do reprodutor de mídia [`IStats`]. Referência: [IStats & Shaka.extern.Stats][]. | {Shaka.extern.Stats} => func       |
| onTimeUpdate    | Sim      | Captura `time` durante a reprodução do vídeo. Normalmente usado para controlar o fade dos controles shaka. Referência: [MDN Events][].                                                                                                             | event => func                      |
| onUiInteraction | Sim      | Captura `UI Interactions Events` quando reproduzindo, pausado, fechando, procurando (seek), terminando o vídeo. Referência: [MDN Events][].                                                                                                        | event => func                      |
| onFoward        | Sim      | Método responsável por mostrar o botão de avançar 10 segundo o conteúdo.                                                                                                                                                                           | event => func                      |
| onRewind        | Sim      | Método responsável por mostrar o botão de retroceder 10 segundo o conteúdo.                                                                                                                                                                        | event => func                      |
| unmute          | Sim      | Método responsável por mostrar o botão de desmutar o conteúdo.                                                                                                                                                                                     | object: {p: string onUnmute: func} |

[shaka.extern.playerconfiguration]: https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.PlayerConfiguration
[shaka.extern.uiconfiguration]: https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.UIConfiguration
[playerRefs]: https://github.com/mkhuda/react-shaka-player/blob/c4459e31027a08165007d03c9a08ff8a3e5de3dc/src/types/index.ts#L3
[shaka.player.errorevent]: https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:ErrorEvent
[istats & shaka.extern.stats]: https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.Stats
[Google IMA SDK]: https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest?hl=pt-br
[OnClick Events]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
[MDN Events]: https://developer.mozilla.org/pt-BR/docs/Web/API/Event

<br>

---

## Documentação e Links importantes

- [Shaka Repository](https://github.com/shaka-project/shaka-player)
- [Shaka Demo](https://shaka-player-demo.appspot.com)
- [Shaka API documentation](https://shaka-player-demo.appspot.com/docs/api/index.html)
- [Shaka Tutorials](https://shaka-player-demo.appspot.com/docs/api/tutorial-welcome.html)
- [Shaka CSS - ClassNames](https://github.com/shaka-project/shaka-player/tree/main/ui/less)
- [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/)
- Problemas e Bugs [Issues](https://github.com/sbt-lab/sbt-videos-web-player/issues)

---

## Contribuição

Pull requests são bem vindos. Para mudanças mais complexas, por gentileza abra uma issue primeiro para discutirmos a melhor forma de realizar a alteração.

_Por gentileza, garanta que as mudanças sejam acompanhadas de **testes** apropriadamente._

---

## Styling

Se for necessária a mudança direta de uma estilização, ou o não uso das props `superConfig`, pode-se conferir todas as classes modificáveis de forma resumida no arquivo
[CSS-Classes](https://github.com/sbt-lab/sbt-videos-web-player/blob/main/CSS-Classes). Basta copiar o conteúdo e colar no .css do projeto a ser usado.

**Observação:** _Pretendemos comentar cada classe para fácil identificação de suas responsabilidades!_

---

## Licença

[Licença SBT](https://github.com/sbt-lab/sbt-videos-web-player/blob/ef38c40458e7f84856236c2384b3ec1431e47f00/LICENSE)
