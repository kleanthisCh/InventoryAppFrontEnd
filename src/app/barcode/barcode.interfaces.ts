export interface BarcodeReadOnlyDTO {
  barcodeId: string;
  quantity: number;
  size: string;
  productId: number;
  model: string;
}

export interface BarcodeCreateDTO {
  barcodeId: string;
  quantity: number;
  size: string;
  productId: number;
  model: string;
}

export interface BarcodeUpdateDTO {
  quantity: number;
  size: string;
  productId: number;
  model: string;
}
