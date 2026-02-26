import React, { useState } from 'react';

// TodoItemコンポーネント
function TodoItem(props) {
    // ここにコードを記述してください
    return <li>{props.text}</li>;
}

function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: '牛乳を買う' },
        { id: 2, text: 'Reactno' },
    ]);

    return (
        <div>
            <h2>私のTodoリスト</h2>
            <ul>
                {
                    todos.map(todo => (
                        <TodoItem key={todo.id} text={ todo.text } />
                    ))
                }
            </ul>
        </div>
    );

}

function App() {
    return <TodoList />
}