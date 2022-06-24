import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function Chat({ socket }) {
    const [message, setMessage] = useState("")
    const [getMessages, setGetMessages] = useState([])



    useEffect(() => {
        console.log("socket connection", socket?.connected)
        console.log("socket conenction id", socket?.id)
        socket?.io?.on("error", (err) => {
            console.log("error during not connect socket", err)
        })

        socket?.io?.on("reconnect", (value) => {
            //this is fire when successfull reconnect
            console.log("successfull reconnect", { value })
        })
        socket?.io?.on("reconnect_attempt", (value) => {
            //this is fire when try reconnect attempt
            console.log("reconenct attepmt", value)
        })
        socket?.io?.on("reconnect_failed", (value) => {
            //trigger when reconnect failed again and again
            console.log("reconnect failed", value)
        })
        socket?.io?.on("reconnect_error", (value) => {
            //trigegr when reconnection error
            console.log("reconenction error", value)
        })

        socket?.io?.on("ping", (value) => {
            console.log("ping message execute", value)
        })


        // if (socket.disconnected) {
        //     console.log("disconnected")
        // }
    }, [])




    useEffect(() => {
        socket?.on("getMessages", (value) => {
            setGetMessages([...getMessages, value])
        })

    }, [message, socket])




    async function sendMessage() {
        if (message.length) {
            socket?.emit("sendMessage", message)
            setMessage("")


        }
        else {
            return
        }
    }
    return (
        <div>

            <input type="text"
                onChange={(e) => {
                    setMessage(e.target.value)
                }}
            />
            <button
                onClick={() => {
                    sendMessage()
                }}
            >Send</button>


            {
                getMessages.length && getMessages.map((item, index) => {
                    return (
                        <>
                            <p key={index}>{item}</p>


                        </>
                    )
                })
            }



        </div>
    )
}

export default Chat