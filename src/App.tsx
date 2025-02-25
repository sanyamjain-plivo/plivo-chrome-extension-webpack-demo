import "./App.css"
import Plivo from "plivo-browser-sdk"
import { useEffect, useRef, useState } from "react"
import { AvailableLogMethods } from "plivo-browser-sdk/logger"
function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [noiseReductionReady, setNoiseReductionReady] = useState("Failed to load processor.js, Noise Reduction cannot be used")
  const plivobrowsersdkRef = useRef<Plivo | null>(null)

  const defaultSettings = {
    "debug":"ALL" as AvailableLogMethods,
    "codecs":[  "OPUS", "PCMU" ],
    "enableIPV6":false,
    "dscp":true,
    "enableTracking":true,
    "closeProtection":false,
    "useDefaultAudioDevice":true,
    "enableNoiseReduction":true,
    "maxAverageBitrate":48000,
    "allowMultipleIncomingCalls":true,
    "preDetectOwa": false,
    "noiseReductionFilePath": "./processor.js",
    "dtmfOptions":{sendDtmfType:["outband","inband"]} 
    };

    plivobrowsersdkRef.current = new Plivo(defaultSettings)
  useEffect(() => {
      plivobrowsersdkRef.current?.client.on("onLogin", () => {
        setIsLogin(true)
        console.log("Login Success")
      })
      plivobrowsersdkRef.current?.client.on("onNoiseReductionReady", () => {
        setNoiseReductionReady("Noise reduction is ready to use")
        console.log("Noise Reduction Ready")
      })
  }, [])

  const handleLogin = () => {
    if (!username || !password || !plivobrowsersdkRef.current) {
      alert("Please enter a username and password")
      return
    }
    plivobrowsersdkRef.current?.client.login(username, password)
    setUsername("")
    setPassword("")
  }

  return (
    <div className="App" style={{display: "flex", flexDirection: "column", gap: "1rem", alignItems: "top", justifyContent: "center"}}>
      {!isLogin && <input type="text"  placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />}
      {!isLogin && <input type="text" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />}
      {!isLogin && <button onClick={() => {
        handleLogin()
      }}>Login</button>}
      {isLogin && <div>Login Success</div>}
      {isLogin && noiseReductionReady && <div>{noiseReductionReady}</div>}
    </div>
  );
}

export default App;
