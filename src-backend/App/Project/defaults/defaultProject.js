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
    "blocks": [],
    "container": {
      "centerX": 0,
      "centerY": 0,
      "scale": 0.8
    },
    "links": []
  },
  "data": {}
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
