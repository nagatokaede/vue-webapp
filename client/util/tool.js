'use static';

const SessionStorage = {
  set: (param) => sessionStorage.setItem(Object.keys(param)[0], JSON.stringify(Object.values(param)[0])),
  get: (name) => JSON.parse(sessionStorage.getItem(name)),
  del: (name) => sessionStorage.removeItem(name),
};

export {
  SessionStorage,
};
