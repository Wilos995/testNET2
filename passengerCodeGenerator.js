const destinations = {
    UK: "U",
    Europe: "E",
    Asia: "A",
    America: "Z",
  };

  const flightTimes = {
    am: {
      UK: "u",
      Europe: "e",
      Asia: "a",
      America: "z",
    },
    pm: {
      UK: "U",
      Europe: "E",
      Asia: "A",
      America: "Z",
    },
  };

  const genders = {
    male: "X",
    female: "Y",
  };

//   const meal = {
//     Eurpoean: "G",
//     Asian: "H",
//     Vegeterian: "K",
//   };

//   const classes = {
//     First: "P",
//     Business: "Q",
//     Economy: "R",
//   };



function passengerCodeGenerator(
  destination,
  flightTime,
  gender,
 
) {
 
  // Convert the destination and gender to uppercase to ensure case insensitivity
  destination = destination.toUpperCase();
  gender = gender.toLowerCase();
//   meal = meal.charAt(0).toUpperCase() + meal.slice(1).toLowerCase();
//   travelClass = travelClass.charAt(0).toUpperCase() + travelClass.slice(1).toLowerCase();


  // Check if the flight time is between 10am and 6pm
  const now = new Date();
  const currentHour = now.getHours();
  const isDayTime = currentHour >= 10 && currentHour <= 18;

  // Determine the code based on the destination, flight time, and gender
  let code = "";
  if (isDayTime) {
    code += flightTimes.am[destinations[destination]];
  } else {
    code += flightTimes.pm[destinations[destination]];
  }

  code += genders[gender];
//   code += meal[meal];
//   code += classes[classes];

  return code;
}

module.exports = passengerCodeGenerator;
