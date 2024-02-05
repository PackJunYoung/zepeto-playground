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
    public interactionBtn: Button;

    private characterPlayer: CharacterPlayer;
    private furnitureAction: () => void;

    Awake() {
        UiController.instance = this;
    }

    Start() {    
        this.interactionBtn.interactable = false;

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
        this.interactionBtn.onClick.AddListener(() => {
            if (this.furnitureAction != null) {
                this.furnitureAction();
            }
        });
    }

    public SetCharacterPlayer(characterPlayer: CharacterPlayer) {
        this.characterPlayer = characterPlayer;
    }

    public OnEnterFurniture(furnitureAction: () => void) {
        this.interactionBtn.interactable = true;
        this.furnitureAction = furnitureAction;
    }

    public OnExitFurniture() {
        this.interactionBtn.interactable = false;
        this.furnitureAction = null;
    }

}