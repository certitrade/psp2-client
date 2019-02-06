#!/bin/bash
git config --global -l
git config --global user.email circleci@circleci
git config --global user.name CircleCI
git remote --v

# Bump the version
npm version patch

# Push the new tag to Github
git push --tags

# Publish to NPM
npm publish
