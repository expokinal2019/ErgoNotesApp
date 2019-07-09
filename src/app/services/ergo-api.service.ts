import { Injectable } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Note } from '../models/note.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErgoApiService {
  endpoint = endpoints.ergoapi;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth.currentUserValue().token
    })
  };

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  private extractData(res: Response) {
    return res || [] || {};
  }

  public addNote(note: Note) {
    var params = JSON.stringify({
      title: note.title,
      content: note.content,
      favorite: note.favorite,
      deadline: note.deadline,
      labels: note.labels
    });
    return this.http.post(
      this.endpoint + 'notes/', params, { headers: this.httpOptions.headers}
    ).pipe(map(this.extractData));
  }

  public changeFavStatus(noteId: string, status: boolean) {
    var params = JSON.stringify({ favorite: !status });

    return this.http.put(
      this.endpoint + 'notes/' + noteId, params, { headers: this.httpOptions.headers}
    ).pipe(map(this.extractData));
  }

  public getAllNotes() {
    return this.http.get(
      this.endpoint + 'notes/my-notes', { headers: this.httpOptions.headers}
    ).pipe(map(this.extractData));
  }

  public getAllTasks(name: string) {
    return this.http.get(
      this.endpoint + 'tasks/owner-name/' + name, { headers: this.httpOptions.headers}
    ).pipe(map(this.extractData));
  }

  public deleteNote(noteId: string) {
    return this.http.delete(
      this.endpoint + 'notes/' + noteId, { headers: this.httpOptions.headers}
    ).pipe(map(this.extractData));
  }
}
