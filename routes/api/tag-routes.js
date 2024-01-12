const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include:{model: Product},
    });
    res.status(200).json(tagsData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      name: req.body.name,
    });
    res.status(201).json(newTag);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagId = req.params.id;
    const updatedTag = await Tag.update(
      { name: req.body.name},
      { where: {id:tagId}}
    );
    if (updatedTag[0] ===1){
      res.status(200).json({message: 'Tag was updated successfully'});
    } else{ 
      res.status(404).json({message: 'Tag was not found'});
    }
  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    const deletedRowCount = await Tag.destroy({
      where: { id: tagId }
    });

    if (deletedRowCount === 1) {
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
