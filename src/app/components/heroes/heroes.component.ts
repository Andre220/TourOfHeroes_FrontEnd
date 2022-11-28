import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/Hero';
import { MessagesService } from '../messages/messages.service';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit{

  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService, private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.getHeroes();    
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService.deleteHero(hero.id).subscribe();
  }
}
