import {
  BoxPlotOutlined,
  FontSizeOutlined,
  PictureOutlined
} from '@ant-design/icons'
import { Button, Card, Row } from 'antd'
import { fabric } from 'fabric'
import { nanoid } from 'nanoid'
import type { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { FabricAtom } from './panels.sevrice'

const Elements: FC = () => {
  const fabricAtom = useRecoilValue(FabricAtom)
  const addText = () => {
    const text = new fabric.IText('LEGO', {
      name: nanoid(8),
      fontFamily: '-apple-system',
      data: {
        canEdit: true
      }
    })
    fabricAtom?.add(text)
  }
  const buts = [
    {
      text: '矩形',
      icon: <BoxPlotOutlined />,
      onClick: () => {
        const text = new fabric.Rect({
          name: nanoid(8),
          width: 100,
          height: 100,
          fill: '#ddadad'
        })
        fabricAtom?.add(text)
      }
    },
    {
      text: '文字',
      icon: <FontSizeOutlined />,
      onClick: addText
    },
    {
      text: '图片',
      icon: <PictureOutlined />,
      onClick: () => {
        fabric.Image.fromURL(
          'https://cdn.indexed.cn/statics/img/transparentBg.png',
          (oImg) => {
            oImg.scale(0.5)
            fabricAtom?.add(oImg)
          },
          {
            name: nanoid(8),
            crossOrigin: 'anonymous',
            data: {
              canEditImage: true
            }
          }
        )
      }
    }
  ]
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        {buts.map((p) => {
          const onClick = p.onClick
          return (
            <Button key={p.text} onClick={onClick} block icon={p.icon}>
              {p.text}
            </Button>
          )
        })}
      </Row>
    </Card>
  )
}
export default Elements
