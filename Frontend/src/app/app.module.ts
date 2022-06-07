import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarComponent} from './pages/sidebar/sidebar.component';
import {HomeComponent} from './pages/home/home.component';
import {TournamentsComponent} from './pages/tournaments/tournaments.component';
import {OngoingTournamentsComponent} from './pages/ongoing-tournaments/ongoing-tournaments.component';
import {PastTournamentsComponent} from './pages/past-tournaments/past-tournaments.component';
import {UpcomingTournamentsComponent} from './pages/upcoming-tournaments/upcoming-tournaments.component';
import {NewsComponent} from './pages/news/news.component';
import {FantasyComponent} from './pages/fantasy/fantasy.component';
import {FantasyHomeComponent} from './pages/fantasy-home/fantasy-home.component';
import {MyteamComponent} from './pages/myteam/myteam.component';
import {PointsComponent} from './pages/points/points.component';
import {SelectPlayersComponent} from './pages/select-players/select-players.component';
import {FixturesComponent} from './pages/fixtures/fixtures.component';
import {PlayersComponent} from './pages/players/players.component';
import {TeamsComponent} from './pages/teams/teams.component';
import { AdminHomeComponent } from './admin-pages/admin-home/admin-home.component';
import { AddTournamentComponent } from './admin-pages/add-tournament/add-tournament.component';
import { AddTeamsComponent } from './admin-pages/add-teams/add-teams.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TournamentDetailsComponent } from './admin-pages/tournament-details/tournament-details.component';
import { ViewTournamentComponent } from './admin-pages/view-tournament/view-tournament.component';
import { UpdateTournamentComponent } from './admin-pages/update-tournament/update-tournament.component';
import { TeamDetailsComponent } from './admin-pages/team-details/team-details.component';
import { UpdateTeamComponent } from './admin-pages/update-team/update-team.component';
import { ViewTeamComponent } from './admin-pages/view-team/view-team.component';
import { AddPlayerComponent } from './admin-pages/add-player/add-player.component';
import { AddNewsComponent } from './admin-pages/add-news/add-news.component';
import { NewsDetailsComponent } from './admin-pages/news-details/news-details.component';
import { ViewNewsComponent } from './admin-pages/view-news/view-news.component';
import { UpdateNewsComponent } from './admin-pages/update-news/update-news.component';
import { AddFixturesComponent } from './admin-pages/add-fixtures/add-fixtures.component';
import { AddPlayerStatsComponent } from './admin-pages/add-player-stats/add-player-stats.component';
import { FixtureDetailsComponent } from './admin-pages/fixture-details/fixture-details.component';
import { PlayerStatsDetailsComponent } from './admin-pages/player-stats-details/player-stats-details.component';
import { ViewFixturesComponent } from './admin-pages/view-fixtures/view-fixtures.component';
import { FantasyOngoingComponent } from './pages/fantasy-ongoing/fantasy-ongoing.component';
import { ViewTourComponent } from './pages/view-tour/view-tour.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Interceptor } from './auth/Interceptor';
import { TournamentServiceService } from './services/tournament-service.service';
import { NewsService } from './services/news.service';
import { AddMatchdayComponent } from './admin-pages/add-matchday/add-matchday.component';
import { BrowseNewsComponent } from './pages/browse-news/browse-news.component';
import { ErrorDialogComponent } from './pages/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    TournamentsComponent,
    OngoingTournamentsComponent,
    PastTournamentsComponent,
    UpcomingTournamentsComponent,
    NewsComponent,
    FantasyComponent,
    FantasyHomeComponent,
    MyteamComponent,
    PointsComponent,
    SelectPlayersComponent,
    FixturesComponent,
    PlayersComponent,
    TeamsComponent,
    AdminHomeComponent,
    AddTournamentComponent,
    AddTeamsComponent,
    TournamentDetailsComponent,
    ViewTournamentComponent,
    UpdateTournamentComponent,
    TeamDetailsComponent,
    UpdateTeamComponent,
    ViewTeamComponent,
    AddPlayerComponent,
    AddNewsComponent,
    NewsDetailsComponent,
    ViewNewsComponent,
    UpdateNewsComponent,
    AddFixturesComponent,
    AddPlayerStatsComponent,
    FixtureDetailsComponent,
    PlayerStatsDetailsComponent,
    ViewFixturesComponent,
    FantasyOngoingComponent,
    ViewTourComponent,
    LoginComponent,
    RegisterComponent,
    AddMatchdayComponent,
    BrowseNewsComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:Interceptor,
      multi: true
    },
    TournamentServiceService,NewsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
