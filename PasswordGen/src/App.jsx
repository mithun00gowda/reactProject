import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charecterAllowed, setCharecter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef("");

  const PasswordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charecterAllowed) str += "~!@#$%^&*()+=";

    for (let i=0;i<length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length, numberAllowed, charecterAllowed, setPassword]);

  useEffect(() => {
    PasswordGenerater();
  },[length, numberAllowed, charecterAllowed, PasswordGenerater]);

  const copy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-2 my-8 py-8 text-gray-800 bg-gray-500'>
      <h1 className='text-white text-center my-3'>Password Generater</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        ref={passwordRef}
         />
        <button
        className='outline-none bg-gray-800 text-white px-3 py-0.5 shrink-0'
        onClick={copy}
        >
          Copy
        </button>
      </div>
      <div className='flex gap-x-1 item-center'>
      <div>
        <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {
          setLength(e.target.value)
        }}/>
        <label>Length : {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultValue={numberAllowed} id='number' onChange={() => {
          setNumberAllowed((prev) => !prev);
        }} />
        <label htmlFor="">Number</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultValue={charecterAllowed} id='charecter' onChange={() => {
          setCharecter((prev) => !prev);
        }} />
        <label htmlFor="">Charecter</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
