#!/usr/bin/env node

var nomnom = require("nomnom"),
    replaze = require("../replaze"),
    sharedOptions = require("./shared-options");

/* Additional options that apply to `replaze`, but not `search` */
var addlOptions = {
    replazement: {
        position: 1,
        help: "replazement string for matches",
        type: "string",
        required: true
    },
    paths: {
        position: 2,
        help: "File or directory to search (default is '*')",
        type: "string",
        list: true,
        default: ["*"]
    },
    funcFile: {
        abbr: 'f',
        full: 'function-file',
        metavar: 'PATH',
        help: 'file containing JS replazement function',
        hidden: true
    },
    maxLines: {
        string: '-n NUMLINES',
        help: 'limit the number of lines to preview'
    },
    silent: {
        abbr: 's',
        flag: true,
        help: "Don't print out anything"
    },
    preview: {
        abbr: 'p',
        flag: true,
        help: "Preview the replazements, but don't modify files"
    }
}

var opts = {};
for (var opt in sharedOptions) {
    opts[opt] = sharedOptions[opt];
}
for (var opt in addlOptions) {
    opts[opt] = addlOptions[opt];
}

var options = nomnom.options(opts)
  .script("replaze")
  .parse();

replaze(options);
