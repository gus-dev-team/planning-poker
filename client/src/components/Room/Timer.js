// function Timer(props) {
//   const [timer, setTimer] = useState(props.duration);

//   useEffect(() => {
//     if (props.status) {
//       const timerID = setInterval(() => setTimer(timer - 1), 1000);
//       return function cleanup() {
//         clearInterval(timerID);
//       };
//     }
//   }, [timer, props.status]);

//   function toggleTimer() {}

//   function resetTimer() {
//     setTimer(props.duration);
//   }

//   return (
//     <div className='timer'>
//       <div>{convertSecondstoTime(timer)}</div>
//       <div>
//         <button onClick={toggleTimer}>
//           <span className='material-icons'>play_arrow</span>
//         </button>
//         <button onClick={resetTimer}>
//           <span className='material-icons'>replay</span>
//         </button>
//       </div>
//     </div>
//   );
// }
