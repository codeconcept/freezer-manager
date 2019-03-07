import { Injectable } from '@angular/core';
import { Food } from './food.model';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private afs: AngularFirestore) {}

  allFood(): Observable<DocumentChangeAction<{}>[]> {
    return this.afs.collection('freezer').snapshotChanges();
  }


  addFood(foodItem: Food): Promise<DocumentReference> {
    return this.afs.collection('freezer').add(foodItem);
  }
}
