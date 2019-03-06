import { Component, OnInit } from '@angular/core';
import { FoodService } from './../shared/food.service';
import { Food } from '../shared/food.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  allFoodInFreezer: Food[];

  constructor(private foodService: FoodService) {}

  ionViewWillEnter() {
    this.allFoodInFreezer = this.foodService.allFood;
    console.log('ionViewWillEnter', this.allFoodInFreezer);
  }

  ngOnInit() {
    this.allFoodInFreezer = this.foodService.allFood;
    console.log('ngOnInit', this.allFoodInFreezer);
  }

}
