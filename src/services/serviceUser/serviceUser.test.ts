import { mockReset } from "jest-mock-extended";
import ServicerUser from ".";
import bcrypt from 'bcrypt'
import { prismaMock } from "../../singleton";

describe("Testing user Service", () => {
   beforeAll(async() => {
       mockReset(prismaMock)
   })

   let pwd = "outroUsuario"
   let hash = bcrypt.hashSync(pwd, 10)

   const user = {
        id: 7,
        avatar: '',
        name: 'Visconde de Sabugosa',
        register: '8522001',
        password: hash,
        op: '1',
        bank_op: '0'
    }

   it('should create a new user', async() => {

        prismaMock.user.create.mockResolvedValue({
            id: 7,
            avatar: '',
            name: 'Visconde de Sabugosa',
            register: '8522001',
            password: hash,
            op: '1',
            bank_op: '0'
        })

        await expect(ServicerUser.createUser(user)).resolves.toEqual({
            id: 7,
            avatar: '',
            name: 'Visconde de Sabugosa',
            register: '8522001',
            password: hash,
            op: '1',
            bank_op: '0'
        })
    })

    it('should not allow to create user with same register', async() => {
        const userDataBase = {
            id: 6,
            avatar: 'avatar',
            name: 'Marilyn Monroe',
            register: '7458001',
            password: hash,
            op: '0',
            bank_op: '1'
        }
        prismaMock.user.create.mockImplementation()

        await expect(ServicerUser.createUser(userDataBase)).resolves.not.toBeInstanceOf(Error)
    })

    it('should find all users', async() => {
        prismaMock.user.findMany.mockResolvedValue([])
        const users = await ServicerUser.findAllUsers()

        expect(users.length).toBeLessThanOrEqual(1)
    })

    it('should match the password from database', async() => {
        prismaMock.user.findUnique.mockResolvedValue(user)
        const match = ServicerUser.matchPassword(pwd, user.password)

        expect(match).toBeTruthy()
    })

    it('should NOT match the password from database', async() => {
        prismaMock.user.findUnique.mockResolvedValue(user)
        const match = ServicerUser.matchPassword('invalid', user.password)

        expect(match).toBeFalsy()
    })
})
