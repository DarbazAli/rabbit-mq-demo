"use strict"
console.clear()

import amqp from "amqplib"

const sender = async () => {
    try {
        const connect = await amqp.connect("amqp://localhost")

        const channel = await connect.createChannel()

        // initial queue
        const queue = "task_queue"

        // grab the messages from env arguments
        const msg = process.argv.slice(2).join(" ") || "Hello World"

        await channel.assertQueue(queue, {
            durable: false,
        })

        channel.sendToQueue(queue, Buffer.from(msg))
        console.log(` [x] Sent ${msg}`)

        // close the connection after 500ms
        setTimeout(() => {
            connect.close()
            process.exit(0)
        }, 500)
    } catch (error) {
        console.warn(error)
    }
}

sender()
