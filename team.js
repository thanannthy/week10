// Define the Member class to represent class members
class Member {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

// Define the Team class to represent classes and their members
class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }
    
    addMember(member) {
        this.members.push(member);
    }
}

// Array to store classes
let teams = [];
let teamId = 0;

// Function to attach click event handlers to elements
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener("click", action);
    return element;
}

// Function to get the value of an input element
function getValue(id) {
    return document.getElementById(id).value;
}

// Function to render the classes and their members in the DOM
function drawDOM() {
    let teamDiv = document.getElementById("teams");
    clearElement(teamDiv);
    
    for (let team of teams) {
        let table = createTeamTable(team);
        let title = document.createElement('h2');
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team));
        teamDiv.appendChild(title);
        teamDiv.appendChild(table);
        
        for (let member of team.members) {
            createMemberRow(team, table, member);
        }
    }
}

// Function to create a row for a class member
function createMemberRow(team, table, member) {
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.position;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteMemberButton(team, member));
}

// Function to create a "Delete" button for a class member
function createDeleteMemberButton(team, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// Function to create a "Create" button for adding a new member
function createNewMemberButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary btn-sm';
    btn.innerHTML = 'Register';
    btn.onclick = () => {
        let name = getValue(`name-input-${team.id}`);
        let position = getValue(`position-input-${team.id}`);
        let newMember = new Member(name, position);
        team.addMember(newMember);
        drawDOM();
    };
    return btn;
}

// Function to create a "Delete" button for a team
function createDeleteTeamButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// Function to create a table for a team's members
function createTeamTable(team) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let roleColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    roleColumn.innerHTML = 'Role';
    row.appendChild(nameColumn);
    row.appendChild(roleColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let roleTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let roleInput = document.createElement('input');
    roleInput.setAttribute('id', `position-input-${team.id}`);
    roleInput.setAttribute('type', 'text');
    roleInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
    roleTh.appendChild(roleInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(roleTh);
    formRow.appendChild(createTh);
    return table;
}


// Function to clear the content of an element
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Attach a click event handler to the "Create" button for teams
onClick('create-team-btn', () => {
    teams.push(new Team(teamId++, getValue('user-name')));
    drawDOM();
});

// Initial rendering of the DOM
drawDOM();
