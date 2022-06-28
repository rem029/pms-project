echo "Deploying update"
git pull origin main

echo "Update packages"
yarn bootstrap

echo "Build backend"
yarn build:backend

echo "Reloading PM2 Application"
pm2 reload pm-app-staging