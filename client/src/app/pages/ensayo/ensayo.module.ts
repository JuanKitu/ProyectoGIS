import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnsayoPageRoutingModule } from './ensayo-routing.module';

import { EnsayoPage } from './ensayo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnsayoPageRoutingModule
  ],
  declarations: [EnsayoPage]
})
export class EnsayoPageModule {}
