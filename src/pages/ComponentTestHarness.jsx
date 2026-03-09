import { useSearchParams } from 'react-router-dom';
import ShopifyUserMenu from '../components/menus/ShopifyUserMenu';
import ComboBox from '../components/combobox/ComboBox';
import AccordionExample from '../components/accordions/AccordionExample';
import CheckboxExample from '../components/checkbox/Checkbox';
import HorizontalTabs from '../components/tabs/HorizontalTabs';
import VerticalTabs from '../components/tabs/VerticalTabs';

// Registry of components available for testing
const COMPONENT_REGISTRY = {
  menu: ShopifyUserMenu,
  combobox: ComboBox,
  accordion: AccordionExample,
  checkbox: CheckboxExample,
  tabs_horizontal: HorizontalTabs,
  tabs_vertical: VerticalTabs,
};

/**
 * Test harness for isolated component testing with Playwright
 * Usage: http://localhost:5173/test-harness?component=menu
 * 
 * This renders a single component in isolation for accessibility testing
 */
export default function ComponentTestHarness() {
  const [searchParams] = useSearchParams();
  const componentName = searchParams.get('component');
  
  const Component = COMPONENT_REGISTRY[componentName];
  
  if (!Component) {
    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>Component Test Harness</h1>
        <p>Invalid component: {componentName}</p>
        <p>Available components:</p>
        <ul>
          {Object.keys(COMPONENT_REGISTRY).map(key => (
            <li key={key}>
              <a href={`?component=${key}`}>{key}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  // Render component in isolation (no app layout/chrome)
  return <Component />;
}
