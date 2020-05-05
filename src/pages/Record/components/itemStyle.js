import styled from 'styled-components';
import { Input } from 'antd';

export const Box = styled.div`
  width: 100%;
  min-height: 100px;
  margin-top: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-flow: row nowrap;
  .RadioGroup {
    align-self: center;
    transform: translate(6px, 0);
  }
  .RadioGroup>.ant-radio-wrapper{
    color: #aaa;
    font-size: 10px;
    flex-basis: 40px;
  }
  :hover {
    box-shadow: 0 0 10px #999;
  }
`

export const ContentBox = styled.div`
  flex-grow: 1;
`
// 时间
export const TimeStamp = styled.div`
  font-size: 12px;
  color: #aaa;
`
// 文本
export const Text = styled(Input.TextArea).attrs({
  disable: true
})`
  font-size: 14px;
  color: #666;
`