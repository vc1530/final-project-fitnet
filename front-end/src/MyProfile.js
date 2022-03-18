import "./MyProfile.css"

const MyProfile = () => {
    return(
        <main className="MyProfile">
            <img class="img" src="blank_profile.jpg" alt="profile img"/>
            <p class="border">John Smith</p>
            <p class="border">@j.smith5</p>
            <p class="border">Words for bio go here</p>
        </main>
    )
}

export default MyProfile