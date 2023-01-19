import {
Image, Box, Input, Select, Button,
    FormControl,
} from '@chakra-ui/react'

import UserPreview from '../../../assets/images/User.png'
import IconEmail from '../../../assets/icons/IconEmail.svg'
import IconPhone from '../../../assets/icons/IconPhone.svg'
import IconStar from '../../../assets/icons/IconStar.svg'
import { User } from '../../../app/interfaces/User.interfaces'


interface EditUserFormProps {
    onEditUserHandler: () => void,
    onDeleteHandler: () => void,
    user: User,
    setUser: any
}

export const EditUserForm = ({onEditUserHandler, onDeleteHandler, user, setUser}: EditUserFormProps) => {
    
    const onChangeFieldHandler = (field: keyof User, value: any) => {

        setUser((prevState: User) => ({ ...prevState, [field]: value }))
    }
    return (
        <FormControl marginTop={'50px'} padding={'25px 20px'} backgroundColor={'#495579'} width={450} height={520} borderRadius={12}>
                    <Box display={'flex'} gap={30} alignItems='center'>
                        <Box>
                            <Image src={UserPreview} />
                        </Box>
                        <Box display={'flex'} gap={5}>
                            <Input onChange={e => onChangeFieldHandler('firstName', e.target.value)} fontWeight={400} color="white" defaultValue={user.firstName} />
                            <Input onChange={e => onChangeFieldHandler('lastName', e.target.value)} fontWeight={400} color="white" defaultValue={user.lastName} />
                        </Box>
                    </Box>
                    <Box>
                        <Input onChange={e => onChangeFieldHandler('jobTitle', e.target.value)} fontWeight={400} color="white" defaultValue={user.jobTitle} />
                    </Box>
                    <Box marginTop={42}>
                        <Box display={'flex'} alignItems='center' gap={15}>
                            <Image src={IconEmail} />
                            <Input onChange={e => onChangeFieldHandler('email', e.target.value)} fontWeight={400} color="white" defaultValue={user.email} />
                        </Box>
                        <Box display={'flex'} alignItems='center' gap={15}>
                            <Image src={IconPhone} />
                            <Input onChange={e => onChangeFieldHandler('phone', e.target.value)} fontWeight={400} color="white" defaultValue={user.phone} />
                        </Box>
                        <Box display={'flex'} alignItems='center' gap={15}>
                            <Image src={IconStar} />
                            <Select onChange={e => onChangeFieldHandler('roles', [{ id: e?.currentTarget.value }])} color={'white'}>
                                <option value="2">Admin</option>
                                <option value="1">User</option>
                            </Select>
                        </Box>
                    </Box>

                    <Box display={'flex'} flexDirection={"column"} justifyContent={'center'} gap={5} marginTop={45}>
                        <Button onClick={() => onEditUserHandler()}>Edit user data</Button>
                        <Button onClick={() => onDeleteHandler()} backgroundColor={'#F85A5A'}>Delete user</Button>
                    </Box>


                </FormControl>
    )
}