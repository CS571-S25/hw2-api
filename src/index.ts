import fs from 'fs'

import express, { Express } from 'express';
import cookies from "cookie-parser";

import { CS571DefaultSecretConfig, CS571Initializer } from '@cs571/api-framework'
import { CS571StudentsRoute } from './routes/students';
import HW2PublicConfig from './model/configs/hw2-public-config';
import { CS571StudentsXSSRoute } from './routes/students-xss';
import { Student } from './model/student';

console.log("Welcome to HW2!");

const app: Express = express();
app.use(cookies());

const appBundle = CS571Initializer.init<HW2PublicConfig, CS571DefaultSecretConfig>(app, {
  allowNoAuth: [],
  skipAuth: false
});

const makeStudent = (stud: any) => new Student(
  stud.name,
  stud.fromWisconsin,
  stud.numCredits,
  stud.major,
  stud.interests
);

const students = JSON.parse(fs.readFileSync(appBundle.config.PUBLIC_CONFIG.STUDENT_INFO_LOC).toString()).map(makeStudent)
const studentsXss = JSON.parse(fs.readFileSync("includes/students.xss").toString()).map(makeStudent)

appBundle.router.addRoutes([
  new CS571StudentsRoute(students),
  new CS571StudentsXSSRoute(studentsXss)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
