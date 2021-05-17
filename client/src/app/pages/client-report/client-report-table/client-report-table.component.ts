import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponse } from '../../../shared/models/server-response.model';

@Component({
  selector: 'app-client-report-table',
  templateUrl: './client-report-table.component.html',
  styleUrls: ['./client-report-table.component.scss']
})
export class ClientReportTableComponent {
  rows;

  constructor(private router: Router,
              private apiService: ApiService,
              private toastrService: ToastrService) {
    const query = this.router.getCurrentNavigation().extras.state;
    this.apiService.post(`purchase/report/${query.userName}`, query).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting purchase list');
      } else {
        this.rows = response.data;
      }
    });
  }
}
