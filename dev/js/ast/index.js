// Generated by CoffeeScript 1.4.0
(function() {
  var breakdown, breakdownTypes, breakdownWorthy, compareLineColumn, extractChildren, getEnd, markEnds, _;

  _ = require("underscore");

  compareLineColumn = function(a, b) {
    if (a.line === b.line) {
      return a.column - b.column;
    } else {
      return a.line - b.line;
    }
  };

  getEnd = function(src) {
    var lines;
    lines = src.split("\n");
    return {
      line: lines.length,
      column: lines[lines.length - 1].length
    };
  };

  extractChildren = function(ast, recursing) {
    if (recursing == null) {
      recursing = false;
    }
    if (recursing && ast.type) {
      return [ast];
    } else if (_.isObject(ast) || _.isArray(ast)) {
      return _.flatten(_.map(ast, function(v) {
        return extractChildren(v, true);
      }));
    } else {
      return [];
    }
  };

  markEnds = function(node, end) {
    var child, childEnd, children, i, nextChild, _i, _len, _results;
    node.end = end;
    children = extractChildren(node);
    children.sort(compareLineColumn);
    _results = [];
    for (i = _i = 0, _len = children.length; _i < _len; i = ++_i) {
      child = children[i];
      if (i === children.length - 1) {
        childEnd = end;
      } else {
        nextChild = children[i + 1];
        childEnd = {
          line: nextChild.line,
          column: nextChild.column - 1
        };
      }
      _results.push(markEnds(child, childEnd));
    }
    return _results;
  };

  breakdownTypes = ["identifier", "unary", "binary", "function_call"];

  breakdownWorthy = function(node) {
    return _.contains(breakdownTypes, node.type);
  };

  breakdown = function(node) {
    return "";
  };

  module.exports = {
    getEnd: getEnd,
    markEnds: markEnds,
    extractChildren: extractChildren
  };

}).call(this);