import Header from '../components/Header';
import Footer from '../components/Footer';
import { Block } from 'aria-ease';
import { useEffect, useState } from 'react';
import './blogSingle.css';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import SlideOutNav from '../components/SlideOutNav';



// eslint-disable-next-line react/prop-types
const BlogSingle = ({darkMode, setDarkMode}) => {
  const location = useLocation();
  const dataPassedParams = new URLSearchParams(location.search);
  const idPassed = dataPassedParams.get('id');
  const[blog, setBlog] = useState([]);
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'blog-single'

  useEffect(() => {
    if(idPassed) {
      firebase.firestore()
      .collection('blogPosts')
      .doc(idPassed)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const blogPostsData= [];
          const postObject = {}
          postObject['blogTitle'] = snapshot.data()?.blogTitle
          postObject['blogImage'] = snapshot.data()?.blogImage
          postObject['blogContent'] = snapshot.data()?.blogContent
          postObject['posterName'] = snapshot.data()?.posterName
          postObject['creation'] = snapshot.data()?.creation
          postObject['imageAlt'] = snapshot.data()?.imageAlt
          blogPostsData.push(postObject);
          setBlog(blogPostsData)
        }
      })
      .catch((error) => {
        console.error(error)
      })
    }
  },[idPassed])

  useEffect(() => {
    window.scrollTo(0, 0);
    function initializeBlock() {
      Block.makeBlockAccessible('inner-body-div', 'block-interactive');
    }
    
    initializeBlock();
  }, []);

  return (
    <div className="home-body" id="inner-body-div">
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>

        <div className='min-h-[calc(100vh-200px)]'>
          {blog.length > 0 ? 
              <>
                <div className='blog_single_div pb-[50px]'>
                  <h1 className='blog_single_article_title primary-white-500-text font-semibold'>{blog[0].blogTitle}</h1>
                  <p className='blog_article_date'>{blog[0].creation}</p>
                  <img src={blog[0].blogImage} alt={`${blog[0].imageAlt}`} className='blog_image'/>
                  <div className='primary-white-500-text blog_article_content' dangerouslySetInnerHTML={{ __html: blog[0].blogContent }} />
                </div>
              </> :
              <div className='animate-pulse pr-5 pl-5 pb-[50px]'>
                <div className={`h-[50px] rounded-md ${darkMode ? 'bg-gray-50' : 'bg-gray-500'} w-3/4 mt-[100px]`}></div>
                <div className={`h-6 w-1/4 rounded-md mt-[50px] mb-[50px] ${darkMode ? 'bg-gray-50' : 'bg-gray-500'}`}></div>
                <div className={`h-[300px] rounded-md ${darkMode ? 'bg-gray-50' : 'bg-gray-500'}`}></div>
                <div className={`mt-[50px] rounded-md ${darkMode ? 'bg-gray-50' : 'bg-gray-500'} h-[100px]`}></div>
              </div>
            }
        </div>
      
        <Footer page={page}/>

        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  );
};

export default BlogSingle;