import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnsayoService } from '../../services/ensayo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.page.html',
  styleUrls: ['./ensayo.page.scss'],
})
export class EnsayoPage implements OnInit {
  formularioEnsayo: FormGroup;

  constructor(private ensayoService:EnsayoService, private router:Router) { 
    this.formularioEnsayo = new FormGroup({
      'operador': new FormControl('',Validators.required),
      'observaciones': new FormControl(),
      'distanciaTotal': new FormControl('',Validators.required),
      'radioTrayectoria': new FormControl('',Validators.required),
      'materialBola': new FormControl('',Validators.required),
      'carga': new FormControl('', Validators.required),
      'diametroBola': new FormControl('',Validators.required),
      'codigoProbeta': new FormControl('',Validators.required),
      'dureza': new FormControl('',Validators.required),
      'tratamiento': new FormControl('', Validators.required),
      'materialProbeta': new FormControl('',Validators.required)
    });
  }

  ngOnInit() {
  }
  altaEnsayo(){
    const data:Ensayo = this.formularioEnsayo.value;
    console.log(data);
    this.ensayoService.new(data).subscribe(data=>{
       this.router.navigate(['/ensayo','lista']);
     });
  }
}
