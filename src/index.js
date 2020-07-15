import React from "react";
import ReactDOM from "react-dom";
const rootElement = document.getElementById("root");


/**
 * 自己实现一个useState
 */
// let _state = [];
// let index = 0;

// function myUseState(initialValue) {
//   const currentIndex = index;
//   index += 1;
//   _state[currentIndex] = _state[currentIndex] || initialValue;
//   const setState = newState => {
//     _state[currentIndex] = newState;
//     render();
//   };
//   return [_state[currentIndex], setState];
// }

// 教学需要，不用在意 render 的实现
// const render = () => {
//   index = 0;
//   ReactDOM.render(<App />, rootElement);
// };


/**
 * useState不能写在if中
 */
// function App() {
//   const [n, setN] = React.useState(0);
//   let m, setM;
//   // if (n % 2 === 1) {
//   //   [m, setM] = React.useState(0);
//   // }
//   [m, setM] = React.useState(0);
//   return (
//     <div className="App">
//       <p>{n}</p>
//       <p>
//         <button onClick={() => setN(n + 1)}>+1</button>
//       </p>
//       <p>{m}</p>
//       <p>
//         <button onClick={() => setM(m + 1)}>+1</button>
//       </p>
//     </div>
//   );
// }


/**
 * n的多个分身的例子（先加1再log没问题，先log再加1，log的是旧数据）
 */
// function App() {
//   const [n, setN] = React.useState(0);
//   const log = () => setTimeout(() => console.log(`n: ${n}`), 3000);
//   return (
//     <div className="App">
//       <p>{n}</p>
//       <p>
//         <button onClick={() => setN(n + 1)}>+1</button>
//         <button onClick={log}>log</button>
//       </p>
//     </div>
//   );
// }

/**
 * useRef的例子
 * 只有一个n,current值，不会随着变化而更新
 * 手动触发更新（但是不是react的想要的思想，适合vue3）
 */
function App() {
  const nRef = React.useRef(0); // ref就是一个对象 {current: 0}  
  const log = () => setTimeout(() => console.log(`n: ${nRef.current}`), 1000);
  // const [n, setN] = React.useState(null); // setN的值和n不相同，APP就会更新
  // const setN = React.useState(null)[1]; // 上面一行代码的简化
  const update = React.useState(null)[1]; // 不关心是不是n, 所以改变变量名称
  return (
    <div className="App">
      {/* 因为在执行‘nRef.current += 1’的时候，不会让App重新渲染 */}
      <p>{nRef.current} 这里并不能实时更新</p>
      <p>
        <button onClick={() => {
          nRef.current += 1;
          update(nRef.current) // 使得App重新渲染
        }}>+1</button>
        <button onClick={log}>log</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);