export default class Profile{
    public readonly name: string
    public readonly score: number
    public static readonly heavyUserThreshold = 10

    public constructor(name: string, score: number) {
        this.name = name
        this.score = score
    }

    public get isHeavyUser(): boolean{
        return this.score > Profile.heavyUserThreshold
    }
}