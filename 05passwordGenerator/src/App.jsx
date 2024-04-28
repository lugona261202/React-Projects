import { useState,useCallback,useEffect,useRef } from 'react'

// callback is used when you have to render a function multiple times
// in such case we declare function in useCallback
//useEffect is used to call functions as they can not be used by just declaring names 
// like in javascript
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]= useState(false)
  const [charAllowed,setCharAllowed]= useState(false)
  const [password,setPassword] = useState("")

  // useRef hook
  // here this is used to just highlight the copied text
  // it also helps to combine to unrelated entities like input , button 
  // line number 16 53 gets connected and can refer to each other
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+="0123456789"
    if (charAllowed) str+="!@#$%^&{}[]"

    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char)
    }
    setPassword(pass)

   },[lenght,
  numberAllowed,charAllowed,setPassword])
  
  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed, charAllowed,passwordGenerator]))
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 my-8 text-orange-500 bg-gray-600'>
      <h1 className='text-white text center my-3'>passwordGenerator</h1>
    <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
      <input 
      type="text"
      value= {password}
      className="outline-none w-full py-1 px-3"
      placeholder="password"
      readOnly
      ref={passwordRef}
      />
      <button 
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue text-white
      px-3 py-0.5 shrink-0'
      >copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>lenght:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
        onChange ={()={
          setCharAllowed((prev)=>!prev)
        }}
        />
        <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App





