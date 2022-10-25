import { HeartOutlined, SmileOutlined } from '@ant-design/icons'
import type { MenuDataItem } from '@ant-design/pro-layout'
import type { ForwardRefExoticComponent } from 'react'

import type { KeyDictionary } from '@/comm/comm.face'

export interface IndexeMenuItem extends MenuDataItem {
  icon?: string
}
export const icons: KeyDictionary<ForwardRefExoticComponent<any>> = {
  SmileOutlined,
  HeartOutlined
}
const asideMenuConfig: IndexeMenuItem[] = [
  {
    name: '图片编辑器',
    path: '/pic-editor'
  }
]

export { asideMenuConfig }
