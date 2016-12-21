// Generated by CoffeeScript 1.10.0
(function() {
  var Action, WindowAction,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Action = (function() {
    Action.prototype.actionType = null;

    function Action(info1, scope1, location1) {
      this.info = info1;
      this.scope = scope1;
      this.location = location1;
    }

    Action.prototype.apply = function() {};

    Action.prototype.execute = function(scope) {};

    return Action;

  })();

  WindowAction = (function(superClass) {
    extend(WindowAction, superClass);

    WindowAction.actionType = 'sys.action.window';

    function WindowAction(info, scope, location) {
      WindowAction.__super__.constructor.call(this, info, scope, location);
      this.viewMode = info.view_mode;
      this.viewModes = this.viewMode.split(',');
      this.viewType = null;
      this.cachedViews = {};
    }

    WindowAction.prototype.cancelChanges = function() {
      return this.setViewType('list');
    };

    WindowAction.prototype.saveChanges = function() {
      var me;
      me = this;
      return this.scope.model.write({
        id: this.scope.record.id,
        values: this.scope.record
      }).then(function() {
        return me.scope.$apply(function() {
          me.scope.dataSource.search();
          return me.setViewType('list');
        });
      });
    };

    WindowAction.prototype.createNew = function() {
      this.setViewType('form');
      this.scope.record = {};
      return this.scope.record.display_name = '(New)';
    };

    WindowAction.prototype.deleteSelection = function() {
      var i;
      if (confirm(Katrid.i18n.gettext('Confirm delete record?'))) {
        this.scope.model.destroy(this.scope.record.id);
        i = this.scope.records.indexOf(this.scope.record);
        if (i) {
          this.scope.search({});
        }
        return this.setViewType('list');
      }
    };

    WindowAction.prototype.routeUpdate = function(search) {
      if (search.view_type != null) {
        if (this.viewType !== search.view_type) {
          this.viewType = search.view_type;
          this.execute();
          if (this.scope.records == null) {
            console.log(this.scope);
            this.scope.dataSource.search({});
          }
        }
        if (search.id && (((this.scope.record != null) && this.scope.record.id !== search.id) || (this.scope.record == null))) {
          return this.scope.dataSource.get(search.id);
        }
      } else {
        return this.setViewType(this.viewModes[0]);
      }
    };

    WindowAction.prototype.setViewType = function(viewType) {
      return this.location.search({
        view_type: viewType
      });
    };

    WindowAction.prototype.apply = function() {
      return this.render(this.scope, this.scope.view.content, this.viewType);
    };

    WindowAction.prototype.execute = function() {
      var me, r, scope, view;
      scope = this.scope;
      me = this;
      view = null;
      if (view) {
        scope.view = view;
        return me.apply();
      } else {
        r = this.scope.model.getViewInfo({
          view_type: this.viewType
        });
        r.success(function(res) {
          view = res.result;
          me.cachedViews[me.viewType] = view;
          return me.scope.$apply(function() {
            me.scope.view = view;
            return me.apply();
          });
        });
        return r;
      }
    };

    WindowAction.prototype.render = function(scope, html, viewType) {
      return scope.setContent(Katrid.UI.Utils.Templates['render_' + viewType](scope, html));
    };

    WindowAction.prototype.doViewAction = function(viewAction, target) {
      return this.scope.model.doViewAction({
        action_name: viewAction,
        target: target
      }).done(function(res) {
        if (res.status === 'open') {
          return window.open(res.open);
        }
      });
    };

    return WindowAction;

  })(Action);

  this.Katrid.Actions = {
    Action: Action,
    WindowAction: WindowAction
  };

  this.Katrid.Actions[WindowAction.actionType] = WindowAction;

}).call(this);

//# sourceMappingURL=actions.js.map
