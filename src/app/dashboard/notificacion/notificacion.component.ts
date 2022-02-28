import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  notificaciones = [
    ["2018-12-01", "AM","ID123", 5000​],
    ["2018-12-01", "AM","ID545", 7000​],
    ["2018-12-01", "PM","ID545", 3000​],
    ["2018-12-02", "AM","ID545", 7000​],

    ]

}