const { Products } = require('../models/ProductsSchema');


exports.createproduct = async (req, res) => {
   try {
      // Create a new instance of Products using the data from req.body
      const newProduct = new Products(req.body);
      // Save the new product to the database
      await newProduct.save();

      // Respond with success message and the saved product data
      res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
   } catch (error) {
      // If an error occurs during the creation process, respond with an error message
      console.error('Error creating product:', error);
      res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
   }
}

exports.fetchAllfilteredProduct = async (req, res) => {
   try {
      let query = Products.find({});
      let totalproduct = Products.find({})
      if (req.query.category) {
         query = query.where('category').equals(req.query.category);
         totalproduct = totalproduct.where('category').equals(req.query.category);
      }
      
      if (req.query.brand) {
         query = query.where('brand').equals(req.query.brand);
         totalproduct = totalproduct.where('brand').equals(req.query.brand)
      }
      
      if (req.query._page && req.query._limit) {
         const pageSize = parseInt(req.query._limit);
         const page = parseInt(req.query._page);
         query = query.skip(pageSize * (page - 1)).limit(pageSize);
         
      }
      const totaldocs = await totalproduct.count().exec()
      console.log(totaldocs)
      
      if (req.query._sort && req.query._order) {
         const sortField = req.query._sort;
         const sortOrder = req.query._order === 'desc' ? -1 : 1;
         if (['price', 'rating'].includes(sortField)) { // Updated valid sort fields
            query = query.sort({ [sortField]: sortOrder });
         } else {
            throw new Error('Invalid sort field');
         }
      }
      
      const docs = await query.exec();
      res.status(200).json({ success: true, message: 'Products fetched successfully', data: docs });
   } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
   }
}


