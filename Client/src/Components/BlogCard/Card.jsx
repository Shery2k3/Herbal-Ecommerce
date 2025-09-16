import "./Card.css";

const Card = (props) => {
  const truncateDescription = (description) => {
    const maxLength = 120;
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className="blog-card">
        <img src={props.image} alt={props.title} />
        <div className="blog-details">
          <h2 className="blog-title">{props.title}</h2>
          
          <p className="description" dangerouslySetInnerHTML={{ __html: truncateDescription(props.description) }}></p>
        </div>
      </div>
    </>
  );
};

export default Card;
