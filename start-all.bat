@echo off
echo Building frontend...
cd front_end_usuario\tela-compras
call npm run build
cd ..\..

echo Generating Prisma client...
cd back_end\lista-compras-api
call npx prisma generate

echo Starting backend...
call npm run start:dev
