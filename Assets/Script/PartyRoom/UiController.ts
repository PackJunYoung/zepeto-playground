import { Button, Text } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ScreenShotController from './ScreenShotController';
import CharacterPlayer from '../Common/CharacterPlayer';

export default class UiController extends ZepetoScriptBehaviour {

    public static instance: UiController;

    public resultMessage: Text;
    public saveScreenShotBtn: Button;
    public shareScreenShotBtn: Button;
    public feedScreenShotBtn: Button;
    public playGestureBtn: Button;
    public stopGestureBtn: Button;

    private characterPlayer: CharacterPlayer;

    Awake() {
        UiController.instance = this;
    }

    Start() {    
        ScreenShotController.instance.SetCallback((result: string) => {
            this.resultMessage.text = result;
        });
        this.saveScreenShotBtn.onClick.AddListener(() => {
            ScreenShotController.instance.SaveScreenShot();
        });
        this.shareScreenShotBtn.onClick.AddListener(() => {
            ScreenShotController.instance.ShareScreenShot();
        });
        this.feedScreenShotBtn.onClick.AddListener(() => {
            ScreenShotController.instance.FeedScreenShot();
        });
        this.playGestureBtn.onClick.AddListener(() => {
            this.characterPlayer.PlayRandomGesture();
            // this.characterPlayer.PlayGestureWithId("ZW_POSE_040");
        });
        this.stopGestureBtn.onClick.AddListener(() => {
            this.characterPlayer.StopGesture();
        });
    }

    public SetCharacterPlayer(characterPlayer: CharacterPlayer) {
        this.characterPlayer = characterPlayer;
    }

}