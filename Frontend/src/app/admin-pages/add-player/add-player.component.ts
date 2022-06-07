import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Players } from 'src/app/model/Player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  players: Players = new Players();
  teamId!: number;
  file: any;
  constructor(private playerService: PlayerService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  onChange(event: any){
    this.file = event.target.files[0];
    console.log(this.file);
  }

  addPlayer(){
    this.playerService.addPlayer(this.file, this.players, this.teamId).subscribe( data => {
      console.log(data);
    })
  }


  onSubmit(){
    this.addPlayer();
    this.snack.open("Playyer Added Succesfully in team: " + this.teamId , "Close", {
      duration: 5000});
  }

}
