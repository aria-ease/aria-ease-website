import Header from "../components/Header";
import Footer from "../components/Footer";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as Block from "aria-ease/block";
import { 
  CheckCircle2, 
  Search, 
  Wrench, 
  GraduationCap, 
  FileCheck, 
  Code2,
  ArrowRight,
  Linkedin,
  Calendar
} from 'lucide-react';
import './services.css';
import { Helmet } from 'react-helmet-async';
import ScrollTracker from "../components/ScrollTracker";

// eslint-disable-next-line react/prop-types
const Services = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const page = 'services';
  const mainBlockCleanupRef = useRef(null);
  
    useEffect(() => {
      mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
      return () => {
        if (mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current.cleanup();
          mainBlockCleanupRef.current = null;
        }
      };
    }, []);
  
    useEffect(() => {
      if (resultsVisible) {
        if (mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current.cleanup();
          mainBlockCleanupRef.current = null;
        }
      } else {
        if (!mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
        }
      }
    }, [resultsVisible]);

  const services = [
        {
          icon: <Search size={32} />,
          title: "Accessibility Audits",
          description: "Comprehensive WCAG 2.1/2.2 AA/AAA compliance audits",
          features: [
            "Manual testing with screen readers (NVDA, JAWS, VoiceOver)",
            "Automated testing with industry-standard tools",
            "Keyboard interaction testing",
            "Detailed report with prioritized issues",
            "VPAT (Voluntary Product Accessibility Template)",
            "Remediation roadmap"
          ],
          pricingTiers: [
            {
              label: "Entry (Nigeria/Local)",
              price: "Starting from ₦250,000",
              desc: "For small teams, startups, and local businesses. Pricing depends on scope and product size."
            },
            {
              label: "Growth (Scale/Regional)",
              price: "Starting from ₦800,000",
              desc: "For scale-ready teams and regional brands. Custom quotes based on requirements."
            },
            {
              label: "International",
              price: "Starting from $800",
              desc: "For global clients and international products. Pricing based on complexity and risk reduction."
            }
          ]
        },
        {
          icon: <Wrench size={32} />,
          title: "Remediation Services",
          description: "Expert code fixes for accessibility violations",
          features: [
            "ARIA implementation and corrections",
            "Keyboard interaction fixes",
            "Focus management improvements",
            "Semantic HTML restructuring",
            "Color contrast adjustments",
            "Form accessibility enhancements"
          ],
          pricingTiers: [
            {
              label: "Entry (Nigeria/Local)",
              price: "Starting from ₦250,000",
              desc: "For small projects and local fixes. Pricing depends on issue count and codebase size."
            },
            {
              label: "Growth (Scale/Regional)",
              price: "Starting from ₦800,000",
              desc: "For larger teams and complex products. Custom quotes available."
            },
            {
              label: "International",
              price: "Starting from $800",
              desc: "For international clients. Pricing based on scope and risk reduction."
            }
          ]
        },
        {
          icon: <FileCheck size={32} />,
          title: "Code Review",
          description: "Pre-deployment accessibility validation",
          features: [
            "Component-level accessibility review",
            "ARIA pattern validation",
            "Best practices recommendations",
            "Integration with CI/CD pipelines",
            "Developer training during review",
            "Documentation improvements"
          ],
          pricingTiers: [
            {
              label: "Entry (Nigeria/Local)",
              price: "Starting from ₦150,000",
              desc: "For local teams and small codebases. Pricing depends on review depth."
            },
            {
              label: "Growth (Scale/Regional)",
              price: "Starting from ₦500,000",
              desc: "For scale-ready teams and larger projects. Custom quotes available."
            },
            {
              label: "International",
              price: "Starting from $500",
              desc: "For global clients. Pricing based on codebase size and risk reduction."
            }
          ]
        },
        {
          icon: <GraduationCap size={32} />,
          title: "Training & Workshops",
          description: "Empower your team with accessibility knowledge",
          features: [
            "WCAG guidelines deep dive",
            "Accessible component development",
            "Screen reader testing techniques",
            "aria-ease implementation training",
            "Custom workshops for your stack",
            "Ongoing support and consultation"
          ],
          pricingTiers: [
            {
              label: "Entry (Nigeria/Local)",
              price: "Starting from ₦200,000",
              desc: "For local teams and basic workshops. Pricing depends on session length and team size."
            },
            {
              label: "Growth (Scale/Regional)",
              price: "Starting from ₦600,000",
              desc: "For advanced training and larger groups. Custom packages available."
            },
            {
              label: "International",
              price: "Starting from $600",
              desc: "For international clients. Pricing based on content and support level."
            }
          ]
        }
      ]

  const whyChooseUs = [
    {
      title: "Proven Expertise",
      description: "Creator of aria-ease, an open-source accessibility library trusted by developers worldwide"
    },
    {
      title: "Hands-On Experience",
      description: "Deep understanding of ARIA patterns, WCAG guidelines, and real-world implementation"
    },
    {
      title: "Developer-First Approach",
      description: "Solutions that are practical, maintainable, and integrate seamlessly with your workflow"
    },
    {
      title: "Comprehensive Testing",
      description: "Manual + automated testing with actual assistive technologies, not just scanners"
    }
  ];

  return (   
      <div className="home-body" id="inner-body-div">
        <Helmet>
        <title>Accessibility Services | Aria-Ease</title>
        <meta name="description" content="Professional accessibility audits, remediation, code review, and training. WCAG-compliant solutions for Nigerian, regional, and international teams. Get a custom quote today." />
      </Helmet>
      <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
      <ScrollTracker page={page}/>
        <Header 
          setShowDropdownPage={setShowDropdownPage} 
          showDropdownPage={showDropdownPage} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          page={page}
          resultsVisible={resultsVisible}
          setResultsVisible={setResultsVisible}
        />
        
        
        <main className="page-body-div overflow-y-auto pb-[100px]" id="main-content">
          <Container fluid>
            {/* Hero Section */}
            <section className="services-hero mb-[80px] py-[60px] px-0">
              <Row className="justify-content-center text-center">
                <Col lg={10}>
                  <h1 className="services-title font-semibold mb-6 ">Professional Accessibility Services</h1>
                  <p className="services-subtitle black-grey-text max-w-[800px] mx-auto my-0 leading-[1.8]">
                    Make your digital products accessible to everyone. WCAG-compliant solutions 
                    from the creator of aria-ease.
                  </p>
                </Col>
              </Row>
            </section>

            {/* Services Grid */}
            <section className="mb-[100px]">
              <Row>
                {services.map((service, index) => (
                  <Col lg={6} key={index} className="mb-4">
                    <div className="service-card rounded-[16px] p-10 h-full ">
                      <div className="service-icon w-[64px] h-[64px] flex items-center justify-center rounded-[12px] mb-6 text-white">{service.icon}</div>
                      <h2 className="black-white-text font-semibold mb-4 text-[1.5rem]">{service.title}</h2>
                      <p className="service-description black-grey-text mb-6 text-[1rem] ">{service.description}</p>
                      <ul className="service-features p-0 mt-0 mr-0 mb-6 ml-0">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 mb-3 text-[0.95rem]">
                            <CheckCircle2 size={18} className="feature-check mt-[2px]" />
                            <span className="black-grey-text">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="service-pricing font-semibold pt-5 ">
                        {service.pricingTiers && service.pricingTiers.map((tier, tIdx) => (
                          <div className="service-pricing-tier mb-2" key={tIdx}>
                            <strong>{tier.label}:</strong> {tier.price}<br/>
                            <span className="service-pricing-desc">{tier.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </section>

            {/* Why Choose Us */}
            <section className="why-choose-section mb-[100px]">
              <h2 className="text-center black-white-text font-semibold mb-5 text-[2.5rem]">Why Choose Our Services?</h2>
              <Row className="mt-5">
                {whyChooseUs.map((item, index) => (
                  <Col lg={6} key={index} className="mb-4">
                    <div className="why-card rounded-[12px] p-8 h-full">
                      <h3 className="why-title font-semibold mb-3 text-[1.23rem]">{item.title}</h3>
                      <p className="why-description black-grey-text leading-[1.7] m-0 ">{item.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </section>

            {/* Process Section */}
            <section className="process-section mb-[100px]">
              <h2 className="text-center black-white-text font-semibold mb-5 text-[2.5rem]">Our Process</h2>
              <Row className="mt-5">
                <Col lg={3} md={6} className="mb-4">
                  <div className="process-step p-6 text-center">
                    <div className="step-number w-[60px] h-[60px] text-white rounded-[50%] flex items-center justify-center text-[1.5rem] font-bold">1</div>
                    <h3 className="black-white-text font-[600] mb-3 text-[1.25rem]">Consultation</h3>
                    <p className="black-grey-text m-0">Discuss your needs, timeline, and goals</p>
                  </div>
                </Col>
                <Col lg={3} md={6} className="mb-4">
                  <div className="process-step p-6 text-center">
                    <div className="step-number w-[60px] h-[60px] text-white rounded-[50%] flex items-center justify-center text-[1.5rem] font-bold">2</div>
                    <h3 className="black-white-text font-[600] mb-3 text-[1.25rem]">Analysis</h3>
                    <p className="black-grey-text m-0">Comprehensive audit of your digital product</p>
                  </div>
                </Col>
                <Col lg={3} md={6} className="mb-4">
                  <div className="process-step p-6 text-center">
                    <div className="step-number w-[60px] h-[60px] text-white rounded-[50%] flex items-center justify-center text-[1.5rem] font-bold">3</div>
                    <h3 className="black-white-text font-[600] mb-3 text-[1.25rem]">Implementation</h3>
                    <p className="black-grey-text m-0">Fix issues with best practices and clean code</p>
                  </div>
                </Col>
                <Col lg={3} md={6} className="mb-4">
                  <div className="process-step p-6 text-center">
                    <div className="step-number w-[60px] h-[60px] text-white rounded-[50%] flex items-center justify-center text-[1.5rem] font-bold">4</div>
                    <h3 className="black-white-text font-[600] mb-3 text-[1.25rem]">Verification</h3>
                    <p className="black-grey-text m-0">Re-test and validate all fixes for compliance</p>
                  </div>
                </Col>
              </Row>
            </section>

            {/* CTA Section */}
            <section className="cta-section mb-[100px]">
              <div className="cta-card rounded-[20px] text-white text-center">
                <h2 className="cta-title mb-5 text-white font-bold">Ready to Make Your Product Accessible?</h2>
                <p className="cta-description leading-[1.8] max-w-[700px] text-[1.15rem]">
                  Let&#39;s discuss how we can help you achieve WCAG compliance and create 
                  inclusive digital experiences.
                </p>
                <div className="cta-buttons flex gap-[20px] justify-center flex-wrap">
                  <a 
                    href="https://www.linkedin.com/in/isaac-akinduyile-338660192/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary cta-btn items-center gap-[10px] py-[14px] px-8 rounded-[8px] text-[1rem] inline-flex block-interactive"
                  >
                    <Linkedin size={20} />
                    <span>Connect on LinkedIn</span>
                  </a>
                  <a 
                    href="https://calendly.com/scriptkidd98/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline cta-btn items-center gap-[10px] py-[14px] px-8 rounded-[8px] text-[1rem] inline-flex block-interactive"
                  >
                    <Calendar size={20} />
                    <span>Schedule Consultation</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Testimonials Placeholder */}
            <section className="mb-[60px]">
              <h2 className="text-center black-white-text font-semibold mb-5 text-[2.5rem]">Portfolio</h2>
              <Row className="mt-4">
                <Col lg={12}>
                  <div className="portfolio-card text-center rounded-[16px] p-10">
                    <div className="portfolio-icon w-[80px] h-[80px] flex rounded-[16px] items-center justify-center text-white">
                      <Code2 size={40} />
                    </div>
                    <h3 className="black-white-text font-semibold mb-4 text-[1.5rem]">aria-ease</h3>
                    <p className="black-grey-text max-w-[800px] leading-[1.7]">
                      Open-source accessibility library with comprehensive WCAG-compliant 
                      components, automated contract testing, and extensive documentation. 
                      Built from the ground up with accessibility-first principles.
                    </p>
                    <a 
                      href="/" 
                      className="portfolio-link block-interactive items-center font-semibold inline-flex"
                    >
                      View Project <ArrowRight size={16} />
                    </a>
                  </div>
                </Col>
              </Row>
            </section>
          </Container>
          <Footer darkMode={darkMode} />
        </main>

        <SlideOutNav showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} 
        />

        
      </div>  
  );
};

export default Services;
