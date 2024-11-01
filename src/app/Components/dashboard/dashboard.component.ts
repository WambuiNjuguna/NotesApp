// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService, Note } from '../../Services/data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = { title: '', content: '', date: new Date () };
  selectedNote: Note | null=null;

  constructor(
    private dataService: DataService,
     private router:Router,
     private authService:AuthService,
    ) {}

  ngOnInit(): void {
    this.dataService.getNotes().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }

  addNote(): void {
    if (this.newNote.title && this.newNote.content) {
      const noteWithDate: Note ={
        ...this.newNote,
        date: new Date()
      };
      this.dataService.addNote(noteWithDate).then(() => {
        this.newNote = { title: '', content: '', date: new Date() };
      });
    }
  }

  deleteNote(id: string | undefined): void {
    if(id){
    this.dataService.deleteNote(id);
    this.selectedNote=null; //clear selection after deletion
    }
  }

  toggleNote(note: Note): void{
    this.selectedNote =this.selectedNote === note? null:note;
  }

  logout(): void {
  
    this.authService.logout(); 
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
