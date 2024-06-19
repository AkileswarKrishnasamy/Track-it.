import {SignInButton,SignUpButton,SignedIn,SignedOut} from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'

export default function Auth(){

    return(
        <div className='login-page' >
            <SignedOut>
                <h1 className='title title-login-page'>Track<span className='title-span'>It.</span></h1>
                <p className='description'>A simple tracking app to track and visualize your expenses</p>
                <SignInButton className='signUp-button'/>
                <SignUpButton className='signIn-button'/>
            </SignedOut>
            <SignedIn>
                <Outlet/>
            </SignedIn>
        </div>
    )
    
}