import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from './../shared/food.service';
import { Food } from '../shared/food.model';
import { Observable, Subscription } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  allFoodInFreezer: Food[];
  sub: Subscription;

  constructor(private foodService: FoodService) {}

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
  }

  delete(id) {
    console.log('id', id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
