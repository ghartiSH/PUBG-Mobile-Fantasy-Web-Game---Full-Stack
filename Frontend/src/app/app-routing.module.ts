import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AddFixturesComponent } from './admin-pages/add-fixtures/add-fixtures.component';
import { AddMatchdayComponent } from './admin-pages/add-matchday/add-matchday.component';
import { AddNewsComponent } from './admin-pages/add-news/add-news.component';
import { AddPlayerStatsComponent } from './admin-pages/add-player-stats/add-player-stats.component';
import { AddPlayerComponent } from './admin-pages/add-player/add-player.component';
import { AddTeamsComponent } from './admin-pages/add-teams/add-teams.component';
import { AddTournamentComponent } from './admin-pages/add-tournament/add-tournament.component';
import { AdminHomeComponent } from './admin-pages/admin-home/admin-home.component';
import { FixtureDetailsComponent } from './admin-pages/fixture-details/fixture-details.component';
import { NewsDetailsComponent } from './admin-pages/news-details/news-details.component';
import { PlayerStatsDetailsComponent } from './admin-pages/player-stats-details/player-stats-details.component';
import { TeamDetailsComponent } from './admin-pages/team-details/team-details.component';
import { TournamentDetailsComponent } from './admin-pages/tournament-details/tournament-details.component';
import { UpdateNewsComponent } from './admin-pages/update-news/update-news.component';
import { UpdateTeamComponent } from './admin-pages/update-team/update-team.component';
import { UpdateTournamentComponent } from './admin-pages/update-tournament/update-tournament.component';
import { ViewFixturesComponent } from './admin-pages/view-fixtures/view-fixtures.component';
import { ViewNewsComponent } from './admin-pages/view-news/view-news.component';
import { ViewTeamComponent } from './admin-pages/view-team/view-team.component';
import { ViewTournamentComponent } from './admin-pages/view-tournament/view-tournament.component';
import { AuthGuard } from './auth/auth.guard';
import { BrowseNewsComponent } from './pages/browse-news/browse-news.component';
import {FantasyHomeComponent} from './pages/fantasy-home/fantasy-home.component';
import { FantasyOngoingComponent } from './pages/fantasy-ongoing/fantasy-ongoing.component';
import {FantasyComponent} from './pages/fantasy/fantasy.component';
import {FixturesComponent} from './pages/fixtures/fixtures.component';
import {HomeComponent} from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {MyteamComponent} from './pages/myteam/myteam.component';
import {NewsComponent} from './pages/news/news.component';
import {OngoingTournamentsComponent} from './pages/ongoing-tournaments/ongoing-tournaments.component';
import {PastTournamentsComponent} from './pages/past-tournaments/past-tournaments.component';
import {PlayersComponent} from './pages/players/players.component';
import {PointsComponent} from './pages/points/points.component';
import { RegisterComponent } from './pages/register/register.component';
import {TeamsComponent} from './pages/teams/teams.component';
import {TournamentsComponent} from './pages/tournaments/tournaments.component';
import {UpcomingTournamentsComponent} from './pages/upcoming-tournaments/upcoming-tournaments.component';
import { ViewTourComponent } from './pages/view-tour/view-tour.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent, canActivate:[AuthGuard], data: {roles: ['user']}
  },
  {
    path: 'tournaments',
    component: TournamentsComponent,
    children: [
      {path: 'ongoing', component: OngoingTournamentsComponent},
      {path: 'past', component: PastTournamentsComponent},
      {path: 'upcoming', component: UpcomingTournamentsComponent},
      {path: '', redirectTo: "ongoing", pathMatch: 'full'}
    ]
  },
  {
    path: 'news',
    component: NewsComponent,
    
  },
  {path:"news/:id", component:BrowseNewsComponent},

  {
    path:'fongoing', 
    component:FantasyOngoingComponent
  },
  {
    path:"view-tour/:id",
    component:ViewTourComponent
  },
  {
    path: 'fantasy/:id',
    component: FantasyComponent,
    children: [
      {path: "fhome", component: FantasyHomeComponent},
      {path: "myteam", component: MyteamComponent},
      {path: "points", component: PointsComponent},
      {path: "fixtures", component: FixturesComponent},
      {path: "players", component: PlayersComponent},
      {path: "teams", component: TeamsComponent},
      {path: '', redirectTo: "fhome", pathMatch: 'full'}
    ]
  },
  {
    path:'admin',
    component:AdminHomeComponent,
    children:[
      {path:"add-tournament", component:AddTournamentComponent},
      {path:"add-teams", component:AddTeamsComponent},
      {path:"tournament-details", component:TournamentDetailsComponent},
      {path:"view-tournament/:id", component:ViewTournamentComponent},
      {path:"update-tournament/:id", component:UpdateTournamentComponent},
      {path:"team-details", component:TeamDetailsComponent},
      {path:"update-team/:tid", component:UpdateTeamComponent},
      {path:"view-team/:tid", component:ViewTeamComponent},
      {path:"add-player", component:AddPlayerComponent},
      {path:"add-news", component:AddNewsComponent},
      {path:"news-details", component:NewsDetailsComponent},
      {path:"view-news/:id", component:ViewNewsComponent},
      {path:"update-news/:id", component:UpdateNewsComponent},
      {path:"add-fixture", component:AddFixturesComponent},
      {path:"add-stats", component:AddPlayerStatsComponent},
      {path:"fixture-details", component:FixtureDetailsComponent},
      {path:"player-stats", component:PlayerStatsDetailsComponent},
      {path:"view-fixture/:id", component:ViewFixturesComponent},
      {path:"add-matchday", component:AddMatchdayComponent},
    ]
  },
  {path:'login', component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
