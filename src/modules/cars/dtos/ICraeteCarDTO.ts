export interface ICreateCarDTO {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  file_amount: number;
  brand: string;
  category_id: string;
  available?: boolean;
}
