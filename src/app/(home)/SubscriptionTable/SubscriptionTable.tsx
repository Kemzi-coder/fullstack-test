import {Subscription} from "@/types";
import {FC} from "react";
import styles from "./SubscriptionTable.module.scss";
import {convertStringToDate} from "@/utils/helpers";

interface Props {
	subscriptions: Subscription[];
}

const SubscriptionTable: FC<Props> = ({subscriptions}) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Status</th>
					<th>End date</th>
				</tr>
			</thead>
			<tbody>
				{subscriptions.map(subscription => (
					<tr key={subscription.id}>
						<td>{subscription.status}</td>
						<td>{convertStringToDate(subscription.currentPeriodEnd)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SubscriptionTable;
