import { Request, Response, NextFunction } from "express"
import * as todoServices from "../services/todoService"
import { resSend } from "../middlewares/response/resSend"

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await todoServices.createTodo(req.userSession, req.body)
        resSend(res, 200, "Todo created successfully", { todoId: response?.todoId })
    } catch (error) {
        next(error)
    }
}

export const getTodStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await todoServices.getTodoStatus(req.userSession, req.query)
        resSend(res, 200, "Todo status retrieved successfully", response)
    } catch (error) {
        next(error)
    }
}

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await todoServices.getTodo(req.userSession, req.query)
        resSend(res, 200, "Todo retrieved successfully", response)
    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await todoServices.updateStatus(req.userSession, Number(req.params.todoId))
        resSend(res, 200, "Todo status updated successfully", { todoId: Number(req.params.todoId) })
    } catch (error) {
        next(error)
    }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await todoServices.updateTodo(req.userSession, Number(req.params.todoId), req.body)
        resSend(res, 200, "Todo updated successfully", { todoId: Number(req.params.todoId) })
    } catch (error) {
        next(error)
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await todoServices.deleteTodo(req.userSession, Number(req.params.todoId))
        resSend(res, 200, "Todo deleted successfully", { todoId: Number(req.params.todoId) })
    } catch (error) {
        next(error)
    }
}