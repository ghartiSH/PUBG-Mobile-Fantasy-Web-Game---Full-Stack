import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-fantasy-home',
  templateUrl: './fantasy-home.component.html',
  styleUrls: ['./fantasy-home.component.scss']
})
export class FantasyHomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tournamentService: TournamentServiceService,private _sanitizer: DomSanitizer,) {
  }

  tournamentid!: number;

  tournament: Tournament = new Tournament();

  ngOnInit(): void {
    this.route.parent!.paramMap.subscribe( param =>{
      this.tournamentid = parseInt(param.get('id')!);
    });

    this.tournamentService.getTournamentbyId(this.tournamentid).subscribe( data =>{
    this.tournament = data;
      this.tournament.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.tournament.image);
    });
  }
}
