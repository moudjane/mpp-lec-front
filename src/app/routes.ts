import { Routes } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';

export const routes: Routes = [
  { path: 'matches', component: MatchListComponent },
  { path: '', redirectTo: '/matches', pathMatch: 'full' }
];
