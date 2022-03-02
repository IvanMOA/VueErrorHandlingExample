import {Todo} from "../../entities/Todo";
import axios from "axios"
import {raise} from "../../helpers/raise";

import {FormError} from "../../errors/FormError";
export class TodosService {
    public search = async (): Promise<Todo[]> => {
        raise(new FormError({
            email: ['Too short'],
            password: ['Too long']
        }))
        // raise(new InvalidCredentialsError())
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return data.map((todo: any) => new Todo(todo.id, todo.title, todo.body, todo.userId))
    }

}
export const todosService = new TodosService()