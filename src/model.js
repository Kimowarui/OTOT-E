import mongoose from 'mongoose';
var playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Player model
var Player = mongoose.model('player', playerSchema);
const get = function (callback, limit) {
    Player.find(callback).limit(limit);
}
export {
    Player,
    get
}