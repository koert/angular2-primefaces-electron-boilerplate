import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";
import { ImageComponent } from "./image/image.component";

import { AppRoutingModule } from './app-routing.module';

import {ButtonModule, GrowlModule, PanelModule} from 'primeng/primeng';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule,
    ButtonModule, GrowlModule, PanelModule],
  declarations: [AppComponent, DemoComponent, ImageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  messages: any[] = [];

}
