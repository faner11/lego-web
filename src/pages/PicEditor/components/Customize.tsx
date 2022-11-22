import { Card } from 'antd'
import type { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { FabricAtom } from './panels.sevrice'
import SettingForm from './SettingForm'
const BASE_FIELD = ['name', 'data', 'background', 'width', 'height']

const Customize: FC = () => {
  const fabricAtom = useRecoilValue(FabricAtom)

  return (
    <Card bordered={false}>
      <SettingForm
        type='i-canvas'
        value={fabricAtom?.toDatalessObject(BASE_FIELD)}
        onChange={(name, value) => {
          console.log(name, value)

          switch (name) {
            case 'width': {
              fabricAtom?.setWidth(value)
              break
            }
            case 'height': {
              fabricAtom?.setWidth(value)
              break
            }
            case 'background': {
              fabricAtom?.setBackgroundColor(value, () => {})
            }
          }
          fabricAtom?.renderAll()
        }}
      />
    </Card>
  )
}
export default Customize
