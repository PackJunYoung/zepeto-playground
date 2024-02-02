import { LocalPlayer, SpawnInfo, ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';

export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {       
        // Grab the user id specified from logging into zepeto through the editor.
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);            
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {           
            const player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;      
        });   
    }

}