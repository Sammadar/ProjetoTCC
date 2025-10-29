import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NovoPaciente } from '@/models/paciente';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = `${environment.apiUrl}/pacientes`;
  }

  cadastrar(form: NovoPaciente): Observable<any>{
    return this.http.post<any>(this.urlApi, form); // criar
  }

  obterTodos(): Observable<Array<any>>{
    return this.http.get<Array<any>>(this.urlApi); // consultar todos
  } // consultar todos
  
//   apagar(id: number): Observable<any>{
//     return this.http.delete<any>(`${this.urlApi}/${id}`);
//     // return this.http.delete<any>(this.urlApi + "/" + id);
//   }

//   alterar(id: number, aluno: AlunoCadastro): Observable<any>{
//     return this.http.put<any>(`${this.urlApi}/${id}`, aluno);
//   }
}


/* HTTP METHODS:
  get => consultar um item em específico ou uma lista de itens
  post => criar um item
  delete => apagar um item específico
  put => alterar um registro

  200 => ok
  201 => created (criado)
  204 => no content => back-end n trouxe nenhum conteúdo, ok a parada
  404 => não encontrado
*/