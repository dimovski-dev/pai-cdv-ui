import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {  useGetAllUsersQuery } from "./app/api"
import { removeUser, setIsAuthorized, setUser } from "./app/features/user.reducer"
import { AppRouter } from "./app/router/AppRouter"
import { RootState } from "./app/store"
import { Header } from "./components/Header"
import { useNavigate } from "react-router-dom"
import { User } from "./app/interfaces/User.interfaces"


export const App = () => {
  const {error} = useSelector((state: RootState) => state.errorReducer)
  const {isAuthorized, allUsers, user} = useSelector((state: RootState) => state.userReducer)
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const {refetch} = useGetAllUsersQuery('')

  useEffect(() => {
    const isAuthorizedLS = JSON.parse(localStorage.getItem('isAuthed') as string);
    const userLS = JSON.parse(localStorage.getItem('user') as string);

    if(isAuthorizedLS){
      dispatch(setIsAuthorized(isAuthorizedLS))
      dispatch(setUser(userLS))
    }else{
      navigate('/login')
    }
  }, [localStorage]) 

  useEffect(() => {
    if(error.code === 403){
      dispatch(setIsAuthorized(false))
      navigate('/login')
    }
  }, [error.code])


  useEffect(() => {
   refetch()
  }, [isAuthorized])

  return (
    <div>
      <Header/>
      <AppRouter/>
    </div>
  )
}