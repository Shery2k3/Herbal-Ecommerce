import "./Item.css"

function Items(props) {

    return (
        <>
            <div className="Success-cart-item">
                <h3>{props.quantity}x {props.title}</h3>
                <p>Rs. {props.price}</p>
            </div>
        </>
    );
}

export default Items;