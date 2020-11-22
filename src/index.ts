import path from 'path'
import ServerDriver from "~/src/infrastructure/server";
import KoaDriver from "~/src/infrastructure/koa";
import ExpressDriver from "~/src/infrastructure/express";
import UserController from "~/src/interfaces/controller/user";
import {UserGateway} from "~/src/interfaces/repositories/user";
import {UserReadInteractor} from "~/src/applications/usecases/user_read";
import {UserListInteractor} from "~/src/applications/usecases/user_list";
import UserDataStore from "~/src/infrastructure/datastore/user";
import UserJsonDataStore from "~/src/infrastructure/json_datastore/user";
import UserStaticDatastore from "~/src/infrastructure/static_datastore/user";

(async () => {
    const userDataStore = ((): UserDataStore => {
        const dataType = process.env.DATA_TYPE
        if (dataType === "json"){
            return new UserJsonDataStore(path.join(process.cwd(), 'data/users.json'))
        }
        if (dataType === "static"){
            return new UserStaticDatastore()
        }
        throw new Error("unknown data type")
    })()

    const userRepository = new UserGateway(userDataStore)
    const userReadUsecase = new UserReadInteractor(userRepository)
    const userListUsecase = new UserListInteractor(userRepository)
    const userController = {
        user: new UserController(userReadUsecase, userListUsecase)
    }

    const port = 3000
    const server = (() :ServerDriver => {
        const serverType = process.env.SERVER_TYPE
        if (serverType === "koa"){
            return new KoaDriver(port, userController)
        }
        if (serverType === "express"){
            return new ExpressDriver(port, userController)
        }
        throw new Error("unknown server type")
    })()

    server.run()
    console.debug(`http://localhost:${port}`)
})()