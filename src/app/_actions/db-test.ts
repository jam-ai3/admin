"use server"
import db from "@/db/db"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"

export async function createUser() {
    const MaxDaysAgo = 30
    const randomMS = Math.floor(Math.random() * MaxDaysAgo * 24 * 60 * 60 * 1000)
    await db.user.create({
        data: {
            email: `${crypto.randomUUID().slice(0, 5)}@test.com`,
            password: 'testtest',
            createdAt: new Date(Date.now() - randomMS)
        }
    })

    redirect("/")
}

const analyticsFieldMap: Record<string, keyof Prisma.AnalyticsUpdateInput> =
{
    autocomplete: 'autocompleteCalls',
    shorten: 'shortenCalls',
    lengthen: 'lengthenCalls',
    grammar: 'grammarCalls',
    reorder: 'reorderCalls'
}

export async function createIndividualCall() {
    const users = await db.user.findMany({})
    const userLength = users.length
    const randomUser = users[Math.floor(Math.random() * userLength)]
    const type = ['autocomplete', 'shorten', 'lengthen', 'grammar', 'reorder'][Math.floor(Math.random() * 5)]
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
    const field = analyticsFieldMap[type]
    await db.individualCall.create({
        data: {
            userId: randomUser.id,
            type: type,
            createdAt: randomDate
        }
    })
    await db.analytics.upsert({
        where: {
            userId: randomUser.id
        },
        update: {
            [field]: {increment: 1},
            lastUpdated: new Date()
        },
        create: {
            userId: randomUser.id,
            [field]: 1
        }

    })

    redirect("/")
}

export async function createRandomMessage() {
    const users = await db.user.findMany({})
    const userLength = users.length
    const randomUser = users[Math.floor(Math.random() * userLength)] 
    const randomTxt = crypto.randomUUID().slice(0, 5) + "_RANDOM_MESSAGE"
    await db.message.create({
        data: {
            name: randomUser.id,
            email: randomUser.email,
            message: randomTxt
        }
    })
    redirect("/contact")
}

export async function createRandomFeedback() {
    const users = await db.user.findMany({})
    const userLength = users.length
    const randomUser = users[Math.floor(Math.random() * userLength)] 
    const randomTxt = crypto.randomUUID().slice(0, 5) + "_RANDOM_FEEDBACk"
    await db.review.create({
        data: {
            rating: Math.floor(Math.random() * 5),
            userId: randomUser.id,
            message: randomTxt
        }
    })
    redirect("/contact") 
}