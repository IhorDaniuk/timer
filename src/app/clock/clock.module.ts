import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClockPipe } from '@clock/pipe/clock.pipe';
import { ClockComponent } from '@clock/components/clock/clock.component';

@NgModule({
  declarations: [ClockComponent, ClockPipe],
  exports: [ClockComponent],
  imports: [
    CommonModule
  ]
})
export class ClockModule { }
