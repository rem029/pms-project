echo "Deploying update"
git pull origin main
pm2 reload all