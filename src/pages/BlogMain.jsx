import { useEffect, useState } from 'react';
import './blogMain.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import { makeBlockAccessible } from 'aria-ease';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import BlogCard from '../components/blog-card/BlogCard';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import SlideOutNav from '../components/SlideOutNav';


// eslint-disable-next-line react/prop-types
const BlogMain = ({darkMode, setDarkMode}) => {
    const[blogPostsStateArray, setBlogPostsStateArray] = useState([]);
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'blog';

    const fetchBlogPosts = () => {
        firebase.firestore()
        .collection('blogPosts')
        .get()
        .then(function(querySnapshot) {
          const blogPostsData = [];
          querySnapshot.forEach(doc => {
            const postObject = {}
            postObject['blogTitle'] = doc.data().blogTitle
            postObject['blogImage'] = doc.data().blogImage
            postObject['blogContent'] = doc.data().blogContent
            postObject['posterName'] = doc.data().posterName
            postObject['creation'] = doc.data().creation
            postObject['docId'] = doc.id
            blogPostsData.push(postObject);
          });
          setBlogPostsStateArray(blogPostsData);
        });
      }

    useEffect(() => {
        fetchBlogPosts()
        const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
        return accessibleBlock;
    },[])

  return (
    <div className="home-body" id="inner-body-div">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>

        <div className='pb-[100px] pt-[100px] pr-3 pl-3 min-h-[calc(100vh-200px)]'>
            <Container fluid>
                <Row>
                    {blogPostsStateArray.length > 0 ? 
                        <>
                            {blogPostsStateArray.reverse().map((element, index) => (
                                <Col key={index} xs={12} sm={12} md={6} lg={4} className='mt-[30px]'>
                                    <Link to={`/blog/single?id=${element.docId}`} className='blog_each_card_link block-interactive' aria-label={`Navigate to '${element.blogTitle}' blog article`}>
                                        <BlogCard 
                                            blogTitle={element.blogTitle} 
                                            blogImage={element.blogImage} 
                                            blogContent={element.blogContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 100)}
                                            postDate={element.creation}
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </> :
                        <>
                            {[1,2,3,4,5,6].map((element, index) => {
                                return (
                                    <Col xs={12} sm={12} md={6} lg={4} key={index} className='mt-[30px]'>
                                        <div className='animate-pulse w-full min-h-[408px]'>
                                            <div className={`h-[200px] rounded-md ${darkMode ? 'bg-gray-50' : 'bg-gray-500'}`}></div>
                                            <div className={`h-[48px] rounded-md mt-[30px] w-4/4 ${darkMode ? 'bg-gray-50' : 'bg-gray-500'}`}></div>
                                            <div className={`h-[60px] rounded-md mt-[10px] w-3/4 ${darkMode ? 'bg-gray-50' : 'bg-gray-500'}`}></div>
                                            <div className={`h-6 w-1/4 rounded-md mt-[10px] ${darkMode ? 'bg-gray-50' : 'bg-gray-500'}`}></div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </>
                    }
                    
                </Row>
            </Container>
        </div>
        <Footer/>

        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default BlogMain