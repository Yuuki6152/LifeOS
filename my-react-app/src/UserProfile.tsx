import React from 'react';


export default function UserProfile() {
interface UserProfile {
    name: string;
    age: number;
    isActive: boolean;
}

function displayUser(User: UserProfile):void {
    console.log(`Name: ${User.name}, Age: ${User.age}：${User.isActive ? "アクティブ": "" }`);
}

let activeUser: UserProfile = {
    name: "John Doe",
    age: 30,
    isActive: true
};

let inactiveUser: UserProfile = {
    name: "Jane Smith",
    age: 25,
    isActive: false
};
displayUser(activeUser);
displayUser(inactiveUser);

    return (
        <div className="UserProfile">
            <p>User Profile Component</p>
        </div>
    );

}
   