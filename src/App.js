import { useCallback } from 'react';
import { useState } from 'react';
import Api from './Api'
function App() {

  const [bg, setBg] = useState('url("https://images.pexels.com/photos/1209658/pexels-photo-1209658.jpeg?cs=srgb&dl=pexels-vlad-bagacian-1209658.jpg&fm=jpg")');

  return (
    <div className="App" style={{
      backgroundImage : bg,
      backgroundSize: 'cover',
      minHeight: '100vh',
      
    }}>
      <Api setBg={setBg}/>
    </div>
  );
}

export default App;
