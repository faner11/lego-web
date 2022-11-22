import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const NotFound = lazy(() => import('@/components/NotFound'))

const PicEditor = lazy(() => import('@/pages/PicEditor'))

const routerConfig: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to='/pic-editor' />
      },

      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/pic-editor',
    element: <PicEditor />
  }
]

export default routerConfig
