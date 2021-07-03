import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: '山田 太郎',
        email: 'yamada@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'デモユーザ',
        email: 'demo@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users