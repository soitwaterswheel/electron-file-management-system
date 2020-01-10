import React from 'react';
import { Tag } from 'antd';

export default function Taglist(props) {
  console.log(props)
  return (
    <>
      {
        props.document.map((item, index) => {
          return (
            <Tag color="orange" type="document" key={index} closable={index !== 0} onClose={props.handleDeleteTag.bind(null, 'document', index)}>{item}</Tag>
          )
        })
      }
      {
        props.file.map((item, index) => {
          return (
            <Tag color="blue" type="file" key={index} closable={index !== 0} onClose={props.handleDeleteTag.bind(null, 'file', index)}>{item}</Tag>
          )
        })
      }
    </>
  )
}