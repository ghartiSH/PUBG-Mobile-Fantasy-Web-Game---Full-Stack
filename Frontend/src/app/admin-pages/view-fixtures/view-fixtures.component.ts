import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Fixture } from 'src/app/model/Fixture';
import { FixturesService } from 'src/app/services/fixtures.service';

@Component({
  selector: 'app-view-fixtures',
  templateUrl: './view-fixtures.component.html',
  styleUrls: ['./view-fixtures.component.scss']
})
export class ViewFixturesComponent implements OnInit {

  id!: number;
  fixture: Fixture = new Fixture();
  imagefile!: any;

  constructor(private route: ActivatedRoute, 
    private fixtureService: FixturesService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fixtureService.getFixtureByID(this.id).subscribe ( data =>{
      this.imagefile = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + data.map);
      this.fixture = data;
    }
    );
  }

}
