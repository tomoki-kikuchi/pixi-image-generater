import React from 'react';
import styled from 'styled-components';
import { ImageViewer } from './ImageViewer';

interface Props {}
interface State {
  text: string;
  imgUrl: string;
}
export class Viewer extends React.Component<Props, State> {
  private _viewer: ImageViewer;

  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
      imgUrl: '#',
    };
    this.changeText = this.changeText.bind(this);
    this.changeRadio = this.changeRadio.bind(this);
    this.getImage = this.getImage.bind(this);
    this._viewer = new ImageViewer();
  }

  componentDidMount(): void {
    this._viewer.mount('app');
    this._viewer.setImage('/assets/images/cat1_smile.png');
  }

  getImage() {
    const imgUrl = this._viewer.getImageUrl();
    this.setState({ imgUrl });
  }

  changeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ text: event.target.value });
    this._viewer.setText(event.target.value);
  }

  changeRadio(event: React.MouseEvent<HTMLInputElement>) {
    //@ts-ignore
    this.setState({ text: event.target.value });
    //@ts-ignore
    this._viewer.setImage(event.target.value);
  }

  render() {
    return (
      <Container>
        <div id="app" />
        <InputContainer>
          <Title>テキスト</Title>
          <InputText defaultValue={this.state.text} onChange={this.changeText} />

          <ThumbnailList>
            <ThumbnailListItem>
              <label>
                <input type="radio" name="image" value="/assets/images/cat1_smile.png" onClick={this.changeRadio} />
                <Thumbnail src={'/assets/images/cat1_smile.png'} />
              </label>
            </ThumbnailListItem>
            <ThumbnailListItem>
              <label>
                <input type="radio" name="image" value="/assets/images/cat2_angry.png" onClick={this.changeRadio} />
                <Thumbnail src={'/assets/images/cat2_angry.png'} />
              </label>
            </ThumbnailListItem>
            <ThumbnailListItem>
              <label>
                <input type="radio" name="image" value="/assets/images/cat3_cry.png" onClick={this.changeRadio} />
                <Thumbnail src={'/assets/images/cat3_cry.png'} />
              </label>
            </ThumbnailListItem>
            <ThumbnailListItem>
              <label>
                <input type="radio" name="image" value="/assets/images/cat4_laugh.png" onClick={this.changeRadio} />
                <Thumbnail src={'/assets/images/cat4_laugh.png'} />
              </label>
            </ThumbnailListItem>
          </ThumbnailList>

          <Button href={this.state.imgUrl} onClick={this.getImage} download="test.png">
            ダウンロード
          </Button>
        </InputContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
`;

const InputText = styled.textarea`
  border: solid 1px #666;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  //padding: 10px;
  width: 600px;
  margin: 0 auto;
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
  text-decoration: none;
`;

const Title = styled.p`
  text-align: left;
  margin: 0 0 10px 0;
  font-weight: bold;
`;

const ThumbnailList = styled.ul`
  padding: 0;
  display: flex;
  justify-content: space-around;
`;
const ThumbnailListItem = styled.li`
  list-style: none;
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
  > label {
    display: flex;
    align-items: center;
  }
`;

const Thumbnail = styled.img`
  width: 100px;
`;
