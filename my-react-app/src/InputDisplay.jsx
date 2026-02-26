import React, { useState } from 'react';

function InputDisplay() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={ handleChange }
                placeholder='何か入力してください'
            />
        </div>
    );

}

function App() {
    return <InputDisplay />
}