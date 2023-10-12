import React from "react"
import memesData from "./memesData.js"
import axios from "axios";

export default function Meme() {

    const imgFlipAPI = axios.create({
        baseURL: 'https://api.imgflip.com',
    });

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "./templates/1.jpg",
        templateId: "487425977"
    })
    const [allMemeImages, ] = React.useState(memesData)
    const [isLoading, setIsLoading] = React.useState(false);


    React.useEffect(() => {
        let timerId; // Создаем переменную для хранения идентификатора таймера
        setIsLoading(prevState => true)
        async function fetchAndCreateMeme() {
            try {
                const createdMeme = await createMeme(meme.templateId, meme.topText, meme.bottomText);
                setMeme(prevMeme => ({
                    ...prevMeme,
                    randomImage: createdMeme.data.url
                }))
                console.log(meme.templateId);
            } catch (error) {
                console.error('Ошибка при создании мема:', error);
            } finally {
                setIsLoading(prevState => false)
                console.log(isLoading)
            }
        }

        // Ожидание изменений в полях topText и bottomText перед отправкой запроса
        function handleFieldChange() {
            clearTimeout(timerId); // Очистка предыдущего таймера
            timerId = setTimeout(() => {
                fetchAndCreateMeme(); // Вызываем fetchAndCreateMeme после задержки
            }, 1000); // Задержка в 1 секунду (или другое значение по вашему выбору)
        }

        // Вызываем handleFieldChange при изменении полей topText и bottomText
        meme.topText && meme.bottomText && handleFieldChange();

        return () => {
            clearTimeout(timerId); // Очистка таймера при размонтировании компонента
        };
    }, [meme.topText, meme.bottomText, meme.templateId]);

    function getMemeImage() {
        const memesArray = allMemeImages.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        const templateId = memesArray[randomNumber].template_id
        meme.templateId !== templateId ? setMeme(prevMeme => ({
            ...prevMeme,
            templateId: templateId,
            randomImage: url
        })) : getMemeImage()

    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
  async function createMeme(templateId, text0, text1) {
        const params = {
            username: "g_user_107041624737506712185",
            password: "Ktjybl06122003",
            template_id: templateId,
            text0: text0,
            text1: text1,
        };

        try {
            const response = await imgFlipAPI.post('/caption_image', null, {
                params: params,
            });

            // В response.data будет содержаться ответ от ImgFlip API
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка при отправке POST-запроса:', error);
            throw error;
        }
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="ВВЕДИ ВЕРХНИЙ ТЕКСТ КЛУБ"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="ВВЕДИ НИЖНИЙ ТЕКСТ КЛУБ"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}

                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    СДЕЛАТЬ МЕМ КЛУБ
                </button>
            </div>
            <div className="meme">
                {isLoading ? (
                    <img src="/logo.jpg" className="meme--image--spin spin" alt="Meme" id="loading--image"/>
                ) : (
                    <img src={meme.randomImage} className="meme--image" alt="Meme" />
                )}
            </div>
        </main>
    )
}