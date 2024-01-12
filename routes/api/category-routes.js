const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
    // be sure to include its associated Products
  try{
    const categoriesData = await Category.findAll({
      include: {model: Product},
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category with that id" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id', async (req, res) => {
  try{
    const categoryData = await Category.create({...req.body});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryToUpdate = await Category.findByPk(req.params.id);

    if (!categoryToUpdate) {
      res.status(404).json({ error: 'This Category is not found' });
      return;
    }

    categoryToUpdate.category_name = req.body.category_name;  // Fix the typo in "category_name"
    await categoryToUpdate.save();

    res.status(200).json({ message: 'Category was successfully updated!', category: categoryToUpdate });
  } catch (err) {
    res.status(500).json({ error: 'There was an error updating category', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryToDelete = await Category.findByPk(req.params.id);
  
      if (!categoryToDelete) {
        res.status(404).json({ error: 'This Category is not found' });
        return;
      }
  
      await categoryToDelete.destroy();
  
      res.status(200).json({ message: 'Category was successfully deleted!' });
    } catch (err) {
      res.status(500).json({ error: 'There was an error deleting the category', details: err.message });
    }
  });
  
});

module.exports = router;
