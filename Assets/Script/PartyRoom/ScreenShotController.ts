import { Camera, RenderTexture, WaitForEndOfFrame } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldContent } from 'ZEPETO.World'

enum ScreenShotType {
    Save,
    Share,
    Feed
}

export default class ScreenShotController extends ZepetoScriptBehaviour {

    public static instance: ScreenShotController;

    public renderTexture: RenderTexture;

    private camera: Camera;
    private callback: (result: string) => void;

    Awake() {
        ScreenShotController.instance = this;
    }

    public SetCamera(camera: Camera) {
        this.camera = camera;
    }

    public SetCallback(callback: (result: string) => void) {
        this.callback = callback;
    }

    public SaveScreenShot() {
        this.callback("waiting...");
        this.StartCoroutine(this.RenderTargetTexture(ScreenShotType.Save));
    }

    public ShareScreenShot() {
        this.callback("waiting...");
        this.StartCoroutine(this.RenderTargetTexture(ScreenShotType.Share));
    }

    public FeedScreenShot() {
        this.callback("waiting...");
        this.StartCoroutine(this.RenderTargetTexture(ScreenShotType.Feed));
    }

    private *RenderTargetTexture(type: ScreenShotType) {
        this.camera.targetTexture = this.renderTexture;
        yield new WaitForEndOfFrame();
        this.camera.Render();
        this.camera.targetTexture = null;

        if (type == ScreenShotType.Save) {
            this.SaveToCameraRoll();
        } else if (type == ScreenShotType.Share) {
            this.Share();
        } else if (type == ScreenShotType.Feed) {
            this.CreateFeed();
        }
    }

    private SaveToCameraRoll() {
        ZepetoWorldContent.SaveToCameraRoll(this.renderTexture, (result: boolean) => {
            this.callback(result.toString());
        });
    }

    private Share() {
        ZepetoWorldContent.Share(this.renderTexture, (result: boolean) => {
            this.callback(result.toString());
        });
    }

    private CreateFeed() {
        ZepetoWorldContent.CreateFeed(this.renderTexture, "[content]", (result: boolean) => {
            this.callback(result.toString());
        });
    }

}