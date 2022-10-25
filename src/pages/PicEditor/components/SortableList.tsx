import { FontSizeOutlined, PictureOutlined } from '@ant-design/icons'
import { List, Space, Typography } from 'antd'
import type { fabric } from 'fabric'
import type { FC } from 'react'
import { useState } from 'react'

interface Props {
  fabricRef: fabric.Canvas
}
const icons: any = {
  'i-text': <FontSizeOutlined />,
  image: <PictureOutlined />
}
const SortableList: FC<Props> = (props) => {
  const { fabricRef } = props
  const [list, setList] = useState(fabricRef.getObjects())
  return (
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
                setList(fabricRef.getObjects())
              }}>
              上移
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                item.bringForward()
                setList(fabricRef.getObjects())
              }}>
              下移
            </Typography.Link>

            <Typography.Link
              onClick={() => {
                fabricRef.fxRemove(item)
              }}>
              删除
            </Typography.Link>
          </Space>
        </List.Item>
      )}
    />
  )
}

export default SortableList
