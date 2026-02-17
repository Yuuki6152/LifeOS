import React from 'react';


//LogLevel型エイリアスの定義
type LogLevel = 'info' | 'warn' | 'error';

//LogResult型エイリアスの定義
type LogResult = string | number;

export default function Log() {

    logMessage('info', 'これは情報メッセージです。');
    logMessage('warn', 'これは警告メッセージです。');
    logMessage('error', 'これはエラーメッセージです。');

    return (
        <div className="Log">
            <p>ログメッセージはコンソールに出力されます。</p>
        </div>

    );

}
function logMessage(level: LogLevel, message: LogResult) {

    if (typeof message === 'number') {
        console.log(`${level}： 数値 ${message}`);
    } else {
        console.log(`${level}： ${message.toString()}`);
    }
}