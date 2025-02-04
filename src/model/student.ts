import crypto from 'crypto'

export class Student {
    public readonly name: {first: string, last: string}
    public readonly fromWisconsin: boolean
    public readonly numCredits: number
    public readonly major: string
    public readonly interests: string[]


    public constructor(
        name: {first: string, last: string},
        fromWisconsin: boolean,
        numCredits: number,
        major: string,
        interests: string[]
    ) {
        this.name = name;
        this.fromWisconsin = fromWisconsin;
        this.numCredits = numCredits;
        this.major = major;
        this.interests = [...interests];
    }
}