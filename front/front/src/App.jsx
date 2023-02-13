import './App.css'
import axios from 'axios'
import Video from './videoplayer'

// console.log('console aqui')
function App() {
  
  // async function getUser() {
  //   try {
  //     const response = await axios.get('http://localhost:9001');
  //     console.log(response.headers);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // getUser();
  
  return (
    <div className="App">
      <h1>oi</h1>
      <Video />
    </div>
  )
}

export default App
