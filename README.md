# internetperla monorepo

Monorepo TypeScript con pnpm + Turborepo, con apps (backend NestJS, web Next.js App Router, mobile Expo) y paquetes compartidos.

## Requisitos
- Node.js 18+
- pnpm 9+

## Instalación
- pnpm install

## Infra (opcional)
- docker compose -f infra/docker-compose.yml up -d

## Variables de entorno
- Copia los `.env.example` de cada app a su `.env` local y ajusta valores si es necesario.

## Desarrollo
- pnpm dev:backend → Nest en http://localhost:3000/api/docs
- pnpm dev:web → Next en http://localhost:3001
- pnpm dev:mobile → Expo (QR en terminal)

