import Category from "../models/category.js"

//Create category
export const createCategory = async (req,res)=>{
    try {
        
        const name =req.body.name
        //console.log(name)
        const found = await Category.findOne({name :name})
      
        if (found) {
            res.status(400).json({message : 'Category name is already exists'})
        } else {
            const category = await Category.create(req.body);
            res.status(201).json({message : 'New category successfully added!', data : category}) 
        }
       
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
}

// find all categories
export const getCategories = async (req,res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};


//find one  by Id
export const getCategoryById = async (req,res)=>{
    try {
        const category = await Category.findById(req.params.id).populate('Book');
        res.status(200).json({data: category})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// update 
export const updateCategory = async (req,res)=>{
    try {
         await Category.findByIdAndUpdate(req.params.id, req.body);
        const category = await Category.findOne({_id : req.params.id})
        res.status(200).json({message : "Successfully updated!", data : category})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// delete 
export const deleteCategory = async (req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "category deleted!"})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};
