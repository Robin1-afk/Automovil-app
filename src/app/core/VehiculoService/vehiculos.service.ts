import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {Vehiculo} from '../../models/vehiculos';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private baseUrl = environment.baseUrl + "vehiculo"
  constructor(
    private http : HttpClient
  ) { }

  get(): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${this.baseUrl}`).pipe(
      map(data => {
        return data;
      })
    )
  };

  show(id: string):Observable<any>{
      return this.http.get(`${this.baseUrl}/${id}`);
  }

  postSave(vehiculo: Vehiculo){
    return this.http.post(`${this.baseUrl}`, vehiculo);
  }

  destroy(id : string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}



