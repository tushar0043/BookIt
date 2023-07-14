const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path =require('path')
const bcrypt = require('bcrypt')
const { query } = require('express')
const saltRounds = 10

const app = express()

dotenv.config()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'UPDATE', 'DELETE'],
    credentials: true,
  })
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    key: 'userId',
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
)



const db = mysql.createConnection({
  user: `${process.env.MYSQL_USER}`,
  host: `${process.env.MYSQL_HOST}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
})



db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error
  console.log('The solution is: ', results[0].solution)
})

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err)
    }

    db.query(
      'INSERT INTO users (username, password) VALUES (?,?)',
      [username, hash],
      (err, result) => {
        console.log(err)
      }
    )
  })
})

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.query(
    'SELECT * FROM users WHERE username = ?;',
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result
            console.log(req.session.user)
            res.send(result)
          } else {
            res.send({ message: 'Wrong username/password combination!' })
          }
        })
      } else {
        res.send({ message: "User doesn't exist" })
      }
    }
  )
})

app.post('/booking/:user_id', (req, res) => {
  const { movie_name, theater_name, cost, no_of_seats, time, date } = req.body
  const user_id = req.params.user_id
  console.log(req.body)
  db.query(
    'INSERT INTO booking (movie_name,theater_name,cost,no_of_seats,time,date,user_id) VALUES (?,?,?,?,?,?,?)',
    [movie_name, theater_name, cost, no_of_seats, time, date, user_id],
    (err, result) => {
      console.log(err)
    }
  )
})

app.get('/booking/:user_id', (req, res) => {
  const user_id = req.params.user_id

  const sql = 'Select * from booking where user_id=?'
  db.query(sql, [user_id], (err, rows, fiels) => {
    if (err) {
      console.log('error found')
      res.sendStatus(500)
      res.end()
      return
    }
    if (rows.length > 0) {
      console.log('fetch data')
      res.json(rows)
    } else {
      console.log('no boooking found')
    }
  })
})

// admin part

app.post('/admin_register', (req, res) => {
  const username = req.body.admin_username
  const password = req.body.admin_password
  console.log(username)
  db.query(
    'INSERT INTO admin_login (admin_username, admin_password) VALUES (?,?)',
    [username, password],
    (err, result) => {
      console.log(err)
    }
  )
})

app.get('/adminlogin', (req, res) => {
  console.log(req.body)
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
})

app.post('/adminlogin', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  console.log(username)
  console.log(password)
  db.query(
    'SELECT * FROM admin_login WHERE username = ?;',
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }

      if (result.length > 0) {
        if (result[0].password == password) {
          res.send(result)
        } else {
          res.send({ message: 'Wrong Username/Password Combination' })
        }
      } else {
        res.send({ message: "User doesn't exist" })
      }
    }
  )
})

app.get('/user_info', (req, res) => {
  const sql = 'Select * from users'
  db.query(sql, (err, rows, fiels) => {
    if (err) {
      console.log('error found')
      res.sendStatus(500)
      res.end()
      return
    }
    if (rows.length > 0) {
      console.log('fetch data')
      res.json(rows)
    } else {
      console.log('no users found')
    }
  })
})

const dirname = path.resolve()

if (process.env.PROCESS_MODE === 'production') {
  app.use(express.static(path.join(dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(dirname ,'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

const PORT = process.env.PORT || 8000

app.listen(`${PORT}`, () => {
  console.log('running server')
})
