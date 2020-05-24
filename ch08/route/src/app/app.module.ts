import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
//import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
//import { ProductComponentComponent } from './product-component/product-component.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


const mgtChildrenRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'exit', component: ExitComponentComponent }
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  {
    path: 'management',
    component: ManagementComponentComponent,
    // children: mgtChildrenRoutes,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ManagementComponentComponent,
    LoginComponentComponent,
    ExitComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [LoginGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
