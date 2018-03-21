var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	name: { type: String, required: true},
	email: { type: Types.Email },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' },
	] },
	message: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, format: 'HH:mm:ss'},
});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, message, createdAt';
Enquiry.register();
