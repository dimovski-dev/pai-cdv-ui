import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setError } from '../features/error.reducer';
import userReducer, { setAllUsers, setIsAuthorized, setUser } from '../features/user.reducer';
import { User } from '../interfaces/User.interfaces';


export const appApi = createApi({
  reducerPath: "app",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || '',
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem('user') as any)
      if (user?.access_token || "") {
        headers.set('authorization', `Bearer ${user.access_token || ""}`)
      }
      return headers
    },
  }),

  endpoints: (builder) => ({
    addUser: builder.mutation({

      query: (body) => ({
        headers: {
          "Content-Type": "application/json",
        },
        origin: "*",
        url: '/user/save',
        method: 'POST',
        body
      })
    }),
    getAllUsers: builder.query({
      query: (body) => '/users',
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllUsers(data))
        } catch (err: any) {
          dispatch(setError({ code: err.error.status, message: err.error.data._message }))
        }
      }
    }),
    login: builder.mutation({
      query: (body) => {

        return ({
          origin: "*",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          url: "/login",
          body: new URLSearchParams(body).toString(),
          method: 'POST',
        })
      },

      transformResponse: (response: User, meta, arg) => response,

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIsAuthorized(true))
          dispatch(setUser(data))
          localStorage.setItem("user", JSON.stringify(data))
          localStorage.setItem("isAuthed", JSON.stringify(true))
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message)
          }
        }
      }
    }),
    editUser: builder.mutation({
      query: (body) => {

        return ({
          origin: "*",
          headers: {
            "Content-Type": "application/json",
          },
          url: "/user/update",
          body,
          method: 'PUT',
        })
      },

      transformResponse: (response: User, meta, arg) => response,

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAllUsers(data as unknown as User[]);
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message)
          }
        }
      }
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return ({
          origin: "*",
          url: `/user/delete/${id}`,
          method: 'DELETE',
        })
      },

      transformResponse: (response: User, meta, arg) => response,

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAllUsers(data as unknown as User[]);
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message)
          }
        }
      }
    })
  }),
  
})

export const { useAddUserMutation, useLoginMutation, useGetAllUsersQuery, useEditUserMutation, useDeleteUserMutation } = appApi