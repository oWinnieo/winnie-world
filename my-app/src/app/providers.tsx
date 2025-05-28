// 'use client'

// import { Provider } from 'react-redux'
// import { store } from '@/../store'

// // export function Providers({ children }: { children: React.ReactNode }) {
// //     return 
// //   }

// export const ReduxProviders = ({ children }: {children: React.ReactNode }) => (
//     <Provider store={store}>{children}</Provider>
// )

// app/providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/../store';

export function ReduxProviders ({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}