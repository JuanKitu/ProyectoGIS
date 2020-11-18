import { fork } from "child_process";

const childConn = fork('testChildProcess.js');
childConn.on('message', (MP: number) =>{
   const childStart = fork('testChildProcess2.js');
})
