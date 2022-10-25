import {
  BoxPlotOutlined,
  FontSizeOutlined,
  PictureOutlined
} from '@ant-design/icons'
import { FormDrawer } from '@formily/antd'
import { Button, Card, Col, Drawer, PageHeader, Row } from 'antd'
import { fabric } from 'fabric'
import { isEmpty } from 'lodash-es'
import { nanoid } from 'nanoid'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { useEffectOnce, useKey } from 'react-use'

import SettingForm from './components/SettingForm'
import SortableList from './components/SortableList'
const BASE_FIELD = ['name', 'data', 'background', 'width', 'height']
const PicEditor: FC = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeName, setActiveName] = useState<string>('')

  const removeItem = () => {
    const active = fabricRef.current?.getActiveObject()
    if (active != null) {
      fabricRef.current?.remove(active)
    }
  }
  // 删除
  useKey('Backspace', (event) => {
    if (
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLInputElement
    ) {
      return
    }
    removeItem()
  })

  useEffectOnce(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#fefefe',
      preserveObjectStacking: true,
      width: 800,
      height: 800
    })

    fabricRef.current?.on('selection:updated', (e) => {
      if (e.selected?.length === 1) {
        setActiveName(e.selected[0]?.name!)
      }
    })
    fabricRef.current?.on('selection:created', (e) => {
      if (e.selected?.length === 1) {
        setActiveName(e.selected[0]?.name!)
      }
    })
    fabricRef.current?.on('selection:cleared', (e) => {
      setActiveName('')
    })

    return () => {
      fabricRef.current?.dispose()
    }
  })
  const activeObj = fabricRef.current?.getActiveObject()
  const addText = () => {
    const text = new fabric.IText('LEGO', {
      name: nanoid(8),
      fontFamily: '-apple-system',
      data: {
        canEdit: true
      }
    })
    fabricRef.current?.add(text)
  }
  const buts = [
    {
      text: '元素',
      icon: <BoxPlotOutlined />,
      onClick: () => {
        const text = new fabric.Rect({
          name: nanoid(8),
          width: 100,
          height: 100,
          fill: '#ddadad'
        })
        fabricRef.current?.add(text)
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
            fabricRef.current?.add(oImg)
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
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        fontFamily: 'Uber Move Text'
      }}>
      <PageHeader
        title='图片编辑器'
        style={{
          background: '#a0acfc'
        }}
        extra={
          <Button.Group>
            <Button
              onClick={() => {
                setActiveName('i-canvas')
              }}>
              画布设置
            </Button>
            <Button
              onClick={() => {
                FormDrawer('图层设置', () => {
                  return <SortableList fabricRef={fabricRef.current!} />
                }).open()
              }}>
              图层变更
            </Button>
            <Button
              onClick={() => {
                fabricRef.current?.discardActiveObject()
                fabricRef.current?.renderAll()
                canvasRef.current?.toBlob(
                  (blob) => {
                    const url = URL.createObjectURL(blob!)
                    const link = document.createElement('a')
                    link.download = nanoid(8) + '.png'
                    link.href = url!
                    link.click()
                  },
                  'image/png',
                  1
                )
              }}>
              导出图片
            </Button>
            <Button
              onClick={() => {
                const json = fabricRef.current?.toJSON(BASE_FIELD)
                console.log(json)
              }}>
              导出json
            </Button>
          </Button.Group>
        }
      />
      <Row wrap={false} className='h-full'>
        <Col span={2}>
          <Card>
            <Row gutter={[16, 8]}>
              {buts.map((p) => {
                const onClick = p.onClick
                return (
                  <Button key={p.text} onClick={onClick} block icon={p.icon} />
                )
              })}
            </Row>
          </Card>
        </Col>

        <Col span={22} className=' h-full'>
          <div className='flex justify-center items-center bg-slate-100 h-full'>
            <canvas ref={canvasRef} />
          </div>
        </Col>
      </Row>
      <Drawer
        title={activeName}
        open={!isEmpty(activeName)}
        mask={false}
        onClose={() => {
          setActiveName('')
        }}>
        {activeName !== 'i-canvas' ? (
          <SettingForm
            key={activeName}
            type={activeObj?.type!}
            value={activeObj?.toDatalessObject(BASE_FIELD)}
            onChange={(name, value) => {
              if (name !== 'src') {
                activeObj?.set(name, value)
                fabricRef.current?.renderAll()
              } else {
                ;(activeObj as fabric.Image).setSrc(
                  value,
                  () => {
                    fabricRef.current?.renderAll()
                  },
                  {
                    crossOrigin: 'anonymous'
                  }
                )
              }
            }}
          />
        ) : (
          <SettingForm
            key={activeName}
            type='i-canvas'
            value={fabricRef.current?.toDatalessObject(BASE_FIELD)}
            onChange={(name, value) => {
              console.log(name, value)

              switch (name) {
                case 'width': {
                  fabricRef.current?.setWidth(value)
                  break
                }
                case 'height': {
                  fabricRef.current?.setWidth(value)
                  break
                }
                case 'background': {
                  fabricRef.current?.setBackgroundColor(value, () => {})
                }
              }
              fabricRef.current?.renderAll()
              console.log(name, value)
            }}
          />
        )}
      </Drawer>
    </div>
  )
}

export default PicEditor
