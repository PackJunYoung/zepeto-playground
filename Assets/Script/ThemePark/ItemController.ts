import { GameObject, Resources } from 'UnityEngine';
import { Vector3 } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { MapSchema } from 'types/MapSchema';
import * as UnityEngine from 'UnityEngine';
import GiftItem from './GiftItem';

export default class ItemController extends ZepetoScriptBehaviour {

    public static instance: ItemController;

    private prefab: GameObject;
    private currentItems: Map<string, GameObject> = new Map<string, GameObject>();

    Awake() {    
        ItemController.instance = this;

        this.prefab = Resources.Load<GameObject>("item");
    }

    public OnStateChange(items: MapSchema<Vector3>) {
        var create = new Map<string, Vector3>();
        var remove = new Map<string, GameObject>(this.currentItems);

        items.ForEach((id: string, pos: Vector3) => {
            if (!this.currentItems.has(id)) {
                create.set(id, pos);
            }
            remove.delete(id);
        });

        create.forEach((pos: Vector3, id: string) => this.OnCreateItem(id, pos));
        remove.forEach((obj: GameObject, id: string) => this.OnRemoveItem(id, obj));
    }

    OnCreateItem(id: string, pos: Vector3) {
        var obj = GameObject.Instantiate(this.prefab, new UnityEngine.Vector3(pos.x, pos.y, pos.z), UnityEngine.Quaternion.identity, this.transform) as GameObject;
        var item = obj.GetComponent<GiftItem>();
        item.Init(id);

        this.currentItems.set(id, obj);
    }

    OnRemoveItem(id: string, obj: GameObject) {
        if (obj != null) GameObject.DestroyImmediate(obj);
        this.currentItems.delete(id);
    }

}