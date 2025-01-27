require("dotenv").config();
let mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Dhyani",
    age: 25,
    favoriteFoods: ["Rajma", "Chinese"],
  });
  person.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {
    name: "Dhyani",
    age: 25,
    favoriteFoods: ["Rajma", "Chinese"],
  },
  {
    name: "Gloria",
    age: 35,
    favoriteFoods: ["Lebanese", "Colombian"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
      if (err) return console.error(err);
      done(null, person);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("name favoriteFoods")
    .exec((err, person) => {
      if (err) return console.error(err);
      done(null, person);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
