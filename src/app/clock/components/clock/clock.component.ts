import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RESET, START, STOP, WAIT } from '@clock/constants/clock.constants';
import { fromEvent, interval, merge, Observable, of, throwError, timer } from 'rxjs';
import {
  map,
  filter,
  buffer,
  debounceTime,
  mapTo,
  switchMap,
  scan,
  catchError,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements AfterViewInit {

  public time$: Observable<number>;
  public time = 0;

  @ViewChild('start', { static: true })
  startBtn: ElementRef;

  @ViewChild('stop', { static: true })
  pauseBtn: ElementRef;

  @ViewChild('reset', { static: true })
  resetBtn: ElementRef;

  @ViewChild('wait', { static: true })
  waitBtn: ElementRef;

  ngAfterViewInit() {
    const start$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(mapTo(START));
    const stop$ = fromEvent(this.pauseBtn.nativeElement, 'click').pipe(mapTo(STOP));
    const reset$ = fromEvent(this.resetBtn.nativeElement, 'click').pipe(mapTo(RESET));
    const wait$ = fromEvent(this.waitBtn.nativeElement, 'dblclick').pipe(mapTo(WAIT));

    this.time$ = merge(start$, stop$, reset$, wait$).pipe(
      switchMap((status: string) => this.manageStatus(status)),
      scan((accumulatedValue: number, currentValue: number) => this.manageTime(accumulatedValue, currentValue)),
      catchError((err) => throwError(err))
    );    
  }

  public manageStatus(status: string): Observable<any> {
    switch(status) {
      case 'start': return interval(1000); break;
      case 'stop': return interval(1000).pipe(tap(() => this.time = 0)); break;
      case 'reset': return of(null); break;
      case 'wait': return interval(1000).pipe(debounceTime(1500)); break;
    }
  }

  public manageTime(accumulatedValue: number, currentValue: number): number {
    if (!currentValue && typeof currentValue === 'number') {
      this.time = accumulatedValue;
    } else if (currentValue === null) {
      this.time = 0;
      currentValue = 0;
    }
      return currentValue + this.time;  
  }
}