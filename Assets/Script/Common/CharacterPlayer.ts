import { LayerMask, Physics, Ray, RaycastHit, Vector3 } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Content } from 'ZEPETO.World';

export default class CharacterPlayer extends ZepetoScriptBehaviour {

    private zepetoCharacter: ZepetoCharacter;
    private contents: Content[];

    Start() {    
        this.zepetoCharacter = this.gameObject.GetComponent<ZepetoCharacter>();
        this.gameObject.layer = LayerMask.NameToLayer("Player");
    }

    FixedUpdate() {
        var ray = new Ray(this.transform.position, Vector3.down);
        var ref = $ref<RaycastHit>();
        if (Physics.Raycast(ray, ref, 1)) {
            var hitInfo = $unref(ref);
            var hitObj = hitInfo.collider.gameObject;
            if (hitObj.layer == LayerMask.NameToLayer("Platform")) {
                if (this.transform.parent != hitObj.transform) {
                    this.transform.SetParent(hitObj.transform);
                }
                return;
            }
        }
        
        if (this.transform.parent != null) {
            this.transform.parent = null;
        }
    }

    public SetContents(contents: Content[]) {
        this.contents = contents;
    }

    public PlayRandomGesture() {
        var randomIndex = Math.floor(Math.random() * this.contents.length);
        var randomContent = this.contents[randomIndex];
        
        this.PlayGesture(randomContent);
    }

    public StopGesture() {
        this.zepetoCharacter.CancelGesture();
    }

    public PlayGestureWithId(id: string) {
        // 앉기: ZW_POSE_063 ~ 065
        var filteredContents = this.contents.filter(content => content.Id == id);
        if (filteredContents.length > 0) {
            this.PlayGesture(filteredContents[0]);
        } else {
            this.PlayRandomGesture();
        }
    }

    private PlayGesture(content: Content) {
        if (!content.IsDownloadedAnimation) {
            content.DownloadAnimation(() => {
                this.zepetoCharacter.SetGesture(content.AnimationClip);
            });
        } else {
            this.zepetoCharacter.SetGesture(content.AnimationClip);
        }
    }

}