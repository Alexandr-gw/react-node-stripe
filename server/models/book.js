const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stripePriceId: {
        type: DataTypes.STRING,
    },
    updatedOn: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
});

module.exports = Book;
