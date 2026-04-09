import { useEffect, useRef } from 'react';
import './shopifyUserMenu.css';
import * as Menu from 'aria-ease/menu';

const ShopifyUserMenu = () => {
    const menuRef = useRef();
    
    useEffect(() => {
        const triggerButton = document.querySelector("#merchant-profile-menu-button");
        const menuDiv = document.querySelector("#merchant-dropdown-menu");
        
        if (!triggerButton || !menuDiv) {
            console.error('[ShopifyUserMenu] Required elements not found');
            return;
        }
        
        menuRef.current = Menu.makeMenuAccessible({
          menuId: "merchant-dropdown-menu",
          menuItemsClass: "merchant-profile-menu-item",
          triggerId: "merchant-profile-menu-button",
          callback: {
            onOpenChange: (isOpen) => {
                // Do something when 
                //console.log(isOpen);
            }
          }
        });
    
        return () => {
            if (menuRef.current) {
                menuRef.current.cleanup();
            }
        };
    }, []);

  return (
    <div className="relative">
        <button 
            className="merchant-profile-menu-button rounded-[8px] w-[150px] pt-[2px] pr-[2px] pb-[2px] pl-2 gap-2 grid items-center" 
            id="merchant-profile-menu-button" 
            aria-label="Merchant profile menu, Davii Collections"
        >
            <span className='whitespace-nowrap font-[500] text-[13px] leading-[18px]'>Davii Collections</span>
            <div className="header-merchant-profile-image-div-button flex items-center justify-center w-[28px] rounded-[6px] text-black font-[500] h-[28px] p-0">
                <span className='text-center text-[13px] leading-[16px]'>DC</span>
            </div>
        </button>

        <div 
            className="merchant-dropdown-menu rounded-[14px] w-[308px] bg-white z-[1] mt-2 py-[6px] px-0 top-[38px] left-0 absolute" 
            id="merchant-dropdown-menu" 
            aria-labelledby="merchant-profile-menu-button"
        >
            <div className="py-0 px-[6px]">
                <div className="merchant-dropdown-menu-merchant-profile-div w-full pt-[4px] pr-3 pb-[4px] pl-[4px] rounded-[8px] flex justify-between items-center">
                    <div className="merchant-dropdown-menu-merchant-profile-grid-div grid items-center gap-[8px]">
                        <div className="merchant-dropdown-menu-merchant-profile-image-div flex items-center justify-center w-[28px] rounded-[6px] text-black font-[500] h-[28px]">
                            <span>DC</span>
                        </div>
                        <span className="merchant-dropdown-menu-merchant-name text-[13px] font-[600] leading-[18px] whitespace-nowrap">Davii Collections</span>
                    </div>
                    <svg width="10.67" height="7.33" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3332 1L3.99984 8.33333L0.666504 5" stroke="#303030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <a href="#" className="merchant-profile-menu-item merchant-dropdown-menu-all-stores-link p-[6px] rounded-[8px] grid gap-2 mt-[2px] items-center">
                    <svg width="20" height="20" viewBox="0 0 21 20" fill="rgba(48, 48, 48, 1)" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.757 3H7.24302C6.85944 3 6.4971 3.17611 6.26012 3.47772L3.87394 6.51468C3.63169 6.823 3.5 7.20375 3.5 7.59586V8.25C3.5 9.31867 4.10958 10.245 5 10.7001V15.25C5 16.2165 5.7835 17 6.75 17H14.25C15.2165 17 16 16.2165 16 15.25V10.7001C16.8904 10.245 17.5 9.31867 17.5 8.25V7.76879C17.5 7.26465 17.3307 6.77511 17.0192 6.3787L14.7399 3.47772C14.5029 3.17611 14.1406 3 13.757 3ZM13.5 15.5H14.25C14.3881 15.5 14.5 15.3881 14.5 15.25V11C13.712 11 13.0014 10.6686 12.5 10.1375C11.9986 10.6686 11.288 11 10.5 11C9.71199 11 9.00138 10.6686 8.5 10.1375C7.99862 10.6686 7.28801 11 6.5 11V15.25C6.5 15.3881 6.61193 15.5 6.75 15.5H10.5V13C10.5 12.4477 10.9477 12 11.5 12H12.5C13.0523 12 13.5 12.4477 13.5 13V15.5ZM6.5 9.5H6.25C5.55964 9.5 5 8.94036 5 8.25V7.59586C5 7.53985 5.01881 7.48545 5.05342 7.44141L7.36453 4.5H13.6355L15.8397 7.30543C15.9436 7.43757 16 7.60075 16 7.76879V8.25C16 8.94036 15.4404 9.5 14.75 9.5H14.5C13.8096 9.5 13.25 8.94036 13.25 8.25V7.75C13.25 7.33579 12.9142 7 12.5 7C12.0858 7 11.75 7.33579 11.75 7.75V8.25C11.75 8.94036 11.1904 9.5 10.5 9.5C9.80964 9.5 9.25 8.94036 9.25 8.25V7.75C9.25 7.33579 8.91421 7 8.5 7C8.08579 7 7.75 7.33579 7.75 7.75V8.25C7.75 8.94036 7.19036 9.5 6.5 9.5Z" fill="rgba(48, 48, 48, 1)"/>
                    </svg>
                    <span className="merchant-dropdown-menu-link-text text-[13px] font-[400] leading-[18px] whitespace-nowrap">All stores</span>
                </a>
            </div>
            <hr className="merchant-dropdown-menu-hr h-[0.75px] my-1 mx-0"/>
            <div className="px-[6px] py-0">
                <a href="#" className="merchant-profile-menu-item mt-1 merchant-dropdown-menu-link-text px-[6px] py-0 flex items-center rounded-[8px] h-[30px] text-[13px] font-[400] leading-[18px] whitespace-nowrap">Help Center</a>
                <a href="#" className="merchant-profile-menu-item mt-1 merchant-dropdown-menu-link-text px-[6px] py-0 flex items-center rounded-[8px] h-[30px] text-[13px] font-[400] leading-[18px] whitespace-nowrap">Changelog</a>
                <a href="#" className="merchant-profile-menu-item mt-1 merchant-dropdown-menu-link-text px-[6px] py-0 flex items-center rounded-[8px] h-[30px] text-[13px] font-[400] leading-[18px] whitespace-nowrap">Community forums</a>
                <a href="#" className="merchant-profile-menu-item mt-1 merchant-dropdown-menu-link-text px-[6px] py-0 flex items-center rounded-[8px] h-[30px] text-[13px] font-[400] leading-[18px] whitespace-nowrap">Hire a Shopify Partner</a>
                <a href="#" className="merchant-profile-menu-item mt-1 merchant-dropdown-menu-link-text px-[6px] py-0 flex items-center rounded-[8px] h-[30px] text-[13px] font-[400] leading-[18px] whitespace-nowrap">Keyboard shortcuts</a>
            </div>
            <hr className="merchant-dropdown-menu-hr h-[0.75px] my-1 mx-0"/>
            <div className="py-0 px-[6px]">
                <a href="#" className="merchant-profile-menu-item mt-1 merchant-dropdown-menu-profile-name-email-link px-[6px] py-0 rounded-[8px] h-[50px] flex flex-col justify-center">
                    <p className='m-0 text-[13px] font-[500] leading-[18px]'>David Micheal</p>
                    <p className='m-0 text-[12px] font-[400] leading-[16px]'>davidmicheal@gmail.com</p>
                </a>
                <a href="#" className="merchant-profile-menu-item mt-1 px-[6px] py-0 flex items-center rounded-[8px] h-[30px] text-[13px] font-[400] leading-[18px] whitespace-nowrap merchant-dropdown-menu-link-text">Manage account</a>
                <a href="#" className="merchant-profile-menu-item mt-1 px-[6px] py-0 flex items-center rounded-[8px] h-[30px] text-[13px] font-[400] leading-[18px] whitespace-nowrap merchant-dropdown-menu-link-text">Log out</a>
            </div>
        </div>
    </div>
  )
}

export default ShopifyUserMenu