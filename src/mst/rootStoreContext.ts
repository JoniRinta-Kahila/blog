import { createContext, useContext } from "react"
import { RootStore } from "../mst"

// This is an dummy object instantiated only for detecting when provider is missing.
// In this approach we are basically forbidding usage of default values in this context,
// which seems to line up quite well with most real-life scnearios for application state management.
// For default values for the stores, that should be done at the provider (app.tsx).
const defaultObj: any = {}
const RootStoreContext = createContext<RootStore>(defaultObj) 

export const RootStoreProvider = RootStoreContext.Provider

export const useStores = () => {
  const store = useContext(RootStoreContext)
  if(store === defaultObj) {
    throw new Error("RootStore Consumer present without provider! This likely implies mistake in code, make sure that you have provider somewhere lower in the component tree (usually at or near app.tsx).")
  }
  return store
}