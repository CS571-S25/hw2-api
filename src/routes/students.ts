import { Express } from 'express';

import { CS571Route } from "@cs571/api-framework/src/interfaces/route";
import { Student } from '../model/student';

export class CS571StudentsRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = (process.env['CS571_BASE_PATH'] ?? "") + '/students';

    private readonly students: Student[];

    public constructor(students: Student[]) {
        this.students = students;
    }

    public addRoute(app: Express): void {
        app.get(CS571StudentsRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'private, max-age=30').send(this.shuffleArray(this.students));
        })
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    private shuffleArray<T>(array: T[]) {
        const newArr = [...array]
        for (let i = newArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newArr[i];
            newArr[i] = newArr[j];
            newArr[j] = temp;
        }
        return newArr;
    }

    public getRouteName(): string {
        return CS571StudentsRoute.ROUTE_NAME;
    }
}