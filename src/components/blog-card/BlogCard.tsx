import React from 'react';
import './blogCard.css';



const BlogCard = ({blogTitle, blogImage, blogContent, postDate}) => {
  return (
    <div className='blog_card_div rounded-[10px]'>
      <div className='blog_card_image_div h-[200px] w-full' style={{backgroundImage: `url(${blogImage})`}}>

      </div>
      <div className='blog_card_text_div pt-[30px] pl-5 pr-5 pb-[30px]'>
        <h1 className='blog_card_title_heading text-[20px] primary-white-500-text'>{blogTitle}</h1>
        <p className='blog_card_text primary-white-500-text mt-1'>{blogContent}...</p>
        <p className='blog_card_date mb-0 mt-1'>{postDate}</p>
      </div>
    </div>
  )
}

export default BlogCard