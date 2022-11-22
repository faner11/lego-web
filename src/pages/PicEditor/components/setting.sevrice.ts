import type { ISchema } from '@formily/react'

export const textSchema: ISchema = {
  properties: {
    UifdOGq04IWr5Ft9Mec0x: {
      type: 'void',
      'x-component': 'Typography.Title',
      'x-content': "{{'元素配置 ' + $values.name}}",
      'x-component-props': {
        level: 5
      }
    },
    fill: {
      title: '文本颜色',
      type: 'string',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      'x-component-props': {
        type: 'color'
      }
    },
    fontSize: {
      title: '字号',
      type: 'string',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
    kLQyMtbMQXEbMVekR4XxS: {
      type: 'void',
      'x-component': 'Typography.Title',
      'x-content': '业务配置',
      'x-component-props': {
        level: 5
      }
    },
    data: {
      type: 'object',
      properties: {
        canEdit: {
          title: '可编辑',
          type: 'boolean',
          'x-component': 'Switch',
          'x-decorator': 'FormItem'
        },
        tags: {
          title: '素材标签',
          type: 'boolean',
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: [
            {
              label: '自行车',
              value: '自行车'
            },
            {
              label: '男性',
              value: '男性'
            },
            {
              label: '女性',
              value: '女性'
            }
          ]
        }
      }
    }
  }
}

export const imageSchema: ISchema = {
  properties: {
    UifdOGq04IWr5Ft9Mec0x: {
      type: 'void',
      'x-component': 'Typography.Title',
      'x-content': "{{'元素配置 ' + $values.name}}",
      'x-component-props': {
        level: 5
      }
    },
    src: {
      title: '图片地址',
      type: 'string',
      'x-component': 'Input.TextArea',
      'x-decorator': 'FormItem'
    },
    width: {
      title: '图片宽高',
      type: 'string',
      'x-component': 'Typography.Text',
      'x-decorator': 'FormItem',
      'x-content': "{{$values.width + 'px' + ' * ' + $values.height + 'px'}}"
    },
    kLQyMtbMQXEbMVekR4XxS: {
      type: 'void',
      'x-component': 'Typography.Title',
      'x-content': '业务配置',
      'x-component-props': {
        level: 5
      }
    },
    data: {
      type: 'object',
      properties: {
        canEdit: {
          title: '可编辑',
          type: 'boolean',
          'x-component': 'Switch',
          'x-decorator': 'FormItem'
        },
        tags: {
          title: '素材标签',
          type: 'boolean',
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: [
            {
              label: '自行车',
              value: '自行车'
            },
            {
              label: '男性',
              value: '男性'
            },
            {
              label: '女性',
              value: '女性'
            }
          ]
        }
      }
    }
  }
}

export const rectSchema: ISchema = {
  properties: {
    UifdOGq04IWr5Ft9Mec0x: {
      type: 'void',
      'x-component': 'Typography.Title',
      'x-content': "{{'元素配置 ' + $values.name}}",
      'x-component-props': {
        level: 5
      }
    },
    fill: {
      title: '颜色',
      type: 'string',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      'x-component-props': {
        type: 'color'
      }
    },
    opacity: {
      title: '透明度',
      type: 'number',
      'x-component': 'Slider',
      'x-decorator': 'FormItem',
      'x-component-props': {
        min: 0,
        max: 1,
        step: 0.01
      }
    },
    kLQyMtbMQXEbMVekR4XxS: {
      type: 'void',
      'x-component': 'Space',
      'x-decorator': 'FormItem',
      title: '圆角',
      properties: {
        rx: {
          type: 'number',
          'x-component': 'NumberPicker',
          'x-decorator': 'FormItem',
          'x-component-props': {
            placeholder: '水平'
          }
        },
        ry: {
          type: 'number',
          'x-component': 'NumberPicker',
          'x-decorator': 'FormItem',
          'x-component-props': {
            placeholder: '垂直'
          }
        }
      }
    }
  }
}

export const canvasSchema: ISchema = {
  properties: {
    width: {
      title: '宽度(px)',
      type: 'string',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
    height: {
      title: '高度px',
      type: 'string',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
    background: {
      title: '颜色',
      type: 'string',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      'x-component-props': {
        type: 'color'
      }
    }
  }
}
