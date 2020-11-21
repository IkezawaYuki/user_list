import UserDataStore from "~/src/infrastructure/datastore/user";

export default interface UserRepository{
    list(): Promise<UserDataStructure[]>
    findOne(name: string): Promise<UserDataStructure | null>
}

export interface UserDataStructure {
    id: number
    name: string
    score: number
}

export class UserGateway implements UserRepository{
    private store: UserDataStore

    public constructor(store: UserDataStore) {
        this.store = store
    }

    public async list(): Promise<UserDataStructure[]> {
        let result = await this.store.list()
        return result.map((i): UserDataStructure => ({
            id: i.id || 0,
            name: i.name || '',
            score: i.score || 0
        }))
    }

    public async findOne(name: string) {
        const res = await this.store.findOne(name)
        return res ? {
            id: res.id || 0,
            name: res.name || '',
            score: res.score || 0
        } : null
    }
}