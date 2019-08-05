import * as PIXI from 'pixi.js';

const BG_COLOR = 0xffffff;

export class ImageViewer {
  private _app: PIXI.Application;
  private _appText: PIXI.Text;
  private _appImageSprite?: PIXI.Sprite;
  private _container: PIXI.Container;

  constructor(width: number = 400, height: number = 300) {
    this._app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: BG_COLOR,
      resolution: window.devicePixelRatio || 1,
      preserveDrawingBuffer: true,
    });
    this._container = new PIXI.Container();
    this._container.x = this._app.screen.width / 2;
    this._container.y = this._app.screen.height / 2;
    this._container.pivot.x = this._container.width / 2;
    this._container.pivot.y = this._container.height / 2;

    this._app.stage.addChild(this._container);
    this._appText = new PIXI.Text('');
    this._appText.anchor.set(0.5);
    this._appText.y = 80;
    this._container.addChild(this._appText);
  }

  mount(id: string) {
    //@ts-ignore
    document.getElementById(id).appendChild(this._app.view);

    this.setShirtImage();
  }

  setText(text: string) {
    this._appText.text = text;
    this._container.addChild(this._appText);
  }

  setShirtImage() {
    const texture = PIXI.Texture.from('/assets/images/tshirt.svg');
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.scale.set(0.2);
    this._container.addChild(sprite);
  }

  setImage(url: string) {
    const texture = PIXI.Texture.from(url);
    this._appImageSprite = new PIXI.Sprite(texture);
    this._appImageSprite.anchor.set(0.5);
    this._appImageSprite.scale.set(0.2);
    this._container.addChild(this._appImageSprite);
  }
  getImageUrl(): string {
    return this._app.view.toDataURL('image/png');
  }
}
