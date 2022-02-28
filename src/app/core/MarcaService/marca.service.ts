import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {Vehiculo} from '../../models/vehiculos';
import { Marca } from 'src/app/models/marca';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {


  private baseUrl = environment.baseUrl + "marca"

  constructor(
    private http : HttpClient
  ) { }

  get(): Observable<Marca[]>{
    return this.http.get<Marca[]>(`${this.baseUrl}`).pipe(
      map(data => {
        return data;
      })
    )
  }

  postSave(marca: Marca){
    return this.http.post(`${this.baseUrl}`, marca);
  }

  show(id: string):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
}

   destroy(id : string): Observable<any>{
     return this.http.delete(`${this.baseUrl}/${id}`);
   }
}
