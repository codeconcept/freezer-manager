import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from './../shared/food.service';
import { Food } from '../shared/food.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ModalController, AlertController } from '@ionic/angular';
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

  constructor(private foodService: FoodService, private modalCtrl: ModalController, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.sub = this.foodService.allFood().subscribe(data => {
      this.allFoodInFreezer = data.map(e => {
        console.log(typeof e.payload.doc.get('datePlacedInFreezer'), e.payload.doc.get('datePlacedInFreezer'));
        return {
          id: e.payload.doc.id,
          foodName: e.payload.doc.get('foodName'),
          // tslint:disable-next-line: max-line-length
          datePlacedInFreezer: (typeof e.payload.doc.get('datePlacedInFreezer') === 'object') ? e.payload.doc.get('datePlacedInFreezer').toDate() : e.payload.doc.get('datePlacedInFreezer')
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
    this.alertCtrl.create({
      header: 'Delete this food?',
      subHeader: 'deletion is irreversible',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'primary',
          role: 'cancel',
          handler: () => {
            this.isLoading = false;
          }
        },
        {
          text: 'delete',
          cssClass: 'danger',
          handler: () => {
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
        }
      ]
    }).then(alert => {
      alert.present();
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
