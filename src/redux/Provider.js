'use client'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'

export function ReduxProvider({ children }) {
  let persistor = persistStore(store)

  // The error is happening because this component is being used in both app/layout.js and app/(dashboard)/layout.js
  // We should only use it in the root layout (app/layout.js)
  // No changes needed to this component - the fix is to remove it from app/(dashboard)/layout.js
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}