import '../assets/MainDbBlankPage.css'
import { Sidebar } from '../components/SideBar'
import {BodySection } from '../components/BodySection'
import { NavBar } from '../components/NavBar'

export default function MainDbBlankPage() {
    return (
        <div className="main-db-blank-page">
            <Sidebar/>
            <BodySection/>
            <NavBar/>   
        </div>
    )
}