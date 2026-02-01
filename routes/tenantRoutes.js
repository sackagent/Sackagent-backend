const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { handleRequestProperty, handleGetTenantRequests, handleUploadPaymentReceipt} = require('../controllers/rentalRequestController');
const { upload } = require('../utils/multer');


// Tenant routes
router.post('/request', protect, handleRequestProperty);
router.get('/my-requests', protect, handleGetTenantRequests);
router.post('/upload-receipt/:requestId', protect, upload.single('receipt'), handleUploadPaymentReceipt);


module.exports = router;