import React from 'react'
import { Spin } from 'antd';

function Spinner() {
  return (
    <div className='spinner-parent'>
        <Spin className='custom-spin' size = "large"/>
    </div>
  )
}

export default Spinner