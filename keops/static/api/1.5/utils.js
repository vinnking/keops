// Generated by CoffeeScript 1.10.0
(function() {
  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args;
      args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) {
        if (typeof args[number] !== 'undefined') {
          return args[number];
        } else {
          return match;
        }
      });
    };
  }

  Katrid.$hashId = 0;

  _.mixin({
    hash: function(obj) {
      if (!obj.$hashId) {
        obj.$hashId = ++Katrid.$hashId;
      }
      return obj.$hashId;
    }
  });

}).call(this);

//# sourceMappingURL=utils.js.map
