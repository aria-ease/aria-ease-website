import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import ScrollTracker from '../components/ScrollTracker';
import CalloutPanel from '../components/CalloutPanel';
import { ChevronRightCircleIcon, Layers, Hammer, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line react/prop-types
const UtilityPhilosophy = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'utility-philosophy';
  const [resultsVisible, setResultsVisible] = useState(false);

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Utility Philosophy | Aria-Ease</title>
        <meta
          name="description"
          content="Understand the Aria-Ease utility philosophy: a proven baseline interpretation of accessibility behavior that is consistent, testable, and production-ready."
        />
      </Helmet>
      <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
      <ScrollTracker page={page} />
      <Header
        page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}
        resultsVisible={resultsVisible}
        setResultsVisible={setResultsVisible}
      />

      <main className='page-body-div documentation-page section-tone-a' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page} />
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div docs-flow'>
                <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                  <span className='docs-kicker black-grey-text'>Philosophy</span>
                  <h1 className='introduction-heading black-white-text'>Utility <span className='text-gradient'>Philosophy</span></h1>
                  <p className='mt-2 docs-intro-copy'>Aria-Ease utilities are a proven baseline interpretation of component accessibility behavior: a standard you can trust, not the only standard that can exist.</p>
                </div>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>What Utilities Are</h2>
                  <p className='mb-4'>Aria-Ease utilities package repeatable accessibility behavior for common interactive patterns. They are designed to reduce ambiguity for teams that need a reliable place to start.</p>

                  <CalloutPanel tone='info' className='p-4'>
                    <div className='flex items-start gap-3'>
                      <Layers className='mt-1 flex-shrink-0' size={22} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-2 black-white-text'>A Standard, Not The Standard</h3>
                        <p className='black-grey-text'>Utilities encode one valid interpretation of APG-informed behavior. Accessibility has multiple valid implementations, and Aria-Ease intentionally provides a consistent baseline rather than claiming a universal rulebook.</p>
                      </div>
                    </div>
                  </CalloutPanel>
                </section>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>Why This Baseline Exists</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CalloutPanel tone='success' className='p-4'>
                      <div className='flex items-start gap-3'>
                        <ShieldCheck className='mt-1 flex-shrink-0' size={22} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold mb-2 black-white-text'>Consistency</h3>
                          <p className='black-grey-text'>Teams avoid drift when every component starts from the same behavior baseline for keyboard interaction, focus flow, and ARIA state updates.</p>
                        </div>
                      </div>
                    </CalloutPanel>

                    <CalloutPanel tone='purple' className='p-4'>
                      <div className='flex items-start gap-3'>
                        <Hammer className='mt-1 flex-shrink-0' size={22} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold mb-2 black-white-text'>Speed</h3>
                          <p className='black-grey-text'>Utilities remove repetitive plumbing so teams can build product behavior without re-solving ARIA and keyboard mechanics on every feature.</p>
                        </div>
                      </div>
                    </CalloutPanel>
                  </div>
                </section>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>What Utilities Are Not</h2>
                  <ul className='list-disc ml-6 space-y-2'>
                    <li>Not a claim that every accessible component must behave exactly this way in every product context.</li>
                    <li>Not a replacement for manual testing, screen reader validation, or domain-specific UX decisions.</li>
                    <li>Not a complete accessibility strategy on their own.</li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>How Utilities and Contracts Relate</h2>
                  <p className='mb-4'>Aria-Ease utilities are tightly aligned to Aria-Ease contracts. Today, utilities implement the baseline behavior model maintained by the project. Contracts are the policy layer used to verify that baseline behavior stays consistent over time.</p>
                  <p className='mb-4'>In practice: use utilities to start quickly, then use contracts and testing to enforce behavior and prevent regressions.</p>

                  <CalloutPanel tone='yellow' className='p-4'>
                    <p className='black-grey-text'><strong>Practical guidance:</strong> Utilities are best treated as your reliable starting implementation. If your organization needs different behavior, shape policy at the contract/testing layer as that override model matures.</p>
                  </CalloutPanel>
                </section>

                <section className='side-body-sections-div tone-card tone-card-base docs-section-card'>
                  <h2 className='text-3xl font-bold mb-4'>Who This Helps</h2>
                  <ul className='list-disc ml-6 space-y-2'>
                    <li><strong>Beginners:</strong> Start from a trustworthy baseline instead of guessing.</li>
                    <li><strong>Teams:</strong> Standardize behavior across components and releases.</li>
                    <li><strong>Experts:</strong> Use the baseline as a reference point, then enforce custom policy through contract-driven validation.</li>
                  </ul>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                  <a href='/contract/dsl' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <ChevronRightCircleIcon className='rotate-180' />
                    <div className='flex flex-col w-full'>
                      <span className='text-sm black-white-text'>Prev</span>
                      <span className='next-link-text text-md'>Contract DSL</span>
                    </div>
                  </a>
                  <a href='/philosophy/contracts' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <div className='flex flex-col w-full items-end'>
                      <span className='text-sm black-white-text'>Next</span>
                      <span className='next-link-text text-md'>Contract Philosophy</span>
                    </div>
                    <ChevronRightCircleIcon />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <SlideOutNav page={page} showDropdownPage={showDropdownPage} />
    </div>
  );
};

export default UtilityPhilosophy;
