import { Container } from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { User as UserType } from "../../app/interfaces/User.interfaces"
import { RootState } from "../../app/store"
import { User } from "./User"


export const UserList = () => {
    const users = useSelector((state: RootState) => state.userReducer.allUsers)

    return (
        <Container display={'flex'} gap={10} justifyContent='center' flexWrap={'wrap'} maxWidth={'1500px'}>
            {
                users.map((user: UserType, index: number )=> (
                    <Container key={index} display={'flex'} marginTop="135px" gap={30} justifyContent='center'>
                        <User user={user}/>
                    </Container>
                ))
            }
        </Container>
    )
}