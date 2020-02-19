import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { Boss } from 'src/app/shared/models/boss';

@Component({
  selector: 'app-detail-boss',
  templateUrl: './detail-boss.component.html',
  styleUrls: ['./detail-boss.component.css']
})
export class DetailBossComponent implements OnInit {

  constructor(public managerService: ManagerService) { }
  public currentBoss = new Boss();
  ngOnInit() {
    this.managerService.getBoss().subscribe(res => {
      
      if (res) {
        this.currentBoss = res;
      }
    })
  }

}
