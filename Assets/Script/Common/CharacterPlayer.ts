import { LayerMask, Physics, Quaternion, Ray, RaycastHit, Transform, Vector3, WaitForEndOfFrame, WaitForSeconds } from 'UnityEngine';
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
        // 쿠션에 앉기: ZW_POSE_012
        // 의자에 앉기: ZW_POSE_063
        // 눕기: ZW_POSE_040
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

    public InteractionFurniture(gestureId: string, pivot: Transform) {
        this.StartCoroutine(this.Interaction(gestureId, pivot));
    }

    private *Interaction(gestureId: string, pivot: Transform) {
        this.zepetoCharacter.Teleport(pivot.position, pivot.rotation);
        yield new WaitForSeconds(0.3);
        this.PlayGestureWithId(gestureId);
    }

}