#!/bin/sh

set -eux


rm -rf compiled/
rm -rf dist/
yarn tsc -p .
yarn run ef-tspm
cp -r compiled/ dist/
cp package.json dist/
cp LICENSE dist/
cp README.md dist/
cd dist/
npm pack
