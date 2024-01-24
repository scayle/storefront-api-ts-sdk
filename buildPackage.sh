#!/bin/sh

set -eux


rm -rf compiled/
rm -rf dist/
yarn test
yarn build
find compiled -name '__tests__' -type d -exec rm -rf "{}" +
cp -r compiled/ dist/
cp package.json dist/
cp LICENSE dist/
cp README.md dist/
cp CHANGELOG.md dist/
cd dist/
npm pack