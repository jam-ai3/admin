"use server"
import db from "@/db/db"

export async function createUser() {
    const MaxDaysAgo = 30
    const randomMS = Math.floor(Math.random() * MaxDaysAgo * 24 * 60 * 60 * 1000)
    const user = await db.user.create({
        data: {
            email: `${crypto.randomUUID().slice(0, 5)}@test.com`,
            password: 'testtest',
            createdAt: new Date(Date.now() - randomMS)
        }
    })
    console.log(user.email)
}

export async function createIndividualCall() {
    const users = await db.user.findMany({})
    const userLength = users.length
    const randomUser = users[Math.floor(Math.random() * userLength)]
    const type = ['autocomplete', 'shorten', 'lengthen', 'grammar', 'reorder'][Math.floor(Math.random() * 5)]
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
    const newCall = await db.individualCall.create({
        data: {
            userId: randomUser.id,
            type: type,
            createdAt: randomDate
        }
    })

    console.log(newCall)
}