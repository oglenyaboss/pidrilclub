import React from "react"

export default function Header() {
    return (
        <header className="header">
            <img
                width={50}
                height={50}
                src="/logo.jpg"
                className="header--image"
            />
            <h2 className="header--title">PidrilClub.ru</h2>
            <a href={"https://github.com/oglenyaboss"} target="_blank" className="social--icon">
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/github.png" alt="github"/>
            </a>
            <a href={"https://vk.com/sashatop01"} target="_blank" className={"social--icon"}>
                <img width="50" height="50" src="https://img.icons8.com/ios/50/vk-circled--v1.png" alt="vk-circled--v1"/>
            </a>
            <a href={"https://t.me/pidrilny_club"} target="_blank" className={"social--icon"}>
                <img width="50" height="50" src="https://img.icons8.com/ios/50/telegram.png" alt="telegram"/>
            </a>
        </header>
    )
}