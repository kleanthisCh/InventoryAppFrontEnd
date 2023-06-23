import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import {
  ProductReadOnlyDTO,
  ProductCreateDTO,
  ProductUpdateDTO,
} from './product.interfaces';

const PRODUCT_API = 'https://localhost:7276/api/Products';


@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<ProductReadOnlyDTO[]>(`${PRODUCT_API}`)
      .pipe(delay(500));
  }

  insertProduct(product: ProductCreateDTO) {
    return this.http
      .post<ProductCreateDTO>(`${PRODUCT_API}`, product)
      .pipe(delay(500));
  }

  updateProduct(product: ProductUpdateDTO, id: number) {
    return this.http
      .put<ProductUpdateDTO>(`${PRODUCT_API}/${id}`, product)
      .pipe(delay(500));
  }

  getProduct(id: number) {
    return this.http
      .get<ProductReadOnlyDTO[]>(`${PRODUCT_API}/${id}`)
      .pipe(delay(500));
  }

  getProductByModel(model: string) {
    return this.http
      .get<ProductReadOnlyDTO[]>(`${PRODUCT_API}/GetProductByModel/${model}`)
      .pipe(delay(500));
  }

  deleteProduct(id: number) {
    return this.http.delete(`${PRODUCT_API}/${id}`).pipe(delay(500));
  }
}
