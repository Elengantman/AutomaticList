import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponse } from '../../../shared/models/server-response.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-client-report-table',
  templateUrl: './client-report-table.component.html',
  styleUrls: ['./client-report-table.component.scss']
})
export class ClientReportTableComponent {
  isAdmin;
  rows;
  fullName;

  constructor(private router: Router,
              private apiService: ApiService,
              private toastrService: ToastrService,
              private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin;
    const state = this.router.getCurrentNavigation().extras.state;
    const query = state.query;
    this.fullName = state.fullName.toUpperCase();
    this.apiService.post(`purchase/report`, query).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting purchase list');
      } else {
        this.rows = response.data;
      }
    });
  }
}
