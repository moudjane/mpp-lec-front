import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatchService, MatchResponse, Event } from '../match.service';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  events: Event[] = [];

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.getMatches().subscribe(data => {
      console.log('Match data received:', data);
      this.events = data.events;
    }, error => {
      console.error('Error fetching matches:', error);
    });
  }

  marketKeys(markets: { [key: string]: any }): string[] {
    return Object.keys(markets);
  }

  submarketKeys(submarkets: { [key: string]: any }): string[] {
    return submarkets ? Object.keys(submarkets) : [];
  }
}
