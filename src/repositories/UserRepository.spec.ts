import { EntityManager } from "typeorm";
import { User } from "../entities/User";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { UserRepository } from "./UserRepository";

describe('UserRepository', () => {
    let userRepository: UserRepository
    let managerMock: EntityManager

    const mockUser:User = {
        user_id: "12345",
        name: "Andre",
        email: "andreolive@live.com",
        password: "password"
    }
    beforeAll(async () => {
        managerMock = await getMockEntityManager({ saveReturn: mockUser});
        userRepository = new UserRepository(managerMock);
    })

    it('Deve cadastrar um novo usuário no banco de dados', async () => {
        const response = await userRepository.createUser(mockUser);
        expect(managerMock.save).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser)
    })
})