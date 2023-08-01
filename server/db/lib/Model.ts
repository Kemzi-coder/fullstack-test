import {Filter, ObjectId, OptionalUnlessRequiredId, WithId} from "mongodb";
import {connectToDb} from "..";

interface ModelOptions {
	collectionName: string;
}

class Model<T extends object> {
	_collectionName: string;

	constructor(options: ModelOptions) {
		this._collectionName = options.collectionName;
	}

	async create(data: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
		const collection = await this._getCollection();

		const {insertedId} = await collection.insertOne(data);

		const created = await this.getById(insertedId);
		return created!;
	}

	async upsertOne(filter: Filter<T> = {}, data: Partial<T>) {
		const collection = await this._getCollection();

		await collection.updateOne(filter, {$set: data}, {upsert: true});

		const upserted = await this.getOne(filter);
		return upserted;
	}

	async updateById(
		id: ObjectId | string,
		data: Partial<T>
	): Promise<WithId<T> | null> {
		return this.updateOne({_id: new ObjectId(id)} as Filter<T>, data);
	}

	async updateOne(filter: Filter<T> = {}, data: Partial<T>) {
		const collection = await this._getCollection();

		await collection.updateOne(filter, {$set: data});

		const updated = await this.getOne(filter);
		return updated;
	}

	async deleteById(id: ObjectId | string): Promise<WithId<T> | null> {
		return this.deleteOne({_id: new ObjectId(id)} as Filter<T>);
	}

	async deleteOne(filter: Filter<T> = {}): Promise<WithId<T> | null> {
		const collection = await this._getCollection();

		await collection.deleteOne(filter);

		const deleted = await this.getOne(filter);
		return deleted;
	}

	async getById(id: ObjectId | string): Promise<WithId<T> | null> {
		return this.getOne({_id: new ObjectId(id)} as Filter<T>);
	}

	async getOne(filter: Filter<T> = {}): Promise<WithId<T> | null> {
		const collection = await this._getCollection();
		return collection.findOne(filter);
	}

	async getMany(filter: Filter<T> = {}): Promise<WithId<T>[]> {
		const collection = await this._getCollection();
		return collection.find(filter).toArray();
	}

	async _getCollection() {
		const db = await connectToDb();
		return db.collection<T>(this._collectionName);
	}
}

export default Model;
