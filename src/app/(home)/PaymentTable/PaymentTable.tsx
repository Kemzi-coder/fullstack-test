import {Payment} from "@/types";
import {FC} from "react";
import styles from "./PaymentTable.module.scss";
import RefundButton from "@/components/RefundButton/RefundButton";
import {convertStringToDate} from "@/utils/helpers";

interface Props {
	payments: Payment[];
}

const PaymentTable: FC<Props> = ({payments}) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Amount</th>
					<th>Status</th>
					<th>Description</th>
					<th>Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{payments.map(payment => (
					<tr key={payment.id}>
						<td>
							{(950 / 100).toFixed(2)} {payment.currency.toUpperCase()}
						</td>
						<td>{payment.status}</td>
						<td>{payment.description}</td>
						<td>{convertStringToDate(payment.createdAt)}</td>
						<td>
							{payment.refunded ? (
								"Refunded"
							) : (
								<RefundButton paymentId={payment.id} />
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default PaymentTable;
