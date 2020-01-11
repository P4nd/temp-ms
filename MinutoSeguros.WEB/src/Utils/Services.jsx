const API = 'http://localhost:54838/api/';

export function Get(action){return fetch(API + action).then(response => response.json());}
export function GetSteps(which){return Get("setup/"+which);}
export function GetPostsAndTags(){return Get("post");}
