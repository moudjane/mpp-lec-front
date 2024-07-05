import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MatchResponse {
  name: string;
  key: string;
  sport: Sport;
  events: Event[];
}

export interface Sport {
  name: string;
  key: string;
}

export interface Event {
  sequence: string;
  id: number;
  home: Team;
  away: Team;
  status: string;
  cutoffTime: string;
  markets: { [key: string]: Market }; // Corrected type
}

export interface Team {
  name: string;
  key: string;
  abbreviation: string;
}

export interface Market {
  submarkets: { [key: string]: SubMarket }; // Corrected type
}

export interface SubMarket {
  selections: Selection[];
}

export interface Selection {
  outcome: string;
  params: string;
  price: number;
  minStake: number;
  maxStake: number;
  probability: number;
  status: string;
  side: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'http://localhost:8080/api/matches';

  constructor(private http: HttpClient) { }

  getMatches(): Observable<MatchResponse> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<MatchResponse>(this.apiUrl, { headers });
  }
}