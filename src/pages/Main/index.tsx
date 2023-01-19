import { Fragment, useEffect } from "react"
import { useGetAllUsersQuery } from "../../app/api"
import { UserList } from "../../components/UserList"



export const Main = () => {

    const {refetch} = useGetAllUsersQuery('')
    

    useEffect(() => {
        refetch()
    }, [])
    return (
        <Fragment>
            <UserList/>
        </Fragment>
    )
}