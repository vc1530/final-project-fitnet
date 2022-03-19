import "./Footer.css"

const Footer = props => { 

    const titles = ["Create a new post", "Feed", "My Profile", "Settings"]; 
    const links = ["/NewPost", "/Feed", "MyProfile", "/Settings"]; 

    return ( 
        <footer className = "footer">
            <nav className = "footer-links"> 
                {titles.map(function(title, i) { 
                    if (title == props.title) { 
                        return (<b><a href={links[i]}>{title}</a></b>); 
                    }
                    else return (<a href={links[i]}>{title}</a>); 
                })} 
            </nav>
        </footer> 
    )
}

export default Footer 