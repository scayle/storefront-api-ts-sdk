#!/bin/sh

set -eux

rm -rf compiled/ endpoints/ helpers/ interfaces/ test-helpers/ types/
yarn tsc
find compiled -name '__tests__' -type d -exec rm -rf "{}" +
cp -r compiled/* ./
