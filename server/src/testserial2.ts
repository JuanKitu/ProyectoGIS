import fs from "fs";

const TAB = '\t';
const LJ = "\n";
const renglon1 = 'Abcd'+TAB+'efghijklm'+TAB+'no'+LJ+'saltoDeLinea1'+TAB+'pqrstuvw';
const renglon2 = 'Abcd1\tefgh2\tijklmnop3\tq4\trs5';
//let archivo = JSON.stringify(objeto);

fs.writeFile('result.txt', renglon1, 'utf8', function (err: any) {
   if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
   }
});