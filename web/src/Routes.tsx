// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Router, Route, Set } from '@redwoodjs/router'

import SignedInLayout from 'src/layouts/SignedInLayout'
import SignedOutLayout from 'src/layouts/SignedOutLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home" wrap={SignedInLayout}>
        <Route path="/videos/new" page={VideoNewVideoPage} name="newVideo" />
        <Route path="/videos/{id:Int}/edit" page={VideoEditVideoPage} name="editVideo" />
        <Route path="/videos/{id:Int}" page={VideoVideoPage} name="video" />
        <Route path="/videos/user/{id:Int}" page={VideoUserPage} name="user" />
        <Route path="/videos" page={VideoVideosPage} name="videos" />
      </Private>
      <Set wrap={SignedOutLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
