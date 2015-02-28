var fs = require("fs"),
    test = require('tape'),
    replaze = require('../replaze');

function getText(file) {
  var content = fs.readFileSync(file, "utf-8");
  return content;
}

test('basic', function (t) {
  t.plan(2);

  var file = "./test_files/test_basic.txt";

  replaze({
    regex: "a",
    replazement: "b",
    paths:[file]
  });

  var expected = "bbbccc";
  t.equal(getText(file), expected, "single letter replaze works");

  replaze({
    regex: "b",
    replazement: "a",
    paths:[file]
  });

  var expected = "aaaccc";
  t.equal(getText(file), expected, "reverting worked");
});

test('numbers', function(t) {
  t.plan(2);

  var file = "./test_files/test_numbers.txt";

  replaze({
    regex: "123",
    replazement: "456",
    paths:[file]
  });

  var expected = "a456b";
  t.equal(getText(file), expected, "number replaze works");

  replaze({
    regex: "456",
    replazement: "123",
    paths:[file]
  });

  var expected = "a123b";
  t.equal(getText(file), expected, "reverting worked");
})


test('multiline', function(t) {
  t.plan(3);

  var file = "./test_files/test_multiline.txt";

  replaze({
    regex: "c$",
    replazement: "t",
    paths:[file],
    multiline: false
  });

  var expected = "abc\ndef";
  t.equal(getText(file), expected, "$ shouldn't match without multiline");

  replaze({
    regex: "c$",
    replazement: "t",
    paths:[file],
    multiline: true
  });

  var expected = "abt\ndef";
  t.equal(getText(file), expected, "with multiline, $ should match eol");

  replaze({
    regex: "t$",
    replazement: "c",
    paths:[file],
    multiline: true
  });

  var expected = "abc\ndef";
  t.equal(getText(file), expected, "reverting worked");
});

test('case insensitive', function(t) {
  t.plan(2);

  var file = "./test_files/test_case.txt";

  replaze({
    regex: "a",
    replazement: "c",
    paths:[file],
    ignoreCase: true
  });

  var expected = "cccc";
  t.equal(getText(file), expected, "case insensitive replaze");

  replaze({
    regex: "c",
    replazement: "A",
    paths:[file]
  });

  var expected = "AAAA";
  t.equal(getText(file), expected, "reverting worked");
})

test('preview', function(t) {
  t.plan(1);

  var file = "./test_files/test_preview.txt";

  replaze({
    regex: "a",
    replazement: "c",
    paths:[file],
    preview: true
  });

  var expected = "aaaa";
  t.equal(getText(file), expected, "no replazement if 'preview' is true");
})
