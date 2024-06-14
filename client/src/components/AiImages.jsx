import React, {useState, useEffect } from 'react'

const AiImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getPoster = async () => {
            try {
                const response = await fetch("http://localhost:3000/posters/submit");
                const data = await response.json();
                console.log(data);
                setImages(data);
            } catch (error) {
                console.error(error);
            }
        }

        getPoster();
    }, []);

    return (
        <div>
            <h1>AI Images</h1>
            <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <img key={index} src={image.image} alt="AI Generated" />
                ))}
            </div>
        </div>
    )
}

export default AiImages
