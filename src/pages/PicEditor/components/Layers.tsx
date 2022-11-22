import {
  BorderOutlined,
  FontSizeOutlined,
  PictureOutlined
} from '@ant-design/icons'
import { Card, List, Space, Typography } from 'antd'
import type { FC } from 'react'
import { useUpdate } from 'react-use'
import { useRecoilValue } from 'recoil'

import { FabricAtom } from './panels.sevrice'
const icons: any = {
  'i-text': <FontSizeOutlined />,
  image: <PictureOutlined />,
  rect: <BorderOutlined />
}
const Layers: FC = () => {
  const fabricAtom = useRecoilValue(FabricAtom)
  const list = fabricAtom?.getObjects()

  const update = useUpdate()
  return (
    <Card>
      <List
        dataSource={list}
        renderItem={(item, i) => (
          <List.Item key={item.name}>
            <List.Item.Meta
              avatar={icons[item.type!]!}
              title={i + '-' + item.name}
            />
            <Space>
              <Typography.Link
                onClick={() => {
                  item.sendBackwards()

                  update()
                }}>
                上移
              </Typography.Link>
              <Typography.Link
                onClick={() => {
                  item.bringForward()
                  update()
                }}>
                下移
              </Typography.Link>

              <Typography.Link
                onClick={() => {
                  fabricAtom?.remove(item)
                  update()
                }}>
                删除
              </Typography.Link>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  )
}
export default Layers
