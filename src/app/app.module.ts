import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicTableModule } from "./music-table/music-table.module";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MusicTableModule,
    AppRoutingModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
