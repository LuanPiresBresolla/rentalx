import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from './Category';

@Entity('cars')
class Car {
  @PrimaryColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('numeric')
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column('numeric')
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @Column('boolean')
  available = true;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Car };
