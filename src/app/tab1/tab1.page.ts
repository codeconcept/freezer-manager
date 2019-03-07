import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FoodService } from './../shared/food.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.form = new FormGroup({
      foodName: new FormControl(null, {
        validators: [Validators.required]
      }),
      datePlacedInFreezer: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  add() {
    this.isLoading = true;
    this.foodService.addFood(this.form.value).then(data => {
      this.isLoading = false;
      console.log(data);
      this.form.reset();
    }).catch(err => {
      this.isLoading = false;
      console.error(err);
    });
  }
}
