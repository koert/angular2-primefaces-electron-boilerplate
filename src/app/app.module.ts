import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

import {ButtonModule, GrowlModule, PanelModule} from 'primeng/primeng';

@NgModule({
  imports: [BrowserModule, FormsModule,
    ButtonModule, GrowlModule, PanelModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  messages: any[] = [];

}
