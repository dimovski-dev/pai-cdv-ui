
import { Button, Container, FormControl, FormLabel, Input, Select, Alert, AlertIcon } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAddUserMutation } from "../../app/api"
import { User } from "../../app/interfaces/User.interfaces"

export const AddUser = () => {

    const [addUser] = useAddUserMutation()
    const [needNotifiocation, setNeedNotification] = useState<boolean>(false);


    const [formValues, setFormValues] = useState<User>({
        imageUrl: "https://bootdey.com/img/Content/avatar/avatar/avatar1.png",
        roles: [] as any
    } as User)
    const onRegistrationHandler = () => {
        addUser(formValues).then(() => {
            setNeedNotification(true)
        })
    }

    const onChangeFieldHandler = (field: keyof User, value: any) => {

        setFormValues(prevState => ({ ...prevState, [field]: value }))
    }


    useEffect(() => {
        if (needNotifiocation) {
            setTimeout(() => {
                setNeedNotification(false)
            }, 2500)
        }
    }, [needNotifiocation])

    return (
        <Container backgroundColor={'#495579'} width={500} height={460} marginTop={100} borderRadius={12}>
            <FormControl display={"flex"} justifyContent="center" flexDirection={"column"} alignItems={'center'} height={'100%'}>
                <FormLabel fontSize={32} color={'white'} fontWeight={400}>Add Employee</FormLabel>
                <Container display={"flex"} justifyContent="center" flexDirection={"column"} alignItems={'center'} gap={15}>
                    <Container width={455} display={"flex"} gap={5} flexWrap="wrap">
                        <Input onChange={e => onChangeFieldHandler('firstName', e.target.value)} width={200} placeholder="First name" color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'} />
                        <Input onChange={e => onChangeFieldHandler('lastName', e.target.value)} width={200} placeholder="Last name" color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'} />
                        <Input onChange={e => onChangeFieldHandler('email', e.target.value)} width={200} placeholder="Email" type={'email'} color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'} />
                        <Input onChange={e => onChangeFieldHandler('jobTitle', e.target.value)} width={200} placeholder="Job title" color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'} />
                        <Input onChange={e => onChangeFieldHandler('phone', e.target.value)} width={'100%'} placeholder="Phone number" type={'number'} color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'} />
                        <Input onChange={e => onChangeFieldHandler('password', e.target.value)} width={'100%'} type={'password'} placeholder="Password" color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'} />
                        <Select onChange={e => onChangeFieldHandler('roles', [{ id: e?.currentTarget.value }])} color={'white'}>
                            <option value="2">Admin</option>
                            <option value="1">User</option>
                        </Select>
                    </Container>
                    <Button onClick={() => onRegistrationHandler()} color={'#495579'} backgroundColor={'#D9D9D9'} _hover={{ backgroundColor: "#D9D9D9" }} fontWeight={400} borderRadius={10} outline={'none'} border={'none'}>Add user</Button>
                </Container>
            </FormControl>

            {
                (
                    needNotifiocation && (
                        <Alert transition={'0.3'} width={300} position={'absolute'} top='10px' right={'10px'} status='success'>
                            <AlertIcon />
                            User was created succefully!
                        </Alert>
                    )
                )
            }
        </Container>
    )
}