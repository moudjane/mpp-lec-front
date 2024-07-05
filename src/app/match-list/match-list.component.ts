import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatchService, MatchResponse, Event } from '../match.service';
import { teamLogos } from '../team-logos'; // Import the team logos

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

  marketKeys(markets: any): string[] {
    return Object.keys(markets);
  }

  submarketKeys(submarket: any): string[] {
    return submarket ? Object.keys(submarket) : [];
  }

  getLogo(teamName: string): string {
    return teamLogos[teamName] || 'assets/logos/default-logo.svg'; // Use a default logo if not found
  }
}
