import { Box, Container, Text, Image } from "@chakra-ui/react"
import {NavLink, useNavigate} from 'react-router-dom'
import IconExit from '../../assets/icons/IconExit.svg'
import IconPlus from '../../assets/icons/IconPlus.svg'
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useDispatch } from "react-redux"
import { removeUser } from "../../app/features/user.reducer"
import { useEffect, useState } from "react"
import { User } from "../../app/interfaces/User.interfaces"


export const Header = () => {
    const {isAuthorized, user, allUsers} = useSelector((state: RootState) => state.userReducer)

    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onExitHandler = () => {
        localStorage.removeItem('isAuthed')
        localStorage.removeItem('user')
        dispatch(removeUser())
        navigate('/login')
    }

    useEffect(() => {

        const currentUser = allUsers.find((currentUser: User) => currentUser.email === user.email);
        
       if(Array.isArray(currentUser?.roles)){
            if(currentUser?.roles[0].name === 'ROLE_ADMIN'){
                setIsAdmin(true)
            }
       }
    }, [user, allUsers])
    return (
        <header style={{width: '100%'}}>
            <Box display={'flex'} alignItems='center' justifyContent={'space-between'} bg='#495579' w='100%' height={'75px'} p={4} color='white'>
               <Container margin={'0'}><Text fontSize={36} lineHeight={44}><NavLink to={'/'}>Employee Service </NavLink></Text></Container> 
               <Container display={'flex'} alignItems='center' justifyContent={'flex-end'} gap={10} margin={'0'}>
                {
                    isAuthorized &&  (
                        <>
                            {
                                isAdmin && <Box><NavLink to={'/add'}><Image cursor={'pointer'} width={'36px'} height={'36px'} src={IconPlus}/></NavLink></Box>
                            }
                            <Box onClick={() => onExitHandler()}><Image cursor={'pointer'} width={'36px'} height={'36px'} src={IconExit}/></Box>
                        </>
                    )
                }
                </Container> 
            </Box>
        </header>
    )
}