let i:number = 0;


async function mandarInfo() {
  i++;
  (await <any> process).send(i);
  if(i===11){
    //console.log('FIN');
    (await <any> process).send('FIN');
  }
  
}
//console.log(i);
setInterval(mandarInfo,1000);
if(i===11){
  //console.log('FIN');
  (<any> process).send('ACABO');
}

