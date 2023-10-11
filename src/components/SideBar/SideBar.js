import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import { StyleContext } from '../../context/StyleData';

const SideBar = () => {

    const subShowRef = useRef(null);
    const sidebarRef = useRef(null);

    const { showSubMenu, setShowSM, mainControl, setMainControl, eliminate } = useContext(StyleContext);

    const [activeIndex, setActiveIndex] = useState(0);
    const [subClass, setSubClass] = useState(-1);

    const [showSubMenuHov, setSubHov] = useState(false)

    const sideBarData = [
        {
            label: 'Dashboard',
            path: '/Dashboard',
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 18.3333V10H12.5V18.3333" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            label: 'Customers',
            path: '/Dashboard/Customers',
            icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            label: 'Staff Management',
            path: '/Dashboard/Staff',
            icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            label: 'Map',
            path: '/Dashboard/Map',
            icon: <span class="material-symbols-outlined locationIcon">
                location_on
            </span>
        },
        {
            label: 'Estimates',
            path: '/Dashboard/Estimates',
            icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.8381 12.7317C16.4566 12.7317 16.9757 13.2422 16.8811 13.853C16.3263 17.4463 13.2502 20.1143 9.54009 20.1143C5.43536 20.1143 2.10834 16.7873 2.10834 12.6835C2.10834 9.30245 4.67693 6.15297 7.56878 5.44087C8.19018 5.28745 8.82702 5.72455 8.82702 6.36429C8.82702 10.6987 8.97272 11.8199 9.79579 12.4297C10.6189 13.0396 11.5867 12.7317 15.8381 12.7317Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M19.8848 9.1223C19.934 6.33756 16.5134 1.84879 12.345 1.92599C12.0208 1.93178 11.7612 2.20195 11.7468 2.5252C11.6416 4.81493 11.7834 7.78204 11.8626 9.12713C11.8867 9.5459 12.2157 9.87493 12.6335 9.89906C14.0162 9.97818 17.0914 10.0862 19.3483 9.74467C19.6552 9.69835 19.88 9.43204 19.8848 9.1223Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            label: 'Service Requests',
            path: '/Dashboard/Service-Requests',
            icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.64111 13.5497L9.38482 9.9837L12.5145 12.4421L15.1995 8.97684" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="18.3291" cy="3.85021" rx="1.76201" ry="1.76201" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.6808 2.86012H7.01867C4.25818 2.86012 2.54651 4.81512 2.54651 7.57561V14.9845C2.54651 17.7449 4.22462 19.6915 7.01867 19.6915H14.9058C17.6663 19.6915 19.3779 17.7449 19.3779 14.9845V8.53213" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            label: 'Irrigation',
            path: '/Dashboard/Irrigation',
            icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5346 2.55658H7.1072C4.28845 2.55658 2.52112 4.55216 2.52112 7.37733V14.9985C2.52112 17.8237 4.2802 19.8192 7.1072 19.8192H15.1959C18.0238 19.8192 19.7829 17.8237 19.7829 14.9985V11.3062" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.09214 10.0108L14.9424 3.16057C15.7958 2.30807 17.1791 2.30807 18.0325 3.16057L19.1481 4.27615C20.0015 5.12957 20.0015 6.51374 19.1481 7.36624L12.2648 14.2495C11.8917 14.6226 11.3857 14.8325 10.8577 14.8325H7.42389L7.51006 11.3675C7.52289 10.8578 7.73097 10.372 8.09214 10.0108Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.9014 4.21895L18.0869 8.40445" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            label: 'Punchlist',
            path: '/Dashboard/Punchlist',
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.634 13.4211C18.634 16.7009 16.7007 18.6342 13.4209 18.6342H6.28738C2.99929 18.6342 1.06238 16.7009 1.06238 13.4211V6.27109C1.06238 2.99584 2.26688 1.06259 5.54763 1.06259H7.38096C8.03913 1.06351 8.65879 1.37242 9.05296 1.89951L9.88988 3.01234C10.2859 3.53851 10.9055 3.84834 11.5637 3.84926H14.1579C17.446 3.84926 18.6596 5.52309 18.6596 8.86984L18.634 13.4211Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M5.85754 12.2577H13.8646" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        }
    ]

    const subMenu = [
        {
            label: 'Monthly Landsacpe',
            path: '/Dashboard/Landscape',
        },
        {
            label: 'Service Request',
            path: '/Dashboard/SummaryReport',
        },
        {
            label: 'Proposal Summary',
            path: '/Dashboard/ProposalSummary',
        },
        {
            label: 'Weekly Landsacpe',
            path: '/Dashboard/Weekly-Reports',
        },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                subShowRef.current &&
                !subShowRef.current.contains(event.target)
            ) {
                setSubHov(false)
            }
        };

        document.addEventListener('click', handleClickOutside);
        const handleSidebar = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !eliminate.current.contains(event.target) && window.innerWidth < 450) {
                setMainControl('mobileH')
            }
        }

        document.body.addEventListener('click', handleSidebar)

        return () => {
            document.body.removeEventListener('click', handleSidebar)
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handlePreventLink = (event) => {
        event.preventDefault();
        if (mainControl === 'tab') {
            setSubHov(!showSubMenuHov);
            setShowSM(false);
        }
        else {
            // toggleShowMenu();
            setShowSM(!showSubMenu);
        }
    }

    let activeClass = '';

    const renderOptions = sideBarData.map((option, index) => {
        const handleActiveClass = (clickIndex) => {
            setActiveIndex(clickIndex)
        }
        if (activeIndex === index) {
            activeClass = 'mm-active'
        }
        if (window.location.pathname.substring(0, 14) === option.path.substring(0, 14)) {
            activeClass = 'mm-active'
        }
        else {
            activeClass = ''
        }
        return (
            <li key={index} className={activeClass + ' linkSide'} onClick={() => { handleActiveClass(index) }}>
                <NavLink to={option.path} >
                    <div className="menu-icon ">
                        {option.icon}
                    </div>
                    <span className="nav-text navLabel">{option.label}</span>
                </NavLink>
            </li>
        )
    })

    const toggleShowMenu = () => {
        setShowSM(!showSubMenu);
    }
    useEffect(() => {
        if (showSubMenu === true) {
            document.getElementById('bottomChev').classList.add('rotatezero');
        }
        else {
            document.getElementById('bottomChev').classList.remove('rotatezero');
        }
    }, [showSubMenu])

    return (
        <>
            <div className="deznav" id='sideBarDez' ref={sidebarRef}>
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        {renderOptions}
                        <li>
                            <a href='/' className='expand-bottom' onClick={handlePreventLink} ref={subShowRef}>
                                <div className="menu-icon">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.75713 9.35157V15.64" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M11.0349 6.34253V15.64" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M15.2428 12.6746V15.64" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.2952 1.83333H6.70474C3.7103 1.83333 1.83331 3.95274 1.83331 6.95306V15.0469C1.83331 18.0473 3.70157 20.1667 6.70474 20.1667H15.2952C18.2984 20.1667 20.1666 18.0473 20.1666 15.0469V6.95306C20.1666 3.95274 18.2984 1.83333 15.2952 1.83333Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                                <span className="nav-text navLabel">Reports
                                    <span className="material-symbols-sharp" id='bottomChev'>
                                        expand_more
                                    </span>
                                </span>
                            </a>
                            <ul className="subMenu" >
                                {showSubMenu &&
                                    <>
                                        {subMenu.map((link, index) => {
                                            let activeClass = '';
                                            if (subClass === index) {
                                                activeClass = 'activeSub'
                                            }
                                            else {
                                                activeClass = ''
                                            }
                                            // const activeSub = (indx) => {
                                            //     if (indx === indx) {
                                            //         setSubClass('activeSub')
                                            //     }
                                            // }
                                            // const deactiveSub = () => {
                                            //     setSubClass('')
                                            // }

                                            return (
                                                <li key={index}><NavLink to={link.path} style={{ display: 'flex' }} onMouseEnter={() => setSubClass(index)} onMouseLeave={() => setSubClass(-1)}>
                                                    <div className='blueBarBox'>
                                                        <span id='blueBar' className={activeClass}></span>
                                                    </div>
                                                    {link.label}
                                                </NavLink></li>
                                            )
                                        })}
                                    </>
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            {showSubMenuHov &&
                <ul className="activeHover subMenu" >
                    {showSubMenuHov &&
                        <>
                            {subMenu.map((link, index) => {
                                let activeClass = '';
                                if (subClass === index) {
                                    activeClass = 'activeSub'
                                }
                                else {
                                    activeClass = ''
                                }

                                return (
                                    <li key={index}><NavLink to={link.path} style={{ display: 'flex' }} onMouseEnter={() => setSubClass(index)} onMouseLeave={() => setSubClass(-1)}>
                                        <div className='blueBarBox'>
                                            <span id='blueBar' className={activeClass}></span>
                                        </div>
                                        {link.label}
                                    </NavLink></li>
                                )
                            })}
                        </>
                    }
                </ul>
            }
        </>
    )
}

export default SideBar
