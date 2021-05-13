import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthGuard } from './services/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { Temp1Component } from './pages/temp1/temp1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { OcticonsModule } from 'ngx-octicons';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { RecommendedListComponent } from './pages/recommended-list/recommended-list.component';
import { ClientGroceryListComponent } from './pages/client-grocery-list/client-grocery-list.component';
import { ClientReportComponent } from './pages/client-report/client-report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClientGroceryTableComponent } from './pages/client-grocery-list/client-grocery-table/client-grocery-table.component';
import { AppTableComponent } from './shared/components/app-table/app-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductSetupComponent } from './pages/product-setup/product-setup.component';
import { MyListComponent } from './pages/my-list/my-list.component';

const routes = [
  { path: '',  redirectTo: 'recommended-list', pathMatch: 'full' },
  { path: 'temp1', component: Temp1Component },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'recommended-list', component: RecommendedListComponent, canActivate: [AuthGuard] },
  { path: 'my-list', component: MyListComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'client-grocery-list', component: ClientGroceryListComponent, canActivate: [AuthGuard] },
  { path: 'client-grocery-table', component: ClientGroceryTableComponent, canActivate: [AuthGuard] },
  { path: 'client-report', component: ClientReportComponent, canActivate: [AuthGuard] },
  { path: 'product-setup', component: ProductSetupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    Temp1Component,
    SignInComponent,
    PurchaseComponent,
    RecommendedListComponent,
    ClientGroceryListComponent,
    ClientReportComponent,
    ClientGroceryTableComponent,
    AppTableComponent,
    ProductSetupComponent,
    MyListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    OcticonsModule,
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
