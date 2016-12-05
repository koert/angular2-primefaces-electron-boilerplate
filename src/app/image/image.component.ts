import { Component, OnInit } from '@angular/core';

const ipcRenderer = require('electron').ipcRenderer;

@Component({
  moduleId: module.id,
  selector: 'image',
  templateUrl: 'image.component.html',
  styleUrls: ['image.component.css']
})
export class ImageComponent implements OnInit {

  constructor() {
  }

  public title: string = "Image";
  messages: any[] = [];
  public imagePath: string;

  ngOnInit(): void {
    ipcRenderer.on('selected-image-file', (event, path) => this.selectImageFile(path));
  }

  public openImageFileSelect(): void {
    ipcRenderer.send('open-image-file');
  }

  private selectImageFile(path: string): void {
    this.imagePath = path;
    this.messages.push({severity: 'info', summary: 'File selected', detail: `Selected path: ${path}`});
  }

}
