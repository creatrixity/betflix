exports.handler = async (event, _, callback) => {
  // Insert a row
  const error = false;
  const data = require("./utils/rapidapi");
  let response;

  if (error) {
    response = {
      statusCode: 400,
      message: "Error fetching fixtures",
      results: data,
    };
  } else {
    response = {
      statusCode: 200,
      message: "Successfully fetched list of fixtures",
      results: data,
    };
  }

  callback(null, {
    statusCode: response.statusCode,
    body: JSON.stringify(response),
  });
};
