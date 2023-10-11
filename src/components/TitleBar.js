import React from 'react'

const TitleBar = ({ icon, title }) => {
    return (
        <div className="page-titles">
            <ol className="breadcrumb">
                <div className="menu-icon">
                    {icon}
                </div>
                <li><h5 className="bc-title">{title}</h5></li>
            </ol>
            {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a>*/}
        </div> 
    )
}

export default TitleBar
