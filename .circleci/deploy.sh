#!/bin/bash
git config --global -l
git config --global user.email circleci@circleci
git config --global user.name CircleCI

git remote --v

npm version patch
git push --tags
npm publish
