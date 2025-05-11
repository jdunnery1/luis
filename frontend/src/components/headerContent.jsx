import Topbar from "./topbar.jsx";
import CardView from "./cardView.jsx";

const HeaderContent = ({cart, setCart}) => {
    return (
        <div className={'w-screen h-1/2'}>
            <Topbar cart={cart} setCart={(c) => setCart(c)}/>
            <CardView />
        </div>
    );
};

export default HeaderContent;