import { NgModule } from '@angular/core';
import { FormularioEnsayoComponent } from './formulario-ensayo/formulario-ensayo.component';
import { PlantillaListaEnsayoComponent } from './plantilla-lista-ensayo/plantilla-lista-ensayo.component';

import { IonicModule } from '@ionic/angular';

import { VacioDescripcionPipe } from '../pipes/vacio-descripcion.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PlantillaListaParametroComponent } from './plantilla-lista-parametro/plantilla-lista-parametro.component';
import { FormularioParametroComponent } from './formulario-parametro/formulario-parametro.component';
@NgModule({
    declarations:[FormularioEnsayoComponent, HeaderComponent, PlantillaListaEnsayoComponent, VacioDescripcionPipe, PlantillaListaParametroComponent, FormularioParametroComponent],
    imports:[IonicModule, FormsModule,ReactiveFormsModule, CommonModule, RouterModule],
    exports:[FormularioEnsayoComponent, HeaderComponent, PlantillaListaEnsayoComponent, VacioDescripcionPipe, PlantillaListaParametroComponent, FormularioParametroComponent]
})

export class ComponentsModule{}