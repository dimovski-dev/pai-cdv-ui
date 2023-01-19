import { Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useLoginMutation } from "../../app/api"
import { LoginUserThunk } from "../../app/api/user.thunks"
import { User } from "../../app/interfaces/User.interfaces"
import {useNavigate} from 'react-router-dom';


export const Login = () => {
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<Pick<User, "email" | "password">>({} as User)

    const onLoginHandler = () => {
        login(formValues).then((res) => {
            navigate('/')
        })
    }

    const onChangeFieldHandler = (field: keyof User, value: any) => {
        setFormValues(prevState => ({...prevState, [field]: value}))
    }

    return (
        <Container backgroundColor={'#495579'} width={450} height={320} marginTop={100} borderRadius={12}>
               <FormControl display={"flex"} justifyContent="center" flexDirection={"column"} alignItems={'center'} height={'100%'}>
                    <FormLabel fontSize={32} color={'white'} fontWeight={400}>Login</FormLabel>
                    <Container display={"flex"} justifyContent="center" flexDirection={"column"} alignItems={'center'} gap={15}>
                    <Input type={'email'} onChange={e => onChangeFieldHandler('email', e.target.value)} placeholder="Email" color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'}/>
                    <Input type={'password'} onChange={e => onChangeFieldHandler('password', e.target.value)} placeholder="Password" color={'#495579'} backgroundColor={'#D9D9D9'} borderRadius={10} outline={'none'} border={'none'}/>
                    <Button onClick={() => onLoginHandler()} color={'#495579'} backgroundColor={'#D9D9D9'} _hover={{backgroundColor: "#D9D9D9"}} fontWeight={400} borderRadius={10} outline={'none'} border={'none'}>Login</Button>  
                    </Container>
               </FormControl>
        </Container>
    )
}