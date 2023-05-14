export async function createTodoEntity(val: TodoEntity): Promise<TodoEntity> {}

export async function updateTodoEntity(val: TodoEntity): Promise<TodoEntity> {}

export async function deleteTodoEntity(val: TodoEntity): Promise<TodoEntity> {}

export async function recoverTodoEntity(val: TodoEntity): Promise<TodoEntity> {}

export async function getTodoEntityById(id: string): Promise<TodoEntity> {}

export async function listTodoEntityByFilter(val: TodoFilterDto): Promise<TodoEntity[]> {}
