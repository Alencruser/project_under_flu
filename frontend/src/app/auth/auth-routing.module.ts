import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register.component';
import { ConnectComponent } from './components/connect.component';
import { DisconnectComponent } from './components/disconnect.component';
import { AlreadyConnectedGuard } from './guards/already-connected.guard';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'connect',
        canActivate: [AlreadyConnectedGuard],
        component: ConnectComponent,
      },
      {
        path: 'register',
        canActivate: [AlreadyConnectedGuard],
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: DisconnectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
