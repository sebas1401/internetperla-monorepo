# InternetPerla Monorepo

Monorepo TypeScript con pnpm + Turborepo:
- Backend: NestJS + TypeORM + PostgreSQL
- Web: Next.js (App Router)
- Mobile: Expo/React Native
- Paquetes compartidos: UI y DTOs

## Requisitos
- Node.js 20 (recomendado) o 18+
- pnpm 10.18.1 (se activa con Corepack)
- Docker + Docker Compose (para la base de datos)

## 1) Clonar el repo
```
git clone https://github.com/sebas1401/internetperla-monorepo.git
cd internetperla-monorepo
```

## 2) Preparar pnpm e instalar dependencias
```
corepack enable
corepack prepare pnpm@10.18.1 --activate
pnpm install
```

## 3) Levantar la base de datos (Docker)
```
docker compose -f infra/docker-compose.yml up -d
```
Se crea un PostgreSQL en `localhost:5433` y pgAdmin en `http://localhost:5050`.
- DB: user `postgres`, pass `postgres`, db `internetperla`
- pgAdmin: email `admin@internetperla.local`, pass `admin123`

## 4) Variables de entorno
En backend, copia el ejemplo y ajusta si hace falta:
```
cp apps/backend/.env.example apps/backend/.env
```
Valores por defecto ya apuntan a `localhost:5433` (Docker de arriba).

## 5) Migraciones y datos iniciales
```
pnpm --filter backend... db:migrate:run
pnpm --filter backend... db:seed
```

## 6) Ejecutar en desarrollo
- Backend (NestJS):
  - `pnpm dev:backend` → http://localhost:3000 (Swagger en `/api/docs` si está habilitado)
- Web (Next.js):
  - `pnpm dev:web` → http://localhost:3001
- Mobile (Expo):
  - `pnpm dev:mobile` → abre Expo (QR en la terminal)

También puedes correr todo en paralelo:
```
pnpm dev
```

## Alternativa con npm (si no quieres usar pnpm)
- Todos en paralelo: `npm run dev`
- Solo backend: `npm run dev:backend`
- Solo web: `npm run dev:web`
- Solo mobile: `npm run dev:mobile`
- Migraciones: `npm run --prefix apps/backend db:migrate:run`
- Seed: `npm run --prefix apps/backend db:seed`

## Estructura del repo
- `apps/backend`: API NestJS (TypeORM, migraciones, seed)
- `apps/web`: Frontend Next.js
- `apps/mobile`: App Expo/React Native
- `packages/config`: Configuración compartida (tsconfig, prettier, eslint, etc.)
- `packages/shared-dtos`: DTOs compartidos
- `packages/ui`: Componentes compartidos para web
- `infra/docker-compose.yml`: Postgres + pgAdmin para desarrollo local

## Problemas comunes (Windows/PowerShell)
- Si PowerShell bloquea los scripts de pnpm/npm:
  - usa `cmd /c pnpm <comando>` o `pnpm.cmd <comando>`
  - o habilita temporalmente: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
- Conflictos de puertos:
  - Postgres usa `5433` en host → cambia en `apps/backend/.env` si lo necesitas.
- Versiones:
  - Verifica `pnpm -v` (10.18.1) y `node -v` (20.x recomendado). En CI ya están alineados.

## Scripts útiles
- `pnpm dev` / `dev:backend` / `dev:web` / `dev:mobile`
- `pnpm --filter backend... db:migrate:run`
- `pnpm --filter backend... db:seed`

## CI
GitHub Actions construye backend, web y mobile. Se ajustó a pnpm 10.18.1 y Node 20.

