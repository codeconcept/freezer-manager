import { Component } from '@angular/core';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  allFoodToEatSoon: Food[];
  sub: Subscription;
  nbOfDaysAgo = 120;

  constructor(private foodService: FoodService) {
    this.sub = this.foodService.getFoodFrozenDaysAgo(this.nbOfDaysAgo).subscribe(data => {
      this.allFoodToEatSoon = data.map(foodItem => {
        return {
          foodName: foodItem.foodName,
          datePlacedInFreezer: (foodItem.datePlacedInFreezer as any).toDate(),
          category: foodItem.category
        };
      });
    });
  }
}
