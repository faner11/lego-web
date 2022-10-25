import classNames from 'classnames'
import produce from 'immer'
import type { FC } from 'react'
import { useRecoilState } from 'recoil'

import { PanelsAtom } from './panels.sevrice'
export const BASE_ITEMS = [
  {
    id: 'templates',
    name: '模版'
  },
  {
    id: 'customize',
    name: '定制'
  },
  {
    id: 'elements',
    name: '元素'
  },
  {
    id: 'images',
    name: '图片'
  },
  {
    id: 'uploads',
    name: 'Uploads'
  },
  {
    id: 'text',
    name: 'Text'
  },
  {
    id: 'layers',
    name: '图层'
  }
]

const PanelsList: FC = () => {
  const [panel, setPanel] = useRecoilState(PanelsAtom)
  return (
    <div className='w-20 bg-gray-200 flex'>
      <div>
        {BASE_ITEMS.map((p) => {
          return (
            <div
              key={p.id}
              onClick={() => {
                const obj = produce(panel, (draft) => {
                  draft.active = p.id
                  draft.open = true
                })
                setPanel(obj)
              }}
              className={classNames(
                'flex justify-center items-center w-20 h-20 px-2 cursor-pointer hover:bg-gray-100 gap-1 select-none',
                panel.active === p.id && 'bg-white'
              )}>
              <div>{p.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PanelsList
