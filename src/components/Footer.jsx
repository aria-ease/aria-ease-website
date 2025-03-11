import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-[50px] pb-[50px] pl-4 pr-4 footer">
          <Container>
            <Row>
              <Col md={4}>
                <h4 className="text-[16px] font-bold footer-heading-text mb-3 mt-6">Getting Started</h4>
                <ul className="footer-links">
                  <li className="mb-3"><Link to="/docs" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to the documentation page'>Documentation</Link></li>
                  {/* <li className="mb-3"><Link to="/docs/api" className="footer-nav-link block-interactive text-[16px]">API Reference</Link></li> */}
                  <li className="mb-3"><Link to="/examples/accordion" className="footer-nav-link block-interactive text-[16px]" aria-label="View examples of package implementation">Examples</Link></li>
                </ul>
              </Col>
              <Col md={4}>
                <h4 className="text-[16px] font-bold footer-heading-text mb-3 mt-6">Resources</h4>
                <ul className="footer-links">
                  <li className="mb-3"><Link to="/blog/main" className="footer-nav-link block-interactive text-[16px]" aria-label='Navigate to blog articles page'>Blog</Link></li>
                </ul>
              </Col>
              <Col md={4}>
                <h4 className="text-[16px] font-bold footer-heading-text mb-3 mt-6">Community</h4>
                <ul className="footer-links">
                  <li className="mb-3"><Link to="https://github.com/aria-ease/aria-ease" className="footer-nav-link block-interactive text-[16px]" aria-label="Navigate to project's GitHub repository">GitHub</Link></li>
                </ul>
              </Col>

            </Row>
          </Container>
        </footer>
  )
}

export default Footer