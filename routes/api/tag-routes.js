const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: { model: Product },
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
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
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: tagId } }
    );

    if (updatedTag[0] === 1) {
      res.status(200).json({ message: 'Tag was updated successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    const deletedRowCount = await Tag.destroy({
      where: { id: tagId },
    });

    if (deletedRowCount === 1) {
      res.status(200).json({ message: 'Tag was successfully deleted' });
    } else {
      res.status(404).json({ message: 'Tag not found or already deleted' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
