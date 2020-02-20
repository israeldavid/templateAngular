import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
    this.deslogearse();
  }

  deslogearse(){
    //localStorage.removeItem('currentUser');
    this.route.navigateByUrl("login");
  }
}
