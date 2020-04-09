import { NgModule } from '@angular/core';
import { FormularioEnsayoComponent } from './formulario-ensayo/formulario-ensayo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations:[FormularioEnsayoComponent],
    imports:[IonicModule, FormsModule,ReactiveFormsModule, CommonModule],
    exports:[FormularioEnsayoComponent]
})
export class ComponentsModule{}