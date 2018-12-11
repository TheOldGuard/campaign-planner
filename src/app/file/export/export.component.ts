import { Component, Input, ViewChild } from '@angular/core';
import { ICampaign } from 'src/app/models/interfaces.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'og-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  @Input('campaigns')
  campaigns: ICampaign[];

  constructor(private dataService: DataService) { }

  export() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this.dataService.export(this.campaigns));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "og_planner_data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

}
