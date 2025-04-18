#!/bin/sh

echo "📦 Running migration..."
npm run migrate

echo "🚀 Starting CLI with args: $@"
exec npm run start "$@"
