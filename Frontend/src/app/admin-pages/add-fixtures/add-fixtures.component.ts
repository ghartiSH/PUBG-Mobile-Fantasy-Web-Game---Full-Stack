import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fixture } from 'src/app/model/Fixture';
import { Tournament } from 'src/app/model/Tournament';
import { FixturesService } from 'src/app/services/fixtures.service';

@Component({
  selector: 'app-add-fixtures',
  templateUrl: './add-fixtures.component.html',
  styleUrls: ['./add-fixtures.component.scss']
})
export class AddFixturesComponent implements OnInit {
  tournaments!: Tournament[];
  tournamentId!: number;
  file: any;

  fixture: Fixture = new Fixture();

  constructor(private fixtureService: FixturesService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  addFixture(){
    this.fixtureService.addFixture(this.file, this.fixture, this.tournamentId).subscribe( data =>
      {console.log(data);}
    )
  }

  onSubmit(){
    this.addFixture();
    this.snack.open("Fixture Added Succesfully in MatchDay: " + this.tournamentId , "Close", {
      duration: 5000});
  }  

  onChange(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }

}
