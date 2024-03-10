import { Sandbox, SandboxOptions, SandboxPlayer } from 'ZEPETO.Multiplay';
import { Player, Transform, Vector3 } from 'ZEPETO.Multiplay.Schema';
import { DataStorage, loadDataStorage } from 'ZEPETO.Multiplay.DataStorage';

interface ItemData {
    count: number;
}

export default class extends Sandbox {

    private timer: number = 0;
    private cnt: number = 0;

    constructor() {
        super();
    }

    onCreate(options: SandboxOptions) {
        this.onMessage("onChangedTransform", (client, message) => {
            const player = this.state.players.get(client.sessionId);

            const transform = new Transform();
            transform.position = new Vector3();
            transform.position.x = message.position.x;
            transform.position.y = message.position.y;
            transform.position.z = message.position.z;

            transform.rotation = new Vector3();
            transform.rotation.x = message.rotation.x;
            transform.rotation.y = message.rotation.y;
            transform.rotation.z = message.rotation.z;

            if (player) {
                player.transform = transform;
            }
        });

        this.onMessage("onChangedState", (client, message) => {
            const player = this.state.players.get(client.sessionId);
            if (player) {
                player.state = message.state;
                player.subState = message.subState;
            }
        });

        this.onMessage("item", (client, id) => {
            this.state.items.delete(id);
            this.loadItemData(client, client.userId).then((data: ItemData) => {
                if (data) {
                    data.count++;
                    this.saveItemData(client, data);
                } else {
                    const newData: ItemData = {
                        count: 1,
                    };
                    this.saveItemData(client, newData);
                }
            });
        })
    }

    onJoin(client: SandboxPlayer) {
        const player = new Player();
        player.sessionId = client.sessionId;

        if (client.userId) {
            player.zepetoUserId = client.userId;
        }

        this.state.players.set(client.sessionId, player);
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        this.state.players.delete(client.sessionId);
    }

    onTick(deltaTime: number) {
        this.timer += deltaTime;
        if (this.timer > 10000) {
            var pos = new Vector3();
            pos.x = this.randomFloat(-25, 25);
            pos.y = 0;
            pos.z = this.randomFloat(-25, 25);
            this.state.items.set(`id_${this.cnt}`, pos);

            this.timer = 0;
            this.cnt += 1;
        }
    }

    randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    async saveItemData(client: SandboxPlayer, data: ItemData) {
        const playerStorage: DataStorage = client.loadDataStorage();
        await playerStorage.set("itemData", data);
    }

    async loadItemData(client: SandboxPlayer, userId: string) {
        const userStorage: DataStorage = await loadDataStorage(userId);
        return await userStorage.get<ItemData>("itemData");
    }
}