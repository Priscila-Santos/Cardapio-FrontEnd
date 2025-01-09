import "./card.css";

interface CardProps {
    price: number,
    title: string,
    image: string,
    onClick?: () => void;

}

export function Card({price, image, title, onClick } : CardProps) {
    return(
        <div className="card" onClick={onClick}>
            <img src={image} alt="Image Food" />
            <h2>{title}</h2>
            <p><b>Valor:</b>{price}</p>
        </div>
        
    )
}