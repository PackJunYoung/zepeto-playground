import { LocalPlayer, SpawnInfo, ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';
import CharacterPlayer from './CharacterPlayer';

export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {       
        // Grab the user id specified from logging into zepeto through the editor.
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);            
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {           
            const player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;      
            
            // 캐릭터에 내가 제어할 수 있는 스크립트 추가.
            var zepetoCharacter: ZepetoCharacter = player.zepetoPlayer.character;
            zepetoCharacter.gameObject.AddComponent<CharacterPlayer>();
        });   
    }

}