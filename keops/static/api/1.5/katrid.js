// Generated by CoffeeScript 1.10.0
(function() {
  var globals;

  globals = this;

  this.Katrid = {
    Settings: {
      server: '',
      servicesProtocol: 'http'
    },
    i18n: {
      formats: {},
      catalog: {},
      initialize: function(plural, catalog, formats) {
        console.log('initialize');
        Katrid.i18n.plural = plural;
        Katrid.i18n.catalog = catalog;
        Katrid.i18n.formats = formats;
        if (plural) {
          Katrid.i18n.pluralidx = function(n) {
            if (plural instanceof boolean) {
              if (plural) {
                return 1;
              } else {
                return 0;
              }
            } else {
              return plural;
            }
          };
        } else {
          Katrid.i18n.pluralidx = function(n) {
            if (count === 1) {
              return 0;
            } else {
              return 1;
            }
          };
        }
        globals.pluralidx = Katrid.i18n.pluralidx;
        globals.gettext = Katrid.i18n.gettext;
        globals.ngettext = Katrid.i18n.ngettext;
        globals.gettext_noop = Katrid.i18n.gettext_noop;
        globals.pgettext = Katrid.i18n.pgettext;
        globals.npgettext = Katrid.i18n.npgettext;
        globals.interpolate = Katrid.i18n.interpolate;
        globals.get_format = Katrid.i18n.get_format;
        return Katrid.i18n.initialized = true;
      },
      merge: function(catalog) {
        var i, key, len, results;
        results = [];
        for (i = 0, len = catalog.length; i < len; i++) {
          key = catalog[i];
          results.push(Katrid.i18n.catalog[key] = catalog[key]);
        }
        return results;
      },
      gettext: function(s) {
        var value;
        value = Katrid.i18n.catalog[s];
        if (value != null) {
          return value;
        } else {
          return s;
        }
      },
      gettext_noop: function(s) {
        return s;
      },
      ngettext: function(singular, plural, count) {
        var value;
        value = Katrid.i18n.catalog[singular];
        if (value != null) {
          return value[Katrid.i18n.pluralidx(count)];
        } else if (count === 1) {
          return singular;
        } else {
          return plural;
        }
      },
      pgettext: function(s) {
        var value;
        value = Katrid.i18n.gettext(s);
        if (value.indexOf('\x04') !== -1) {
          value = s;
        }
        return value;
      },
      npgettext: function(ctx, singular, plural, count) {
        var value;
        value = Katrid.i18n.ngettext(ctx + '\x04' + singular, ctx + '\x04' + plural, count);
        if (value.indexOf('\x04') !== -1) {
          value = Katrid.i18n.ngettext(singular, plural, count);
        }
        return value;
      },
      interpolate: function(fmt, obj, named) {
        if (named) {
          fmt.replace(/%\(\w+\)s/g, function(match) {
            return String(obj[match.slice(2, -2)]);
          });
        } else {
          fmt.replace(/%s/g, function(match) {
            return String(obj.shift());
          });
        }
        return {
          get_format: function(formatType) {
            var value;
            value = Katrid.i18n.formats[formatType];
            if (value != null) {
              return value;
            } else {
              return formatType;
            }
          }
        };
      }
    }
  };

}).call(this);

//# sourceMappingURL=katrid.js.map
