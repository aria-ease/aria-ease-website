import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getActiveScrollPosition } from '../utils/scrollPosition';


// eslint-disable-next-line react/prop-types
const Footer = ({ page }) => {
  const saveScrollPosition = () => {
    sessionStorage.setItem(`scroll-position-${page}`, String(getActiveScrollPosition()));
  };

  return (
    <footer className="pt-[50px] pb-[150px] px-3 footer">
      <Container fluid className='px-0'>
        <Row>
          <Col md={3} sm={6} xs={6} className="mt-8">
            <span className="text-[16px] font-bold footer-heading-text">Getting Started</span>
            <ul className="mt-3">
              <li className="mb-3"><Link onClick={saveScrollPosition} to="/docs" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to the introduction page'>Introduction</Link></li>
              <li className="mb-3"><Link onClick={saveScrollPosition} to="/utilities/accordion" className="footer-nav-link block-interactive text-[16px]" aria-label="View accordion utility page">Utilities</Link></li>
              <li className="mb-3"><Link onClick={saveScrollPosition} to="/component-testing" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to contract testing page'>Component Testing</Link></li>
              
            </ul>
          </Col>
          <Col md={3} sm={6} xs={6} className="mt-8">
            <span className="text-[16px] font-bold footer-heading-text">Reference</span>
            <ul className="mt-3">
              <li className="mb-3"><Link onClick={saveScrollPosition} to="/api" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to API reference page'>API</Link></li>
              <li className="mb-3"><Link onClick={saveScrollPosition} to="/migration" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to migration guide page'>Migration Guide</Link></li>
              <li className="mb-3"><Link onClick={saveScrollPosition} to="/changelog" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to changelog page'>Changelog</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6} xs={6} className="mt-8">
            <span className="text-[16px] font-bold footer-heading-text">Resources</span>
            <ul className="mt-3">
              <li className="mb-3"><a onClick={saveScrollPosition} href='https://www.w3.org/WAI/ARIA/apg/patterns/' target='_blank' rel='noopener noreferrer' className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to WAI-ARIA APG website'>WAI-ARIA APG</a></li>
              <li className="mb-3"><a onClick={saveScrollPosition} href='https://github.com/aria-ease/aria-ease/blob/main/CONTRIBUTION-GUIDELINES.md' target='_blank' rel='noopener noreferrer' className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to contributing guide'>Contributing Guide</a></li>
              <li className="mb-3"><a onClick={saveScrollPosition} href='https://www.w3.org/WAI/WCAG21/quickref/' target='_blank' rel='noopener noreferrer' className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to WCAG guidelines'>WCAG Guidelines</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} xs={6} className="mt-8">
            <span className="text-[16px] font-bold footer-heading-text">Community</span>
            <ul className="mt-3">
              <li className="mb-3"><Link onClick={saveScrollPosition} to="https://www.linkedin.com/company/aria-ease/" className="footer-nav-link block-interactive text-[16px]" aria-label="Navigate to project's LinkedIn page">LinkedIn</Link></li>
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

        <p className='black-white-text text-sm font-[300] mt-[50px]'>&copy; {new Date().getFullYear()} Aria-Ease. All rights reserved.</p>
      </Container>
    </footer>
  )
}

export default Footer