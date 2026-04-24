
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const normalToken=localStorage.getItem("token")
    const authToken=sessionStorage.getItem("authtoken")
    if(! normalToken && !authToken ){
         return <Navigate to="/home" />
    }
  return children
}
export default ProtectedRoute
