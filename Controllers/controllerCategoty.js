const categoryModel = require("../Models/modelCategoty");

async function getAllCategories(req, res) {
    try {
        const categories = await categoryModel.find().populate('toys', 'name');
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


async function createCategory(req, res) {
    try {
        const newCategory = req.body;
        const category = await categoryModel.create(newCategory);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {getAllCategories,createCategory}