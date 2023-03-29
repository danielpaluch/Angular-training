import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [   
  { path: 'user', component: SearchUserComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'user/:id/album/:albumId', component: UserProfileComponent },
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
