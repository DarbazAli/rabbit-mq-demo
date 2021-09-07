"use strict"
console.clear()

import amqp from "amqplib/callback_api.js"

// connect to rabitMQ server
amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) throw error0

    // create a channel
    connection.createChannel((error1, channel) => {
        if (error1) throw error1

        const queue = "task_queue"

        channel.assertQueue(queue, {
            durable: false,
        })

        channel.consume(
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
    })
})
