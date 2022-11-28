import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from 'src/app/models/Hero';
import { HeroesService } from '../heroes/heroes.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit{

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroesService.searchHero(term)),
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}