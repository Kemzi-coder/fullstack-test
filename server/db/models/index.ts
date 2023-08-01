import CustomerModel, {CustomerToDb} from "./CustomerModel";
import PaymentModel, {PaymentToDb} from "./PaymentModel";
import ProductModel, {ProductToDb} from "./ProductModel";
import RefreshTokenModel, {RefreshTokenToDb} from "./RefreshTokenModel";
import SubscriptionModel, {SubscriptionToDb} from "./SubscriptionModel";
import UserModel, {UserToDb} from "./UserModel";

const User = new UserModel();
const Customer = new CustomerModel();
const Payment = new PaymentModel();
const Subscription = new SubscriptionModel();
const RefreshToken = new RefreshTokenModel();
const Product = new ProductModel();

export type {
	CustomerToDb,
	PaymentToDb,
	ProductToDb,
	RefreshTokenToDb,
	SubscriptionToDb,
	UserToDb
};
export {User, Customer, Payment, Subscription, RefreshToken, Product};
