import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/form-usuario/usuario.model';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseRestService {

  public buscarTodos(): Observable<Usuario[]> {
    return this.getter<Array<Usuario>>(`users`);
  }

  public buscarPorId(id: number): Observable<Usuario> {
    return this.getter<Usuario>(`users/${id}`);
  }

  public salvar(usuario: Usuario): Observable<Usuario> {
    // Verifica se o usuário já tem ID, se tiver chama o PUT para atual, senão o POST para inserir
    if (usuario.id) {
      usuario.dateUpdate = new Date();
      return this.put<Usuario>(`users/${usuario.id}`, usuario);
    } else {
      usuario.dateInsert = new Date();
      return this.post<Usuario>('users', usuario);
    }
  }

  public excluir(id: number): Observable<void> {
    return this.delete(`users/${id}`);
  }

}
