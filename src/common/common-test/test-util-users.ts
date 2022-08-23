import { User } from "../../users/entities/user.entity";

export default class TestUtilUser {
    static giveAMeAValidUser(): User {
        const user = new User();
        user.id = 1;
        user.email = 'user@gmail.com';
        user.password = '12345'
        return user;
    }
}