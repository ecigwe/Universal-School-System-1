const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this group.']
    },
    members: [
        {
            memberId: { type: mongoose.Schema.Types.ObjectId },
            memberUsername: { type: String, required: [true, 'Every group member must have a username'] },
            memberCategory: { type: String, required: 'Every group member must belong to one of the category of users. In otherwords, you are either a Student or a Staff.' }
        }
    ],
    createdAt: Date,
    admin: {
        id: { type: mongoose.Schema.Types.ObjectId },
        username: { type: String, required: [true, 'Every group admin must have a username'] },
        category: { type: String, required: 'Every group admin must belong to one of the category of users. In otherwords, you are either a Student or a Staff.' }
    }
});

// groupSchema.pre(/^find/, function (next) {
//     this.populate({ path: 'school' });
//     next();
// });

groupSchema.index({ school: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Group', groupSchema);