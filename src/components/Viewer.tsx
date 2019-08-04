import React from 'react';
import styled from 'styled-components';
import * as PIXI from 'pixi.js';

interface Props {}
interface State {
  text: string;
  imgUrl: string;
}
export class Viewer extends React.Component<Props, State> {
  private app: PIXI.Application;
  private appText: PIXI.Text;

  constructor(props: Props) {
    super(props);
    this.state = {
      text: 'first text',
      imgUrl: '#',
    };
    this.app = new PIXI.Application({
      width: 400,
      height: 300,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      preserveDrawingBuffer: true,
    });
    this.appText = new PIXI.Text(this.state.text);

    this.changeText = this.changeText.bind(this);
    this.getImage = this.getImage.bind(this);

    // @ts-ignore
    // window.WebFontConfig = {
    //   google: {
    //     families: ['Snippet', 'Arvo:700italic', 'Podkova:700'],
    //   },
    //
    //   active() {
    //     init();
    //   },
    // };
  }

  componentDidMount(): void {
    //@ts-ignore
    document.getElementById('app').appendChild(this.app.view);

    const container = new PIXI.Container();
    this.app.stage.addChild(container);
    container.x = this.app.screen.width / 2;
    container.y = this.app.screen.height / 2;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    const texture = PIXI.Texture.from('/assets/images/cat1_smile.png');
    this.appText = new PIXI.Text(this.state.text);
    const cat = new PIXI.Sprite(texture);
    cat.anchor.set(0.5);
    cat.scale.set(0.5);
    this.appText.anchor.set(0.5);
    // text.text = 'bbbbbbbbb';
    container.addChild(cat);
    container.addChild(this.appText);
  }

  getImage() {
    const imgUrl = this.app.view.toDataURL('image/png');
    console.log(imgUrl);
    this.setState({ imgUrl });
  }

  changeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ text: event.target.value });
    this.appText.text = event.target.value;
  }

  render() {
    return (
      <Container>
        <div id="app" />
        <InputContainer>
          <InputText defaultValue={this.state.text} onChange={this.changeText} />
          <Button href="#" onClick={this.getImage} download="test.png">
            ダウンロード
          </Button>
        </InputContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  //justify-content: space-between;
`;

const InputText = styled.textarea`
  border: solid 1px #666;
  width: 300px;
  padding: 10px;
`;

const InputContainer = styled.div`
  padding: 10px;
`;

const Button = styled.a`
  display: block;
  margin-top: 20px;
  background-color: #3b79ff;
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
