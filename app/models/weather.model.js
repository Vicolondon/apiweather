module.exports = mongoose => {

  var schema = 
    mongoose.Schema(
        {
            city: String,
            thermometerCelsius: Number,
            barometerPressure: Number,
            hygrometerHumidity: Number,
        },
        { timestamps: true }
      );
  
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const WeatherData = mongoose.model("weatherdata", schema);

    return WeatherData;
  };