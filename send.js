"use strict"
console.clear()

// import the library
import amqp from "amqplib/callback_api.js"

// connect to RabbitMQ Server
amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) throw error0

    // Next we create a channel, which is where most of the API for getting things done resides:
    connection.createChannel((error1, channel) => {
        if (error1) throw error1

        const queue = "task_queue"
        const msg = process.argv.slice(2).join(" ") || "Hello World"

        channel.assertQueue(queue, {
            durable: false,
        })

        channel.sendToQueue(queue, Buffer.from(msg))
        console.log(` [x] Sent ${msg}`)
    })

    // close the connection
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
})
