import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from './../shared/food.service';
import { Food } from '../shared/food.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { FoodEditPage } from '../food/food-edit/food-edit.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  allFoodInFreezer: Food[];
  sub: Subscription;
  isLoading = false;

  constructor(private foodService: FoodService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.sub = this.foodService.allFood().subscribe(data => {
      this.allFoodInFreezer = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Food;
      });
    });
  }

  edit(id) {
    console.log('id', id);
    this.modalCtrl
      .create({ component: FoodEditPage, componentProps: { 'foodId' : id } })
      .then(modal => {
        modal.present();
      });
  }

  delete(id) {
    console.log('id', id);
    this.isLoading = true;
    this.foodService
      .deleteFood(id)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.isLoading = false;
      }, err => {
        console.error(err);
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
