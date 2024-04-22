import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  private myAPI = "http://localhost:3000/infraestrutura";

  constructor(private http:HttpClient) { }

  buscaDados():Observable<any>{
    return this.http.get<any>(`${this.myAPI}`);
  }

  submeterDados(value:any):Observable<any>{
    return this.http.post<any>(`${this.myAPI}`, value);
  }

  atulizarDados(value:any,id: number):Observable<any>{
    return this.http.put<any>(`${this.myAPI}/`+id , value);
  }

  apagarDados(id:any):Observable<any>{
    return this.http.delete<any>(`${this.myAPI}/`+id);
  }


}
