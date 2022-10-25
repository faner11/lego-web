import { DoubleLeftOutlined } from '@ant-design/icons'
import { Button, Row } from 'antd'
import classNames from 'classnames'
import produce from 'immer'
import type { FC } from 'react'
import { useRecoilState } from 'recoil'

import { PanelsAtom } from './panels.sevrice'

const PanelItem: FC = () => {
  const [panel, setPanel] = useRecoilState(PanelsAtom)
  return (
    <div
      className={classNames(
        'bg-white border-r w-60',
        panel.open ? 'block' : 'hidden'
      )}>
      <Row justify='end' className='p-4'>
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
      11
      {panel.active}
    </div>
  )
}
export default PanelItem
