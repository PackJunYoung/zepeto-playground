import { LocalPlayer, SpawnInfo, ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { OfficialContentType, WorldService, ZepetoWorldContent } from 'ZEPETO.World';
import CharacterPlayer from './CharacterPlayer';
import { GameObject } from 'UnityEngine';
import ScreenShotController from '../PartyRoom/ScreenShotController';
import UiController from '../PartyRoom/UiController';

export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {       
        // Grab the user id specified from logging into zepeto through the editor.
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);            
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {           
            const player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;      
            ScreenShotController.instance.SetCamera(player.zepetoCamera.camera);

            // 캐릭터에 내가 제어할 수 있는 스크립트 추가.
            var zepetoCharacter: ZepetoCharacter = player.zepetoPlayer.character;
            var characterPlayer = zepetoCharacter.gameObject.AddComponent<CharacterPlayer>();

            // 제스처 설정하기.
            UiController.instance.SetCharacterPlayer(characterPlayer);
            this.ContentRequest(characterPlayer);
        });   
    }

    private ContentRequest(characterPlayer: CharacterPlayer) {
        ZepetoWorldContent.RequestOfficialContentList(OfficialContentType.All, contents => {
            contents.forEach(content => console.log(`${content.Id} : ${content.Title}`));
            characterPlayer.SetContents(contents);
        });
    }

}