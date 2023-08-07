import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  targetTime: Date = new Date();
  valueTiem: string = "";
  currentTime: Date = new Date();
  timeRemaining: number = 0;
  hoursRemaining: number = 0;
  minutesRemaining: number = 0;
  secondsRemaining: number = 0;
  timerInterval: any;

  constructor() { }

  ngOnInit(): void {
    // Si no se ingresa una hora targetTime, se toma la hora actual del sistema
    if (!this.targetTime) {
      this.targetTime = new Date();
    }

    this.updateTimeRemaining();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  updateTimeRemaining(): void {
    const now = new Date();
    this.timeRemaining = this.targetTime.getTime() - now.getTime();
    if (this.timeRemaining <= 0) {
      const timeDifference = now.getTime() - this.targetTime.getTime();
      this.hoursRemaining = Math.floor(timeDifference / 3600000);
      this.minutesRemaining = Math.floor((timeDifference % 3600000) / 60000);
      this.secondsRemaining = Math.floor((timeDifference % 60000) / 1000);
    } else {
      this.hoursRemaining = Math.floor(this.timeRemaining / 3600000);
      this.minutesRemaining = Math.floor((this.timeRemaining % 3600000) / 60000);
      this.secondsRemaining = Math.floor((this.timeRemaining % 60000) / 1000);
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.updateTimeRemaining();
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  //cambio de hora cuando se utiliza el imput, para pruebas
  onTargetTimeChange(): void {
    this.stopTimer();
    const [hoursStr, minutesStr] = this.valueTiem.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    this.targetTime = new Date();
    this.targetTime.setHours(hours, minutes, 0); // Establecer nuevas horas y minutos
    this.updateTimeRemaining();
    this.startTimer();
  }
}
