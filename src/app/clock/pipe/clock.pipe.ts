import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clock'
})
export class ClockPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor((value / 60) / 60);
        const minutes = Math.floor(value / 60) % 60; 
        const seconds = value % 60;
    
        return `${this.countZero(hours)}:${this.countZero(minutes)}:${this.countZero(seconds)}`;
    }
    public countZero(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }
}
