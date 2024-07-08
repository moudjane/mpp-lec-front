import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const teamLogos: { [key: string]: string } = {
    "Fnatic": "assets/logos/fnatic.svg",
    "G2 Esports": "assets/logos/g2-esports.svg",
    "GIANTX": "assets/logos/giantx.svg",
    "Heretics": "assets/logos/heretics.svg",
    "Karmine Corp": "assets/logos/karmine-corp.svg",
    "Mad Lions": "assets/logos/mad-lions.svg",
    "SK Gaming": "assets/logos/sk-gaming.svg",
    "Team Bds": "assets/logos/team-bds.svg"
};

export interface Team {
  id: number;
  acronym: string;
  name: string;
  imageUrl: string;
  location: string;
  wins: number;
  losses: number;
}

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  private apiUrl = 'http://109.199.107.52:8080/api/standings';

  constructor(private http: HttpClient) { }

  getStandings(): Observable<Team[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.standings[0].stages[0].sections[0].rankings.flatMap((ranking: any) => 
        ranking.teams.map((team: any) => ({
          id: team.id,
          acronym: team.code,
          name: team.name,
          imageUrl: teamLogos[team.name] || team.image,
          location: '',
          wins: team.record.wins,
          losses: team.record.losses
        }))
      ))
    );
  }
}