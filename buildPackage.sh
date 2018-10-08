#!/bin/sh

set -eux

rm -rf compiled/ &&
yarn tsc -p . && 
yarn run ef-tspm &&
npm pack
