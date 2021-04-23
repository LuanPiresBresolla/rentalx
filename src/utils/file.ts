import fs from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  const filenamePath = `./tmp/avatar/${filename}`;

  try {
    await fs.promises.stat(filenamePath);
  } catch (error) {
    return;
  }

  await fs.promises.unlink(filenamePath);
};
