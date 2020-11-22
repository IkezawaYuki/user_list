import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import koaRoute from 'koa-route'
import {Controllers} from "~/src/infrastructure/server"

export default class KoaServerRouter{
    private app: Koa

    constructor(app: Koa) {
        this.app = app
    }

    public init(controllers: Controllers){

    }
}