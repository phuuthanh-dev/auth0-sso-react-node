// Author: TrungQuanDev | https://youtube.com/@trungquandev
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
const Datastore = require('nedb-promises')
const db = Datastore.create('src/database/db.json')

const hookLogin = async (req, res) => {
  try {
    // console.log('req.auth: ', req.auth)
    // req.auth.header // The decoded JWT header.
    // req.auth.payload // The decoded JWT payload.
    // req.auth.token // The raw JWT token.

    const newUser = req.body
    // console.log('newUser: ', newUser)

    const existingUser = await db.findOne({ email: newUser.email })
    // console.log('existingUser: ', existingUser)

    // Tồn tại user thì tùy spec dự án để xử lý
    if (existingUser) {
      res.status(StatusCodes.OK).json({ message: 'User already exists. Continue login...' })
      return
    }

    // Chưa tồn tại user thì tiếp tục xuống dưới insert vào DB
    // NeDB sẽ lưu dữ liệu trong JSON mà không cần phân cách bằng dấu phẩy, mỗi bản ghi được lưu trên một dòng riêng biệt
    // Mục đính để dễ dàng đọc và ghi dữ liệu mà không cần phải xử lý toàn bộ tệp JSON mỗi lần truy vấn
    // NeDB tự động thêm _id cho mỗi bản ghi nếu chúng ta không chỉ định
    const insertedUser = await db.insert(newUser)
    // console.log('insertedUser: ', insertedUser)

    res.status(StatusCodes.CREATED).json(insertedUser)
  } catch (error) {
    // console.log('Error from hookLogin: ', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const getAll = async (req, res) => {
  try {
    // Lấy toàn bộ user trong DB
    const users = await db.find({})

    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.findOne({ email: email })

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
        return
      }
      return res.status(StatusCodes.OK).json({ message: 'Login successfully', profileData: {
        email: user?.email,
        name: user?.name,
        avatar: user?.avatar
      } })
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const getByEmail = async (req, res) => {
  try {
    // Lấy user theo email
    const user = await db.findOne({ email: req.params.email })

    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const deleteByEmail = async (req, res) => {
  try {
    // Xóa user theo email
    await db.remove({ email: req.params.email })

    res.status(StatusCodes.OK).json({ message: `User with email: ${req.params.email} deleted successfully.` })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  hookLogin,
  getAll,
  getByEmail,
  login,
  deleteByEmail
}
