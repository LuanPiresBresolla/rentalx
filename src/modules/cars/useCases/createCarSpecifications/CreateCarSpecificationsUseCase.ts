import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationsUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError('Car does not exist');
    }
  }
}

export { CreateCarSpecificationsUseCase };
