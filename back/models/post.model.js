const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
    {
        userPseudo: { 
            type: String,
            unique: true
            
            
        },

        userId: {
            type: String, 
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type: String
        },
        likers: {
            type: [String],
            
        },
      
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', postSchema);


