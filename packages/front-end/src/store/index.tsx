import { applySnapshot, getSnapshot, types } from 'mobx-state-tree';
import { RouterModel, syncHistoryWithStore } from 'mst-react-router';
import React, { createContext, useContext } from 'react';
import { Auth } from './auth';

const routerStore = RouterModel.create();

export const Store = types.model({
  auth: types.optional(Auth, {})
});

const store = Store.create();
const storeContext = createContext(store);

export function useStore() {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
}
