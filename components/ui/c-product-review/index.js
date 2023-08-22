import Image from 'next/image'
import MyButton from '../my-button'
import MyInput from '../my-input'
import React from 'react'
import classes from './c-product-review.module.less'
import { reviewState } from '../../../recoil/atoms/product_review'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
const ProductReview = (props) => {
    const [writeReview, setWriteReview] = useState(false)
    const reviews = useRecoilValue(reviewState)
    const [review, setReview] = useState({title:'', content:''})
    const storeReview = (val, type) => {
            setReview({...review, [type]:val})
    }
    const showReview = () => {
        console.log('title :', review.title)
        console.log('content :', review.content)
    }
  return (
    <>
        {writeReview ? 

            <div className={classes.write_review}>
             <div className={classes.title}><span className='bold font18'>Please write a review</span></div>
             <div><span className='font10'>What did you think of your latest purchase? Share your experience with others!</span></div>
             <div className={classes.review_stars}><Image src={'/images/icons/review_stars.png'} width={100} height={25} alt='' /></div>
             <div className={classes.review_title}><span className='font14 bold'>Review title*</span></div>
             <div style={{border:'1px solid #ccc', borderRadius:'8px'}}>
             <MyInput
             onChange={(val) => storeReview(val.target.value, 'title')}
             value={review.title}
              placeholder='0-999 characters'/></div>
             <div><span className='font8'>Write something that you think summarize the experience in one sentence, and would be helpful to others.</span></div>
             <div className={classes.review_title}><span className='font14 bold'>Review*</span></div>
             <div style={{border:'1px solid #ccc', borderRadius:'8px'}}>
             <MyInput
             onChange={(val) => storeReview(val.target.value, 'content')}
             value={review.content}
             placeholder='0-999 characters'/></div>
             <div><span className='font8'>When writing a review please add information that you would have liked to have when you considered to purchase this object. What is your personal opinion about it?</span></div>
             <div className={classes.submit_review}>
             <MyButton
             onClick={showReview}
              style={{borderRadius:'20px'}} label='Submit Review' /></div>
        </div> :
            <div className={classes.review_container}>
            <div className={classes.title}><span className='bold font18'>Reviews</span></div>
            <div><span className='font24 bold'>{props.review.rating}</span></div>
            <div className={classes.rating_img}><Image src={'/images/icons/review_stars.png'} width={80} height={20} alt='' /></div>
            <MyButton style={{borderRadius:'20px'}} label='Write a review' onClick={() => setWriteReview(!writeReview)} />
            <div className={classes.detailed_review}><span className='bold font12'>Average customer ratings</span></div>
            <div><span className='font12'>Value for money : {props.review.value}</span></div>
            <div><span className='font12'>Product quality : {props.review.quality}</span></div>
            <div className={classes.title}><span className='bold'>Most Recent</span></div>
            <div className={classes.review_wrapper}>
            <div><span className='font12 bold'>{reviews.title}</span></div>
            <div><span className='font12'>{reviews.content}</span></div>
            <div className={classes.date_place}>
                        <div><span className='font10'>{reviews.date}</span></div>
                        <div><span className='font10'>{reviews.place}</span></div>
            </div>
             <div></div>
            </div>
        </div> 
        
        }
    </>
  )
}

export default ProductReview