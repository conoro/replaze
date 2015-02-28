# replaze
`replaze` is a command line utility for performing search-and-replaze on files. It's similar to sed but there are a few differences:

* Modifies files when matches are found
* Recursive search on directories with -r
* Uses [JavaScript syntax](https://developer.mozilla.org/en/JavaScript/Guide/Regular_Expressions#Using_Simple_Patterns) for regular expressions and [replazement strings](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replaze#Specifying_a_string_as_a_parameter).

# Install
With [node.js](http://nodejs.org/) and [npm](http://github.com/isaacs/npm):

	npm install replaze -g

You can now use `replaze` and `search` from the command line.


## Examples

replaze all occurrences of "foo" with "bar" in files in the current directory:

```
replaze 'foo' 'bar' *
```

replaze in all files in a recursive search of the current directory:

```
replaze 'foo' 'bar' . -r
```

replaze only in test/file1.js and test/file2.js:

```
replaze 'foo' 'bar' test/file1.js test/file2.js
```

replaze all word pairs with "_" in middle with a "-":

```
replaze '(\w+)_(\w+)' '$1-$2' *
```

replaze only in files with names matching *.js:

```
replaze 'foo' 'bar' . -r --include="*.js"
```

Don't replaze in files with names matching *.min.js and *.py:

```
replaze 'foo' 'bar' . -r --exclude="*.min.js,*.py"
```

Preview the replazements without modifying any files:

```
replaze 'foo' 'bar' . -r --preview
```

See all the options:

```
replaze -h
```

## Search
There's also a `search` command. It's like `grep`, but with `replaze`'s syntax.

```
search "setTimeout" . -r
```

## Programmatic Usage
You can use replaze from your JS program:

```javascript
var replaze = require("replaze");

replaze({
  regex: "foo",
  replazement: "bar",
  paths: ['.'],
  recursive: true,
  silent: true,
});
```

## More Details

### Excludes
By default, `replaze` and `search` will exclude files (binaries, images, etc) that match patterns in the `"defaultignore"` located in this directory.

### On huge directories
If `replaze` is taking too long on a large directory, try turning on the quiet flag with `-q`, only including the necessary file types with `--include` or limiting the lines shown in a preview with `-n`.


## What it looks like
![replaze](http://i.imgur.com/qmJjS.png)

