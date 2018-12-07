import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ICampaign } from 'src/app/models/interfaces.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'og-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  @ViewChild('file') file;

  @Output('import')
  private importEmitter: EventEmitter<ICampaign[]> = new EventEmitter();

  @Output('error')
  private errorEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private dataService: DataService) { }

  addFile() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const file: File = this.file.nativeElement.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        let res: any = evt;
        let campaigns: ICampaign[];
        try {
          campaigns = this.dataService.import(res.target.result);
          if (campaigns) {
            this.importEmitter.emit(campaigns);
          }
        } catch (err) {
          this.errorEmitter.emit('Unable to parse file.');
        }
      }
      reader.onerror = (evt) => {
        this.errorEmitter.emit('Erorr loading file');
      }
    }
  }

}
