import { FormDrawer } from '@formily/antd'
import { useMutation } from '@tanstack/react-query'
import { Button, Drawer, message, PageHeader } from 'antd'
import { fabric } from 'fabric'
import { isEmpty } from 'lodash-es'
import { nanoid } from 'nanoid'
import type { FC } from 'react'
import { useMemo, useRef, useState } from 'react'
import { useEffectOnce, useKey } from 'react-use'
import { useRecoilState } from 'recoil'

import { templateApi } from '@/sevrices/api'
import { api } from '@/utils'

import Panels from './components/Panels'
import { FabricAtom } from './components/panels.sevrice'
import SettingForm from './components/SettingForm'
import SortableList from './components/SortableList'
const BASE_FIELD = ['name', 'data', 'background', 'width', 'height']
const PicEditor: FC = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeName, setActiveName] = useState<string>('')
  const [, setFabricAtom] = useRecoilState(FabricAtom)
  const saveMutaion = useMutation(
    () => {
      const json = fabricRef.current?.toJSON(BASE_FIELD)
      return api.post(templateApi.save, {
        json: {
          template: json,
          name: nanoid(8)
        }
      })
    },
    {
      onSuccess: () => {
        message.success('保存成功')
      }
    }
  )
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
    setFabricAtom(fabricRef.current)

    return () => {
      fabricRef.current?.dispose()
    }
  })
  const activeObj = fabricRef.current?.getActiveObject()

  const canvasMemo = useMemo(() => {
    return <canvas ref={canvasRef} />
  }, [])
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
          background: '#93a0f4'
        }}
        extra={
          <Button.Group>
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
            <Button
              onClick={() => {
                saveMutaion.mutateAsync()
              }}>
              保存新模版
            </Button>
          </Button.Group>
        }
      />

      <div className='flex flex-1 '>
        <Panels />
        <div className='flex flex-1 flex-col relative  overflow-hidden'>
          <div className='absolute w-fill h-full inset-0'>
            <div className='flex justify-center items-center bg-slate-100 h-full'>
              {canvasMemo}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={activeName}
        open={!isEmpty(activeName)}
        mask={false}
        onClose={() => {
          setActiveName('')
        }}>
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
      </Drawer>
    </div>
  )
}

export default PicEditor
