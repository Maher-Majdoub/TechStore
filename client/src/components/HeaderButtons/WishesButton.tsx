import { useNavigate } from "react-router-dom";
import useWish from "../../hooks/useWish";
import Icon from "../Icon/Icon";
import { endpoints } from "../../constants";
import { FaRegHeart } from "react-icons/fa6";

const WishesButton = () => {
  const { data: wishes } = useWish();
  const navigate = useNavigate();
  return (
    <Icon
      count={wishes?.count || 0}
      onClick={() => {
        navigate(endpoints["wishlist"]);
      }}
    >
      <FaRegHeart />
    </Icon>
  );
};

export default WishesButton;
