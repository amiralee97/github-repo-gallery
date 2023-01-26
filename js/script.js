const overviewElement = document.querySelector(".overview");
const username = "amiralee97";
const repoListElement = document.querySelector(".repo-list");

// pulling info from my github repos
const gitHubProfile = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    UserInfoDisplay(data)
    // console.log(data);
};
gitHubProfile();

const UserInfoDisplay = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt = "user avatar" src = ${data.avatar_url} />
        </figure >
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`

overviewElement.append(div);
repoList();
};

const repoList = async function() {
    const repoFetch = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoFetch.json();
    displayInfo(repoData);
};


const displayInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoListElement.append(repoItem);
}
};