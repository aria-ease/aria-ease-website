import { useEffect, useRef } from 'react';
import * as Tabs from 'aria-ease/tabs';

const VerticalTabs = () => {
    const verticalTabsRef = useRef(null);
    
    useEffect(() => {
        // Initialize vertical tabs
        verticalTabsRef.current = Tabs.makeTabsAccessible({
            tabListId: 'settings-tabs',
            tabsClass: 'settings-tab',
            tabPanelsClass: 'settings-panel',
            orientation: 'vertical',
            activateOnFocus: true,
            callback: {
                onTabChange: (activeIndex, previousIndex) => {
                    console.log(`Vertical tab changed from ${previousIndex} to ${activeIndex}`);
                }
            }
        });

        // Cleanup on unmount
        return () => {
            if (verticalTabsRef.current) {
                verticalTabsRef.current.cleanup();
            }
        };
    }, []);

  return (
    <div className='max-w-[900px] m-auto pt-10 space-y-12'>
            {/* Vertical Tabs Example */}
            <section>
                <h1 className='text-2xl font-bold mb-4'>Vertical Tabs Example</h1>
                <p className='text-sm text-gray-600 mb-4'>
                    Use Up/Down arrows to navigate, Home/End to jump to first/last tab
                </p>
                <div className='flex gap-5'>
                    <div id='settings-tabs' aria-label='Settings' className='flex flex-col gap-2 min-w-[140px]'>
                        <button className='rounded-lg block-interactive border px-4 py-2 text-sm text-left settings-tab'>
                            Profile
                        </button>
                        <button className='rounded-lg block-interactive border px-4 py-2 text-sm text-left settings-tab'>
                            Notification
                        </button>
                        <button className='rounded-lg block-interactive border px-4 py-2 text-sm text-left settings-tab'>
                            Security
                        </button>
                    </div>
                    <div className='flex-1'>
                        <div className="settings-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-3">Profile Settings</h2>
                            <form className='space-y-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Display Name</label>
                                    <input type='text' placeholder='Enter display name' className='border rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Email</label>
                                    <input type='email' placeholder='Enter email' className='border rounded-md p-2' />
                                </div>
                                <button type="button" className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-600'>
                                    Save Profile Changes
                                </button>
                            </form>
                        </div>

                        <div className="settings-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-3">Notification Preferences</h2>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" id="email-notif" className='w-4 h-4' />
                                    <label htmlFor="email-notif" className='text-sm'>Receive updates via email</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" id="push-notif" className='w-4 h-4' />
                                    <label htmlFor="push-notif" className='text-sm'>Enable push notifications</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" id="sms-notif" className='w-4 h-4' />
                                    <label htmlFor="sms-notif" className='text-sm'>SMS notifications for important updates</label>
                                </div>
                            </div>
                        </div>

                        <div className="settings-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-3">Security Settings</h2>
                            <form className='space-y-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Current Password</label>
                                    <input type='password' placeholder='Enter current password' className='border rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">New Password</label>
                                    <input type='password' placeholder='Enter new password' className='border rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Confirm New Password</label>
                                    <input type='password' placeholder='Confirm new password' className='border rounded-md p-2' />
                                </div>
                                <button type="button" className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-600'>
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default VerticalTabs