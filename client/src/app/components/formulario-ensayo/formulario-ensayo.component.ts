import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnsayoService } from '../../services/ensayo.service';
import { EnsayoArchivadoService } from '../../services/ensayo-archivado.service';
import { Router } from '@angular/router';
import { Ensayo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-formulario-ensayo',
  templateUrl: './formulario-ensayo.component.html',
  styleUrls: ['./formulario-ensayo.component.scss'],
})
export class FormularioEnsayoComponent implements OnInit {
  test:boolean=false
  formularioEnsayo: FormGroup;
  @Input() ensayo: Ensayo;
  @Input() archivado:boolean;
  constructor(private ensayoService:EnsayoService, private router:Router, private ensayoArchivadoService:EnsayoArchivadoService) { 
    this.formularioEnsayo = new FormGroup({
      'operador': new FormControl('',Validators.required),
      'observaciones': new FormControl(),
      'idEnsayo': new FormControl(),
      'fecha': new FormControl(),
      'tiempoTotal': new FormControl(),
      'distanciaTotal': new FormControl('',Validators.required),
      'radioTrayectoria': new FormControl('',Validators.required),
      'materialBola': new FormControl('',Validators.required),
      'carga': new FormControl('', Validators.required),
      'diametroBola': new FormControl('',Validators.required),
      'codigoProbeta': new FormControl('',Validators.required),
      'durezaProbeta': new FormControl('',Validators.required),
      'tratamientoProbeta': new FormControl('', Validators.required),
      'materialProbeta': new FormControl('',Validators.required)
    });
    //console.log(this.ensayo)

  }

  ngOnInit() {
    if(this.archivado){
      this.formularioEnsayo.disable();
    }
    //console.log(this.ensayo)
    if(this.ensayo.idEnsayo){
      if(!this.archivado){
        this.ensayoService.getOne(this.ensayo.idEnsayo).subscribe(async data=>{
          //console.log(data)
          this.ensayo=data['data'];
          await this.formularioEnsayo.setValue(this.ensayo);
        });
      }else{
        this.ensayoArchivadoService.getOne(this.ensayo.idEnsayo).subscribe(async data=>{
          //console.log(data)
          this.ensayo=data['data'];
          await this.formularioEnsayo.setValue(this.ensayo);
        });
      }
    }
  };
  realizarTest(){
    this.ensayoService.realizarTest().subscribe();
    this.test= !this.test;
  }
  altaEnsayo(){
    if(this.ensayo.idEnsayo){
      const key$=this.ensayo.idEnsayo;
      this.ensayo = this.formularioEnsayo.value;
      this.ensayo.idEnsayo=key$;
      this.ensayoService.change(this.ensayo,this.ensayo.idEnsayo).subscribe(data=>{
        this.router.navigate(['/ensayo','lista']);
      });
    }else{
      const data:Ensayo = this.formularioEnsayo.value;
      this.ensayoService.new(data).subscribe(data=>{
        const idEnsayo = data['data'].idEnsayo;
        //el state es muy importante, es para mandar el id del ensayo
        this.ensayoService.crearListaParametros(idEnsayo).subscribe(data=>{})
        this.router.navigate(['/ensayo','#','grafico']);
      });
    }
    
  }
  bajaEnsayo(){
    if(!this.archivado){
      this.ensayoService.delete(this.ensayo.idEnsayo).subscribe(data=>{
        this.router.navigate(['/ensayo','lista',{onSameUrlNavigation:'reload'}]);
      });
    }else{
      this.ensayoArchivadoService.delete(this.ensayo.idEnsayo).subscribe(data=>{
        this.router.navigate(['/ensayo','lista',{onSameUrlNavigation:'reload'}]);
      });
    };
  };
  desarchivarEnsayo(){
    this.ensayoArchivadoService.restore(this.ensayo.idEnsayo).subscribe(data=>{
      this.router.navigate(['/ensayo','lista',{onSameUrlNavigation:'reload'}]);
    });
  }
  mostrarParametros(){
    const idEnsayo=this.ensayo.idEnsayo;
    if(!this.archivado){
      this.router.navigate(['/ensayo','lista','info',idEnsayo,'parametros',{onSameUrlNavigation:'reload'}]);
    }else{
      this.router.navigate(['/ensayo','archivados','info',idEnsayo,'parametros',{onSameUrlNavigation:'reload'}]);
    }

  }

}
