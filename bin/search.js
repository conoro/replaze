#!/usr/bin/env node

var nomnom = require("nomnom"),
    replaze = require("../replaze"),
    sharedOptions = require("./shared-options");

var options = nomnom.options(sharedOptions)
  .script("search")
  .parse();

replaze(options);
