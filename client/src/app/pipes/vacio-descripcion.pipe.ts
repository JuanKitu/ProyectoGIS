import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vacioDescripcion',
  pure:false
})
export class VacioDescripcionPipe implements PipeTransform {

  transform(value:string): string {
    if (!value){
      return 'Ninguna';
    }
    return value;
  }

}
