'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { initializeFavorites } from './slices/favoritesSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create store instance only once using lazy initialization
  const [store] = useState(() => makeStore());

  useEffect(() => {
    // Initialize favorites from localStorage after mount
    store.dispatch(initializeFavorites());
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
