import {
    Container, Alert, AlertIcon,
    useDisclosure,
    Spinner,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useEffect, useState } from 'react'
import { User } from '../../app/interfaces/User.interfaces'
import { useEditUserMutation } from '../../app/api'
import { DeleteUserAlert } from './DeleteUserAlert'
import { EditUserForm } from './EditUserForm'


export const EditUser = () => {

    const [editUser] = useEditUserMutation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedUser } = useSelector((state: RootState) => state.userReducer)

    const [user, setUser] = useState<User>({
        ...selectedUser,
    })

    const [_, setNeedDeletingNotification] = useState<boolean>(false);
    const [needEditingNotifiocation, setNeedEditingNotification] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onEditUserHandler = () => {
        editUser(user).then(() => {
            setNeedEditingNotification(true)
        })
    }

    const onDeleteHandler = () => {
        setNeedDeletingNotification(true)
        onOpen()
    }

    useEffect(() => {
        setTimeout(() => {
           setNeedEditingNotification(false) 
        }, 2000)
    }, [needEditingNotifiocation])
    return (
        <Container  display={'flex'} justifyContent='center'>

            {
                isLoading ? <Container display={'flex'}
                    justifyContent='center'
                    height={'100vh'}
                    flexDirection='column'
                    alignItems={'center'}>

                    <Spinner

                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='#495579'
                        size='xl'
                    />
                </Container> : <EditUserForm user={user} setUser={setUser} onEditUserHandler={onEditUserHandler} onDeleteHandler={onDeleteHandler}/>
            }
{
                (
                    needEditingNotifiocation && (
                        <Alert transition={'0.3'} width={300} position={'absolute'} top='10px' right={'10px'} status='success'>
                            <AlertIcon />
                            User data was updated succefully!
                        </Alert>
                    )
                )
            }
            <DeleteUserAlert setIsLoading={setIsLoading} onClose={onClose} isOpen={isOpen} userId={user.id} />
        </Container>
    )



}

