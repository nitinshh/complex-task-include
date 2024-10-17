const Models = require("../models/index");
const Joi = require("joi");
const helper = require("../helpers/commonHelper");

// Correcting Associations

// A user has many posts, and a post belongs to a user
Models.postModel.belongsTo(Models.userModel, {
  foreignKey: "userId",
  as: "users",
});

Models.userModel.hasMany(Models.postModel, {
  foreignKey: "userId",
  as: "posts",
});

// A post has many images, and an image belongs to a post
Models.postModel.hasMany(Models.postImage, {
  foreignKey: "postId",
  as: "images",
});

// A comment belongs to both a user and a post, and a post has many comments
Models.postComment.belongsTo(Models.userModel, {
  foreignKey: "userId",
  as: "commentUser",
});

Models.postComment.belongsTo(Models.postModel, {
  foreignKey: "postId",
  as: "post", // Updated to reflect the post each comment belongs to
});

Models.postModel.hasMany(Models.postComment, {
  foreignKey: "postId",
  as: "comments", // A post can have multiple comments
});

module.exports = {
  insertUser: async (req, res) => {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
      });
      let payload = await helper.validationJoi(req.body, schema);

      let objToSave = {
        name: payload.name,
        email: payload.email,
      };
      let result = await Models.userModel.create(objToSave);
      return res.send(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  insertPost: async (req, res) => {
    try {
      const schema = Joi.object().keys({
        userId: Joi.string().required(),
        post: Joi.string().required(),
      });

      const payload = await helper.validationJoi(req.body, schema);
      const post = await Models.postModel.create(payload);
      return res.status(201).send(post);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: error.message });
    }
  },

  insertImage: async (req, res) => {
    try {
      const schema = Joi.object().keys({
        postId: Joi.string().required(),
        images: Joi.string().required(),
      });

      const payload = await helper.validationJoi(req.body, schema);
      const image = await Models.postImage.create(payload);
      return res.status(201).send(image);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: error.message });
    }
  },

  insertComment: async (req, res) => {
    try {
      const schema = Joi.object().keys({
        userId: Joi.string().required(),
        postId: Joi.string().required(),
        commentText: Joi.string().required(),
      });

      const payload = await helper.validationJoi(req.body, schema);
      const comment = await Models.postComment.create(payload);
      return res.status(201).send(comment);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: error.message });
    }
  },

  get: async (req, res) => {
    try {
      console.log('Fetching users...');
      let response = await Models.userModel.findAll();
      console.log('Users fetched:', response);
      res.send(response);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'An error occurred while fetching users.' });
    }
  },

  // New API: Update User
  updateUser: async (req, res) => {
    try {
      const schema = Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().optional(),
        email: Joi.string().optional(),
      });

      const payload = await helper.validationJoi(req.body, schema);

      let user = await Models.userModel.findByPk(payload.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      user = await user.update({
        name: payload.name || user.name,
        email: payload.email || user.email,
      });

      return res.status(200).send(user);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: error.message });
    }
  },

  
  deleteUser: async (req, res) => {
    try {
      const schema = Joi.object().keys({
        id: Joi.string().required(),
      });

      const payload = await helper.validationJoi(req.body, schema);

      const user = await Models.userModel.findByPk(payload.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      await user.destroy();
      return res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: error.message });
    }
  },

  findPostAllData: async (req, res) => {
    try {
      let response = await Models.postModel.findAll({
        include: [
          {
            model: Models.userModel,
            required: false,
            as: "users",
          },
          {
            model: Models.postImage,
            required: false,
            as: "images",
          },
          {
            model: Models.postComment,
            required: false,
            as: "comments",
            include: [
              {
                model: Models.userModel,
                required: false,
                as: "commentUser",
              },
            ],
          },
        ],
      });
      res.send(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  findUserPostDataDetails: async (req, res) => {
    try {
      const response = await Models.userModel.findAll({
        include: [
          {
            model: Models.postModel,
            required: false,
            as: "posts",
            include: [
              {
                model: Models.postImage,
                required: false,
                as: "images",
              },
              {
                model: Models.postComment,
                required: false,
                as: "comments",
                include: [
                  {
                    model: Models.userModel,
                    required: false,
                    as: "commentUser",
                  },
                ],
              },
            ],
          },
        ],
      });
      res.send(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
