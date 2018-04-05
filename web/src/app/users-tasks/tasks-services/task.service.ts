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

  /**
   * Get tasks for specified areas
   * @param userId user id
   * @param area task's area
   */
  abstract getUsersTasksForArea(userId: number, area: Obszar): Array<Task>;

  /**
   * Create new task
   * @param task new task to save
   * @returns newly created task
   */
  abstract addTask(task: Task): Task;

}
