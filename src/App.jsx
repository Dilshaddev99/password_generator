import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [copyIcon, setCopyIcon] = useState(false);
  const [dark, setDark] = useState(false);

  const easy = (e) => {
    setLowerCase(true);
    setUpperCase(true);
    setNumbers(false);
    setSymbols(false);
    setLength(8);
  };

  const middle = () => {
    setLowerCase(false);
    setUpperCase(true);
    setNumbers(true);
    setSymbols(false);
  };

  const hard = () => {
    setLowerCase(false);
    setUpperCase(true);
    setNumbers(true);
    setSymbols(true);
  };

  const advanced = () => {
    setLowerCase(true);
    setUpperCase(true);
    setNumbers(true);
    setSymbols(true);
  };

  const generatePassword = () => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolsChars = '~!@#$%^&*()_+|}{":?><=-';

    let char = "";
    let newPassword = "";

    if (lowerCase) {
      char += lowerCaseChars;
    }

    if (upperCase) {
      char += uppercaseChars;
    }

    if (numbers) {
      char += numberChars;
    }

    if (symbols) {
      char += symbolsChars;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * char.length);
      newPassword += char[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyClipBoard = () => {
    navigator.clipboard.writeText(password);
    setCopyIcon(true);
    setTimeout(() => {
      setCopyIcon(false);
    }, 2000);
  };

  const darkThemeHandler = () => {
    setDark(true);
    document.querySelector("body").setAttribute("mode", "dark");
  };

  const lightThemeHandler = () => {
    setDark(false);
    document.querySelector("body").setAttribute("mode", "light");
  };

  return (
    <div className="parent">
      <div className="shape1"></div>
      <div className="shape2"></div>
      <div className="mainContainer">
        <div className="theme">
          {dark ? (
            <MdLightMode size={30} onClick={() => lightThemeHandler()} />
          ) : (
            <BsFillMoonStarsFill size={30} onClick={() => darkThemeHandler()} />
          )}
        </div>
        <h1>
          Generate Secure Password By One Click with{" "}
          <span className="logo">PassGenerator</span>
        </h1>
        <div className="container">
          <div className="resultContainer">
            <input
              value={password}
              type="text"
              placeholder="Move Slider To Generate Password"
              readOnly
              id="resultInput"
            />
            <div className="icons">
              <FaArrowsRotate
                className="copyIcon"
                size={27}
                title="Regenerage Password"
                onClick={() => generatePassword()}
              />
              {!copyIcon ? (
                <IoCopyOutline
                  onClick={() => copyClipBoard()}
                  className="copyIcon"
                  size={30}
                />
              ) : (
                <MdOutlineFileDownloadDone className="copyIcon" size={40} />
              )}
            </div>
          </div>
          <div className="options">
            <div className="left">
              <div className="rangeContainer">
                <span>Characters {length}</span>
                <input
                  type="range"
                  min={4}
                  max={80}
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value), generatePassword();
                  }}
                />
              </div>
              <button onClick={() => copyClipBoard()}>Copy</button>
            </div>
            <div className="middle">
              <div className="option" onClick={(e) => easy(e)}>
                <input type="radio" name="read" id="easy" />
                <label htmlFor="easy">Easy To Read</label>
              </div>
              <div className="option" onClick={(e) => middle(e)}>
                <input type="radio" name="read" id="medium" />
                <label htmlFor="medium">Medium To Read</label>
              </div>
              <div className="option" onClick={(e) => hard(e)}>
                <input type="radio" name="read" id="difficult" />
                <label htmlFor="difficult">Difficult To Read</label>
              </div>
              <div className="option" onClick={(e) => advanced(e)}>
                <input type="radio" name="read" id="advanced" />
                <label htmlFor="advanced">Advanced Cant Read</label>
              </div>
            </div>
            <div className="right">
              <div className="option">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={lowerCase}
                  onChange={(e) => setLowerCase(!lowerCase)}
                />
                <label htmlFor="lowercase">lowercase</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={upperCase}
                  onChange={(e) => setUpperCase(!upperCase)}
                />
                <label htmlFor="uppercase">UpperCase</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  id="numbers"
                  checked={numbers}
                  onChange={(e) => setNumbers(!numbers)}
                />
                <label htmlFor="numbers">Numbers 123</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  id="symbols"
                  checked={symbols}
                  onChange={(e) => setSymbols(!symbols)}
                />
                <label htmlFor="symbols">Special ($&%)</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
