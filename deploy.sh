echo "Deploying update"
git pull origin main
echo "Reloading PM2 Application"
pm2 reload pm-app-staging