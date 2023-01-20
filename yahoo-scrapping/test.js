import { cpus } from 'os';
const numCores = cpus().length;
console.log(`Number of cores: ${numCores}`);
