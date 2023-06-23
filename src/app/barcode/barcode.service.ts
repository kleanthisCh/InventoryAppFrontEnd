import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import {
  BarcodeReadOnlyDTO,
  BarcodeCreateDTO,
  BarcodeUpdateDTO,
} from './barcode.interfaces';

const BARCODE_API = 'https://localhost:7276/api/Barcodes';

@Injectable()
export class BarcodeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<BarcodeReadOnlyDTO[]>(`${BARCODE_API}`)
      .pipe(delay(500));
  }

  insertBarcode(barcode: BarcodeCreateDTO) {
    return this.http
      .post<BarcodeCreateDTO>(`${BARCODE_API}`, barcode)
      .pipe(delay(500));
  }

  updateBarcode(barcode: BarcodeUpdateDTO, id: string) {
    return this.http
      .put<BarcodeUpdateDTO>(`${BARCODE_API}/${id}`, barcode)
      .pipe(delay(500));
  }

  deleteBarcode(id: string) {
    return this.http.delete(`${BARCODE_API}/${id}`).pipe(delay(500));
  }
}
