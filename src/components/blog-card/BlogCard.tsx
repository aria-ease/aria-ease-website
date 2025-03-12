import React from 'react';
import './blogCard.css';
import { Link } from 'react-router-dom';



const BlogCard = ({page, docId, blogTitle, blogImage, blogContent, postDate}) => {
  return (
    <div className='blog_card_div rounded-[10px]'>
      <div className='blog_card_image_div h-[200px] w-full' style={{backgroundImage: `url(${blogImage})`}}>

      </div>
      <div className='blog_card_text_div pt-[30px] pl-5 pr-5 pb-[30px]'>
        <Link onClick={() => {localStorage.setItem(`scroll-position-${page}`, window.scrollY.toString())}} to={`/blog/single?id=${docId}`} className='blog_card_title_heading text-[20px] primary-white-500-text blog_each_card_link' aria-label={`Navigate to '${blogTitle}' blog article`}>{blogTitle}</Link>
        <p className='blog_card_text primary-white-500-text mt-1'>{blogContent}...</p>
        <p className='blog_card_date mb-0 mt-1'>{postDate}</p>
      </div>
    </div>
  )
}

export default BlogCard