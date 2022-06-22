echo "Installing all dependencies"
yarn bootstrap

echo "Building all packages"
yarn build

echo "Backend initiating"
yarn run start:staging