# InternetPerla: Resumen del Monorepo

Este documento ofrece una visión rápida del monorepo para ayudarte a ubicar los proyectos principales y los flujos de trabajo de desarrollo.

## Apps principales
- **apps/backend**: API construida con NestJS. Usa TypeORM para el acceso a datos y PostgreSQL como base de datos. Incluye migraciones y scripts de seed para poblar datos iniciales.
- **apps/web**: Frontend en Next.js con App Router. Consume la API del backend y comparte componentes UI reutilizables desde `packages/ui`.
- **apps/mobile**: Aplicación Expo/React Native que reutiliza la lógica y DTOs compartidos.

## Paquetes compartidos
- **packages/config**: Configuración centralizada de TypeScript, ESLint, Prettier y otras herramientas.
- **packages/shared-dtos**: Definiciones de DTO que mantienen sincronizados el backend y los clientes.
- **packages/ui**: Biblioteca de componentes reutilizables para las interfaces de usuario web.

## Flujo de desarrollo recomendado
1. Instala dependencias con pnpm (`pnpm install`).
2. Levanta la base de datos local con Docker Compose (`docker compose -f infra/docker-compose.yml up -d`).
3. Copia y ajusta las variables de entorno del backend (`cp apps/backend/.env.example apps/backend/.env`).
4. Ejecuta migraciones y seed (`pnpm --filter backend... db:migrate:run` y `pnpm --filter backend... db:seed`).
5. Inicia los servicios necesarios:
   - Backend: `pnpm dev:backend`
   - Web: `pnpm dev:web`
   - Mobile: `pnpm dev:mobile`
   - Todos en paralelo: `pnpm dev`

## Cómo verificar antes de hacer commit
Puedes ejecutar todas las verificaciones recomendadas con `./scripts/verify.sh`, que automatiza los pasos descritos abajo. Si prefieres realizarlos manualmente, sigue este orden para confirmar que los cambios no romperán los pipelines ni los hooks de Git:

1. Asegúrate de tener pnpm disponible ejecutando `corepack enable` y luego `pnpm -v`. Si el comando descarga pnpm por primera vez, espera a que termine antes de continuar.
2. Instala dependencias si aún no lo hiciste: `pnpm install`.
3. Valida el formato y los linters: `pnpm lint`. Turborepo ejecutará los linters de cada paquete y reproducirá lo que corre el hook de pre-commit.
4. Compila para detectar errores de TypeScript o de build: `pnpm build`.
5. Ejecuta pruebas automatizadas cuando existan: `pnpm test`.

Si alguno de los comandos falla, corrige los errores antes de crear el commit. En entornos sin acceso a Internet deberás tener pnpm y las dependencias ya instaladas localmente para que los comandos funcionen.

> 💡 El script `scripts/verify.sh` detendrá la ejecución si pnpm no está disponible o si alguna verificación falla, mostrándote el mensaje de error correspondiente para que lo puedas resolver.

## Herramientas clave
- **Node.js 20+** y **pnpm 10.18.1** (gestionado con Corepack).
- **Docker + Docker Compose** para la base de datos PostgreSQL y pgAdmin de desarrollo.
- **Turborepo** para orquestar la ejecución de tareas y el caching entre paquetes.

## CI/CD
GitHub Actions valida la construcción de backend, web y mobile usando las versiones fijadas de Node y pnpm. Ajusta los pipelines según sea necesario cuando agregues nuevas apps o paquetes.

Este resumen complementa el `README.md`, proporcionando una referencia rápida cuando explores el repositorio por primera vez.
