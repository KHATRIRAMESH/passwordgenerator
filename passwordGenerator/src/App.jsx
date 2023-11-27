import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  //useRef hook
  // const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  //useRef is generally not advised to use
  // const copyPasswordToClipboard = useCallback(() => {
  // console.log(passwordRef.current.value);
  // here "passwordRef.current.value" is same as password we are passing to the below method

  //   window.navigator.clipboard.writeText(password);
  // }, [password]);

  const handleInputChange = useCallback(
    (event) => {
      event.target.value;
      setPassword(value);
    },
    [password]
  );

  const handleCopyClick = useCallback((event) => {
    event.target.value?.select();
    window.navigator.clipboard.writeText(password);
    // alert(`Password is copied`);
    // console.log(password);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 ">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            // ref={passwordRef}
            onChange={handleInputChange}
          />
          <button
            onClick={handleCopyClick}
            className="cursor-pointer outline-none bg-blue-700 text-white px-3 py-0.5 transform transition-transform duration-300 hover:scale-95 "
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
