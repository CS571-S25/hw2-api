import { Express } from 'express';

import { CS571Route } from "@cs571/api-framework/src/interfaces/route";
import { Student } from '../model/student';

export class CS571StudentsXSSRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = (process.env['CS571_BASE_PATH'] ?? "") + '/students-xss';

    private readonly students: Student[];

    public constructor(students: Student[]) {
        this.students = students;
    }

    public addRoute(app: Express): void {
        app.get(CS571StudentsXSSRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'private, max-age=60').send(this.students);
        })
    }

    public getRouteName(): string {
        return CS571StudentsXSSRoute.ROUTE_NAME;
    }
}