import csvParse from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategoris(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      // Criando Stream do arquivo
      const stream = fs.createReadStream(file.path);

      // Instanciando csvParse
      const parseFile = csvParse();

      // Repassando a leitura do arquivo para o csvParse
      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          // Iniciando a leitura do arquivo
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          // Quando terminar todo o processo de leitura finaliza a promise
          resolve(categories);
        })
        .on('error', err => {
          // Caso ocorra algum erro ele retorna o reject
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategoris(file);

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
