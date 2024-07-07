import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingsService, Team } from '../../services/standings.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, AfterViewInit {
  standings: Team[] = [];

  constructor(private standingsService: StandingsService) { }

  ngOnInit(): void {
    this.standingsService.getStandings().subscribe(data => {
      this.standings = data;
      setTimeout(() => this.drawQualificationLine(), 0);
    }, error => {
      console.error('Error fetching standings:', error);
    });
  }

  ngAfterViewInit(): void {
    if (this.standings.length > 0) {
      this.drawQualificationLine();
    }
  }

  private drawQualificationLine(): void {
    const table = document.querySelector('.standings-table') as HTMLTableElement;
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    if (rows.length < 2) return;

    const lastQualifiedRow = rows[rows.length - 3]; // Troisième depuis la fin
    const rect = lastQualifiedRow.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();

    const line = document.createElement('div');
    line.className = 'qualification-line';
    line.style.position = 'absolute';
    line.style.left = '0';
    line.style.right = '0';
    line.style.top = `${rect.bottom - tableRect.top}px`;
    line.style.height = '2px';
    line.style.backgroundColor = '#ff4500';
    line.style.zIndex = '1';

    table.appendChild(line);
  }
}