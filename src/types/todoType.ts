export enum Status {
    COMPLETED = "COMPLETED",
    PENDING = "PENDING"
}

export interface Todo {
    todoId: number;
    userId: number;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTodo {
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}

export interface GetTodo extends Todo {
    search?: string;
    sortBy?: string;
    sortType?: "desc" | "asc";
    pageSize: number;
    pageNo: number;
}

export interface UpdateTodo extends CreateTodo { }