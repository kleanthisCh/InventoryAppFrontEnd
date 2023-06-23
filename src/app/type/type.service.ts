import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { TypeCreateDTO, TypeReadOnlyDTO, TypeUpdateDTO } from './type.interfaces';

const TYPE_API = 'https://localhost:7276/api/Types';

@Injectable()
export class TypeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<TypeReadOnlyDTO[]>(`${TYPE_API}`).pipe(delay(500));
  }

  insertType(gender: TypeCreateDTO) {
    return this.http
      .post<TypeCreateDTO>(`${TYPE_API}`, gender)
      .pipe(delay(500));
  }

  updateType(gender: TypeUpdateDTO, id: number) {
    return this.http
      .put<TypeUpdateDTO>(`${TYPE_API}/${id}`, gender)
      .pipe(delay(500));
  }

  deleteType(id: number) {
    return this.http.delete(`${TYPE_API}/${id}`).pipe(delay(500));
  }
}
