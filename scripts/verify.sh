#!/usr/bin/env bash
set -euo pipefail

log() {
  printf '\n\033[1;34m➡ %s\033[0m\n' "$1"
}

fail() {
  printf '\n\033[1;31m[Error]\033[0m %s\n' "$1" >&2
  exit 1
}

if ! command -v pnpm >/dev/null 2>&1; then
  fail "pnpm no está disponible en el PATH. Ejecuta 'corepack enable' y luego 'pnpm -v' para instalarlo antes de continuar."
fi

if ! pnpm --version >/dev/null 2>&1; then
  fail "No se pudo obtener la versión de pnpm. Verifica tu conexión o instala pnpm manualmente."
fi

run_step() {
  local description=$1
  shift
  log "$description"
  if ! "$@"; then
    fail "El comando '$*' falló. Revisa el mensaje anterior, corrige el problema y vuelve a ejecutar el script."
  fi
}

run_step "Instalando dependencias (si es necesario)" pnpm install --frozen-lockfile
run_step "Ejecutando lint" pnpm lint
run_step "Compilando proyectos" pnpm build

if node -e "process.exit(require('./package.json').scripts?.test ? 0 : 1)"; then
  run_step "Ejecutando tests" pnpm test
else
  log "No se definió un script de test en package.json; se omite este paso"
fi

log "¡Verificaciones completadas con éxito!"
