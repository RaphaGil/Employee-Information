// creates the team
const generateTeam = (team) => {
  // creates the manager html
  const generateManager = (manager) => {
    return `
    <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card m-4 text-center alert-primary">
    <div class="card-body">
      <h5 class="card-title">${manager.getName()}</h5>
      <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
    </div>
    <div>
      <ul class="list-group">
      <li class="list-group-item">ID: ${manager.getId()}</li>
      <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
      <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
    </ul>
    </div>
    </div>
    </div>
        `;
  };

  // creates the html for engineers
  const generateEngineer = (engineer) => {
    return `
    <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card m-4 text-center alert-secondary">
    <div class="card-body">
      <h5 class="card-title">${engineer.getName()}</h5>
      <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
    </div>
    <div>
      <ul class="list-group">
      <li class="list-group-item">ID: ${engineer.getId()}</li>
      <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
      <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGitHub()}"target="_blank" rel="noopener noreferrer">${engineer.getGitHub()}</a></li>
    </ul>
    </div>
    </div>
    </div>
        `;
  };

  // creates the html for interns
  const generateIntern = (intern) => {
    return `
    <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card m-4 text-center alert-danger">
    <div class="card-body">
      <h5 class="card-title">${intern.getName()}</h5>
      <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
    </div>
    <div>
      <ul class="list-group">
      <li class="list-group-item">${intern.getId()}</li>
      <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
      <li class="list-group-item">School: ${intern.getSchool()}</li>
      </ul>
    </div>
    </div>
    </div>
    </div>
        `;
  };

  const html = [];

  html.push(
    team
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => generateManager(manager))
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => generateEngineer(engineer))
      .join("")
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => generateIntern(intern))
      .join("")
  );

  return html.join("");
};

// exports function to generate entire page
module.exports = (team) => {
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="jumbotron mb-3 team-heading bg-info">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
            <div class="row">
            <div class="col d-flex flex-wrap justify-content-center">
                    ${generateTeam(team)}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};
