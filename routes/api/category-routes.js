const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories with their associated products
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single category by ID with its associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryToUpdate = await Category.findByPk(req.params.id);

    if (!categoryToUpdate) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    categoryToUpdate.category_name = req.body.category_name;
    await categoryToUpdate.save();

    res.status(200).json({ message: 'Category successfully updated', category: categoryToUpdate });
  } catch (err) {
    res.status(500).json({ error: 'Error updating category', details: err.message });
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryToDelete = await Category.findByPk(req.params.id);

    if (!categoryToDelete) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await categoryToDelete.destroy();

    res.status(204).json({ message: 'Category successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting category', details: err.message });
  }
});

module.exports = router;
