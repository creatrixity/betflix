const supabase = require("./utils/supabase");

exports.handler = async (event, _, callback) => {
  // Insert a row
  const { data, error } = await supabase.from("bets").select();
  let response;

  if (error) {
    response = {
      statusCode: 400,
      message: "Error fetching bets",
      results: data,
    };
  } else {
    response = {
      statusCode: 200,
      message: "Successfully fetched list of bets",
      results: data,
    };
  }

  callback(null, {
    statusCode: response.statusCode,
    body: JSON.stringify(response),
  });
};
