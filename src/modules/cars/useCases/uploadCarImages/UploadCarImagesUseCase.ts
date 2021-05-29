import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  images: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images }: IRequest): Promise<void> {
    images.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
