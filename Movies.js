var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

//mongoose.connect(process.env.DB, { useNewUrlParser: true });
try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log("could not connect");
}
mongoose.set('useCreateIndex', true);

//user schema
var MovieSchema = new Schema({
    title: { type: String, required: true, index: { unique: true }},
    year: { type: String, required: true },
    genre: { type: String, required: true },
    actors: [
        {
            "ActorName" : { type: String, required: true },
            "CharacterName" : { type: String, required: true }
        },
        {
            "ActorName" : { type: String, required: true },
            "CharacterName" : { type: String, required: true }
        },
        {
            "ActorName" : { type: String, required: true },
            "CharacterName" : { type: String, required: true }
        }
    ]
});

MovieSchema.methods.compareTitle = function (title, callback) {
    var movie = this;

    if (title == movie.title) {
        callback(isMatch);
    }
}

//return the model to server
module.exports = mongoose.model('Movie', MovieSchema);