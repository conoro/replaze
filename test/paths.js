var fs = require("fs"),
    test = require('tape'),
    replaze = require('../replaze');

function getText(file) {
  var content = fs.readFileSync(file, "utf-8");
  return content;
}

test('recursive', function (t) {
  t.plan(7);

  replaze({
    regex: "a",
    replazement: "b",
    paths: ["test_files/test_paths"],
    recursive: true
  });

  var changedFiles = [
    "./test_files/test_paths/test1.txt",
    "./test_files/test_paths/test2.txt",
    "./test_files/test_paths/sample1.txt"];
  var expected = "bbbb";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "recursive replaze on directory " + file);
  })

  var expected = "aaaa";
  var ignored = "./test_files/test_paths/test.png"
  t.equal(getText(ignored), expected, "skip file with match in defaultignore")

  replaze({
    regex: "b",
    replazement: "a",
    paths: ["test_files/test_paths"],
    recursive: true
  });

  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "reverting worked");
  });
});

test('include', function(t) {
  t.plan(5);

  replaze({
    regex: "a",
    replazement: "b",
    paths: ["test_files/test_paths"],
    recursive: true,
    include: "sample*.txt"
  });

  var changedFiles = [
    "./test_files/test_paths/sample1.txt",
  ];
  var expected = "bbbb";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "replaze in included file " + file);
  });

  var ignoredFiles = [
    "./test_files/test_paths/test1.txt",
    "./test_files/test_paths/test2.txt",
    "./test_files/test_paths/test.png"];
  var expected = "aaaa";
  ignoredFiles.forEach(function(file) {
    t.equal(getText(file), expected, "don't replaze in not-included file " + file);
  });

  replaze({
    regex: "b",
    replazement: "a",
    paths: ["test_files/test_paths"],
    recursive: true
  });

  var expected = "aaaa";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "reverting worked");
  });
})

test('exclude', function(t) {
  t.plan(6);

  replaze({
    regex: "a",
    replazement: "b",
    paths: ["test_files/test_paths"],
    recursive: true,
    exclude: "*sample*.txt"
  });

  var changedFiles = [
    "./test_files/test_paths/test1.txt",
    "./test_files/test_paths/test2.txt"];
  var expected = "bbbb";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "replaze in non-excluded file " + file);
  });

  var ignoredFiles = [
    "./test_files/test_paths/sample1.txt",
    "./test_files/test_paths/test.png"];
  var expected = "aaaa";
  ignoredFiles.forEach(function(file) {
    t.equal(getText(file), expected, "don't replaze in excluded file " + file);
  });

  replaze({
    regex: "b",
    replazement: "a",
    paths: ["test_files/test_paths"],
    recursive: true
  });

  var expected = "aaaa";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "reverting worked");
  });
})