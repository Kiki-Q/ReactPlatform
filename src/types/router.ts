import type { RouteObject } from 'react-router-dom';

export type RouteOBJ = RouteObject & {
  caseSensitive?: boolean;
  children?: RouteOBJ[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  auth?: boolean;
  name?: string;
};

// export interface RouteObject2 {
//   caseSensitive?: boolean;
//   children?: RouteObject2[];
//   element?: React.ReactNode;
//   index?: boolean;
//   path?: string;
//   auth?: boolean;
// }
