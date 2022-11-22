import { useQuery } from '@tanstack/react-query'
import { Image } from 'antd'
import type { fabric } from 'fabric'
import type { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { templateApi } from '@/sevrices/api'

import { FabricAtom } from './panels.sevrice'
const loadJson = (fa: fabric.StaticCanvas, json: any) => {
  return new Promise((resolve, reject) => {
    fa.loadFromJSON(json, () => {
      console.log('加载完成')
      resolve(true)
    })
  })
}
const Templates: FC = () => {
  const { data } = useQuery<any[]>([templateApi.list])
  const fabricAtom = useRecoilValue(FabricAtom)

  return (
    <div className='p-4 space-y-4'>
      {data?.map((item) => {
        return (
          <div
            className=' shadow'
            key={item.id}
            onClick={() => {
              console.log(data)
              loadJson(fabricAtom!, item.template)
            }}>
            <Image
              preview={false}
              src={'http://localhost:3000/template/show?uid=' + item.thumbnail}
              className=' bg-141414'
            />
          </div>
        )
      })}
    </div>
  )
}

export default Templates
