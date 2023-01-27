import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockPush = jest.spyOn(mockDb, 'push')
        userService.createUser('nath', 'nath@test.com');
        expect(mockPush).toHaveBeenCalledWith({name:'nath',email:'nath@test.com'})
    });

    it('Não Deve remover um usuário com um email que não existe na base de dados', () => {
        mockDb.splice = jest.fn();
        try {
            userService.deleleUser('andreolive@live.com');
        } catch (error) {
            
        }
        expect(mockDb.splice).not.toHaveBeenCalled();
    })

    it('Deve remover um usuário pelo email informado', () => {
        mockDb.splice = jest.fn();
        userService.deleleUser('nath@test.com');
        expect(mockDb.splice).toHaveBeenCalled();
    })
})
