import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <>
            <title>Page not found | Helpdesk system</title>
            <h1>404</h1>
            <p>The page you are looking for cannot be found!</p>
            <p>
                Did you mean to visit <Link to='/login'>/login</Link>?
            </p>
        </>
    )
}
