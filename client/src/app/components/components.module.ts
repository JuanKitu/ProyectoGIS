import { NgModule } from '@angular/core';
import { FormularioEnsayoComponent } from './formulario-ensayo/formulario-ensayo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
@NgModule({
    declarations:[FormularioEnsayoComponent, HeaderComponent],
    imports:[IonicModule, FormsModule,ReactiveFormsModule, CommonModule],
    exports:[FormularioEnsayoComponent, HeaderComponent]
})
export class ComponentsModule{}