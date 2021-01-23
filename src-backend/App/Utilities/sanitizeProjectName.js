function sanitizeProjectName(projectPath) {
  return projectPath.replaceAll(' ', '-');
}

module.exports = {
  sanitizeProjectName,
};
