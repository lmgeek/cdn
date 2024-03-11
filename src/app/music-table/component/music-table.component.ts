import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MusicPlayerService } from '../services/music-player.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TrackDto } from "../../shared/track-dto";

@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('0.4s ease-in-out')
      ])
    ])
  ]
})
export class MusicTableComponent {
  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;

  tracks: TrackDto[] = [];
  selectedSound: string | null = null;
  playSource: string | null = null;
  selectedRowIndex: number | null = null;
  showPlayer = false;

  constructor (private musicPlayerService: MusicPlayerService,
               private cdr: ChangeDetectorRef) {
    this.tracks = this.musicPlayerService.getSounds();
  }

  playSound (name: string, index: number, link: string) {
    this.selectedSound = name;
    this.selectedRowIndex = index;
    this.playSource = link;
    // this.playSource = `assets/tracks/${ fileName }`;
    this.showPlayer = true;
    this.cdr.detectChanges();
    if (this.audioPlayer != undefined) {
      this.audioPlayer.nativeElement.src = this.playSource;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.onerror = () => {
        alert('Track not found!');
      };
    }

    this.musicPlayerService.play(this.playSource);
  }

  clearSelection () {
    this.musicPlayerService.stop();
    this.selectedRowIndex = null;
    this.showPlayer = false;
  }
}
