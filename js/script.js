const overviewElement = document.querySelector(".overview");
const username = "amiralee97";
const repoListElement = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataElement = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
gitRepos();
};

const gitRepos = async function() {
    const repoFetch = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoFetch.json();
    displayInfo(repoData);

    filterInput.classList.remove("hide");
};


const displayInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoListElement.append(repoItem);
}
};

const repoList = document.querySelector(".repo-list");
repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName)
    };
});

const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for(const language in languageData) {
        languages.push(language)
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages) {
    backButton.classList.remove("hide");
    repoDataElement.innerHTML = "";
    repoDataElement.classList.remove("hide");
    repoSection.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    
    repoDataElement.append(div);

};

backButton.addEventListener("click", function(){
    repoSection.classList.remove = ("hide");
    repoDataElement.classList.add("hide");
    backButton.classList.add("hide");
});

//dynamic search bar
filterInput.addEventListener("input", function(e){
    const userSearch = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerText = userSearch.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(lowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});