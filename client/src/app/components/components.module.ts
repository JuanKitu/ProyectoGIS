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
import { GraficoEnsayoComponent } from './grafico-ensayo/grafico-ensayo.component';
import { ChartsModule } from 'ng2-charts';
@NgModule({
    declarations:[FormularioEnsayoComponent, HeaderComponent, PlantillaListaEnsayoComponent, VacioDescripcionPipe, PlantillaListaParametroComponent, FormularioParametroComponent, GraficoEnsayoComponent],
    imports:[IonicModule, FormsModule,ReactiveFormsModule, CommonModule, RouterModule, ChartsModule],
    exports:[FormularioEnsayoComponent, HeaderComponent, PlantillaListaEnsayoComponent, VacioDescripcionPipe, PlantillaListaParametroComponent, FormularioParametroComponent, GraficoEnsayoComponent]
})

export class ComponentsModule{}