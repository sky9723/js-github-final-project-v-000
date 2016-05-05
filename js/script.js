'use strict'; 
$(document).ready(function(){
  var accessToken;
  handleSubmit();
});

function GithubInteractor(token) {
  this.token = token;
}
var accessToken;
var interactor = new GithubInteractor(accessToken);

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
  $.ajax({
    url: url,
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + accessToken);
    },
    data: JSON.stringify({
        title: issueTitle, 
        body: issueBody
    })
  }).done(handleResponse)
  .fail(handleError);
}

function handleResponse(response) {
  var output = "";
  output += '<li>';
    output += '<a href="' + response.html_url + '">';
      output += response.title;
    output += '</a>';
  output += '</li>';
  
  $('#issue').append(output);
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

function handleSubmit() {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();
    createIssue(repoName, repoOwner, issueTitle, issueBody);
    
    var accessToken = $('#accessToken').val();
    var interactor = new GithubInteractor(accessToken);
    event.preventDefault();
    return interactor;
  });
}

