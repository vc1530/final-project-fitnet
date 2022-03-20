import "./Footer.css"
import {IoIosAddCircleOutline, IoIosAddCircle} from 'react-icons/io'
import {AiOutlineHome, AiFillHome} from 'react-icons/ai'
import {BsPerson, BsPersonFill} from 'react-icons/bs'
import {IoSettingsOutline, IoSettings} from 'react-icons/io'

const Footer = props => { 

    const footerLinks = [ 
        { 
            title: "Create a new post", 
            link: "/NewPost", 
            icon: (<IoIosAddCircleOutline/>), 
            boldIcon: (<IoIosAddCircle/>), 

        }, 
        { 
            title: "Feed", 
            link: "/Feed", 
            icon: (<AiOutlineHome/>), 
            boldIcon: (<AiFillHome/>), 
        }, 
        {
            title: "My Profile", 
            link: "/MyProfile", 
            icon: (<BsPerson/>), 
            boldIcon: (<BsPersonFill/>), 
        },
        {
            title: "Settings", 
            link: "/Settings", 
            icon: (<IoSettingsOutline/>), 
            boldIcon: (<IoSettings/>), 
        }, 

    ]

    return ( 
        <footer className = "footer">
            <nav className = "footer-links"> 
                {footerLinks.map(function(footerLink) { 
                    if (footerLink.title === props.title) { 
                        return (<b><a href={footerLink.link}>{footerLink.title}</a></b>); 
                    }
                    else return (<a href={footerLink.link}>{footerLink.title}</a>); 
                })} 
            </nav>
        </footer> 
    )
}

export default Footer 