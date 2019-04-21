import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeFunComponent } from './see-fun/see-fun.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'seefun/codes/:code', component: SeeFunComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
