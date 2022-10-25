import {
  Cascader,
  Checkbox,
  DatePicker,
  FormItem,
  Input,
  NumberPicker,
  PreviewText,
  Radio,
  Select,
  Switch
} from '@formily/antd'
import { createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    Radio,
    Checkbox,
    DatePicker,
    Cascader,
    PreviewText,
    NumberPicker,
    Switch
  }
})
export default SchemaField
