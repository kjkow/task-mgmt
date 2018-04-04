import { Injectable } from '@angular/core';

export interface Task {
  nazwa: string;
  obszar: string; //TODO: enum obszar zadan
  priorytet?: number;
  termin?: Date;
  komentarz?: string;
  sekcja?: string;
  czestotliwoscPowtarzalnosci?: number;
  typCzestotliwosci?: string; //TODO: enum czestotliwosc zadania
  idUzytkownika: number;
  etykiety?: Array<string> //TODO: obiekt etykiety
}

@Injectable()
export abstract class TaskService {

  abstract getUsersTasks(userId): Array<Task>;

}
