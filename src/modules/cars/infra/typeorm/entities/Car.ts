import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

// @Entity('cars')
class Car {
  // @PrimaryColumn()
  id?: string;

  // @Column()
  name: string;

  // @Column()
  description: string;

  daily_rate: number;
  license_plate: string;
  file_amount: number;
  brand: string;
  category_id: string;
  available?: boolean;

  // @CreateDateColumn()
  created_at: Date;

  // @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export { Car };
