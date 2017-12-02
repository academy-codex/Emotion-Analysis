var UserEmotions = mongoose.model('Emotion', {
   email: {
       type: String,
       required: true,
       trim: true
   },
    timestamp: {
        type: Date,
        required: true,
    },
    emotions: {
       type: Array
    }
});