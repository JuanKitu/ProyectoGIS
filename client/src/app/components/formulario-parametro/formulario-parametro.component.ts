import { Component, OnInit, Input } from '@angular/core';
import { Parametro } from '../../interfaces/interfaces';
import { EnsayoService } from '../../services/ensayo.service';
import { Router } from '@angular/router';
import { EnsayoArchivadoService } from '../../services/ensayo-archivado.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-parametro',
  templateUrl: './formulario-parametro.component.html',
  styleUrls: ['./formulario-parametro.component.scss'],
})
export class FormularioParametroComponent implements OnInit {
  @Input() parametro:Parametro;
  @Input() archivado:boolean;
  formularioParametro:FormGroup;
  constructor(private ensayoService:EnsayoService, private router:Router, private ensayoArchivadoService:EnsayoArchivadoService) { 
    this.formularioParametro = new FormGroup({
      'fuerzaRozamiento': new FormControl('',Validators.required),
      'coeficienteRozamiento': new FormControl('', Validators.required),
      'vueltas': new FormControl('',Validators.required),
      'tiempoActual': new FormControl('',Validators.required),
      'idEnsayo': new FormControl(),
      'idParametro': new FormControl()
    });
  }

  ngOnInit() {
    if(this.archivado){
      this.ensayoArchivadoService.getOneParametro(this.parametro.idEnsayo,this.parametro.idParametro).subscribe(async data=>{
        //console.log(data)
        this.parametro=data['data'];
        this.formularioParametro.setValue(this.parametro);
        this.formularioParametro.disable();
      });
    }else{
      this.ensayoService.getOneParametro(this.parametro.idEnsayo,this.parametro.idParametro).subscribe(data=>{
        console.log("Los datos de la consulta al parametro lista",data)
        this.parametro=data['data'];
        this.formularioParametro.setValue(this.parametro);
      });
    }
  }
  modificarParametro(){
    if(!this.archivado){
      const key$=this.parametro.idEnsayo;
      const keyP$=this.parametro.idParametro;
      console.log(this.formularioParametro.value);
      this.parametro = this.formularioParametro.value;
      this.parametro.idEnsayo=key$;
      this.parametro.idParametro=keyP$;
      console.log(this.parametro.idEnsayo,this.parametro.idParametro);
      this.ensayoService.changeParametro(this.parametro,this.parametro.idEnsayo,this.parametro.idParametro).subscribe(data=>{
        this.router.navigate(['/ensayo','lista','info',this.parametro.idEnsayo,'parametros']);
      });
    }
  }
  bajaParametro(){
    if(!this.archivado){
      this.ensayoService.deleteParametro(this.parametro.idEnsayo, this.parametro.idParametro).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/ensayo','lista','info',this.parametro.idEnsayo,'parametros']);
      });
    }
  }

}
