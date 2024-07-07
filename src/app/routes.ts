import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MatchListComponent } from './pages/match-list/match-list.component';
import { StandingsComponent } from './pages/standings/standings.component';

export const routes: Routes = [
  { path: 'matches', component: MatchListComponent },
  { path: 'standings', component: StandingsComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
