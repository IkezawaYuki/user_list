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

        this.app.use(koaRoute.get('/', async (ctx) => {
           ctx.body = fs.readFileSync(path.join(process.cwd(), 'data/index.html').toString())
        }))

        this.app.use(koaRoute.get('/list', async (ctx) => {
            const res = await controllers.user.list()
            const users = res.users.map((i) => ({
                name: i.name,
                path: i.path
            }))
            ctx.body = {engine: 'koa', message: 'it works', user: users}
        }))

        this.app.use(koaRoute.get('/profile/:name', async (ctx, name) => {
            const res = await controllers.user.read(name)
            ctx.body = {engine: 'koa', message: `hello ${res.name}`, name: res.name, isVip: res.isHeavyUser}
        }))
    }
}