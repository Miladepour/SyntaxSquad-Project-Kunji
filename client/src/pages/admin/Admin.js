import { useAuth0 } from '@auth0/auth0-react';

export default function Admin() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  return(
    <div>
      {isAuthenticated
        ? <>
          Hello {user.name}{' '}
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button></>
        : <button onClick={() => loginWithRedirect()}>Log in</button>
      }
    </div>
  );
}