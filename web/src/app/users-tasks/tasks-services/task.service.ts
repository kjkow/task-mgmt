import { Injectable } from '@angular/core';
import { Obszar } from './obszar.enum';
import { Observable } from 'rxjs';

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

  /**
   * Get tasks for specified areas
   * @param userId user id
   * @param area task's area
   */
  abstract getUsersTasksForArea(area: Obszar);

  /**
   * Create new task
   * @param task new task to save
   * @returns newly created task
   */
  //abstract addTask(task: Task): Observable<Task>;

  /**
   * Get task stream for specified area
   */
  abstract getTasksStream(area: Obszar): Observable<Array<Task>>

}
