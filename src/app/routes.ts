import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { StandingsComponent } from './components/standings/standings.component';

export const routes: Routes = [
  { path: 'matches', component: MatchListComponent },
  { path: 'standings', component: StandingsComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
