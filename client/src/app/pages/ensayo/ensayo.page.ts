import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.page.html',
  styleUrls: ['./ensayo.page.scss'],
})
export class EnsayoPage implements OnInit {
  formularioEnsayo: FormGroup;

  constructor() { 
    this.formularioEnsayo = new FormGroup({
      'nroEnsayo': new FormControl('',Validators.required),
      'fecha': new FormControl(),
      'operador': new FormControl('',Validators.required),
      'observaciones': new FormControl(),
      'distanciaTotal': new FormControl('',Validators.required),
      'radioTrayectoria': new FormControl('',Validators.required),
      'materialBola': new FormControl('',Validators.required),
      'carga': new FormControl('', Validators.required),
      'diametroBola': new FormControl('',Validators.required),
      'Probeta': new FormGroup({
        'codigoProbeta': new FormControl('',Validators.required),
        'dureza': new FormControl('',Validators.required),
        'tratamiento': new FormControl('', Validators.required),
        'materialProbeta': new FormControl('',Validators.required)
      })

    });
  }

  ngOnInit() {
  }
  altaEnsayo(){
    console.log(this.formularioEnsayo.value);
  }
}
