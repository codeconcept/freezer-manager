import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { FoodEditPageModule } from './../food/food-edit/food-edit.module';
import { FoodEditPage } from './../food/food-edit/food-edit.page';

@NgModule({
  imports: [
IonicModule,
    CommonModule,
    FormsModule,
    FoodEditPageModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page],
  entryComponents: [FoodEditPage]
})
export class Tab2PageModule {}
