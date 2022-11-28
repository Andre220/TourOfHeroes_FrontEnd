import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { HeroDetailsComponent } from 'src/app/components/hero-details/hero-details.component';
import { CreateHeroComponent } from 'src/app/components/create-hero/create-hero.component';
import { HeroesComponent } from 'src/app/components/heroes/heroes.component';

const routes: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'details/:id', component: HeroDetailsComponent},
  {path: 'create', component: CreateHeroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
