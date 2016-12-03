import { Component, OnInit } from '@angular/core';

const ipcRenderer = require('electron').ipcRenderer;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor() {
  }

  public title: string = "Hello Angular 2!";
  public message: string = "Greatness awaits...";
  messages: any[];
  public imagePath: string;

  ngOnInit(): void {
    ipcRenderer.on('reply', (event, arg) => {
      console.log("Reply: " + arg); // prints "pong"
    });

    ipcRenderer.on('selected-image-file', (event, path) => this.selectImageFile(path));
    // ipcRenderer.on('selected-image-file', function (event, path) {
    //   this.selectImageFile(path);
    // });
  }

  public test(): void {
    console.log("Getestet");
    ipcRenderer.send("message", "tested");

    this.messages.push({severity: 'info', summary: 'Test', detail: this.message});
  }

  public announce(): void {
    this.messages.push({severity: 'info', summary: 'Test', detail: this.message});
  }

  public openImageFileSelect(): void {
    ipcRenderer.send('open-image-file');
  }

  private selectImageFile(path: string): void {
    this.imagePath = path;
    this.messages.push({severity: 'info', summary: 'File selected', detail: `Selected path: ${path}`});
  }

}
