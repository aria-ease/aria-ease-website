import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import whitelogo from '../assets/white-logo.png';
import blacklogo from '../assets/black-logo.png';

// eslint-disable-next-line react/prop-types
const Footer = ({ page, darkMode }) => {
  return (
    <footer className="pt-[50px] pb-[50px] pl-4 pr-4 footer">
      <Container>
        <Row>
          <Col md={3}>
            <div className='flex items-center mb-10 mt-6'>
              {darkMode ?
                <img src={whitelogo} className="logo-img h-[30px] w-[30px]" alt="Aria Ease Logo"></img> :
                <img src={blacklogo} className="logo-img h-[30px] w-[30px]" alt="Aria Ease Logo"></img>
              }
            </div>
          </Col>
          <Col md={3}>
            <h4 className="text-[16px] font-bold footer-heading-text mb-3 mt-6">Getting Started</h4>
            <ul>
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/docs" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to the documentation page'>Documentation</Link></li>
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/examples/accordion" className="footer-nav-link block-interactive text-[16px]" aria-label="View examples of package implementation">Examples</Link></li>
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/changelog" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to changelog page'>Changelog</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h4 className="text-[16px] font-bold footer-heading-text mb-3 mt-6">Resources</h4>
            <ul>
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/blog/main" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to blog articles page'>Blog</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h4 className="text-[16px] font-bold footer-heading-text mb-3 mt-6">Community</h4>
            <ul>
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="https://github.com/aria-ease/aria-ease" className="footer-nav-link block-interactive text-[16px]" aria-label="Navigate to project's GitHub repository">GitHub</Link></li>
            </ul>
          </Col>

        </Row>
        <p className='black-white-text text-sm font-[300] mt-[50px]'>&copy; 2023-2025 Isaac Akinduyile</p>
      </Container>
    </footer>
  )
}

export default Footer