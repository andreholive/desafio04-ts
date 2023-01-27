export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user);
    }

    deleleUser = (email:string) => {
        const obj:number = this.db.findIndex(user => user.email === email);
        if(obj >= 0){
            this.db.splice(obj, 1);
            return
        }
        throw new Error("Usuário não encontrado");
    }

    getAllUsers = () => {
        return this.db
    }
}

