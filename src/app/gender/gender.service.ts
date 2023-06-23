import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay } from 'rxjs';
import {
  GenderReadOnlyDTO,
  GenderCreateDTO,
  GenderUpdateDTO,
} from './gender.interfaces';

const GENDER_API = 'https://localhost:7276/api/Genders';

@Injectable()
export class GenderService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<GenderReadOnlyDTO[]>(`${GENDER_API}`).pipe(delay(500));
  }

  insertGender(gender: GenderCreateDTO) {
    return this.http
      .post<GenderCreateDTO>(`${GENDER_API}`, gender)
      .pipe(delay(500));
  }

  updateGender(gender: GenderUpdateDTO, id: number) {
    return this.http
      .put<GenderUpdateDTO>(`${GENDER_API}/${id}`, gender)
      .pipe(delay(500));
  }

  deleteGender(id: number) {
    return this.http.delete(`${GENDER_API}/${id}`).pipe(delay(500));
  }
}
