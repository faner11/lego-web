import { DoubleLeftOutlined } from '@ant-design/icons'
import { Button, Row } from 'antd'
import classNames from 'classnames'
import produce from 'immer'
import type { FC, ReactNode } from 'react'
import { useRecoilState } from 'recoil'

import type { KeyDictionary } from '@/comm/comm.face'

import Customize from './Customize'
import Elements from './Elements'
import Layers from './layers'
import { PanelsAtom } from './panels.sevrice'
import Templates from './Templates'

const obj: KeyDictionary<ReactNode> = {
  elements: <Elements />,
  templates: <Templates />,
  customize: <Customize />,
  layers: <Layers />
}
const PanelItem: FC = () => {
  const [panel, setPanel] = useRecoilState(PanelsAtom)

  return (
    <div
      className={classNames(
        'bg-white border-r w-80 relative',
        panel.open ? 'block' : 'hidden'
      )}>
      <div className='absolute w-full h-full overflow-auto'>
        <Row justify='end' className='p-4 sticky top-0'>
          <Button
            icon={<DoubleLeftOutlined />}
            onClick={() => {
              const obj = produce(panel, (draft) => {
                draft.open = false
              })
              setPanel(obj)
            }}
          />
        </Row>
        {obj[panel.active]}
      </div>
    </div>
  )
}
export default PanelItem
