import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { MusicTableComponent } from "./component/music-table.component";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    MusicTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [MusicTableComponent]
})
export class MusicTableModule { }
