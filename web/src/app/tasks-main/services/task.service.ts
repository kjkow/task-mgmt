import { Injectable } from '@angular/core';
import { Obszar } from './obszar.enum';

export interface Task {
  nazwa: string;
  obszar: Obszar;
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

  abstract getUsersTasksForArea(userId: number, area: Obszar): Array<Task>;

}
