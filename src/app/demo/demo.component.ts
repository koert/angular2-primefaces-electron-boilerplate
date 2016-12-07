import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from 'primeng/components/common/api';

const ipcRenderer = require('electron').ipcRenderer;

@Component({
  moduleId: module.id,
  selector: 'demo',
  templateUrl: 'demo.component.html',
  styleUrls: ['demo.component.css']
})

export class DemoComponent implements OnInit {

  constructor(private router: Router) {
  }

  public title: string = "Hello Angular 2!";
  public message: string = "Greatness awaits...";
  messages: Message[] = [];

  ngOnInit(): void {
    ipcRenderer.on('reply', (event, arg) => {
      console.log("Reply: " + arg); // prints "pong"
    });
  }

  public test(): void {
    console.log("Tested");
    ipcRenderer.send("message", "tested");

    this.messages.push({severity: 'info', summary: 'Test', detail: this.message});
  }

  public announce(): void {
    this.messages.push({severity: 'info', summary: 'Test', detail: this.message});
  }

  public toImagePage(): void {
    this.router.navigate(['/image']);
  }

}
