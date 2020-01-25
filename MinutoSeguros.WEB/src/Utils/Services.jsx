import axios from "axios";

const API = 'http://localhost:54838/api/';
const bodyFormData = new FormData();

export function Get(action){return fetch(API + action).then(response => response.json());}
export function GetSteps(which){return Get("setup/"+which);}
export function GetPostsAndTags(){return Get("post");}
export function GetRestrictedTerms(){return Get("restrictedterm");}

export function PostRestrictedTerm(termName){
	bodyFormData.set("Name", termName);
	return axios({
		    method: 'post',
		    headers: {'Content-Type': 'multipart/form-data' },
		    url: API+'RestrictedTerm',
		    data: bodyFormData				    
	    });
}


export function DeleteRestrictedTerm(termID){
	return axios({
		    method: 'delete',
		    headers: {'Content-Type': 'text/plain' },
		    url: API+'RestrictedTerm/'+termID
	    });
}