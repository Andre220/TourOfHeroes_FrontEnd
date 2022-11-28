import { Injectable } from '@angular/core';

import { Hero } from 'src/app/models/Hero';
import { MockupedHeroes } from 'src/app/models/mockups/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessagesService } from '../messages/messages.service';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private heroesUrl = 'api/heroes'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messagesService : MessagesService, 
    private http: HttpClient) { 
      console.log(`abc`);
    }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  
  getHero(id : number) : Observable<Hero | undefined> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero of id ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  searchHero(term: string) : Observable<Hero[]> {
    debugger;

    if(!term.trim())
      return of([]);

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
    .pipe(
      tap(x => x.length ? 
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero:Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero with w/ id ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id:number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero with id ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);
      
      return of(result as T);
    };
  }

  private log(message: string){
    this.messagesService.add(`HeroService: ${message}`);
  }
}
