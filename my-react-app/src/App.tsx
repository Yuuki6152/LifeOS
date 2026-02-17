import React, { useState } from 'react'; // useStateをインポート
import './App.css'; // スタイルシートはそのまま
import UserProfile from './UserProfile'; // UserProfileはそのまま
import Log from './Log'; // Logはそのまま
function App() {

    return (
        <div className="App">
            <UserProfile />
            <Log />
        </div>
    );
}
export default App;