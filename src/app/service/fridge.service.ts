import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Fridge } from '../model/fridge';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  url =
    'https://innovations.rola.com/build/rola/coolschrank/ongoing/application/';

  username = 'rolabewerbung';
  password = 'Bewerbungen-rola';
  token = Buffer.from(`${this.username}:${this.password}`, 'utf8').toString(
    'base64'
  );

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + this.token,
    }),
  };

  constructor(private http: HttpClient) {}

  addFridge(fridge: Fridge): Observable<Fridge> {
    return this.http
      .post<Fridge>(`${this.url}/fridge`, fridge, this.httpOptions)
      .pipe(catchError(this.handleError<Fridge>(`addFridge`)));
  }
  getFridgeById(id: string): Observable<Fridge> {
    return this.http
      .get<Fridge>(`${this.url}/fridge/${id}`)
      .pipe(catchError(this.handleError<Fridge>(`getFridgeById id=${id}`)));
  }

  updateBook(book: Book): Observable<Book> {
    return this.http
      .put<Book>(`${this.url}/books`, book, this.httpOptions)
      .pipe(catchError(this.handleError<Book>(`updateBook`)));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
