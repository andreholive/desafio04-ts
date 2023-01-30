import { UserService } from "./UserService";

jest.mock("../repositories/UserRepository");
jest.mock("../database", () => {
    initialize: jest.fn();
});

const mockUserRepository = require("../repositories/UserRepository")

describe('UserService', () => {
    
    const userService = new UserService(mockUserRepository)
    const userData = {
        id_user: '123456',
        name: 'nath',
        email: 'nath@test.com',
        password: '123456'
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(userData));

        const response = await userService.createUser('nath', 'nath@test.com', '12345');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject(userData)
        
    });

    
})
