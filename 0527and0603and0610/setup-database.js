import { writeFileSync } from "fs";

const file = "./dist/package.json";
const data = '{ "type": "" }';

writeFileSync(file, data);
