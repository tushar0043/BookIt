import React from 'react'
import { useEffect } from 'react'
import SingleUser from './SingleUser'
import { useState } from 'react'
import classes from './SingleUser.module.css'
import { Container } from 'react-bootstrap'
const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/user_info')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        console.log(users)
      } else {
        console.log("Couldn't send request")
      }
    }
    fetchUsers()
  }, [])
  return (
    <div className={classes.userContainer}>
      {users.map((user) => (
        <SingleUser
          id={user.id}
          key={user.id}
          username={user.username}
        ></SingleUser>
      ))}
    </div>
  )
}

export default Users
