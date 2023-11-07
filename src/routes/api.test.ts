import request from 'supertest'
import app from '../app'
import { mockReset } from 'jest-mock-extended'
import { prismaMock } from '../singleton'
import bcrypt from 'bcrypt'

describe('Testing routes', () => {
    beforeAll(async() => {
        mockReset(prismaMock)
    })

    let pwd = "outroUsuario"
    let hash = bcrypt.hashSync(pwd, 10)

    const user = {
        avatar: '',
        name: 'Visconde de Sabugosa',
        register: '8522001',
        password: hash,
        op: '1',
        bank_op: '0'
    }

    it('should ping pong', (done) => {
       request(app).get('/ping').then((resp) => {
        expect(resp.body).toBeTruthy()
        return done()
       })
    })

    it('should register new user', (done) => {
        request(app).post('/create')
            .send(`
                avatar=${user.avatar}&
                name=${user.name}&
                register=${user.register}&
                password={user.password}&
                op=${user.op}&
                bank_op=${user.bank_op}
                `
            )
            .then(resp => {
                expect(resp.error).toBeTruthy()
                return done()
            })
     })

     it('should NOT allow to register new user with existing register', (done) => {
        request(app).post('/create')
            .send(`
                avatar=${user.avatar}&
                name=${user.name}&
                register=${user.register}&
                password={user.password}&
                op=${user.op}&
                bank_op=${user.bank_op}
                `
            )
            .then(resp => {
                expect(resp.error).not.toBeUndefined()
                return done()
            })
     })

     it('should NOT allow to register new user with out password', (done) => {
        request(app).post('/create')
            .send(`
                avatar=${user.avatar}&
                name=${user.name}&
                register=${user.register}&
                op=${user.op}&
                bank_op=${user.bank_op}
                `
            )
            .then(resp => {
                expect(resp.error).not.toBeUndefined()
                return done()
            })
     })


     it('should NOT allow to register new user with out register', (done) => {
        request(app).post('/create')
            .send(`
                avatar=${user.avatar}&
                name=${user.name}&
                password={user.password}&
                op=${user.op}&
                bank_op=${user.bank_op}
                `
            )
            .then(resp => {
                expect(resp.error).not.toBeUndefined()
                return done()
            })
     })

     it('should NOT allow to register new user with nothing', (done) => {
        request(app).post('/create')
            .send(` `)
            .then(resp => {
                expect(resp.error).not.toBeUndefined()
                return done()
            })
     })

     it('should login correctly', (done) => {
        request(app).post('/login')
            .send(`register=89007063&password=1234`)
            .then(resp => {
                expect(resp.body).not.toBeUndefined()
                expect(resp.status).toBeTruthy()
                return done()
            })
     })

     it('should NOT login incorrect data', (done) => {
        request(app).post('/login')
            .send(`register=89007063&password=12345`)
            .then(resp => {
                expect(resp.body).not.toBeUndefined()
                expect(resp.body.status).toBeFalsy()
                return done()
            })
     })

})