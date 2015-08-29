var Router = {
  push(path : String, params : Object = {}) {
    var route = this.routes[path];

    if(!route) {
      throw new Error(`Missing route for path: ${path}`);
    }

    this.navigator.push({route, params});
  },

  pop() {
    this.navigator.pop();
  },

  popToTop() {
    this.navigator.popToTop();
  },

  get currentRoute() {
    var currentStack = this.navigator.getCurrentRoutes();
    return currentStack[currentStack.length - 1].route;
  }
};

module.exports = Router;
