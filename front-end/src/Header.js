import "./Header.css"    
         
const Header = props => { 
    return (
        <header className = "header">
                <h1> <a href = {props.url} >{props.title}</a></h1>
        </header>
    ) 

} 

export default Header 