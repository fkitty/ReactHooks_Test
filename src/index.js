import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
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
// function App() {
//   const nRef = React.useRef(0); // ref就是一个对象 {current: 0}  
//   const log = () => setTimeout(() => console.log(`n: ${nRef.current}`), 1000);
//   // const [n, setN] = React.useState(null); // setN的值和n不相同，APP就会更新
//   // const setN = React.useState(null)[1]; // 上面一行代码的简化
//   const update = React.useState(null)[1]; // 不关心是不是n, 所以改变变量名称
//   return (
//     <div className="App">
//       {/* 因为在执行‘nRef.current += 1’的时候，不会让App重新渲染 */}
//       <p>{nRef.current} 这里并不能实时更新</p>
//       <p>
//         <button onClick={() => {
//           nRef.current += 1;
//           update(nRef.current) // 使得App重新渲染
//         }}>+1</button>
//         <button onClick={log}>log</button>
//       </p>
//     </div>
//   );
// }



/**
 * useContext切换主题的例子（全局变量）
 */
// const themeContext = React.createContext(null); // 初始化一个上下文

// function App() {
//   // 全局切换主题
//   const [theme, setTheme] = React.useState("red");
//   return (
//     // value的意思就是：对全局变量进行一次赋值，它的值是一个对象
//     // value={ js的开始{ theme: theme的缩写, setTheme }}
//     // 一开始就把全局变量的初始值赋值为一个对象，这个对象有theme和setTheme两个属性
//     // themeContext.Provider这个上下文全局变量 ：它的作用域就从themeContext.Provider这里开始到结束，只有在这里可以用theme和setTheme
//     <themeContext.Provider value={{ theme, setTheme }}>
//       <div className={`App ${theme}`}>
//         <p>{theme}</p>
//         <div>
//           <ChildA />
//         </div>
//         <div>
//           <ChildB />
//         </div>
//       </div>
//     </themeContext.Provider>
//   );
// }

// function ChildA() {
//   // 从全局变量themeContext中读取setTheme
//   const { setTheme } = React.useContext(themeContext);
//   return (
//     <div>
//       <button onClick={() => setTheme("red")}>red</button>
//     </div>
//   );
// }

// function ChildB() {
//   const { setTheme } = React.useContext(themeContext);
//   return (
//     <div>
//       <button onClick={() => setTheme("blue")}>blue</button>
//     </div>
//   );
// }


/**
 * 不能局部更新
 */
// function App() {
//   const [user, setUser] = React.useState({name:'Frank', age: 18}) // 引用状态
//   const onClick = ()=>{
//     // user.name = 'jack';
//     // setUser(user);
//     setUser({ // 设置状态
//       ...user, // setState不会帮我们合并属性，需要用这种方式来合并属性：拷贝user的所有属性
//       name: 'Jack'
//     })
//   }
//   return (
//     <div className="App">
//       <h1>{user.name}</h1>
//       <h2>{user.age}</h2>
//       <button onClick={onClick}>Click</button>
//     </div>
//   );
// }


/**
 * useState接受函数
 */
// function App() {
//   const [user, setUser] = React.useState(() => ({name:'Frank', age: 9+9})) // 箭头函数，返回一个对象
//   const onClick = ()=>{
//     // user.name = 'jack';
//     // setUser(user);
//     setUser({ // 设置状态
//       ...user, // setState不会帮我们合并属性，需要用这种方式来合并属性：拷贝user的所有属性
//       name: 'Jack'
//     })
//   }
//   return (
//     <div className="App">
//       <h1>{user.name}</h1>
//       <h2>{user.age}</h2>
//       <button onClick={onClick}>Click</button>
//     </div>
//   );
// }


/**
 * setUser接受函数的应用举例（对state进行多次操作的时候）
 */
// function App() {

//   const [n, setN] = React.useState(0)
//   const onClick = ()=>{
//     setN(n+1) // n 不会变
//     setN(n+1) // 发现 n 不能加 2   因为只有最后一次有用
//     // setN(i=>i+1)
//     // setN(i=>i+1)
//   }
//   return (
//     <div className="App">
//       <h1>n: {n}</h1>
//       <button onClick={onClick}>+2</button>
//     </div>
//   );
// }



/**
 * useContext
 */
const C = React.createContext(null); // 可以使用的一个全局变量

function App() {
  const [n, setN] = React.useState(0);
  return (
    // 可以简写为value={{n, setN}}
    <C.Provider value={{ n:n, setN:setN}}>
      <div className="App">
        <Father />
      </div>
    </C.Provider>
  );
}

function Father(){
  const { n } = React.useContext(C);
  return(
    <div>这是测试1, 中的n：{n}<Child/></div>
  )
}

function Child(){
  const {n, setN} = React.useContext(C)// 在Child中使用n,注意这里是对象，因为value传的是对象
  const onClick = () => {
    setN(i => i+1);
  }
  return(
    <div>
      这是测试2，这里得到的n:{n}
      <button onClick={onClick}>+1</button>
    </div>
  )
}

/**
 * useEffect
 */
// function App() {
//   const [n, setN] = React.useState(0);
//   const onClick = () => {
//     setN( i => i +1);
//   }

  // React.useEffect(() => {
  //   console.log('第一次渲染执行这句话')
  //   document.title = 'hi'; // 这里改变了环境，就是一个副作用
  // }, []) // 里面的变量变化时执行（不会执行）

//   React.useEffect(() => {
//     console.log('第一二三...次渲染执行这句话')
//   }) // 任何一个状态变化时都执行（默认是所有的状态）

  // React.useEffect(() => {
  //   console.log('n变化了（是包含第一次的）')
  // }, [n]) // n变化时执行

  // React.useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log('hi')
  //   }, 1000)
  //   return () => { // 实现commponentWillUnMount的功能
  //     window.clearInterval(id);
  //   }
  // }, []) // 里面的变量变化时执行（不会执行）

//   return (
//     <div>
//       n: {n}
//       <button onClick={onClick}>+1</button>
//     </div>

//   );
// }


// function App(){
//   const [value, setValue] = React.useState(8888889);

//   React.useEffect(() => { // 将useEffect改成useLayoutEffect就不会出现闪烁的情况
//     document.querySelector('#x').innerText = `value: 1000`
//   }, [value]);

//   return (
//     <div id="x" onClick={() => setValue(0)}>value: {value}</div> // 页面会有个很快的闪烁，先是8888889，迅速变成了1000
//   );
// };

ReactDOM.render(<App />, rootElement);