import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import {
  BarcodeReadOnlyDTO,
  BarcodeCreateDTO,
  BarcodeUpdateDTO,
} from "../barcode/barcode.interfaces"


const BARCODE_API = 'https://localhost:7276/api/Barcodes';
// /api/Bacdeors / AddOne / { id };
@Injectable()
export class QuickMenuService {
  constructor(private http: HttpClient) {}

  AddOne(id: string) {
    return this.http.put(`${BARCODE_API}/AddOne/${id}`,null).pipe(delay(500));
  }

  SubOne(id: string) {
    return this.http.put(`${BARCODE_API}/SubOne/${id}`,null).pipe(delay(500));
  }
}
