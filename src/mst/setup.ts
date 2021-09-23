import { onSnapshot, types } from "mobx-state-tree";
import { RootStore, RootStoreModel } from ".";

const STORAGE_KEY = 'ROOT_STORE';

export const setupRootStore = () => {
  let store: RootStore;
  let data: any;

  const storeProcessor = types.snapshotProcessor(RootStoreModel, {
    postProcessor: x => {
      const copy = {...x} as any;
      return copy;
    },
  });

  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    store = storeProcessor.create(data);
  } catch (error) {
    console.error('MST ERROR:', error)
    store = storeProcessor.create();
  }

  onSnapshot(store, snapshot => localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot)));
  return store;
}