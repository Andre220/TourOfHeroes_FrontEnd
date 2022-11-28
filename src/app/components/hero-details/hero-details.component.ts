import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroesService } from '../heroes/heroes.service';

import { Hero } from 'src/app/models/Hero';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})

export class HeroDetailsComponent implements OnInit{
  
  @Input() hero?: Hero; 

  constructor(  
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroesService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    if(this.hero){
      this.heroesService.updateHero(this.hero)
          .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
