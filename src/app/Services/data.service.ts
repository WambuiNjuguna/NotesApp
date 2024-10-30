import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export interface Note {
  id?: string;
  title: string;
  content: string;
  date: any;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private collectionName = 'notes';

  constructor(private firestore: AngularFirestore) {}

  getNotes(): Observable<Note[]> {
    return this.firestore.collection<Note>(this.collectionName).valueChanges({ idField: 'id' });
  }

  addNote(note: Note): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({ id, ...note });
  }

  deleteNote(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
