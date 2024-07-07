import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatchService, MatchResponse, Event, Selection } from '../../services/match.service';
import { teamLogos } from '../../team-logos';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
  providers: [DatePipe]
})
export class MatchListComponent implements OnInit {
  events: Event[] = [];

  constructor(private matchService: MatchService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.matchService.getMatches().subscribe(data => {
      console.log('Match data received:', data);
      this.events = data.events;
    }, error => {
      console.error('Error fetching matches:', error);
    });
  }

  marketKeys(markets: any): string[] {
    return Object.keys(markets);
  }

  submarketKeys(submarket: any): string[] {
    return submarket ? Object.keys(submarket) : [];
  }

  getLogo(teamName: string): string {
    return teamLogos[teamName] || 'assets/logos/default-logo.svg';
  }

  getHighestAndLowestOdds(selections: Selection[]): { lowestOdds: number, highestOdds: number, lowestProbability: number, highestProbability: number } {
    if (!selections || selections.length === 0) {
      return { lowestOdds: 0, highestOdds: 0, lowestProbability: 0, highestProbability: 0 };
    }
  
    let lowestOdds = Infinity;
    let highestOdds = -Infinity;
    let lowestProbability = Infinity;
    let highestProbability = -Infinity;
  
    for (const selection of selections) {
      if (selection.price < lowestOdds) lowestOdds = selection.price;
      if (selection.price > highestOdds) highestOdds = selection.price;
      if (selection.probability < lowestProbability) lowestProbability = selection.probability;
      if (selection.probability > highestProbability) highestProbability = selection.probability;
    }
  
    return { lowestOdds, highestOdds, lowestProbability, highestProbability };
  }

  formatFrenchTime(date: string): string {
    return this.datePipe.transform(date, 'EEEE d MMMM y, HH:mm', 'fr-FR') || '';
  }
}
