export interface Barcode {
  barcodeId: string;
  quantity: number;
  size: string;
  productId: number;
  model: string;
}

export interface ProductReadOnlyDTO {
  productId: number;
  model: string;
  genderId: number;
  typeId: number;
  manufacturerId: number;
  description: string;
  genderDescription: string;
  typeDescription: string;
  manufacturerName: string;

  barcodes: Barcode[];
}

export interface ProductCreateDTO {
  model: string;
  genderId: number;
  typeId: number;
  manufacturerId: number;
  description: string;
}

export interface ProductUpdateDTO {
  model: string;
  genderId: number;
  typeId: number;
  manufacturerId: number;
  description: string;
}
