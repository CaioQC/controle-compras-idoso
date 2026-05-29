#!/bin/bash

echo "Building frontend..."
cd front_end_usuario/tela-compras
npm run build
cd ../..

echo "Generating Prisma client..."
cd back_end/lista-compras-api
npx prisma generate

echo "Starting backend..."
npm run start:dev
