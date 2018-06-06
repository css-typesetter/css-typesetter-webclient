import React from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/xml/xml')
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')

// import css from 'codemirror/lib/codemirror.css'

const CMirrorEditor = ({value, onChange, mode = 'xml'}) => {
  return (
    <CodeMirror
      value={value}
      options={{
        mode,
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        onChange(value)
      }}
    />
  )
}
export default CMirrorEditor
