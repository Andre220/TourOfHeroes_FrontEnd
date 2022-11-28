import { Component } from '@angular/core';

import { HeroesService } from '../heroes/heroes.service';
import { Hero } from 'src/app/models/Hero';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})

export class CreateHeroComponent {

  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  add(name: string): void {
    name = name.trim();
    
    if(!name) 
      return;
    
    this.heroesService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }
}
