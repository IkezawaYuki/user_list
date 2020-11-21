import UserRepository from "~/src/interfaces/repositories/user";
import Profile from "~/src/domain/entity/profile";

export interface UserReadUsecaseRequest{
    name: string
}

export type UserReadUsecaseResponse = {
    id: number
    name: string
    isHeavyUser: boolean
}

export default interface UserReadUsecase{
    execute(req: UserReadUsecaseRequest): Promise<UserReadUsecaseResponse>
}

export class UserReadInteractor implements UserReadUsecase {
    userRepo: UserRepository

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    public async execute(req: UserReadUsecaseRequest): Promise<UserReadUsecaseResponse> {
        const res = await this.userRepo.findOne(req.name)
        if (!res) {
            throw new Error("user is not found")
        }
        const profile = new Profile(res.name, res.score)
        return {
            id: res.id,
            name: res.name,
            isHeavyUser: profile.isHeavyUser
        }
    }
}