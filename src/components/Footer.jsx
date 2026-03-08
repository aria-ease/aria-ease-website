import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const Footer = ({ page }) => {
  return (
    <footer className="pt-[50px] pb-[50px] pl-4 pr-4 footer">
      <Container>
        <Row>
          <Col md={3} className="mt-6">
            <span className="text-[16px] font-bold footer-heading-text">Getting Started</span>
            <ul className="mt-3">
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/docs" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to the documentation page'>Documentation</Link></li>
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/examples" className="footer-nav-link block-interactive text-[16px]" aria-label="View examples of package implementation">Examples</Link></li>
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/changelog" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to changelog page'>Changelog</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mt-6">
            <span className="text-[16px] font-bold footer-heading-text">Company</span>
            <ul className="mt-3">
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/services" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to services page'>Services</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mt-6">
            <span className="text-[16px] font-bold footer-heading-text">Resources</span>
            <ul className="mt-3">
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/blog/main" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to blog articles page'>Blog</Link></li>
              <li className="mb-3"><a onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} href='https://www.w3.org/WAI/ARIA/apg/patterns/' target='_blank' rel='noopener noreferrer' className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to WAI-ARIA APG website'>WAI-ARIA APG</a></li>
            </ul>
          </Col>
          <Col md={3} className="mt-6">
            <span className="text-[16px] font-bold footer-heading-text">Community</span>
            <ul className="mt-3">
              <li className="mb-3"><Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="https://www.linkedin.com/company/aria-ease/" className="footer-nav-link block-interactive text-[16px]" aria-label="Navigate to project's LinkedIn page">LinkedIn</Link></li>
              <li className="mb-3">
                <iframe 
                  src="https://ghbtns.com/github-btn.html?user=aria-ease&repo=aria-ease&type=star&count=true&size=large" 
                  frameBorder="0" 
                  scrolling="0" 
                  width="170" 
                  height="30" 
                  title="GitHub Stars"
                />
              </li>
            </ul>
          </Col>

        </Row>
        <p className='black-white-text text-sm font-[300] mt-[50px]'>&copy; Copyright 2023-{new Date().getFullYear()} Aria-Ease. All rights reserved.</p>
      </Container>
    </footer>
  )
}

export default Footer