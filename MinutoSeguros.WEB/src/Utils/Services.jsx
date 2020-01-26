import axios from "axios";

const API = 'http://localhost:54838/api/';

export function Get(action){return fetch(API + action).then(response => response.json());}
export function GetSteps(which){return Get("setup/"+which);}
export function GetPostsAndTags(){return Get("post");}
export function GetRestrictedTerms(){return Get("restrictedterm");}

export function PostRestrictedTerm(termName){

	/*
	################# Once is a [FromForm] #################
	const bodyFormData = new FormData();
	bodyFormData.set("Name", termName);
	const headerConfig = { 'Content-Type': 'multipart/form-data' };
	*/

	/*################# Once is a [FromBody] => obsolete #################*/
	const bodyFormData = {Name: termName};
	const headerConfig = {};

	return axios({
		    method: 'post',
		    headers: headerConfig,
		    url: API+'RestrictedTerm',
		    data: bodyFormData				    
	    });
}

export function DeleteRestrictedTerm(termID){
	return axios({
		    method: 'delete',
		    headers: { 'Content-Type': 'text/plain', 'Token': 'JaX59mXJkn35XDeaFFBNLHNbGbD7' },
		    url: API+'RestrictedTerm/'+termID+"?userID=34543534"
	    });
}