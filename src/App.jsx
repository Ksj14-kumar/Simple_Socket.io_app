import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import io from "socket.io-client"
import Chat from './Components/Chat';




console.log(process.env.REACT_APP_backendURL)

function App() {

  const [file, setFile] = useState(null)
  const [socket, setSocket] = useState(null)












  function handleChange(e) {
    const file = e.target.files[0]
    console.log(file)
    const formData = new FormData()
    formData.append('file', file)
    console.log("form data", formData)
    setFile(formData)
  }






  const handleFileChange = async () => {
    try {
      if (file) {

        console.log({ file })
        const res = await fetch(process.env.REACT_APP_backendURL + "/api/v1/upload", {
          method: "POST",
          body: file,
          // headers: {
          //   "Content-Type": "application/json"
          // }
        })
        const resData = await res.json()
      }
      else {
        return

      }
    } catch (err) {
      console.warn(err)

    }

  }

  useEffect(() => {
    async function LoadImage() {
      const res = await fetch(`${process.env.REACT_APP_backendURL}/api/v1/image/${12345} `)
      const resData = await res.json()
      console.log({ resData })
    }
    LoadImage()

  }, [handleFileChange])


  //socket connection
  useEffect(() => {
    setSocket(io(`${process.env.REACT_APP_backendURL}`, {
      path: "/chats",
      "withCredentials": true,
      auth: {
        token: 8888
      },
      forceBase64: true,
      autoConnect: true,
      query: {
        x: 8
      },
      extraHeaders: {
        "Message_header": "messages"
      },
      reconnection: true,
      reconnectionDelay: 5000,
      // reconnectionDelayMax: 10000,
      reconnectionAttempts: 6,
      transports: ["websocket", "polling"],


    }))
  }, [])

  console.log({ socket })
  return (
    <div className="App">

      {/* <form action="http://localhost:4000/api/v1/upload" method="post" enctype="multipart/form-data"> */}

      <input type="file" name="file" id=""
        onChange={(e) => {
          // setFile(e.target.files[0])
          handleChange(e)
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          handleFileChange()
        }}
        type="submit"
      >Upload</button>

      {/* </form> */}
      <Chat socket={socket} />
    </div>
  );
}

export default App;
