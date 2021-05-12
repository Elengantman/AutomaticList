import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UpdateListComponent } from './pages/update-list/update-list.component';
import { AuthGuard } from './services/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { Temp1Component } from './pages/temp1/temp1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ReminderListComponent } from './pages/reminder-list/reminder-list.component';
import { CoreListComponent } from './pages/core-list/core-list.component';
import { OcticonsModule } from 'ngx-octicons';
import { PurchaseComponent } from './pages/purchase/purchase.component';
// import { AddRemoveFromListComponent } from './add-remove-from-list/add-remove-from-list.component';
// import { MainPageComponent } from './main-page/main-page.component';
// import { MainPhotoComponent } from './main-photo/main-photo.component';
// import { MainTemplateComponent } from './main-template/main-template.component';
// import { LoginTemplateComponent } from './login-template/login-template.component';
// import { AutomaticListPhotoComponent } from './automatic-list-photo/automatic-list-photo.component';
// import { SigninpageComponent } from './signinpage/signinpage.component';
// import { GroceryListPageComponent } from './grocery-list-page/grocery-list-page.component';

const routes = [
  { path: '',  redirectTo: 'update-list', pathMatch: 'full' },
  { path: 'temp1', component: Temp1Component },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'reminder-list', component: ReminderListComponent, canActivate: [AuthGuard] },
  { path: 'core-list', component: CoreListComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'update-list', component: UpdateListComponent, canActivate: [AuthGuard] },
  // { path: 'signin', component: SigninpageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UpdateListComponent,
    LoginComponent,
    Temp1Component,
    SignInComponent,
    ReminderListComponent,
    CoreListComponent,
    PurchaseComponent,
    // MainPageComponent,
    // MainPhotoComponent,
    // MainTemplateComponent,
    // LoginTemplateComponent,
    // AutomaticListPhotoComponent,
    // SigninpageComponent,
    // AddRemoveFromListComponent,
    // GroceryListPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

    BsDropdownModule.forRoot(),
    BsDropdownModule,
    OcticonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
