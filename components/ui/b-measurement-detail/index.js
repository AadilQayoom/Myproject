import React, { useState } from 'react'

import Image from 'next/image'
import classes from  './b-measurements.module.less'

const MeasurementDetails = (props) => {
    const [show, setShow] = useState(false)
  return (
    <>
        <div className={classes.main_wrapper}>
        <div className={classes.title}><span className='bold'>Measurements</span></div>
        <div><span className='font10'>Height:{props.height} </span></div>
        <div><span className='font10'>Volume: {props.volume} </span></div>
        <div className={classes.img}><Image src={`/images/categories/${props.image}`} width={100} height={400} alt='' /></div>
        <hr></hr>
        <div className={classes.lower_part} onClick={() => setShow(!show)}><span className='bold'>Packaging &#8964;</span></div>
        {show ? <div>
            <div><span className='font10'>Height : {props.height}</span></div>
            <div><span className='font10'>Volume : {props.volume}</span></div>
        </div> : null}
        </div>
    </>
  )
}

export default MeasurementDetails