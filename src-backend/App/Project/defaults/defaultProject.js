const template = `
{
  "metadata": {
    "api-version": "1.0",
    "id": "::id::",
    "name": "::projectName::",
    "type": "::type::",
    "description": ""
  },
  "dependencies": {},
  "topology": {
    "nodes": [],
    "connections": []
  },
  "data": {},
  "services": {}
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
