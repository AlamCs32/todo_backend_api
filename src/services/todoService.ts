import moment from "moment";
import prisma from "../config/prisma";
import { UserSessionData } from "../express";
import { CreateTodo, GetTodo, Status, UpdateTodo } from "../types/todoType";

export const createTodo = async (userSession: UserSessionData, body: Partial<CreateTodo>) => {
    const { userId } = userSession;
    let { title, description, dueDate, status } = body;

    const formattedDueDate = moment(dueDate, "YYYY-MM-DD", true);
    const today = moment().startOf("day");

    if (!formattedDueDate.isValid()) {
        throw new Error("Invalid due date format. Use YYYY-MM-DD");
    }

    if (!formattedDueDate.isSameOrAfter(today)) {
        throw new Error("Due date cannot be in the past");
    }

    // Create Todo
    return await prisma.todo.create({
        data: {
            title,
            description,
            dueDate: formattedDueDate.format("YYYY-MM-DD") as string,
            status: status as any,
            userId
        }
    });
};

// export const getTodStatus = async (userSession: UserSessionData, query: Partial<GetTodo>) => {
//     const { userId } = userSession;
//     const { dueDate } = query;

//     const formattedDueDate = dueDate ? moment(dueDate).format("YYYY-MM-DD") : null;

//     const statusCounts = await prisma.$queryRaw`
//     SELECT 
//         status,
//         COUNT(*) AS count
//     FROM Todo
//     WHERE isActive = true AND userId = ${userId} 
//     ${formattedDueDate ? prisma.$queryRaw`AND dueDate = ${formattedDueDate}` : prisma.$queryRaw``}
//     GROUP BY status

//     UNION ALL

//     SELECT 
//         'dueDate' AS status,
//         COUNT(*) AS count
//     FROM Todo
//     WHERE isActive = true AND userId = ${userId} 
//     ${formattedDueDate ? prisma.$queryRaw`AND dueDate = ${formattedDueDate}` : prisma.$queryRaw``}
//     AND dueDate < CURDATE();
//   `;
//     return statusCounts
// }

export const getTodoStatus = async (userSession: UserSessionData, query: Partial<GetTodo>) => {
    const { userId } = userSession;
    const { dueDate } = query;

    const status = {
        totalCounts: 0,
        completed: 0,
        pending: 0,
        dueDate: 0
    }

    const formattedDueDate = dueDate ? moment(dueDate).format("YYYY-MM-DD") : null;

    const [statusCounts, overdueCount] = await Promise.all([
        await prisma.todo.groupBy({
            by: ["status"],
            where: {
                userId,
                isActive: true,
                ...(formattedDueDate ? { dueDate: formattedDueDate } : {}),
            },
            _count: { _all: true },
        }),
        await prisma.todo.count({
            where: {
                userId,
                isActive: true,
                dueDate: { lt: moment().format("YYYY-MM-DD") },
                ...(formattedDueDate ? { dueDate: formattedDueDate } : {}),
            },
        })
    ])

    statusCounts.forEach(item => {
        status[item.status.toLowerCase()] = item._count._all
        status.totalCounts += item._count._all
    })

    status.dueDate = overdueCount

    return status
};


export const getTodo = async (userSession: UserSessionData, query: Partial<GetTodo>) => {
    const { userId } = userSession;
    const { search, dueDate, sortBy = "updatedAt", sortType = "desc", status, pageNo = 1, pageSize = 10 } = query;

    const whereConditions: Record<string, any> = { userId, isActive: true };

    if (dueDate) whereConditions.dueDate = moment(dueDate).format("YYYY-MM-DD");
    if (status) whereConditions.status = status as string;
    if (search) {
        whereConditions.OR = [
            {
                title: {
                    contains: search,
                    // mode: "insensitive"
                }
            },
            {
                description: {
                    contains: search,
                    // mode: "insensitive"
                }
            }
        ];
    }

    const todos = await prisma.todo.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortType.toLowerCase()
        },
        skip: (pageNo - 1) * pageSize,
        take: pageSize
    });

    const counts = await prisma.todo.count({
        where: whereConditions
    });

    return { rowsCount: counts, rows: todos };
};

export const updateStatus = async (userSession: UserSessionData, todoId: number,) => {
    const { userId } = userSession;
    const todo = await prisma.todo.findUnique({
        where: { todoId, userId, isActive: true }
    })
    if (!todo) throw new Error(`Todo not found id ${todoId}`)

    if (todo.status !== Status.COMPLETED) {
        await prisma.todo.update({
            where: { todoId: todo.todoId },
            data: { status: Status.COMPLETED, updatedAt: todo.updatedAt }
        })
    }
    return {}
}

export const updateTodo = async (userSession: UserSessionData, todoId: number, body: Partial<UpdateTodo>) => {
    const { userId } = userSession;
    let { title, description, dueDate, status } = body;

    const todo = await prisma.todo.findUnique({
        where: { todoId, userId, isActive: true }
    })
    if (!todo) throw new Error(`Todo not found id ${todoId}`)

    const formattedDueDate = moment(dueDate, "YYYY-MM-DD", true);
    const today = moment().startOf("day");

    if (!formattedDueDate.isValid()) {
        throw new Error("Invalid due date format. Use YYYY-MM-DD");
    }

    if (!formattedDueDate.isSameOrAfter(today)) {
        throw new Error("Due date cannot be in the past");
    }

    await prisma.todo.update({
        where: { todoId: todo.todoId },
        data: {
            title,
            description,
            dueDate: formattedDueDate.format("YYYY-MM-DD") as string,
            status: status as any,
            updatedAt: new Date()
        }
    });
};

export const deleteTodo = async (userSession: UserSessionData, todoId: number) => {
    const { userId } = userSession;

    const todo = await prisma.todo.findUnique({
        where: { todoId, userId, isActive: true }
    })
    if (!todo) throw new Error(`Todo not found id ${todoId}`)

    await prisma.todo.update({
        where: { todoId: todo.todoId },
        data: { isActive: false }
    });
};
