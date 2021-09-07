import { lazy } from 'react'
import { Page404 } from '@/components/ErrorPages'

export const routes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('./../views/Home')),
  },
  {
    path: '/my',
    exact: true,
    component: lazy(() => import('./../views/My')),
  },
  {
    path: '/my/:id',
    exact: true,
    component: lazy(() => import('./../views/My')),
  },
  {
    path: '*',
    exact: true,
    component: Page404,
  },
]


