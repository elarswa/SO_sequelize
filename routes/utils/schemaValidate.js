const schemaValidate = (joiSchema, input) => {
  const valid = joiSchema.validate(input, {
    abortEarly: false,
  });
  if (!valid.error) return [];
  return valid.error.details.map(i => i.message);
};

module.exports = {
  schemaValidate,
};
