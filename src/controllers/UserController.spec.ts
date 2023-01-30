import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

jest.mock('../services/UserService', ()=> {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return {
                createUser: jest.fn()
            }
        })
    }
});

describe('UserController', () => {
    const userController = new UserController();
    const mockRequest = {
        body: {
            name: 'Nath',
            email: 'nath@test.com',
            password: '123456'
        }
    } as Request
    
    it('Deve retornar status 400 sem o valor de name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório'})
    })

    it('Deve retornar status 400 o sem o valor de email', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: '',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Necessário o email' })
    });

    it('Dever retornar um erro ao não passar o password', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'andreolive@live.com',
                password: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Necessário a senha' })
    })

    it('Deve adicionar um novo usuário', () => {
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    });

    it('Deve remover o usuário pelo objeto user no body', ()=> {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário Deletado'})
    });

})
