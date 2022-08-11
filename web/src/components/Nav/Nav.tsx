import classnames from 'classnames'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useLocation, navigate } from '@redwoodjs/router'

import { useCurrentUser } from 'src/helpers/hooks'

function NavItem({ to = null, onClick = null, children }) {
  const location = useLocation()
  const active = location === to
  return (
    <li className={classnames('mr-4 inline text-xl', 'font-bold')}>
      {to ? (
        <Link to={to}>{children}</Link>
      ) : (
        <button onClick={onClick}>{children}</button>
      )}
    </li>
  )
}

const Nav = () => {
  const auth = useAuth()
  const user = useCurrentUser()

  async function logout() {
    await auth.logOut()
    navigate(routes.login())
  }

  return (
    <ul>
      <NavItem to={routes.videos()}>Videos</NavItem>
      <NavItem to={routes.user({ id: user.id })}>My Videos</NavItem>
      <NavItem to={routes.newVideo()}>Add Video</NavItem>
      <NavItem onClick={logout}>Log out ({user.email})</NavItem>
    </ul>
  )
}

export default Nav
