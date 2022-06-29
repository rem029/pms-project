echo "Update packages"
yarn run bootstrap

echo "Build backend"
yarn run build:backend

echo "Reloading PM2 Application"
pm2 reload pm-app-staging
