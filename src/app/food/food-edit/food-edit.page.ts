import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Food } from 'src/app/shared/food.model';
import { FoodService } from 'src/app/shared/food.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.page.html',
  styleUrls: ['./food-edit.page.scss'],
})
export class FoodEditPage implements OnInit, OnDestroy {
  @Input() foodId: string;
  foodItem: any;
  sub: Subscription;

  constructor(private foodService: FoodService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.sub = this.foodService.getFood(this.foodId).subscribe(data => {
      this.foodItem = {
          id: data.payload.id,
          ...data.payload.data()
        } as Food;
      });
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
