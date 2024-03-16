import { AudioClip, AudioSource, Collider, Handheld } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import UiController from './UiController';
import { Transform } from 'UnityEngine';
import CharacterPlayer from '../Common/CharacterPlayer';
import AudioController from './AudioController';    

export default class Furniture extends ZepetoScriptBehaviour {

    public gestureId: string;
    public pivot: Transform;
    public sound: AudioClip;
    public isVibrate: boolean;

    private characterPlayer: CharacterPlayer;

    OnTriggerEnter(collider: Collider) {
        this.characterPlayer = collider.gameObject.GetComponent<CharacterPlayer>();
        UiController.instance.OnEnterFurniture(() => {
            this.PlayInteraction();
        })
    }

    OnTriggerExit(collider: Collider) {
        UiController.instance.OnExitFurniture();
    }

    private PlayInteraction() {
        if (this.sound != null) {
            AudioController.instance.PlaySound(this.sound);
        }

        if (this.isVibrate) {
            Handheld.Vibrate();
        }
        
        if (this.characterPlayer != null) {
            this.characterPlayer.InteractionFurniture(this.gestureId, this.pivot);
        }
    }

}