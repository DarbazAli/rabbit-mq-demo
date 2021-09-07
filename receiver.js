import amqp from "amqplib/callback_api.js"

// connect to rabitMQ server
amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) throw error0

    // create a channel
    connection.createChannel((error1, channel) => {
        if (error1) throw error1

        const queue = "hello"

        channel.assertQueue(queue, {
            durable: false,
        })

        console.log(
            ` [*] waiting for messages in ${queue}, precc CTRL + C to exit`
        )

        channel.consume(
            queue,
            (msg) => {
                console.log(` [x] Received ${msg.content.toString()}`)
            },
            {
                noAck: true,
            }
        )
    })
})
