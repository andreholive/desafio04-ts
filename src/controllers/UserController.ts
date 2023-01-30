import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name){
            return response.status(400).json({ message: 'Bad request! Name obrigatório'})
        }

        if(!user.email){
            return response.status(400).json({ message: 'Necessário o email' })
        }

        if(!user.password){
            return response.status(400).json({ message: 'Necessário a senha' })
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    deleteUser = (request:Request, response:Response)=> {
        try {
            const user = request.body
            return response.status(201).json({ message: 'Usuário Deletado'})
        } catch (error) {
            return response.status(400).json({message: 'usuário não encontrado'})
        }
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json( users )
    } 
}
