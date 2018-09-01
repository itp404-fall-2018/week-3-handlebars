let profileTemplate = document.querySelector('#profile-template').innerHTML;
let renderProfile = Handlebars.compile(profileTemplate);
let reposTemplate = document.querySelector('#repos-template').innerHTML;
let renderRepos = Handlebars.compile(reposTemplate);

Handlebars.registerHelper('format-date', function(date) {
  return moment(date).fromNow();
});

function fetchProfile(username) {
  return $.getJSON(`https://api.github.com/users/${username}`);
}

function fetchRepos(username) {
  return $.getJSON(`https://api.github.com/users/${username}/repos`);
}

fetchProfile('wycats').then(function(profile) {
  let html = renderProfile(profile);
  document.querySelector('#profile').innerHTML = html;
});

fetchRepos('wycats').then(function(repositories) {
  let html = renderRepos({
    repos: repositories
  });

  document.querySelector('#repos').innerHTML = html;
});
