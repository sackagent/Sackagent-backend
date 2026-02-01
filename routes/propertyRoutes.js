

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware')
const {
    handlePropertyListing,
    handleGetAllProperty,
    handleViewPropertyById,
    handleUpdateAPropertyById,
    handleGetLandlordInfoByPropertyId,
    handleSearchPropertiesByLandlord,
    handleUpdateLandlordVerification,
    deletePropertyById,
    addFavourite,
    removeFavourite,
    getFavourite
} = require('../controllers/propertyController');




// Property routes
router.post('/list-property', protect, authorizeRoles(['admin', 'super_admin']), handlePropertyListing);
router.get('/all-properties', handleGetAllProperty);
router.get('/property/:id', handleViewPropertyById);
router.put('/update-property/:id', protect, authorizeRoles(['admin', 'super_admin']), handleUpdateAPropertyById);
router.get('/landlord-info/:propertyId', protect, authorizeRoles(['admin', 'super_admin']), handleGetLandlordInfoByPropertyId);
router.get('/search-by-landlord/:landlordId', protect, authorizeRoles(['admin', 'super_admin']), handleSearchPropertiesByLandlord);
router.put('/verify-landlord/:propertyId', protect, authorizeRoles(['admin', 'super_admin']), handleUpdateLandlordVerification);
router.delete('/delete-property/:id', protect, authorizeRoles(['admin', 'super_admin']), deletePropertyById);
router.post('/add-favourite/:propertyId', protect, addFavourite);
router.delete('/remove-favourite/:propertyId', protect, removeFavourite);
router.get('/my-favourites', protect, getFavourite);

module.exports = router;