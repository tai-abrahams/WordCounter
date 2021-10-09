import { useState } from "react"

function App() {

  const [text, setText] = useState('');
  const [ orderNum, setOrderNum ] = useState( false )
  const [ orderAlph, setOrderAlph ] = useState( false )

  const handleSubmit = (e)=>{
    e.preventDefault();
    setText(e.target[0].value);
  }

  const wordList = () => {
    const regex = new RegExp(/(?<=\s|^|\b)(?:[-'%$#&]\b|\b[-'%$#&]|\d*\.?\d+|[A-Za-z0-9]|\([A-Za-z0-9]+\))+(?=\s|$|\b)/g)
    const words = text.match(regex);
  console.log(words)
    const uniqueWord = [];
    let counts = {}; 
    var print = [];
  
    for(var i = 0; i < words.length; i++ ){
      
      if(!/\d+/.test(words[i])){
        if( counts[words[i]] === undefined ){
          counts[words[i]] = 1;
          uniqueWord.push(words[i]);
        } else{
          counts[words[i]] = ++counts[words[i]] ;
        }
      }
    }
    uniqueWord.sort((a, b)=>{
        if(orderNum){
          return counts[a] - counts[b];
        }
        if(orderAlph){ 
          if(a < b){
            return -1;
          }
        }
      })

    for(var i = 0; i < uniqueWord.length; i++){
      print[i] = <div className="d-flex">{uniqueWord[i] + ': ' + JSON.stringify(counts[uniqueWord[i]])}</div>
    }
  return print;
  }

  return (
    <div className="App container-fluid p-0 m-0 d-flex vh-100 vw-100">
      <div className="d-flex flex-column bg-primary vw-100 align-items-center justify-content-center">
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <label>Type text here:</label>
          <textarea className="" style={{width:"300px", height:"200px"}} />
          <button
            className="button submit btn rounded-pill p-1 my-2 text-white"
            style={{outline:"none", backgroundColor:"coral"}}
            onClick={()=>{
              setOrderAlph(()=>(
                !orderAlph ? true : orderAlph
              ));
              setOrderNum(()=>(
                orderNum ? false : orderNum
              ));
              }}>
              Alphabetical Order
          </button>
          <button
            className="button submit btn rounded-pill p-1 bt-2 text-dark bg-light"
            onClick={()=>{
              setOrderAlph(()=>(
                  orderAlph ? false : orderAlph
                ));
                setOrderNum(()=>(
                  !orderNum ? true : orderNum
                ));
            }}>
            Numerical Order
          </button>
        </form>
        
        <div className="d-flex flex-column justify-content-center align-items-center w-75">
        <hr />
          { text && (
            wordList()
            )}
        </div>
      </div>
    </div>
  );
}

export default App;


//create function that will be placed on both onClicks. Has a ternary statement that says if one orderender is true then toggle the other to false