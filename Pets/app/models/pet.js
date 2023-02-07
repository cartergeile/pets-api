const mongoose = require('mongoose')

//PET -> has an owner, a name, a type, and age, adoptable(boolean)
// eventually each pet will have a toys array
// this model will use virtuals to produce additional data on each pet

const petSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		adoptable: {
			type: Boolean,
			require: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		// since were adding virtuals to our pet model
		// we need to tell express to include them when we want them
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

// virtuals go here
// remember these are virtual properties, that use existing data, to add a property whenever we retrieve these documents.

module.exports = mongoose.model('Pet', petSchema)
