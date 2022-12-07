const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    meta: {
      isPrivate: { type: Boolean, default: false },
    },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: [
        'active',
        'deleted',
      ],
    },
    updatedAt: { type: Date, default: new Date() },
});

module.exports = model('Group', GroupSchema)