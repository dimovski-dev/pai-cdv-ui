import { Container, Image, Box, Text, Button } from '@chakra-ui/react'
import UserPreview from '../../../assets/images/User.png'
import IconEmail from '../../../assets/icons/IconEmail.svg'
import IconPhone from '../../../assets/icons/IconPhone.svg'
import IconStar from '../../../assets/icons/IconStar.svg'
import {User as UserType} from '../../../app/interfaces/User.interfaces'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { setSelectedUser } from '../../../app/features/user.reducer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface UserProps {
    user: UserType
}
export const User = ({user}: UserProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onEditUserHandler = () => {
        dispatch(setSelectedUser(user.email));
        navigate('/edit')
    } 
    return (
        <Container padding={'25px 20px'} backgroundColor={'#495579'} width={450} height={460}  borderRadius={12}>
            <Box display={'flex'} gap={30} alignItems='center'>
               <Box>
               <Image src={UserPreview}/>
               </Box>
               <Box>
                    <Text fontWeight={400} fontSize={32} color="white" as={'h1'}>{`${user?.firstName || ""} ${user?.lastName || ""}`}</Text>
                    <Text textTransform={'capitalize'} fontWeight={400} fontSize={24} color="white" as={'p'}>{user.jobTitle ?? "Not found"}</Text>
               </Box>
            </Box>

            <Box marginTop={42}>
                <Box display={'flex'} alignItems='center' gap={15}>
                    <Image src={IconEmail}/>
                    <Text fontWeight={400} fontSize={24} color="white" as={'p'}>{user?.email || "Not found"}</Text>
                </Box>
                <Box display={'flex'} alignItems='center' gap={15}>
                    <Image src={IconPhone}/>
                    <Text fontWeight={400} fontSize={24} color="white" as={'p'}>{user?.phone || "Not found"}</Text>
                </Box>
                <Box display={'flex'} alignItems='center' gap={15}>
                    <Image src={IconStar}/>
                    <Text fontWeight={400} fontSize={24} color="white" as={'p'}>{user?.roles[0]?.name === 'ROLE_ADMIN' ? "Admin" : "User" || "Not found"}</Text>
                </Box>
            </Box>

            <Box display={'flex'} justifyContent={'center'} marginTop={45}>
                <Button onClick={() => onEditUserHandler()}>Edit user data</Button>
            </Box>
        </Container>
    )
}