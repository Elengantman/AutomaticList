import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { OcticonsModule } from 'ngx-octicons';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { RecommendedListComponent } from './pages/recommended-list/recommended-list.component';
import { ClientGroceryListComponent } from './pages/client-grocery-list/client-grocery-list.component';
import { ClientReportComponent } from './pages/client-report/client-report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClientGroceryTableComponent } from './pages/client-grocery-list/client-grocery-table/client-grocery-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductSetupComponent } from './pages/product-setup/product-setup.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { ClientReportTableComponent } from './pages/client-report/client-report-table/client-report-table.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { StartComponent } from './pages/start/start.component';
import { NgSelectModule } from '@ng-select/ng-select';

const routes = [
  { path: '',  component: StartComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'recommended-list', component: RecommendedListComponent, canActivate: [AuthGuard] },
  { path: 'my-list', component: MyListComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'client-grocery-list', component: ClientGroceryListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'client-grocery-table', component: ClientGroceryTableComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'client-report', component: ClientReportComponent, canActivate: [AuthGuard] },
  { path: 'client-report-table', component: ClientReportTableComponent, canActivate: [AuthGuard] },
  { path: 'product-setup', component: ProductSetupComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    PurchaseComponent,
    RecommendedListComponent,
    ClientGroceryListComponent,
    ClientReportComponent,
    ClientGroceryTableComponent,
    ProductSetupComponent,
    MyListComponent,
    ClientReportTableComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    OcticonsModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
