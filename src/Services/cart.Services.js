import {
  getCartbyUser,
  createCart,
  clearCart,
} from "../Reposetory/cart.Repo.js";
import { getProduct } from "../Reposetory/product.Repo.js";
import { NotFoundError } from "../Utils/NotFoundError.js";

const getCart = async (cartDetails) => {
  const cart = await getCartbyUser(cartDetails);
  if (!cart) {
    throw new NotFoundError("cart");
  }
  return cart;
};

const erazeCart = async (cartDetails) => {
  const cart = await clearCart(cartDetails);
  if (!cart) {
    throw new NotFoundError("cart");
  }
  return cart;
};

const modifyCart = async (productId, userId, shouldAdd = true) => {
  const quantityValue = shouldAdd ? 1 : -1;

  const cart = await getCartbyUser(userId);

  const product = await getProduct(productId);

  if (!cart) {
    throw new NotFoundError("cart");
  }

  if (!product || product.stock <= 0) {
    throw new NotFoundError("product");
  }

  let foundProduct = false;

  cart.item.forEach((citem) => {
    if (citem.product._id.toString() === productId.toString()) {
      if (shouldAdd) {
        if (product.stock >= citem.quantity + 1) {
          citem.quantity += quantityValue;
        } else {
          throw { message: "Product Out Of Stock", statusCode: 500 };
        }
      } else {
        if (citem.quantity > 0) {
          citem.quantity += quantityValue;

          if (citem.quantity === 0) {
            cart.item = cart.item.filter(
              (citem) => citem.product._id.toString() != productId.toString()
            );
            return;
          }
        } else {
          throw { message: "prodcut already removed", statusCode: 500 };
        }
      }
    }
    foundProduct = true;
  });

  if (!foundProduct) {
    if (shouldAdd) {
      cart.item.push({ product: productId, quantity: 1 });
    }
  }
  await cart.save();
  return cart;
};

export { getCart, erazeCart, modifyCart };
