#!/usr/bin/env bash

mv package.json package_local.json
mv gulpfile.js gulpfile_local.js
mv gulpfile_prod.js gulpfile.js
mv package_prod.json package.json
npm install
bower install
gulp
mv package.json package_prod.json
mv gulpfile.js gulpfile_prod.js
mv gulpfile_local.js gulpfile.js
mv package_local.json package.json
