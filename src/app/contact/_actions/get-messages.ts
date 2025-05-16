"use server"
import db from "@/db/db"
import { Message } from "@prisma/client"
import { PAGE_LIMIT } from "./constants"



export async function getMessages(page: number) {
    try {
        const messages = await db.message.findMany({
            take: PAGE_LIMIT,
            skip: (page - 1) * PAGE_LIMIT,
            where: {
                dateResponded: null
            }   
        })
        return messages
    } catch (error) {
        console.error(error)
        return []
    }

}

export async function getTotalMessagesCount() {
    try {
        const count = await db.message.count({
            where: {
                dateResponded: null
            }
        })
        return Math.ceil(count)
    } catch (error) {
        console.error(error)
        return 0
    }
}

export async function getReviews() {
    try {
        const reviews = await db.review.findMany({})
        return reviews
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getTotalReviewsCount() {
    try {
        const count = await db.review.count({})
        return count
    } catch (error) {
        console.error(error)
        return 0
    }
}

export async function messageResponded(message: Message) {
    await db.message.update({
        where: { id: message.id },
        data: { dateResponded: new Date() }
    })
}