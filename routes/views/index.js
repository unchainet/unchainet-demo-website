var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var moment = require('moment');

exports = module.exports = function (req, res) {

	function findMessages (callback) {
		Enquiry.model.find().sort('-createdAt').limit(10).select('name createdAt message').exec(function(err, enquiries) {
			enquiries.forEach(function (enq) {
				enq.timeFmt = moment(enq.createdAt).format('HH:mm:ss');
				if (enq.name.length > 20){
					enq.name = enq.name.substr(0, 17) + '...';
				}
			});
			callback(err, enquiries);
		});
	}
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
// Set locals
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
			errorMessage: 'Message not sent',
		}, function (err) {
			findMessages(function (e, enquiries) {
				locals.enquiries = enquiries;
				if (err) {
					locals.validationErrors = err.errors;
				} else {
					locals.enquirySubmitted = true;
				}
				next();
			});
		});
	});
	
	findMessages(function (err, enquiries) {
		if (err) {
			console.log(err);
		}
		locals.enquiries = enquiries;
		// Render the view
		view.render('index');
	});	
};
