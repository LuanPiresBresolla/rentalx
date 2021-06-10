import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/fakes/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('Should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Hatch',
      description: 'Veículos na categoria hatch',
    });

    expect(category).toHaveProperty('id');
  });

  it('Should not be able to create a new category with same name', async () => {
    await createCategoryUseCase.execute({
      name: 'Hatch',
      description: 'Veículos na categoria hatch',
    });

    await expect(
      createCategoryUseCase.execute({
        name: 'Hatch',
        description: 'Veículos na categoria hatch',
      }),
    ).rejects.toEqual(new AppError('Category already exists'));
  });
});
