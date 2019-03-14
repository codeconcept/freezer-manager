import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FoodService } from './../shared/food.service';
import { Category } from './../shared/category.model';
import categories from '../shared/food-categories';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  form: FormGroup;
  isLoading = false;
  allCategories: Category[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.allCategories = categories;
    this.form = new FormGroup({
      foodName: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl({
        validators: [Validators.required]
      }),
      datePlacedInFreezer: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  add() {
    this.isLoading = true;
    const foodItem = { foodName: this.form.value.foodName, datePlacedInFreezer: new Date(this.form.value.datePlacedInFreezer) };
    this.foodService.addFood(foodItem).then(data => {
      this.isLoading = false;
      console.log(data);
      this.form.reset();
    }).catch(err => {
      this.isLoading = false;
      console.error(err);
    });
  }
}
