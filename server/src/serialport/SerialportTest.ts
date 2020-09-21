import SerialPort from "serialport";

const portControlador = new SerialPort('COM4', {
    //autoOpen:false,
    baudRate: 9600
});
portControlador.write('<CONN>\n');
console.log('Testeando');
portControlador.on('data',(data)=>{
    console.log(data.toString());
    portControlador.write('<TEST>\n');
    portControlador.close();
    (<any>process).send('TEST');
});