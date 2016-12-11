import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
    public router: Router
  ) { }

  logout() {
    localStorage.setItem('token', '');
  }
  ngOnInit() {
  }

}
