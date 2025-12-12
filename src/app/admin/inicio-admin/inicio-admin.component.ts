import { Component, OnInit } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio-admin',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, RouterModule],
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.css'
})
export class InicioAdminComponent implements OnInit {
  public identity: any;

  constructor(private _adminService: AdminService) {
    this.identity = this._adminService.getIdentity();
  }

  ngOnInit(): void {
  }
}
