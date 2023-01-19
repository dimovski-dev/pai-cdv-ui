import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteUserMutation } from '../../../app/api'

interface DeleteUserAlertProps {
    userId: number,
    isOpen: boolean,
    onClose: () => void,
    setIsLoading: (payload: boolean) => void,
}
export const  DeleteUserAlert = ({userId, isOpen, onClose, setIsLoading}: DeleteUserAlertProps) => {
    const cancelRef = useRef(null)
    const navigate = useNavigate()
    
    const [deleteUser] = useDeleteUserMutation()
    const [needNotifiocation, setNeedNotification] = useState<boolean>(false);
    
    const onDeleteHandler = () => {
        deleteUser(userId).then(() => {
            onClose()
            setIsLoading(true)
        }).then(() => {
            setNeedNotification(true)
        })
    }

    useEffect(() => {
        if (needNotifiocation) {
            setTimeout(() => {
                setNeedNotification(false)
                setIsLoading(false)
                navigate('/')
            }, 2500)
        }
    }, [needNotifiocation])
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Customer
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={onDeleteHandler} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {
                (
                    needNotifiocation && (
                        <Alert transition={'0.3'} width={300} position={'absolute'} top='10px' right={'10px'} status='success'>
                            <AlertIcon />
                            User was deleted succefully!
                        </Alert>
                    )
                )
            }
      </>
    )
  }