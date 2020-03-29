import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnsayoPageRoutingModule } from './ensayo-routing.module';

import { EnsayoPage } from './ensayo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnsayoPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EnsayoPage]
})
export class EnsayoPageModule {}
