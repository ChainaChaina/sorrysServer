
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        tag: [String],	
        description: String,
        approved: Boolean,
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Sorry = mongoose.model("sorry", schema);
    return Sorry;
  };