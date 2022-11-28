import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/Hero';
import { HeroesService } from '../heroes/heroes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

  heroes: Hero[] = [];

  constructor(private heroService: HeroesService){}

  ngOnInit(): void {
    this.getHeroes();    
  }

  getHeroes() : void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes.slice(1,5));
  }
}
