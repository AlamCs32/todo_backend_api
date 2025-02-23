import Joi from "joi";
import { CreateTodo, GetTodo, Status, UpdateTodo } from "../types/todoType";

export const createTodo = Joi.object<CreateTodo>({
    title: Joi.string().required(),
    description: Joi.string(),
    dueDate: Joi.date().required(),
    status: Joi.string().valid(...Object.values(Status)),
})

export const getTodoStatus = Joi.object<GetTodo>({
    dueDate: Joi.date().optional(),
})

export const getTodo = Joi.object<GetTodo>({
    search: Joi.string().optional(),
    status: Joi.string().valid(...Object.values(Status)).optional(),
    dueDate: Joi.date().optional(),
    sortBy: Joi.string().valid("updatedAt", "createdAt", "dueDate", "title").optional(),
    sortType: Joi.string().valid("desc", "asc").optional(),
    pageNo: Joi.number().optional(),
    pageSize: Joi.number().optional(),
})

export const updateTodo = Joi.object<UpdateTodo>({
    title: Joi.string().required(),
    description: Joi.string(),
    dueDate: Joi.date().required(),
    status: Joi.string().valid(...Object.values(Status)),

})
