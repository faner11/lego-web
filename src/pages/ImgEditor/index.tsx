import { Button, PageHeader } from 'antd'
import { fabric } from 'fabric'
import { cloneDeep } from 'lodash-es'
// import { Shadow } from 'fabric/fabric-impl'
import { nanoid } from 'nanoid'
import { useEffect, useMemo, useRef } from 'react'
import { useEffectOnce, useMeasure } from 'react-use'

import Panels from './components/Panels'
const BASE_FIELD = ['name', 'data', 'width', 'height']
const ImgEditor = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fabricLayoutRef, { width, height }] = useMeasure()
  useEffectOnce(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#f1f2f6',
      preserveObjectStacking: true,
      fireRightClick: true
    })

    const dom = new fabric.Rect({
      name: 'bg-' + nanoid(8),
      width: 600,
      height: 600,
      fill: '#fff',
      shadow: '#fcfcfc 0 0 4px',
      lockMovementX: true,
      lockMovementY: true
      // absolutePositioned: true,
    })
    // const group = new fabric.Group([dom], {
    //   lockMovementX: true,
    //   lockMovementY: true
    // })
    // group.borderScaleFactor = 1
    // activeGroupRef.current = group
    fabricRef.current?.add(dom)

    return () => {
      fabricRef.current?.dispose()
    }
  })

  useEffect(() => {
    if (width !== 0 || height !== 0) {
      fabricRef.current?.setWidth(width).setHeight(height)
      const dom = fabricRef.current?.getObjects()[0]!
      fabricRef.current?.centerObject(dom)
    }
  }, [width, height])
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
          background: '#ebe4e4'
        }}
        extra={[
          <Button
            key='1'
            onClick={() => {
              const text = new fabric.IText('LEGO', {
                name: nanoid(8),
                fontFamily: '-apple-system',
                data: {
                  canEdit: true
                }
              })
              fabricRef.current?.centerObject(text)

              fabricRef.current?.add(text)
            }}>
            添加文字
          </Button>,
          <Button
            key='2'
            onClick={() => {
              const { width, height } = fabricRef.current
                ?.getObjects()
                .find((P) => P.name?.startsWith('bg-'))!
              // const newCanvas = new fabric.Canvas(null, {
              //   width,
              //   height
              // })

              // const canvas = document.createElement('canvas')
              // const newCanvas = new fabric.Canvas(canvas, {
              //   width,
              //   height
              // })
              const group = new fabric.Group(
                cloneDeep(fabricRef.current?.getObjects()),
                {
                  width,
                  height
                }
              )
              // const objJson = group.toDataURL({
              //   format: 'png'
              // })
              console.log(111, group.toJSON(BASE_FIELD))

              // newCanvas.add(group).centerObject(group).renderAll()
              // console.log(newCanvas.toDatalessJSON(BASE_FIELD))
              // console.log(newCanvas.toDataURL())

              // console.log(newCanvas.toDatalessObject(BASE_FIELD))
              // console.log(
              //   fabricRef.current?.toJSON([...BASE_FIELD, 'width', 'height'])
              // )
              // console.log(fabricRef.current?.toDataURL())

              // console.log(222, newCanvas.toDataURL())
            }}>
            导出json
          </Button>
        ]}
      />
      <div className='flex flex-1 '>
        <Panels />
        <div className='flex flex-1 flex-col relative  overflow-hidden'>
          <div
            ref={fabricLayoutRef as any}
            className='absolute w-fill h-full inset-0'>
            {canvasMemo}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ImgEditor
