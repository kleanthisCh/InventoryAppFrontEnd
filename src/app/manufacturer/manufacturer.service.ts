import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManufacturerCreateDTO, ManufacturerReadOnlyDTO, ManufacturerUpdateDTO } from './manufacturer.interfaces';
import { delay } from 'rxjs';

const MANUFACURER_API = 'https://localhost:7276/api/Manufacturers';



@Injectable()
export class ManufacturerService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<ManufacturerReadOnlyDTO[]>(`${MANUFACURER_API}`)
      .pipe(delay(500));
  }

  insertManufacturer(manufacturer: ManufacturerCreateDTO) {
    return this.http
      .post<ManufacturerCreateDTO>(`${MANUFACURER_API}`, manufacturer)
      .pipe(delay(500));
  }

  updateManufacturer(manufacturer: ManufacturerUpdateDTO, id: number) {
    return this.http
      .put<ManufacturerUpdateDTO>(`${MANUFACURER_API}/${id}`, manufacturer)
      .pipe(delay(500));
  }

  deleteManufacturer(id: number){
    return this.http
      .delete(`${MANUFACURER_API}/${id}`)
      .pipe(delay(500));
  }
}

