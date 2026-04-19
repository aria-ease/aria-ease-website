import { useEffect, useRef } from 'react';
import * as Tabs from 'aria-ease/tabs';

const HorizontalTabs = () => {
    const horizontalTabsRef = useRef(null);

    useEffect(() => {
        // Initialize horizontal tabs
        horizontalTabsRef.current = Tabs.makeTabsAccessible({
            tabListId: 'product-tabs',
            tabsClass: 'product-tab',
            tabPanelsClass: 'product-panel',
            orientation: 'horizontal',
            activateOnFocus: true,
            callback: {
                onTabChange: (activeIndex, previousIndex) => {
                    console.log(`Horizontal tab changed from ${previousIndex} to ${activeIndex}`);
                },
                onContextMenu: (tabIndex) => {
                    // Right-click or Shift + F10 was pressed - open context menu
                    const tabNames = ['Overview', 'Features', 'Pricing', 'Reviews'];
                    const menu = confirm(`Context menu for "${tabNames[tabIndex]}" tab\n\nOptions:\n• Add to favorites\n• Share tab\n• Close others\n\nPress OK to continue`);
                    console.log(`Context menu opened for tab ${tabIndex} (${tabNames[tabIndex]})`, { menu });
                }
            }
        });

        // Cleanup on unmount
        return () => {
            if (horizontalTabsRef.current) {
                horizontalTabsRef.current.cleanup();
            }
        };
    }, []);

  return (
    <div className='max-w-[900px] m-auto pt-10 space-y-12'>
            {/* Horizontal Tabs Example */}
            <section>
                <h1 className='text-2xl font-bold mb-4'>Horizontal Tabs Example</h1>
                <p className='text-sm text-gray-600 mb-2'>
                    Use Left/Right arrows to navigate, Home/End to jump to first/last tab
                </p>
                <p className='text-sm text-blue-600 mb-4'>
                    💡 Try <span className='font-semibold'>right-click</span> (or <kbd className='px-1 py-0.5 bg-gray-100 border rounded text-xs'>Shift</kbd> + <kbd className='px-1 py-0.5 bg-gray-100 border rounded text-xs'>F10</kbd> on Windows) to open context menu
                </p>
                <div>
                    <div id='product-tabs' aria-label='Product Info' className='flex gap-2 border-b'>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab one' aria-haspopup="menu">
                            Overview
                        </button>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab two' aria-haspopup="menu">
                            Features
                        </button>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab three' aria-haspopup="menu">
                            Pricing
                        </button>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab four' aria-haspopup="menu">
                            Reviews
                        </button>
                    </div>
                    <div className='mt-4'>
                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Product Overview</h2>
                            <p>This is a comprehensive overview of our amazing product. It includes all the essential information you need to know.</p>
                        </div>

                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Key Features</h2>
                            <ul className='list-disc ml-5 space-y-1'>
                                <li>Full keyboard navigation support</li>
                                <li>ARIA compliant implementation</li>
                                <li>Automatic focus management</li>
                                <li>Customizable orientation</li>
                            </ul>
                        </div>

                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Pricing Plans</h2>
                            <div className='space-y-2'>
                                <div className='p-3 border rounded'>
                                    <h3 className='font-semibold'>Free</h3>
                                    <p className='text-sm'>$0/month - Perfect for testing</p>
                                </div>
                                <div className='p-3 border rounded bg-blue-50'>
                                    <h3 className='font-semibold'>Pro</h3>
                                    <p className='text-sm'>$29/month - For professionals</p>
                                </div>
                            </div>
                        </div>

                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Customer Reviews</h2>
                            <div className='space-y-3'>
                                <div className='border-b pb-2'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-semibold'>John D.</span>
                                        <span className='text-yellow-500'>★★★★★</span>
                                    </div>
                                    <p className='text-sm mt-1'>Excellent accessibility support!</p>
                                </div>
                                <div className='border-b pb-2'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-semibold'>Sarah M.</span>
                                        <span className='text-yellow-500'>★★★★☆</span>
                                    </div>
                                    <p className='text-sm mt-1'>Easy to use and implement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default HorizontalTabs