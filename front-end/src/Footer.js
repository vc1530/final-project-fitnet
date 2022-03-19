import "./Footer.css"

{/* <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <b><a href="/Feed">Feed</a></b>
                    <a href="/MyProfile">My Profile</a>
                    <a href="#">Settings</a>
                </nav>
            </footer> */}

const Footer = props => { 

    const titles = ["Create a new post", "Feed", "My Profile", "Settings"]; 
    const links = ["#", "/Feed", "MyProfile", "#"]; 

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