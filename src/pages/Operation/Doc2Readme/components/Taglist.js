import React from 'react';
import { Tag } from 'antd';

export default function Taglist(props) {
  let { list, kind, handleDeleteTag } = props
  let style = {}
  return (
    <>
      {
        list.map((item, index) => {
          return (
            <Tag
              color={kind === 'folder' ? 'orange' : 'blue'}
              key={index}
              closable={index !== 0}
              onClose={handleDeleteTag.bind(null, kind, index)}
            >{item}</Tag>
          )
        })
      }
    </>
  )
}