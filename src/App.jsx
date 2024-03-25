import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [ length, setLength ] = useState(8)
  const [ numberAllowed, setNumberAllowed ] = useState(false)
  const [ characterAllowed, setCharacterAllowed ] = useState(false)
  const [ passwords, setPasswords ] = useState('')
  // useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%^&*()-_=+[]{}|;:',.<>?"
    
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPasswords(pass)
  }, [ length, numberAllowed, characterAllowed, setPasswords ])

  const copyPassword = useCallback (() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(passwords);
  }, [passwords])

  useEffect(() => {
    passwordGenerator()     
  }, [ length, numberAllowed, characterAllowed, passwordGenerator ])
  

  return (
    <>
      <div>
        <h1 className='text-center text-4xl'>Password Generator</h1>
          <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 bg-gray-700">
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
              <input type="text"
              value={passwords}
              className='outline-none w-full p-3'
              placeholder='Password'
              ref={passwordRef}
              readOnly
              />
              <button className='bg-red-500' onClick={copyPassword}>Copy</button>
            </div>
              <div className="flex text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                  <input type="range"
                    min={8}
                    max={50}
                    value={length}
                    className='cursor-pointer'
                    onChange={(e) => {setLength(e.target.value)}}
                  />
                  <label>Length: {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input 
                    type="checkbox"
                    defaultChecked={numberAllowed}
                    id='numberInput'
                    onChange={()=>{
                      setNumberAllowed((prev) => !prev);
                    }}
                    value={passwords}
                    />
                    <label htmlFor="numberInput">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input 
                    type="checkbox"
                    defaultChecked={characterAllowed}
                    id='characterInput'
                    onChange={()=>{
                      setCharacterAllowed((prev) => !prev);
                    }}
                    
                    value={passwords}
                    />
                    <label htmlFor="characterInput">Characters</label>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
