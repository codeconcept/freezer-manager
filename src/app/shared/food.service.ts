import { Injectable } from '@angular/core';
import { Food } from './food.model';
import { AngularFirestore, DocumentChangeAction, DocumentReference, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private afs: AngularFirestore) {}

  allFood(): Observable<DocumentChangeAction<{}>[]> {
    return this.afs.collection('freezer').snapshotChanges();
  }

  getFood(id: string): Observable<Action<DocumentSnapshot<{}>>> {
    return this.afs.collection('freezer').doc(id).snapshotChanges();
  }

  addFood(foodItem: Food): Promise<DocumentReference> {
    return this.afs.collection('freezer').add(foodItem);
  }

  updateFood(food: Food): Observable<any> {
    return from(this.afs.doc(`freezer/${food.id}`).update(food));
  }

  deleteFood(id: string): Observable<any> {
    return from(this.afs.doc(`freezer/${id}`).delete());
  }
}
