const overviewElement = document.querySelector(".overview");
const username = "amiralee97";

// pulling info from my github repos
const gitHubProfile = async function () {
    const res = await fetch(`https://api.github.com/users${username}`);
    const repos = await res.json();
    console.log(repos);
};
gitHubProfile();

const fetchedInfo = function (repos) {
    const userInfo = document.createElement("div");
    userInfo.innerHTML = `<figure>
        < img alt = "user avatar" src = ${} />
  </figure >
    <div>
        <p><strong>Name:</strong> ${ }</p>
        <p><strong>Bio:</strong> ${ }</p>
        <p><strong>Location:</strong> ${ }</p>
        <p><strong>Number of public repos:</strong> ${ }</p>
    </div>`
    userInfo.append(div);
}