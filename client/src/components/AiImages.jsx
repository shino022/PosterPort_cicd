import React, {useState, useEffect } from 'react'

const AiImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getPoster = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}posters`);
                const data = await response.json();
                console.log(data);
                setImages(data.urlsOnly);
            } catch (error) {
                console.error(error);
            }
        }

        getPoster();
    }, []);

    return (
        <div>
            <h1>AI Images</h1>
            <div className="grid grid-cols-6 gap-1">
                {images.length > 0 ? images.map((image, index) => (
                    <img key={index} src={image} alt="AI Generated" />
                )): <div className='text-white'>No Ai generated images have been created yet...</div>}
            </div>
        </div>
    )
}

export default AiImages
