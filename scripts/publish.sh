#!/bin/bash
set -e

echo 'Started process to publish goDiet...'

echo '🟡 - Verifying environment variables...'
source .env

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh

echo '🟢 - Environment variables are ready'

echo '🟡 - Changing to branch main and updating it...'

git checkout main
git pull origin main

echo '🟢 - Changed to branch main and updated'

echo '🟡 - Merging changes from origin/develop...'

git merge origin/develop

echo '🟢 - Merged with develop branch'

echo '🟡 - Running tests...'

npm run test:ci

echo '🟢 - Tests concluded with successfull'

echo '🟡 - Pushing modifications for remote branch...'

git push origin main

echo '🟢 - Application published with successfull'

echo '🟡 - Updating develop branch...'

git checkout develop
git merge main

echo '🟢 - Deployment finished'
