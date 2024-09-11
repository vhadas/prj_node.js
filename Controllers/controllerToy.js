const toyModel = require("../Models/modelToy")


async function getAllToys(req, res) {
    const { skipCount = 0, sortField = 'name', sortOrder = 'asc' } = req.query;
    
    try {
        const toys = await toyModel.find()
            .skip(parseInt(skipCount, 10)) 
            .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 });

        res.status(200).json(toys);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getToyById(req, res) {
    const { id } = req.params;

    try {
        const toy = await toyModel.findById(id);
        res.status(200).json(toy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function addToy(req, res) {
    try {
        const newToy = req.body;
        const toy = await toyModel.create(newToy);

        await categoryModel.findByIdAndUpdate(
            toy.categoryId,
            { $push: { toys: toy._id } },
            { new: true }
        );

        res.status(200).json({ toy, token: res.locals.token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteToy(req, res) {
    const { id } = req.params;

    try {
        const toy = await toyModel.findById(id);
        if (!toy) {
            return res.status(404).json({ message: 'Toy not found' });
        }

        await categoryModel.findByIdAndUpdate(
            toy.categoryId,
            { $pull: { toys: toy._id } }
        );

        await toyModel.deleteOne({ _id: id });
        res.status(200).json({ message: "Toy deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateToy(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedToy = await toyModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedToy) {
            return res.status(404).json({ message: 'Toy not found' });
        }

        res.status(200).json(updatedToy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getToysByPrice(req, res) {
    const { min, max } = req.query;

    try {
        const toys = await toyModel.find({
            price: { $gte: min, $lte: max }
        });

        res.status(200).json(toys);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getToysByName(req, res) {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: "Name query parameter is required" });
    }

    try {
        const toys = await toyModel.find({
            name: {
                $regex: new RegExp(name, 'i')
            }
        });

        res.status(200).json(toys);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



module.exports = { getAllToys, getToyById, addToy, deleteToy, updateToy ,getToysByPrice,getToysByName}