# Imagem do docker
FROM node

# Diretorio onde ficara salvo os arquivos da aplicacao
WORKDIR /usr/app

# Copiando package.json para a pasta app
COPY package.json ./

# Instalando as dependencias
RUN npm install

# Copiando todos os arquivos da aplicacao para a pasta app
COPY . .

# Expondo a porta 3333
EXPOSE 3333

# Iniciando a aplicacao
CMD ["npm", "run", "dev"]