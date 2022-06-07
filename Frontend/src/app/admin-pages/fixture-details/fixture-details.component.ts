import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fixture } from 'src/app/model/Fixture';
import { FixturesService } from 'src/app/services/fixtures.service';

@Component({
  selector: 'app-fixture-details',
  templateUrl: './fixture-details.component.html',
  styleUrls: ['./fixture-details.component.scss']
})
export class FixtureDetailsComponent implements OnInit {
  id!: number;

  fixtures!: Fixture[]

  constructor(private fixtureService: FixturesService,
    private router: Router,) { }

    displayedColumns: string[] = ['fid', 'match','time', 'actions'];

  ngOnInit(): void {
    this.fixtureService.getAllFixtures().subscribe( data => {
      this.fixtures = data;
    })

  }

  getNews(){
    this.fixtureService.getAllFixtures().subscribe( data => {
      this.fixtures = data;
    })
  }

  viewFixtures(id: number){
    this.router.navigate(['admin/view-fixture', id]);
  }

  updateFixtures(id: number){
    
  }


}
