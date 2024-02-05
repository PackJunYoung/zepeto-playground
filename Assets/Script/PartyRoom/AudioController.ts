import { AudioClip, AudioSource } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class AudioController extends ZepetoScriptBehaviour {

    public static instance: AudioController;

    public soundSource: AudioSource;
    public bgmSource: AudioSource;

    Awake() {
        AudioController.instance = this;
    }

    public PlaySound(clip: AudioClip) {
        this.soundSource.clip = clip;
        this.soundSource.Play();
    }

    public PlayBgm(clip: AudioClip) {
        this.bgmSource.clip = clip;
        this.bgmSource.loop = true;
        this.bgmSource.Play();
    }

}