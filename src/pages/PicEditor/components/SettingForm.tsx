import { Form, Space } from '@formily/antd'
import { createForm, onFieldValueChange } from '@formily/core'
import { Slider, Typography } from 'antd'
import type { FC } from 'react'
import { useMemo } from 'react'

import type { KeyDictionary } from '@/comm/comm.face'
import { SchemaField } from '@/components/from'

import {
  canvasSchema,
  imageSchema,
  rectSchema,
  textSchema
} from './setting.sevrice'

interface SettingFormProps {
  type: string
  onChange: (name: any, value: any) => void
  value: any
}
const itemMap: KeyDictionary<any> = {
  'i-text': textSchema,
  image: imageSchema,
  rect: rectSchema,
  'i-canvas': canvasSchema
}
const SettingForm: FC<SettingFormProps> = (props) => {
  const { type, onChange, value } = props
  const schema = itemMap[type]!
  const myForm = useMemo(
    () =>
      createForm({
        values: value,
        effects() {
          onFieldValueChange('*', (field, form) => {
            const entire = field.path.entire as string
            if (!entire.startsWith('data')) {
              onChange(field.path.entire, field.value)
            } else {
              onChange('data', form.values.data)
            }
          })
        }
      }),
    [onChange, value]
  )
  return (
    <Form form={myForm} labelCol={8}>
      <SchemaField schema={schema} components={{ Typography, Slider, Space }} />
    </Form>
  )
}
export default SettingForm
