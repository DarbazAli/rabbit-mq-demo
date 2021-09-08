"use strict"
console.clear()

import amqp from "amqplib"

const consumer = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queue = "task_queue"

        await channel.assertQueue(queue, {
            durable: false,
        })

        await channel.consume(
            queue,
            (msg) => {
                const secs = msg.content.toString().split(".").length - 1

                setTimeout(() => {
                    console.log(` ${msg.content.toString()} Done`)
                    channel.ack(msg)
                }, secs * 1000)
            },
            {
                noAck: false,
            }
        )
    } catch (error) {
        console.warn(error)
    }
}

consumer()
