const supabase = require("./utils/supabase");

exports.handler = async (event, _, callback) => {
  let response;
  const { fixture_id, choice, amount } = JSON.parse(event.body);
  // Insert a row
  const { data, error } = await supabase
    .from("bets")
    .insert({ fixture_id, choice, amount })
    .single();

  if (error) {
    response = {
      statusCode: 400,
      message: `Error creating bet: ${error.message}`,
      results: data,
    };
  } else {
    response = {
      statusCode: 201,
      message: "Successfully placed bet",
      results: data,
    };
  }

  callback(null, {
    statusCode: response.statusCode,
    body: JSON.stringify(response),
  });
};
