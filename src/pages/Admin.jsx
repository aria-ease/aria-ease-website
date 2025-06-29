import { useState, useEffect } from 'react';
import './adminDashboard.css';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import BlogCard from '../components/blog-card/BlogCard';
import TextEditor from '../components/text-editor/TextEditor';
import { Container, Row, Col } from 'react-bootstrap';

const Admin = () => {
    const [blogPostsStateArray, setBlogPostsStateArray] = useState([]);

  const[blogTitleEdit, setBlogTitleEdit] = useState('');
  const[blogContentEdit, setBlogContentEdit] = useState('');
  const[docId, setDocId] = useState('');

  const[blogTitle, setBlogTitle] = useState('')
  const[blogContent, setBlogContent] = useState('')

  const[image, setImage] = useState('');
  const[imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    if(blogTitleEdit) {
      setBlogTitle(blogTitleEdit)
    }
    if(blogContentEdit) {
      setBlogContent(blogContentEdit)
    }
  },[blogContentEdit, blogTitleEdit])

  function getCurrentDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Get the ordinal suffix for the day
    let suffix;
    if (day >= 11 && day <= 13) {
        suffix = "th";
    } else {
        switch (day % 10) {
            case 1: suffix = "st"; break;
            case 2: suffix = "nd"; break;
            case 3: suffix = "rd"; break;
            default: suffix = "th";
        }
    }

    return `${month} ${day}${suffix}, ${year}`;
}

  const saveBlogPost = async (event) => {
    event.preventDefault();
    try {
        firebase.firestore()
        .collection('blogPosts')
        .doc()
        .set({
          blogTitle,
          blogImage: image,
          blogContent,
          posterName: '',
          imageAlt,
          creation: getCurrentDate(),
          date: firebase.firestore.Timestamp.now()
        })
        .then(() => {
          console.log('Blog posted')
          fetchBlogPosts();
        })
        .catch((err) => {
          console.error('Error saving blog post:', err);
        })
    } catch (err) {
      console.error('Error saving blog post:', err);
    }
  };

  const updateBlogPost = async (event, docId) => {
    event.preventDefault()
    try {
      const updateData = {};
      updateData.blogTitle = blogTitle;
      updateData.blogContent = blogContent;
      updateData.blogImage = image;
      updateData.imageAlt = imageAlt

      firebase.firestore()
      .collection('blogPosts')
      .doc(docId)
      .update(updateData)
      .then(() => {
        alert('Blog post updated')
        fetchBlogPosts();
      }).catch((error) => {
        console.log(error)
      })
    } catch (err) {
      console.error('Error saving blog post:', err);
    }
  }

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
        postObject['imageAlt'] = doc.data().imageAlt
        postObject['docId'] = doc.id
        blogPostsData.push(postObject);
      });
      setBlogPostsStateArray(blogPostsData);
    });
  }

  const deleteBlogPost = (docId) => {
    const response = confirm("Are you sure you want to delete this post?");
    if (response) {
      firebase.firestore()
      .collection('blogPosts')
      .doc(docId)
      .delete()
      .then(() => {
        alert('Post deleted')
        fetchBlogPosts();
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
      });
    }
  }

  useEffect(() => {
    fetchBlogPosts()
  },[])

  /* const updateAllPostsWithTimestamp = async () => {
    try {
      const querySnapshot = await firebase.firestore()
        .collection('blogPosts')
        .get();
  
      const batch = firebase.firestore().batch();
  
      querySnapshot.forEach((doc) => {
        // If no date field exists, add it
        if (!doc.data().date) {
          const docRef = firebase.firestore().collection('blogPosts').doc(doc.id);
          const creationDate = doc.data().creation;
          const cleanDate = creationDate.replace(/(st|nd|rd|th),/, ',');
          const timestamp = new Date(cleanDate).getTime();
          batch.update(docRef, {
            date: firebase.firestore.Timestamp.fromMillis(timestamp)
          });
        }
      });
  
      await batch.commit();
      console.log('All posts updated with timestamps');
      fetchBlogPosts();
    } catch (error) {
      console.error('Error updating posts:', error);
    }
  }; */

  return (
    <div style={{backgroundColor: 'white'}}>
      {/* <button onClick={updateAllPostsWithTimestamp}>Update All Posts with Timestamp</button> */}
        <form className='blog_post_modal_form'>
              <input type='text' placeholder='Blog Title' value={blogTitle} onChange={(event) => setBlogTitle(event.target.value)}></input>
              <div className='blog_post_modal_image_input_div'>
                <p>Blog image:</p>
                <input type='text' value={image} onChange={(event) => setImage(event.target.value)}></input>
              </div>

              <div className='blog_post_modal_image_input_div'>
                <p>Blog image Alt:</p>
                <input type='text' value={imageAlt} onChange={(event) => setImageAlt(event.target.value)}></input>
              </div>
              <div className='blog_post_modal_blog_content_div'>
                <p className='blog_post_modal_form_label'>Blog content:</p>
              </div>
              {(typeof window !== 'undefined') ? 
                <TextEditor blogContent={blogContent} setBlogContent={setBlogContent}/> :
                undefined
              }
              {(blogTitleEdit || blogContentEdit) ? 
                <button onClick={(event) => updateBlogPost(event, docId)}>Post</button> :
                <button onClick={saveBlogPost}>Post</button>
              }
            </form>
                        <div className='admin_dashboard_blog_posts_body_div'>
                            <Container fluid>
                              <Row>
                                  {blogPostsStateArray.map((element, index) => (
                                      <Col key={index} xs={12} sm={12} md={6} lg={4} className='blog_each_card_col'>
                                        <div className='admin_dashboard_blog_toolbar_div'>
                                            <BlogCard 
                                                blogTitle={element.blogTitle} 
                                                blogImage={element.blogImage} 
                                                blogContent={element.blogContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 100)}
                                                postDate={element.creation}
                                            />
                                            <button onClick={() => {console.log(element.blogContent); setBlogContent(element.blogContent); setBlogTitleEdit(element.blogTitle); setImage(element.blogImage); setImageAlt(element.imageAlt); setBlogContentEdit(element.blogContent); setDocId(element.docId)}}>Edit</button>
                                            <button onClick={() => deleteBlogPost(element.blogTitle)}>Delete</button>
                                        </div>
                                      </Col>
                                  ))}
                              </Row>
                            </Container>
                        </div>
                    </div>
  )
}

export default Admin