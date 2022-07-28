import { Actor } from "../../actors/entities/actors.entity";

export default class TestUtil {
    static giveAMeAValidActor(): Actor {
        const actor = new Actor();
        actor.id = 1;
        actor.name = 'Maria';
        return actor;
    }
}