import "./Footer.css"

const Footer = props => { 

    const footerLinks = [ 
        { 
            title: "Create a new post", 
            link: "/NewPost", 
        }, 
        { 
            title: "Feed", 
            link: "/Feed", 
        }, 
        {
            title: "My Profile", 
            link: "/MyProfile", 
        },
        {
            title: "Settings", 
            link: "/Settings", 
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