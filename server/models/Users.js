const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Creator",
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Images/default_profile_pic.jpeg",
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "New Creator",
        }
    });


    SequelizeSlugify.slugifyModel(Users, {
        source: ['username'],
        slugOptions: { lower: true },
        column: 'slug',
    });



    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
    };

    return Users;
};