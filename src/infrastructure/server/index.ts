import UserController from "~/src/interfaces/controller/user";

export interface Controllers{
    user: UserController
}

export default interface ServerDriver{
    run(): Promise<void>
}
