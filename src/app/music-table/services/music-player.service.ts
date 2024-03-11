import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TrackDto } from "../../shared/track-dto";

// @ts-ignore
import * as data from '../../../assets/tracks.json';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private audio: HTMLAudioElement | null = null;
  private isPlayingSubject = new Subject<boolean>();

  private sounds : TrackDto[] = [
    {id: 1, name: 'Nothing is Imposible', fileName: 'NadaEsImposible.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/NadaEsImposible.mp3'},
    {id: 2, name: 'Praise - Bateria Full', fileName: 'Praise_Drum.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Praise_Drum.mp3'},
    {id: 3, name: 'Praise - Teclado Full', fileName: 'Praise_Drum.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Praise_Keys.mp3'},
    {id: 4, name: 'Tu Presencia es el Cielo - Keys Full', fileName: 'Tu Presencia Es El Cielo_Keys.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Tu%20Presencia%20Es%20El%20Cielo_Keys.mp3'},
    {id: 5, name: 'Ven Descansa - E - Full', fileName: 'Ven Descansa - E.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Ven%20Descansa%20-%20E.mp3'},
    {id: 6, name: 'Amor sin condicion (Marcos Barrientos - [Rapida])', fileName: 'Amor%20sin%20condicion.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Amor%20sin%20condicion.mp3'},
    {id: 7, name: 'Amoroso - Full', fileName: 'Amoroso Full.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Amoroso%20Full.mp3'},
    {id: 8, name: 'Cuan grande es Dios', fileName: 'Cuan grande es Dios.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Cuan%20grande%20es%20Dios.mp3'},
    {id: 9, name: 'Danzando', fileName: 'danzando.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/danzando%20-%20Full.mp3'},
    {id: 10, name: 'De Gloria en Gloria', fileName: 'De Gloria en Gloria.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/De%20Gloria%20en%20Gloria.mp3'},
    {id: 11, name: 'En el nombre de Jesus', fileName: 'El nombre de Jesus.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/El%20nombre%20de%20Jesus.mp3'},
    {id: 12, name: 'El poder de tu victoria', fileName: 'El poder de tu victoria.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/El%20poder%20de%20tu%20victoria.mp3'},
    {id: 13, name: 'Glorioso dia', fileName: 'Glorioso dia.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Glorioso%20dia.mp3'},
    {id: 14, name: 'Gracia sublime', fileName: 'Gracia Sublime.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Gracia%20Sublime.mp3'},
    {id: 15, name: 'La Bondad de Dios - Full', fileName: 'La Bondad de Dios - Full.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/La%20Bondad%20de%20Dios%20-%20Full.mp3'},
    {id: 16, name: 'Nada es Imposible', fileName: 'Nada Es Imposible - Bb.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Nada%20Es%20Imposible%20-Bb.mp3'},
    {id: 17, name: 'Nada es Imposible - Planershakers', fileName: 'Nada es imposible - Planetshakers.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Nada%20es%20imposible%20-%20Planetshakers.mp3'},
    {id: 18, name: 'Poderoso Dios', fileName: 'Poderoso Dios.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Poderoso%20Dios.mp3'},
    {id: 19, name: 'Que se abra el Cielo', fileName: 'Que se abra el Ciel-Bb.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Que%20se%20abra%20el%20Ciel-Bb.mp3'},
    {id: 20, name: 'Que se abra el Cielo - Ish Melton Version', fileName: 'que se abra el cielo - ish melton.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/que%20se%20abra%20el%20cielo%20-%20ish%20melton.mp3'},
    {id: 21, name: 'Ver la Victoria', fileName: 'See A Victory.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/See%20A%20Victory.mp3'},
    {id: 22, name: 'Señor eres fiel - Israel', fileName: 'Señor eres fiel - Israel.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Señor%20eres%20fiel%20-%20Israel.mp3'},
    {id: 23, name: 'Señor eres fiel', fileName: 'Señor eres fiel.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Señor%20eres%20fiel.mp3'},
    {id: 24, name: 'Tu Fidelidad - 25 Conmemorativo', fileName: 'Tu Fidelidad-25 Concierto Conmemorativo-F.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Tu%20Fidelidad-25%20Concierto%20Conmemorativo-F.mp3'},
    {id: 25, name: 'Tu Fidelidad', fileName: 'Tu Fidelidad-F.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Tu%20Fidelidad-F.mp3'},
    {id: 26, name: 'Coritos Campfire - Israel Hougthon (Con Voces)', fileName: 'coritosCampfire_Voices.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/coritosCampfire_Voices.mp3'},
    {id: 27, name: 'Aguas Profundas (Sin Voces y Click en oido izquierdo)', fileName: 'Praise_Drum.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Aguas%20Profundas.mp3'},
    {id: 28, name: 'Echo (Sin Voces y Click en oido izquierdo)', fileName: 'Echo.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/Echo.mp3'},
    {id: 29, name: 'Hermoso nombre (Sin Voces y Click en oido izquierdo)', fileName: 'hermoso nombre.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/hermoso%20nombre.mp3'},
    {id: 29, name: 'Hay un Rey', fileName: 'hay un rey.mp3', link: 'https://cdn.jsdelivr.net/gh/lmgeek/cdn/audios/hay%20un%20rey.mp3'},

  ];

  public getSounds (): any[] {
    return this.sounds;
  }

  public play (url: string): void {
    this.stop();
    if (!this.audio) {
      this.audio = new Audio();
    }
    this.audio.src = url;
    this.isPlayingSubject.next(true);
  }

  public stop (): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlayingSubject.next(false);
    }
  }
}
