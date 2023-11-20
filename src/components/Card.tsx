interface CardProps {
    name: string;
  }
  
  const Card: React.FC<CardProps> = ({ name }) => {

    return (
      <>
        <h1>{name}</h1>
      </>
    );
  };
  
  export default Card;