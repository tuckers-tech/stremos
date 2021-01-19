function sanitizeProjectName(projectPath) {
  return projectPath.replace(' ', '-');
}

module.exports = {
  sanitizeProjectName,
};
