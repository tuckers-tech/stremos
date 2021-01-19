const template = `
{
    "api-version": "1.0",
    "id": "::id::",
    "name": "::projectName::",
    "type": "::type::"
}
`;

function generateDefaultProjectJSON(projectOptions) {
  return JSON.parse(
    template
      .replace('::projectName::', projectOptions.name)
      .replace('::id::', projectOptions.id)
      .replace('::type::', projectOptions.type),
  );
}

module.exports = {
  generateDefaultProjectJSON,
};
